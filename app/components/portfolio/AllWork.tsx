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
        <div className='masonry'>
            {images.map((post: any) => {
                let url = post.artworkImage.url;
                url = url.replace(/^https?:\/\//, '');
                const urlArray = url.split("/");
                const isVideo = urlArray[0] === "videos.ctfassets.net" ? true : false;
                let artwork = <></>
                if (isVideo) {
                    artwork = <video width={"100%"} height={"100%"} controls>
                                <source src={post.artworkImage.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                }
                else {
                    artwork = <Image
                        alt={post.artworkImage.title}
                        src={post.artworkImage.url}
                        quality={80}
                        layout="responsive"
                        width={post.artworkImage.width}
                        height={post.artworkImage.height}
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                        priority
                    />
                }
                return (
                <div key={post.artworkImage.url} className="artwork-card">
                    {artwork}
                </div>
                // <div key={post.artworkImage.url} className='artwork-card' 
                // style={{ height: '300px', position: 'relative' }}>
                //     <Image
                //         alt={post.artworkImage.title}
                //         src={post.artworkImage.url}
                //         quality={80}
                //         layout="fill"
                //         objectFit="cover"
                //         // width={post.artworkImage.width}
                //         // height={post.artworkImage.height}
                //         // style={{ maxWidth: '500px', height: 'auto' }}
                //         placeholder='blur'
                //         blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                //         priority
                //     />
                // </div>
                    )
})}
        </div>
    )
}

export default AllWork