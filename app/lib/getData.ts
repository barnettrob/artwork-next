import { getLogo, getWebsiteMetaData } from "@/app/lib/api";

interface logoData {
    url: string;
    title: string;
}

export async function logoData() {
    let picture = null;
    let title = "";
    let logoPageItems = [];
    const logoPage = await getLogo()

    if (logoPage !== false) {
        logoPageItems = typeof logoPage !== "undefined" && "data" in logoPage && 
        "pageCollection" in logoPage.data && 
        "items" in logoPage.data.pageCollection ? logoPage.data.pageCollection.items : [];

        picture = typeof logoPageItems[0] !== "undefined" && "picture" in logoPageItems[0] ? logoPageItems[0].picture : null;

        if (Array.isArray(logoPageItems) && logoPageItems.length > 0) {
        title = "title" in logoPageItems[0] ? logoPageItems[0].title : title;
        }
    }

    let data: logoData = {
        url: "",
        title: ""
    };

    if (picture !== null) { 
        data["url"] = logoPageItems[0].picture.url;
        data["title"] = title;
    }

    return data;
}

export async function authorName() {
    let authorName = "";
    const webMetaData = await getWebsiteMetaData();
    if (webMetaData !== false) {
        if ("data" in webMetaData && 
            "websiteMetaDataCollection" in webMetaData.data && 
            "items" in webMetaData.data.websiteMetaDataCollection) {
                const firstItem = webMetaData.data.websiteMetaDataCollection.items[0];
                if ("authorName" in firstItem) {
                  authorName = firstItem.authorName;
                }
        }
      }
    
      return authorName;
}