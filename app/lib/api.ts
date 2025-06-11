import { Config } from "../../config"
// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTWORK_GRAPHQL_FIELDS = `
  title
  artworkImage {
    url
    width
    height
  }
  shortDescription
`;

const PAGE_GRAPHQL_FIELDS = `
  title
  picture {
    url
    width
    height
  }
  body {
    json
  }
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
      // Associate all fetches for articles with an "artwork" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["artwork"] },
    }
  ).then((response) => response.json());
}

function extractArtworkEntries(fetchResponse: any) {
  return fetchResponse?.data?.artworkCollection?.items;
}

export async function getAllArtwork(
  // For this demo set the default limit to always return 3 articles.
  limit = 3,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const artwork = await fetchGraphQL(
    `query {
        artworkCollection(limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTWORK_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );

  return extractArtworkEntries(artwork);
}

export async function getArtwork(
  slug: string,
  isDraftMode = false
) {
  const extractArtworkEntries = await fetchGraphQL(
    `query {
        artworkCollection(limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTWORK_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArtworkEntries(extractArtworkEntries)[0];
}

export async function getAbout(
  isDraftMode = false
) {
  const about = await fetchGraphQL(
    `query {
        pageCollection(where: {title: "About"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return about;
}