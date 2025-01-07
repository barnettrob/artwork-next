import React from 'react';
import Image from 'next/image'

interface PortfolioImages {
    url: string;
    width: number;
    height: number;
}

interface PortfolioImagesProps {
    images: PortfolioImages[]
}

const AllWork = (props: PortfolioImagesProps) => {
    //const blogPosts = await getAllBlogPosts();
    const images = props.images;
    
    return (
        <div className='images-wrapper'>
            {images.map((post: any) => (
                <div key={post.url} className='image-card'>
                    <Image
                      alt="placeholder"
                      height={post.height}
                      src={post.url}
                      width={post.width}
                      placeholder='blur'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                      priority
                    />
                </div>
            ))}
        </div>
    )
}

export default AllWork