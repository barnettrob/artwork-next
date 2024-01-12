import React from 'react'
import { getAllBlogPosts } from '@/app/lib/api'
import Image from 'next/image'

const AllWork = async () => {
    const blogPosts = await getAllBlogPosts();

    return (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {blogPosts.map((post: any) => (
                <div key={post.title}>
                    <Image
                      alt="placeholder"
                      className="aspect-[4/3] object-cover w-full"
                      height="263"
                      src={post.blogImage.url}
                      width="350"
                    />
                </div>
            ))}
        </div>
    )
}

export default AllWork