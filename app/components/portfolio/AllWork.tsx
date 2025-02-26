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
    const images = props.images;

    return (
        <div className='images-wrapper'>
            {images.map((post: any) => (
                <div key={post.blogImage.url} className='image-card'>
                    <Image
                      alt="placeholder"
                    //   height={post.height}
                      src={post.blogImage.url}
                    //   width={post.width}
                    width={500}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
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