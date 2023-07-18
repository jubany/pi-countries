import React from "react";
import style from "../Nav/Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

export default function Nav() {
  return (
    <nav className={`${style.navbar} ${style.container}`}>
      <div className={style.buttonContent}>
        <Link to="/home" className={style.button}>Home</Link>
        <Link to="/create-activity" className={style.button}>Create an Activity</Link>
      </div>
      <div className={`${style.header} ${style.searchContainer}`}>
        <SearchBar />
      </div>
    </nav>
  );
}
