import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CHARACTER, EPISODE, LOCATION } from "../../Constants";
import { GetQueryInfo, Item } from "../../Apollo/Querys";

import ErrorMessage from "./ErrorMessage";
import Card from "./Card";
import ModalCard from "./ModalCard";
import { ISearchBarState } from "../../App";

interface IFetchData {
  arrayResults: Item[];
  nextPage: number | null;
}

interface IModalData {
  isOpen: boolean;
  cardInfo: null | Item;
}

const CardGroup = (props: { searchBarState: ISearchBarState }) => {
  //Initial value for fetch data
  const initialData: IFetchData = { arrayResults: [], nextPage: 1 };
  const [fetchData, setFetchData] = useState<IFetchData>(initialData);

  //Initial value for modal info
  const initModalData: IModalData = { isOpen: false, cardInfo: null };
  const [modalData, setModalData] = useState(initModalData);

  //Destructuring props
  const { searchBarState } = props;
  //Defining a state for an auxiliar variable used as search keyword in querys when
  //the keyword in "SearchBar" component fix minimum requirements
  const [searchingDataState, setSearchingDataState] = useState({ keyWord: "" });

  //Obtaining data from endpoint
  const { data, error } = GetQueryInfo(
    fetchData.nextPage,
    searchBarState.criterea,
    searchingDataState.keyWord
  );

  /*Checking changes in the keyWord of SearchBar component cleaning posible previous data (set fetchData 
  to inititialValues), if keyWord is at least 3 leters long, it will also refresh searchKeyWord to 
  search again and show updated results. Instead, it will set searchKeyWord to an empty string (only once)
  waiting for the user to reach at least a 3 leters keyWord.
  */
  if (
    searchBarState.keyWord !== searchingDataState.keyWord &&
    searchBarState.keyWord.length >= 3
  ) {
    setFetchData(initialData);
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
    setFetchData(initialData);
  }

  /*Fetchs data fron endpoint updating the results array and the fetchData "nextPage" propiety for
  the next fetch until there is no more pages (null page). The results array update method will
  depend on the searchCriterea selected wich defines the data structure obtained fron the query
  */
  const fetchMoreData = () => {
    if (data && fetchData.nextPage !== null) {
      let newArrayResults, newNextPage: number | null;
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

  /*When the user selected any SearchCriterea but no keyWord with at least 3 leters, 
  the app shows empty results area. Instead it will execute the first fetch to the 
  paginated endpoint to show the results of the first page. Afterwards while the
  user scrollDown, InfiniteScroll component will fetch data from posibles following pages
  */
  if (searchBarState.criterea !== null && searchingDataState.keyWord === "")
    return <div />;
  else if (fetchData.arrayResults.length < 1) {
    fetchMoreData();
  }
  /*Method that recive the info of the item to show in the modal and turn the 
   "isOpen" modalData propiety into true.
   */
  const openModalCard = (item: Item) => {
    setModalData({ ...modalData, isOpen: true, cardInfo: item });
  };

  /*Method that turn the "isOpen" modalData propiety into false and clean
  the value of the Item info to show, setting it into null
  */
  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false, cardInfo: null });
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1 className="text-center my-4">
        {searchBarState.criterea === null ? "Meet the Characters" : fetchData.arrayResults.length>0 ? 
        <h3>Click on them to see more details...</h3> : null}
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
          {fetchData.arrayResults.map((item: Item) => (
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
