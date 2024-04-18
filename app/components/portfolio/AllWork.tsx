import React from 'react'
import { getLoremPicsumImages } from '@/app/lib/api'
import Image from 'next/image'

const AllWork = async () => {
    //const blogPosts = await getAllBlogPosts();
    const ipsumImages = await getLoremPicsumImages();
    
    return (
        <div className='images-wrapper'>
            {ipsumImages.map((post: any) => (
                <div key={post.url} className='image-card'>
                    <Image
                      alt="placeholder"
                      height={post.height}
                      src={post.url}
                      width={post.width}
                    />
                </div>
            ))}
        </div>
    )
}

export default AllWork