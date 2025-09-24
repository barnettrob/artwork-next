'use client'
import React, { useState } from 'react';
import Image from "next/legacy/image";
import BackToTop from '../icons/BackToTop';
import ImageOverlay from './ImageOverlay';

interface PortfolioImages {
    url: string;
    width: number;
    height: number;
}

interface PortfolioImagesProps {
    images: PortfolioImages[]
}

interface OverlayData {
    artworkImage?: {
        height: number;
        url: string;
        width: number;
    }
    shortDescription?: string;
    title?: string;
    videoImage?: null;
}

const AllWork = (props: PortfolioImagesProps) => {
    const postImageDefault = {
        artworkImage: {
            height: 0,
            url: "",
            width: 0
        },
        shortDescription: "",
        title: "",
        videoImage: null
    }
    const [overlayImage, setOverlayImage] = useState(postImageDefault);
    const [showOverlay, setShowOverlay] = useState(false);
    const images = props.images;

    const handleOverlayImage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, post: any) => {
        e.preventDefault();

        if (typeof post === "object") {
            setOverlayImage(post);
            setShowOverlay(true);
        }
    }

    const handleOverlayControl = (data: boolean) => {
        setShowOverlay(data);
    }
    
    return (
        <div className='masonry'>
            {images.map((post: any) => {
                let url = post.artworkImage.url;
                url = url.replace(/^https?:\/\//, '');
                const urlArray = url.split("/");
                const isVideo = urlArray[0] === "videos.ctfassets.net" ? true : false;
                let artwork = <></>
                if (isVideo) {
                    const posterAttr = "videoImage" in post && post.videoImage !== null ? post.videoImage.url : "/video_poster_default.png";
                    artwork = <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                                <source src={post.artworkImage.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                }
                else {
                    artwork = <a href="#" onClick={(e) => handleOverlayImage(e, post)}>
                    <Image
                        alt={post.artworkImage.title}
                        src={post.artworkImage.url}
                        quality={80}
                        layout="responsive"
                        width={post.artworkImage.width}
                        height={post.artworkImage.height}
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                        priority
                    /></a>
                }
                return (
                    <div key={post.artworkImage.url} className="artwork-card">
                        {artwork}
                    </div>
                )
            })}
            <ImageOverlay 
                post={overlayImage} 
                show={showOverlay} 
                overlayControl={handleOverlayControl} 
            />
            <BackToTop />
        </div>
    )
}

export default AllWork