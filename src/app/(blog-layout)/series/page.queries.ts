import { graphql } from '@/generated/gql';

export const GET_SERIES_LIST = graphql(`
  query GetSeriesList {
    allSeries {
      id
      title
      thumbnail
      createdAt
      posts {
        id
      }
    }
  }
`);
