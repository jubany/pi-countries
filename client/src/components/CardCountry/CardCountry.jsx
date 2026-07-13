import React from 'react'
import { Link } from 'react-router-dom'
import style from "./CardCountry.module.css"

const CardCountry = (props) => {
  const {name, image, id, continents } = props
  return (
    <>
        <Link to={`/country/${id}`}>
          <div className={style.card}>
              <div className={style.flagWrap}>
                <img src={image} alt={name} />
              </div>
              <div className={style.cardInfo}>
                <h1>{name}</h1>
                <h3>{continents}</h3>
              </div>
          </div>
        </Link>
    </>
    
  )
}

export default CardCountry;
