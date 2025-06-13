import React from 'react'
import SocialMedia from '../socialMedia';
import { getWebsiteMetaData } from '@/app/lib/api';

const Footer = async () => {
    const webMetaData = await getWebsiteMetaData();
    let authorName = "";
    if ("data" in webMetaData && 
        "websiteMetaDataCollection" in webMetaData.data && 
        "items" in webMetaData.data.websiteMetaDataCollection) {
            const firstItem = webMetaData.data.websiteMetaDataCollection.items[0];
            if ("authorName" in firstItem) {
              authorName = firstItem.authorName;
            }
    }

    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="mt-auto font-light p-6">
          <main>
            <ul className='flex justify-center'>
              <SocialMedia />
              <li className="p-3">
                &#169; {year} {authorName}
              </li>
            </ul>
          </main>
        </div>
      );
}

export default Footer