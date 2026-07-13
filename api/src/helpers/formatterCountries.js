const formatterCountries = (data)=>{
    const rawCapital = data.capitals || data.capital || [];
    const capitalNames = rawCapital.map(capital => typeof capital === 'string' ? capital : capital.name).filter(Boolean);
    const capital = capitalNames.length ? capitalNames.join(", ") : "Capital no disponible";
    const alpha3 = data.codes?.alpha_3 || data.cca3;
    const alpha2 = data.codes?.alpha_2 || data.cca2 || alpha3?.slice(0, 2);

    return {
        id: alpha3,
        name: data.names?.translations?.spa?.common || data.translations?.spa?.common || data.name?.common,
        flags: data.flag?.url_png || data.flags?.png || data.flags?.[0] || `https://flags.restcountries.com/v5/w640/${alpha2?.toLowerCase()}.png`,
        continents : data.continents?.[0] || data.region,
        capital,
        subregion : data.subregion || "There not avaible",
        area : data.area?.kilometers || data.area,
        population: data.population
    }
};

module.exports = formatterCountries;
