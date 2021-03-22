import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CHARACTER, EPISODE, LOCATION } from "../../Constants";
import { GetQueryInfo } from "../../Apollo/Querys";

import ErrorMessage from "./ErrorMessage";
import Card from "./Card";
import ModalCard from "./ModalCard";

const CardGroup = (props) => {
  const initialData = { arrayResults: [], nextPage: 1 };
  const [fetchData, setFetchData] = useState(initialData);

  const initModalData = { isOpen: false, cardInfo: null };
  const [modalData, setModalData] = useState(initModalData);

  const { searchBarState } = props;
  const [searchingDataState, setSearchingDataState] = useState({ keyWord: "" });

  const { data, error } = GetQueryInfo(
    fetchData.nextPage,
    searchBarState.criterea,
    searchingDataState.keyWord
  );

  if (
    searchBarState.keyWord !== searchingDataState.keyWord &&
    searchBarState.keyWord.length >= 3
  ) {
    setFetchData({
      ...fetchData,
      arrayResults: [],
      nextPage: 1,
    });
    setSearchingDataState({
      ...searchingDataState,
      keyWord: searchBarState.keyWord,
    });
  } else if (
    searchBarState.keyWord.length < 3 &&
    searchingDataState.keyWord !== ""
  ) {
    setSearchingDataState({
      ...searchingDataState,
      keyWord: "",
    });
    setFetchData({
      ...fetchData,
      arrayResults: [],
      nextPage: 1,
    });
  }

  const fetchMoreData = () => {
    if (data && fetchData.nextPage !== null) {
      let newArrayResults, newNextPage;
      switch (searchBarState.criterea) {
        case CHARACTER:
          newArrayResults = fetchData.arrayResults.concat(
            data.characters.results
          );
          newNextPage = data.characters.info.next;
          break;
        case LOCATION:
          newArrayResults = fetchData.arrayResults.concat(
            data.locations.results
          );
          newNextPage = data.locations.info.next;
          break;
        case EPISODE:
          newArrayResults = fetchData.arrayResults.concat(
            data.episodes.results
          );
          newNextPage = data.episodes.info.next;
          break;
        default:
          newArrayResults = fetchData.arrayResults.concat(
            data.characters.results
          );
          newNextPage = data.characters.info.next;
          break;
      }
      setFetchData({
        ...fetchData,
        arrayResults: newArrayResults,
        nextPage: newNextPage,
      });
    }
  };

  if (searchBarState.criterea !== null && searchingDataState.keyWord === "")
    return <div />;
  else if (fetchData.arrayResults.length < 1) {
    fetchMoreData();
  }

  const openModalCard = (item) => {
    setModalData({ ...modalData, isOpen: true, cardInfo: item });
  };

  const closeModal = () =>
    setModalData({ ...modalData, isOpen: false, cardInfo: null });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1 className="text-center my-4">
        {searchBarState.criterea === null ? "Meet the Characters" : null}
      </h1>
      <InfiniteScroll
        dataLength={fetchData.arrayResults.length}
        next={() => {
          fetchMoreData();
        }}
        hasMore={fetchData.nextPage !== null ? true : false}
        loader={
          <div className="text-center my-3">
            <h3>Loading...</h3>
            <div className="spinner-border" role="status" />
          </div>
        }
        endMessage={
          <h3 className="text-center my-5">You have seen them all!</h3>
        }
      >
        
        <div className="row row-cols-1 row-cols-md-4 g-4 ">
          {fetchData.arrayResults.map((item) => (
            <Card key={item.id} item={item} openModalCard={openModalCard} />
          ))}
        </div>
      
      </InfiniteScroll>
      
      <ModalCard
        isOpen={modalData.isOpen}
        closeModal={closeModal}
        cardInfo={modalData.cardInfo}
      />
    
    </>
  );
};

export default CardGroup;
