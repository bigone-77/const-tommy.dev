import { graphql } from '@/generated/gql';

export const GET_SERIES_NAV = graphql(`
  # 🟢 String! 대신 ID!를 사용해야 합니다.
  query GetSeriesNav($id: ID!) {
    series(id: $id) {
      id
      title
      posts {
        id
        title
      }
    }
  }
`);
