import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from "@apollo/client";
import client from "./Apollo/client";



ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById('root')
);


