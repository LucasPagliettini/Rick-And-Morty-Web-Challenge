import React, {useState} from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./Apollo/client";
import "./App.css";
import HeadImage from "./Components/HeadImage";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import CardGroup from "./Components/CardGoupComponents/CardGroup";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  const initSearchBarState = {criterea: null, keyWord:""}
  const [searchBarState, setSearchBarState] = useState(initSearchBarState)


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="mx-5" >
          <HeadImage />
          <SearchBar searchBarState={searchBarState} setSearchBarState={setSearchBarState}/>
          <CardGroup searchBarState={searchBarState}/>
          <Footer/>      
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
