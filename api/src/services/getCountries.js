const axios = require('axios')
const formatterCountries = require("../helpers/formatterCountries")
const url = "https://api.restcountries.com/countries/v5";
const { Country } = require("../db")


const getCountries = async () => {
   try {
    let countries = []
    countries = await Country.findAll()
    if (countries.length) return countries

    if (!process.env.REST_COUNTRIES_API_KEY) {
      throw new Error('REST_COUNTRIES_API_KEY is required to seed countries from Rest Countries v5')
    }
    
    const get = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}`,
      },
    })
    const countriesData = get.data?.data?.objects

    if (!Array.isArray(countriesData)) {
      throw new Error('Unexpected Rest Countries response format')
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
    
