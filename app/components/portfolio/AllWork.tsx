import React from 'react';
import Image from "next/legacy/image"

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
                <div key={post.artworkImage.url} className='image-card' 
                style={{ maxWidth: '380px', height: '300px', position: 'relative', overflow: 'hidden' }}>
                    <Image
                        alt={post.artworkImage.title}
                        src={post.artworkImage.url}
                        layout="fill"
                        objectFit="cover"
                        // width={post.artworkImage.width}
                        // height={post.artworkImage.height}
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