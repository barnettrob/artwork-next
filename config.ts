export const Config = {
    contentful: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACEID,
        previewAccessToken: process.env.CONTENTFUL_SPACEID
    },
    cache: {
        token: process.env.API_CACHE_TOKEN
    },
    logo: {
        path: process.env.NEXT_PUBLIC_LOGO_PATH
    },
    metadata: {
        title: process.env.NEXT_PUBLIC_META_TITLE,
        description: process.env.NEXT_PUBLIC_META_DESCRIPTION
    }
}