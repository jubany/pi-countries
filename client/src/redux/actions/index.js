export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_COUNTRY = "GET_COUNTRY"
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET"
export const ORDER_BY_POBLATION = "ORDER_BY_POBLATION"
export const FILTER_BY_CREATE = "FILTER_BY_CREATE"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const CLEAN_STATE_COUNTRY_DETAIL = "CLEAN_STATE_COUNTRY_DETAIL"

export const getAllCountries = () => async dispatch => {
    try {
      const response = await fetch("http://localhost:3001/all");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch({ type: GET_ALL_COUNTRIES, payload: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export const getCountry = (id) => async dispatch => {
    try {
      const response = await fetch(`http://localhost:3001/country/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch({ type: GET_COUNTRY, payload: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export const getCountryByName = (name) => async dispatch => {
    try {
      const response = await fetch(`http://localhost:3001/all?name=${name}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch({ type: GET_COUNTRY_BY_NAME, payload: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export const createActivity = (data) => async dispatch => {
    try {
      const response = await fetch("http://localhost:3001/createActivity", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      dispatch({ type: CREATE_ACTIVITY, payload: responseData });
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: CREATE_ACTIVITY, payload: error });
    }
  };
  
  export const getAllActivities = () => async dispatch => {
    try {
      const response = await fetch("http://localhost:3001/allActivities");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch({ type: GET_ACTIVITIES, payload: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  