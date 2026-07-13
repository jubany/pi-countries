const axios = require('axios')
const formatterCountries = require("../helpers/formatterCountries")
const url = "https://api.restcountries.com/countries/v5";
const { Country } = require("../db")

const MIN_EXPECTED_COUNTRIES = 200;
const PAGE_LIMIT = 100;

const getCountries = async () => {
   try {
    let countries = []
    countries = await Country.findAll()
    if (countries.length >= MIN_EXPECTED_COUNTRIES) return countries

    if (!process.env.REST_COUNTRIES_API_KEY) {
      throw new Error('REST_COUNTRIES_API_KEY is required to seed countries from Rest Countries v5')
    }

    let offset = 0;
    let more = true;
    const countriesData = [];

    while (more) {
      const get = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}`,
        },
        params: {
          limit: PAGE_LIMIT,
          offset,
          response_fields: 'names,codes,flag,continents,capitals,subregion,area,population',
        },
      })
      const objects = get.data?.data?.objects
      const meta = get.data?.data?.meta

      if (!Array.isArray(objects)) {
        throw new Error('Unexpected Rest Countries response format')
      }

      countriesData.push(...objects)
      offset += meta?.count || objects.length
      more = Boolean(meta?.more)
    }

    const result = countriesData
      .map(e => formatterCountries(e))
      .filter(country => country.id && country.name)

    if (!result.length) {
      throw new Error('Rest Countries did not return valid country records')
    }

    await Country.bulkCreate(result, { ignoreDuplicates: true })
    return Country.findAll()
   }  catch (error) {
    throw new Error(error.message)
   }

}

module.exports = getCountries ;
    
