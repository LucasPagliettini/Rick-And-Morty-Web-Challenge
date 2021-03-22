import { useQuery, gql } from "@apollo/client";
import { CHARACTER, EPISODE, LOCATION } from "../Constants";


export const GetQueryInfo = (nextPage, searchCriterea, keyWord) => {
  const WELLCOMEINFO_QUERY = gql`
  query GetWellcomeInfo {
    characters (page:${nextPage}) {
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
      characters (page: ${nextPage}, filter: {name: "${keyWord}", type: ""}) {
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
      episodes(page: ${nextPage}, filter: { name: "${keyWord}" }) {
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
      locations(page: ${nextPage}, filter: { name: "${keyWord}", type: "" }) {
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
  switch (searchCriterea) {
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

  return { error, data };
};


