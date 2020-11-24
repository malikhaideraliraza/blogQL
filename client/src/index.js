import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";

// component
import App from './App';

// worker
import * as serviceWorker from './serviceWorker';

// styles
import 'antd/dist/antd.css';
import './index.css';

const authLink = setContext((req, context) => {
  return {
    headers: {
      ...context.headers,
      // NOTE: Server side user authorization
      authorization: localStorage.getItem('userId')
    }
  };
});

const httpLink = ApolloLink.from([
  createHttpLink({ uri: `${ process.env.REACT_APP_PUBLIC_URL }/graphql` })
]);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
