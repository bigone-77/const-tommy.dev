import { graphql } from '@/generated/gql';

export const GET_POSTS = graphql(`
  query GetPosts {
    allPosts {
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
`);

export const GET_ONLY_TAGS = graphql(`
  query GetOnlyTags {
    allPosts {
      tags
    }
  }
`);
