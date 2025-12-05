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
  videoImage {
    url
    width
    height
  }
  embeddedVideo {
    json
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

async function fetchGraphQL(query: string, preview = false, cacheTags: string[]) {
  if (typeof Config.contentful.spaceId === "undefined") {
    return false;
  }

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
      cache: 'force-cache',
      next: { tags: cacheTags },
    }
  ).then((response) => response.json());
}

function extractArtworkEntries(fetchResponse: any) {
  return fetchResponse?.data?.artworkCollection?.items;
}

export async function getAllArtwork(
  // We don't need a limit but we had one so set it really high.
  limit = 300,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const artwork = await fetchGraphQL(
    `query {
        artworkCollection(limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }, order: [sys_publishedAt_DESC]) {
          items {
            ${ARTWORK_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    ["artwork"]
  );

  return extractArtworkEntries(artwork);
}

export async function getAllArtworkByCategory(
  category: string = "",
  // We don't need a limit but we had one so set it really high.
  limit = 300,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const artwork = await fetchGraphQL(
    `query {
        artworkCollection(where: { category: "${category}" }, 
        limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }, order: [sys_publishedAt_DESC]) {
          items {
            ${ARTWORK_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    ["artwork"]
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
    isDraftMode,
    ["artwork"]
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
    isDraftMode,
    ["page-about"]
  );
  return about;
}

export async function getLogo(
  isDraftMode = false
) {
  const logo = await fetchGraphQL(
    `query {
        pageCollection(where: {title: "Logo"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    ["page-logo"]
  );
  return logo;
}

export async function getAllSocialMedia(
  isDraftMode = false
) {
  const socialMedia = await fetchGraphQL(
    `query {
      socialMediaCollection {
        items {
          name
          url
        }
      }
    }`,
    isDraftMode,
    ["social-media"]
  );
  return socialMedia;
}

export async function getWebsiteMetaData(
  isDraftMode = false
) {
  const data = await fetchGraphQL(
    `query {
      websiteMetaDataCollection {
        items {
          authorName
        }
      }
    }`,
    isDraftMode,
    ["meta-data"]
  );
  return data;
}