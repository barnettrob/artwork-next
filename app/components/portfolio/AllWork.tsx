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
    console.log("images", images)
    return (
        <div className='images-wrapper'>
            {images.map((post: any) => (
                <div key={post.artworkImage.url} className='image-card'>
                    <Image
                        alt={post.artworkImage.title}
                        src={post.artworkImage.url}
                        width={post.artworkImage.width}
                        height={post.artworkImage.height}
                        // style={{ maxWidth: '500px', height: 'auto' }}
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