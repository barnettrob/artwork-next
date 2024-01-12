import { Config } from "../../config"
// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const BLOG_GRAPHQL_FIELDS = `
  title
  blogImage {
    url
  }
  shortDescription
`;

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/${Config.contentful.spaceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? Config.contentful.previewAccessToken
            : Config.contentful.accessToken
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "blogPosts" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["blogPosts"] },
    }
  ).then((response) => response.json());
}

function extractBlogEntries(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items;
}

export async function getAllBlogPosts(
  // For this demo set the default limit to always return 3 articles.
  limit = 3,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const blogPosts = await fetchGraphQL(
    `query {
        blogPostCollection(limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${BLOG_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );

  return extractBlogEntries(blogPosts);
}

export async function getBlog(
  slug: string,
  isDraftMode = false
) {
  const blogPost = await fetchGraphQL(
    `query {
        blogPostCollection(limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${BLOG_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractBlogEntries(blogPost)[0];
}