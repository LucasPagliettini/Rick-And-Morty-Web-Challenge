import { useQuery, gql, ApolloError } from "@apollo/client";
import { CHARACTER, EPISODE, LOCATION } from "../Constants";

interface ILocation {
  dimension: string;
  name: string;
}

interface IEpisode {
  id: number;
  name: string;
  episode: string;
}

interface IRecident {
  id: number;
  name: string;
}

interface ICharacter {
  id: number;
  name: string;
}

/**
 * Structure of the objects needed for WelcomeInfo Cards
 */
export interface IWelcomeInfoItem {
  id: number;
  name: string;
  image: string;
  location: ILocation;
  episode: IEpisode[];
}

/**
 * Structure of the objects needed for Character Cards
 */
export interface ICharacterItem {
  id: number;
  name: string;
  image: string;
  type: string;
  gender: string;
  species: string;
}

/**
 * Structure of the objects needed for Location Cards
 */
export interface ILocationItem {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: IRecident[];
}

/**
 * Structure of the objects needed for Episode Cards
 */
export interface IEpisodeItem {
  id: number;
  name: string;
  created: string;
  episode: string;
  characters: ICharacter[];
}
/**
 * Combined type needed for card component
 */
export type Item =
  | IEpisodeItem
  | ILocationItem
  | ICharacterItem
  | IWelcomeInfoItem;

interface IQueryResults {
  error: ApolloError | undefined;
  data: any;
}

/**
 * Function that returns de data and posible error of the diferent Querys 
 * depending on the state of "Search Criterea" and "Search KeyWord"
 */
export const GetQueryInfo = (
  nextPage: number | null,
  searchCriterea: string | null,
  keyWord: string
): IQueryResults => {
  const WELCOMEINFO_QUERY = `
  query GetWelcomeInfo {
    characters (page:${nextPage}) {
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

  const CHARACTERS_QUERY = `
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

  const EPISODES_QUERY = `
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

  const LOCATIONS_QUERY = `
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

  /**
   * It defines a value for query depending on the value of searchCriterea
   */
  let currentQuery;
  switch (searchCriterea) {
    case CHARACTER:
      currentQuery = gql`
        ${CHARACTERS_QUERY}
      `;
      break;
    case LOCATION:
      currentQuery = gql`
        ${LOCATIONS_QUERY}
      `;
      break;
    case EPISODE:
      currentQuery = gql`
        ${EPISODES_QUERY}
      `;
      break;
    default:
      currentQuery = gql`
        ${WELCOMEINFO_QUERY}
      `;
      break;
  }

  const { error, data } = useQuery(currentQuery);

  return { error, data };
};
