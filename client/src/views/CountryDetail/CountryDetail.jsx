import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountry } from "../../redux/actions";
import style from "./CountryDetail.module.css";
import { Link } from "react-router-dom";

export const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const country = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.imgContainer}>
            <img className={style.img} src={country.flags} alt={country.name} />
          </div>
          <div className={style.infoContainer}>
            <h1 className={style.title}>{country.name}</h1>
            <h3 className={style.subtitle}>Continent: {country.continents}</h3>
            <h3>Capital: {country.capital}</h3>
            <h3>subregion: {country.subregion}</h3>
            <h3>area: {country.area}</h3>
            <h3>population: {country.population}</h3>
          </div>
          <div>
            <h4 className={style.activities}>Activities</h4>
            <ul>
              {country.activities &&
                country.activities.map((act) => (
                  <li key={act.id}>
                    <p>
                      <strong>{act.name}</strong> ({act.season}) | Duration:{" "}
                      {act.duration} - Dificult: {act.dificult}
                    </p>
                  </li>
                ))}
            </ul>
            <div className={style.btnContainer}> 
          <Link to="/home">
            <button className={style.btn}>Back Home</button>
          </Link>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetail;

