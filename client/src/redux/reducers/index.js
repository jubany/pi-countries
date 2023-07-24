import {
    CREATE_ACTIVITY,
    FILTER_BY_CREATE,
    GET_ALL_COUNTRIES,
    GET_COUNTRY,
    GET_COUNTRY_BY_NAME,
    ORDER_BY_ALPHABET,
    ORDER_BY_POBLATION,
    FILTER_BY_CONTINENT,
    GET_ACTIVITIES,
    CLEAN_STATE_COUNTRY_DETAIL,
  } from "../actions";
  
  const initialState = {
    countries: [],
    filterCountries: [],
    countryDetail: {},
    activities: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    let aux = [];
  
    switch (action.type) {
      case GET_ALL_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
          filterCountries: action.payload,
        };
      case GET_COUNTRY:
        return {
          ...state,
          countryDetail: action.payload,
        };
      case GET_COUNTRY_BY_NAME:
        return {
          ...state,
          filterCountries: [...action.payload],
        };
      case ORDER_BY_ALPHABET:
        aux = [...state.filterCountries];
        if (action.payload === "AZ") {
          aux.sort((a, b) => {
            if (b.name > a.name) return -1;
          });
        } else if (action.payload === "ZA") {
          aux.sort((a, b) => {
            if (a.name > b.name) return -1;
          });
        } else {
          aux = [...state.countries];
        }
        return {
          ...state,
          filterCountries: [...aux],
        };
      case ORDER_BY_POBLATION:
        aux = [...state.filterCountries];
        if (action.payload === "minPopulation") {
          aux.sort((a, b) => a.population - b.population);
        } else if (action.payload === "maxPopulation") {
          aux.sort((a, b) => b.population - a.population);
        } else if (action.payload === "reset") {
          aux = [...state.countries];
        }
        return {
          ...state,
          filterCountries: [...aux],
        };
      case FILTER_BY_CONTINENT:
        const allCountries = state.countries;
        const continentFiltered =
          action.payload === "All"
            ? allCountries
            : allCountries.filter((c) => c.continents === action.payload);
        return {
          ...state,
          filterCountries: continentFiltered,
        };
      case GET_ACTIVITIES:
        return {
          ...state,
          activities: action.payload,
        };
      case CREATE_ACTIVITY:
        return {
          ...state,
        };
      case FILTER_BY_CREATE:
        const { activities, countries } = state;
        if (action.payload === "sin filtros") {
          return {
            ...state,
            filterCountries: countries,
          };
        } else {
          const activity = activities.find((act) => act.name === action.payload);
          if (activity) {
            const countryIds = activity.countries.map((country) => country.id);
            const filteredCountries = countries.filter((country) =>
              countryIds.includes(country.id)
            );
            return {
              ...state,
              filterCountries: filteredCountries,
            };
          } else {
            return state;
          }
        }
      case CLEAN_STATE_COUNTRY_DETAIL:
        return {
          ...state,
          countryDetail: {},
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  