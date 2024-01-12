import React from 'react'
import SocialMedia from '../socialMedia';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="mt-auto font-light p-6">
          <main>
            <ul className='flex justify-center'>
              <SocialMedia />
              <li className="p-3">
                &#169; {year} Artist Name
              </li>
            </ul>
          </main>
        </div>
      );
}

export default Footer