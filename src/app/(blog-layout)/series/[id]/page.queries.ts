import { graphql } from '@/generated/gql';

export const GET_SERIES_DETAIL = graphql(`
  query GetSeriesDetail($id: ID!) {
    series(id: $id) {
      id
      title
      thumbnail
      posts {
        id
        title
        content
        thumbnail
        tags
        createdAt
        viewCount
        readingTime
        author {
          username
        }
      }
    }
  }
`);
