import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardCountry from "../../components/CardCountry/CardCountry";
import Loading from "../../components/Loading/Loading";
import NotFound from "../NotFound/NotFound";
import Nav from "../../components/Nav/Nav";
import ContainerFilter from "../../components/ContainerFilters/ContainerFilters";
import { getAllCountries } from "../../redux/actions/index";
import style from "./Home.module.css";

const CARDS_PER_PAGE = 9;

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.countries);
  const filterCountries = useSelector((state) => state.filterCountries);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [cardsPerView, setCardsPerView] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesTotal, setTotalPages] = useState(0);

  useEffect(() => {
    setCardsPerView([...filterCountries].slice(0, CARDS_PER_PAGE));
    setCurrentPage(0);
    setTotalPages(Math.ceil(filterCountries.length / CARDS_PER_PAGE));
  }, [filterCountries]);

  function HandleForwad() {
    const totalElements = filterCountries.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * CARDS_PER_PAGE;
    if (firstIndex >= totalElements) return;
    setCurrentPage(nextPage);
    setCardsPerView([...filterCountries].slice(firstIndex, firstIndex + CARDS_PER_PAGE));
  }

  function HandleBack() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * CARDS_PER_PAGE;
    setCurrentPage(prevPage);
    setCardsPerView([...filterCountries].slice(firstIndex, firstIndex + CARDS_PER_PAGE));
  }

  return (
    <>
      <Nav />
      <div className={style.container}>
        <ContainerFilter />
        <div className={style.content}>
          {!data.length ? (
            <Loading />
          ) : (
            <div>
              <div className={style.resultsHeader}>
                <p>{filterCountries.length} countries</p>
                <div className={style.pagination}>
                  <button className={style.pageButton} onClick={HandleBack}>
                    Prev
                  </button>
                  <span>
                    {currentPage + 1} of {pagesTotal || 1}
                  </span>
                  <button className={style.pageButton} onClick={HandleForwad}>
                    Next
                  </button>
                </div>
              </div>
              <div className={style.wrapper}>
                {cardsPerView.length === 0 ? (
                  <NotFound />
                ) : (
                  cardsPerView.map((e) => (
                    <CardCountry
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      image={e.flags}
                      continents={e.continents}
                      className={style.card + " card"}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
