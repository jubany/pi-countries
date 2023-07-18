import React,{useState} from 'react'
import style from "./SearchBar.module.css"
import { useDispatch} from "react-redux"
import { getCountryByName } from '../../redux/actions';

function SearchBar() {

  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const handlechange = (e) => {
    setName(e.target.value)
  }
  const handleClick = () => {
    dispatch(getCountryByName(name))
    setName("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(getCountryByName(name));
      setName("");
    }
  };
  return (
    <div className={style.searchBar}>
       <form onSubmit={handleSubmit}>
        <input onChange={handlechange} type="text" placeholder="write a country"value={name}style={{ textAlign: "center" }}/>
        <button onClick={handleClick} className={style.button}>Search</button>
        </form>
    </div>
  )
}

export default SearchBar;

