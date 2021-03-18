import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Switch, Route } from "react-router-dom";

import { CHARACTER, EPISODE, LOCATION } from "../../Constants";

import CharacterCard from "../Cards/CharacterCard";
import LocationCard from "../Cards/LocationCard";
import EpisodeCard from "../Cards/EpisodeCard";
import WellcomePageCharCard from "../Cards/WellcomePageCharCard";

import CharacterModalCard from "../ModalCardsComponents/CharacterModalCard";
import WellcomeModalCard from "../ModalCardsComponents/WellcomeModalCard";
import EpisodeModalCard from "../ModalCardsComponents/EpisodeModalCard";
import LocationModalCard from "../ModalCardsComponents/LocationModalCard";

const CardGroup = (props) => {
  const initialData = { arrayResults: [], nextPage: 1 };
  const [fetchData, setFetchData] = useState(initialData);

  const initModalData = { isOpen: false, cardInfo: null };
  const [modalData, setModalData] = useState(initModalData);

  const { searchBarState } = props;
  const [searchingDataState, setSearchingDataState] = useState({ keyWord: "" });

  const WELLCOMEINFO_QUERY = gql`
  query GetWellcomeInfo {
    characters (page:${fetchData.nextPage}, filter: {name:""}) {
      info{
        next
        prev
      }
        results {
          id
          name
          image
          location {
            dimension
            name
          }
          episode {
            id
            name
            episode
          }
        }
      }
    }
  `;

  const CHARACTERS_QUERY = gql`
    query GetCharacters {
      characters (page: ${fetchData.nextPage}, filter: {name: "${searchingDataState.keyWord}", type: ""}) {
        info{
          next
          prev
          count
          pages
          }
    
        results {
          id
          name 
          image
          type
          gender
          species
          
        }
      }
    }
  `;

  const EPISODES_QUERY = gql`
    query GetEpisodes {
      episodes(page: ${fetchData.nextPage}, filter: { name: "${searchingDataState.keyWord}" }) {
        info {
          next
          prev
          count
          pages
        }
        results {
          id
          name
          created
          episode
          characters {
            id
            name
          }
        }
      }
    }
  `;

  const LOCATIONS_QUERY = gql`
    query GetLocations {
      locations(page: ${fetchData.nextPage}, filter: { name: "${searchingDataState.keyWord}", type: "" }) {
        info {
          next
          prev
          count
          pages
        }
        results {
          id
          name
          type
          dimension
          residents {
            id
            name
          }
        }
      }
    }
  `;

  let currentQuery;

  switch (searchBarState.criterea) {
    case CHARACTER:
      currentQuery = CHARACTERS_QUERY;
      break;
    case LOCATION:
      currentQuery = LOCATIONS_QUERY;
      break;
    case EPISODE:
      currentQuery = EPISODES_QUERY;
      break;
    default:
      currentQuery = WELLCOMEINFO_QUERY;
      break;
  }

  const { error, data } = useQuery(currentQuery);

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
    return (
      <h6 className="text-center my-3">
        {error.message === "404: Not Found"
          ? "¡No results for that keyword!"
          : "Error: " + error.message}
      </h6>
    );
  }

  return (
    <>
      <h1 className="text-center my-4">
        {searchBarState.criterea === null
          ? "Meet the Characters"
          : "Search Results..."}
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
            <Switch key={item.id}>
              <Route path="/Characters">
                <CharacterCard item={item} openModalCard={openModalCard} />
              </Route>
              <Route path="/Locations">
                <LocationCard item={item} openModalCard={openModalCard} />
              </Route>
              <Route path="/Episodes">
                <EpisodeCard item={item} openModalCard={openModalCard} />
              </Route>
              <Route path="/">
                <WellcomePageCharCard
                  item={item}
                  openModalCard={openModalCard}
                />
              </Route>
            </Switch>
          ))}
        </div>
      </InfiniteScroll>
      <Switch>
        <Route path="/Characters">
          <CharacterModalCard
            isOpen={modalData.isOpen}
            closeModal={closeModal}
            cardInfo={modalData.cardInfo}
          />
        </Route>
        <Route path="/Locations">
          <LocationModalCard
            isOpen={modalData.isOpen}
            closeModal={closeModal}
            cardInfo={modalData.cardInfo}
          />
        </Route>
        <Route path="/Episodes">
          <EpisodeModalCard
            isOpen={modalData.isOpen}
            closeModal={closeModal}
            cardInfo={modalData.cardInfo}
          />
        </Route>
        <Route path="/">
          <WellcomeModalCard
            isOpen={modalData.isOpen}
            closeModal={closeModal}
            cardInfo={modalData.cardInfo}
          />
        </Route>
      </Switch>
    </>
  );
};

export default CardGroup;
