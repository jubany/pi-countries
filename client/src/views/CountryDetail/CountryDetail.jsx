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

  const formatNumber = (value) =>
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.imgContainer}>
            <img className={style.img} src={country.flags} alt={country.name} />
          </div>
          <div className={style.infoContainer}>
            <h1 className={style.title}>{country.name}</h1>
            <span className={style.badge}>{country.continents}</span>
            <div className={style.stats}>
              <div>
                <span>Capital</span>
                <strong>{country.capital}</strong>
              </div>
              <div>
                <span>Subregion</span>
                <strong>{country.subregion}</strong>
              </div>
              <div>
                <span>Area</span>
                <strong>{formatNumber(country.area)} km2</strong>
              </div>
              <div>
                <span>Population</span>
                <strong>{formatNumber(country.population)}</strong>
              </div>
            </div>
          </div>
          <div className={style.activitiesBox}>
            <h4 className={style.activities}>Activities</h4>
            {country.activities?.length ? (
              <ul className={style.activitiesList}>
                {country.activities.map((act) => (
                  <li key={act.id}>
                    <p>
                      <strong>{act.name}</strong> ({act.season}) | Duration:{" "}
                      {act.duration} - Dificult: {act.dificult}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={style.emptyActivities}>No activities yet</p>
            )}
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

