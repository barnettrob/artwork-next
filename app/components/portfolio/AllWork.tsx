'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
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

const AllWork = (props: PortfolioImagesProps) => {
    const postImageDefault = {
        height: 0,
        url: "",
        width: 0
    }
    const [overlayImage, setOverlayImage] = useState(postImageDefault);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModalVal, setShowModalVal] = useState("true");
    const images = props.images;
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    useEffect(() => {
        if (innerWidth <= 768) {
            setShowModalVal("false");
        }
    }, []);


    const handleOverlayImage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, post: any) => {
        e.preventDefault();

        if (typeof post === "object") {
            const overlayImageAttributes = {
                url: post.artworkImage.url,
                width: post.artworkImage.width,
                height: post.artworkImage.height
            }
            setOverlayImage(overlayImageAttributes);
            setShowOverlay(true);
        }
    }

    const handleOverlayControl = (data: boolean) => {
        setShowOverlay(data);
    }
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {images.map((post: any) => {
                let embeddedVideoCode = "";
                if (post.artworkImage === null) {
                    let embeddedVideo = post.embeddedVideo;

                    if (embeddedVideo !== null && "json" in embeddedVideo && "content" in embeddedVideo.json && Array.isArray(embeddedVideo.json.content) && embeddedVideo.json.content.length > 0) {
                        const firstContent = embeddedVideo.json.content[0];
                        if ("content" in firstContent && Array.isArray(firstContent.content) && firstContent.content.length > 0) { 
                             if ("value" in firstContent.content[0]) {
                                embeddedVideoCode = firstContent.content[0].value;
                             }
                        }
                    }
                }
                let url = post.artworkImage !== null ? post.artworkImage.url : "";
                url = url.replace(/^https?:\/\//, '');
                let title = post.title !== null ? post.title : "";

                const urlArray = url.split("/");
                const isVideo = urlArray[0] === "videos.ctfassets.net" ? true : false;
                let artwork = <></>
                if (isVideo) {
                    const posterAttr = "videoImage" in post && post.videoImage !== null ? post.videoImage.url : "/video_poster_default.png";
                    artwork = <div className='video-container'><video width={"100%"} height={"100%"} poster={posterAttr} controls>
                                <source src={post.artworkImage.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video></div>
                }
                else if(embeddedVideoCode !== "") {
                    artwork = <div className='video-container'><div 
                        className="embedded"
                        dangerouslySetInnerHTML={{__html: embeddedVideoCode}}
                        suppressHydrationWarning={true}
                        ></div></div>
                }
                else {
                    artwork = post.artworkImage !== null ? <Link href={`?showModal=${showModalVal}`} className='artwork-link' onClick={(e) => handleOverlayImage(e, post)}>
                    <Image
                        alt={title !== "" ? title : "image"}
                        src={post.artworkImage !== null ? post.artworkImage.url : ""}
                        quality={80}
                        width={post.artworkImage !== null ? post.artworkImage.width : 0}
                        height={post.artworkImage !== null ? post.artworkImage.height : 0}
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                        sizes="100vw"
                        className='h-full w-full object-cover'
                         /></Link> : <></>
                }
                return (
                    <div key={url+title} className="aspect-square">
                        <div className='h-full w-full object-cover'>
                        {artwork}
                        {post.shortDescription && (
                            <div className="artwork-description mt-1 text-center font-extralight text-sm">
                                {post.shortDescription}
                            </div>
                        )}
                        </div>
                    </div>
                )
            })}
            <ImageOverlay 
                post={overlayImage} 
                show={showOverlay} 
                overlayControl={handleOverlayControl} 
                windowWidth={innerWidth}
            />
            {!showOverlay && (
                <BackToTop />
            )}
        </div>
    );
}

export default AllWork