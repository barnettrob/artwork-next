'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import BackToTop from '../icons/BackToTop';
import ImageOverlay from './ImageOverlay';
import ShortDescriptionOverlay from './ShortDescriptionOverlay';
import InfoIcon from '../icons/InfoIcon';

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
    const [showModalVal, setShowModalVal] = useState("true");
    const [showShortDescriptionOverlay, setShowShortDescriptionOverlay] = useState(false);
    const images = props.images;
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const imagesLength = Array.isArray(images) ? images.length : 0;
    const infoIconsRef = useRef(new Array(imagesLength));

    useEffect(() => {
        if (innerWidth <= 768) {
            setShowModalVal("false");
        }
    }, []);


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

    const handleShortDescriptionOverlayControl = (data: boolean) => {
        setShowShortDescriptionOverlay(data);
    }

    const handleImageHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, hover: boolean) => {
        const target = e.currentTarget;
        const ix: string | null = target.getAttribute("data-ix");
        if (typeof ix === "string" && ix !== "") { 
            const ixNum = Number(ix);
            if (!isNaN(ixNum) && infoIconsRef.current[ixNum]) {
                if (hover) {
                    infoIconsRef.current[ixNum]!.className = infoIconsRef.current[ixNum]!.className.replace("hidden", "block");
                }
                else {
                    infoIconsRef.current[ixNum]!.className = infoIconsRef.current[ixNum]!.className.replace("block", "hidden");
                }
            }
        }
    }

    const handleInfoIconClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, post: any) => {
        e.preventDefault();

        if (typeof post === "object") {
            if (post.artworkImage.height === null && post.artworkImage.width === null) {
                post.artworkImage.height = 0;
                post.artworkImage.width = 0;
            }
            setOverlayImage(post);
            setShowShortDescriptionOverlay(true);
        }
    }
    
    return (
        <div className='masonry'>
            {images.map((post: any, ix: number) => {
                let url = post.artworkImage.url;
                url = url.replace(/^https?:\/\//, '');
                const urlArray = url.split("/");
                const isVideo = urlArray[0] === "videos.ctfassets.net" ? true : false;

                const shortDescription = "shortDescription" in post ? post.shortDescription : "";
                const hasShortDescription = shortDescription !== "" ? true : false;

                let artwork = <></>
                if (isVideo) {
                    const posterAttr = "videoImage" in post && post.videoImage !== null ? post.videoImage.url : "/video_poster_default.png";
                    artwork = <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                                <source src={post.artworkImage.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                }
                else {
                    artwork = <Link href={`?showModal=${showModalVal}`} className='artwork-link' onClick={(e) => handleOverlayImage(e, post)}>
                    <Image
                        alt={post.artworkImage.title}
                        src={post.artworkImage.url}
                        quality={80}
                        layout="responsive"
                        width={post.artworkImage.width}
                        height={post.artworkImage.height}
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                    /></Link>
                }
                return (
                    <div 
                        key={post.artworkImage.url} 
                        className="artwork-card relative" 
                        data-ix={ix}
                        onMouseEnter={(e) => handleImageHover(e, true)}
                        onMouseLeave={(e) => handleImageHover(e, false)}
                    >
                        {artwork}
                        {hasShortDescription && (
                            <span 
                                className='absolute top-2 right-2 hidden' 
                                ref={(element) => {
                                    if (typeof url === "string" && url !== "") {
                                        infoIconsRef.current[ix] = element;
                                    }
                                    else {
                                        infoIconsRef.current[ix] = ""
                                    }
                                }}
                            >
                                <InfoIcon parentIconClick={(e) =>handleInfoIconClick(e, post)} />
                            </span>
                        )}    
                    </div>
                )
            })}
            <ImageOverlay 
                post={overlayImage} 
                show={showOverlay} 
                overlayControl={handleOverlayControl} 
                windowWidth={innerWidth}
            />
            <ShortDescriptionOverlay 
                post={overlayImage}
                show={showShortDescriptionOverlay}
                overlayDescriptionControl={handleShortDescriptionOverlayControl}
                windowWidth={innerWidth}
            />
            {!showOverlay && (
                <BackToTop />
            )}   
        </div>
    )
}

export default AllWork