import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_POBLATION = "ORDER_BY_POBLATION";
export const FILTER_BY_CREATE = "FILTER_BY_CREATE";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const CLEAN_STATE_COUNTRY_DETAIL = "CLEAN_STATE_COUNTRY_DETAIL";

export const getAllCountries = () => async dispatch => {
    try {
        const response = await axios.get("/all");
        dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    } catch (error) {
        // Handle error if needed
    }
};

export const getCountry = (id) => async dispatch => {
    try {
        const response = await axios.get(`/country/${id}`);
        dispatch({ type: GET_COUNTRY, payload: response.data });
    } catch (error) {
        // Handle error if needed
    }
};

export const getCountryByName = (name) => async dispatch => {
    try {
        const response = await axios.get(`/all?name=${name}`);
        dispatch({ type: GET_COUNTRY_BY_NAME, payload: response.data });
    } catch (error) {
        // Handle error if needed
    }
};

export const createActivity = (data) => async dispatch => {
    try {
        const response = await axios.post("/createActivity", data);
        dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_ACTIVITY, payload: error });
    }
};

export const orderByAlphabet = (type) => {
    return { type: ORDER_BY_ALPHABET, payload: type };
};

export const cleanDetailCountry = () => {
    return { type: CLEAN_STATE_COUNTRY_DETAIL };
};

export const orderByPoblation = (type) => {
    return { type: ORDER_BY_POBLATION, payload: type };
};

export const filterByCreate = (activityName) => (dispatch, getState) => {
    const { activities, countries } = getState();
    if (activityName === 'sin filtros') {
      dispatch({ type: FILTER_BY_CREATE, payload: countries });
    } else {
      const activity = activities.find((act) => act.name === activityName);
      if (activity) {
        const countryIds = activity.countries.map((country) => country.id);
        const filteredCountries = countries.filter((country) =>
          countryIds.includes(country.id)
        );
        dispatch({ type: FILTER_BY_CREATE, payload: filteredCountries });
      }
    }
  };
  

export function getAllActivities() {
    return async (dispatch) => {
        try {
            const response = await axios.get("/allActivities");
            dispatch({ type: GET_ACTIVITIES, payload: response.data });
        } catch (error) {
            // Handle error if needed
        }
    };
};

export function filterByContinent(payload) {
    return { type: FILTER_BY_CONTINENT, payload };
};
