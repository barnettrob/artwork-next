'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import ImageOverlay from './ImageOverlay';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BackToTop from '../icons/BackToTop';

interface SingleMotionMediaPieceProps {
    content: SingleMotionMediaPiece;
}

interface SingleMotionMediaPiece { 
    title: string;
    shortDescription: string;
    slug: string;
    motionMedia: {
        url: string;
    };
    motionMediaVideoImage: {
        url: string;
        width: number;
        height: number;
    } | null;
    visualDevelopmentCollection: {
        items: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    description?: any;
    visualDevelopmentDescription?: any;
    visualDevelopmentImagesCollection?: any;
    embeddedMotionMediaVideo?: any;
}

const SingleMotionMediaPiece = ( props: SingleMotionMediaPieceProps) => {
    const motionMediaPiece = props.content;
    const motionMediaDescription = "description" in motionMediaPiece ? motionMediaPiece.description : null;
    const motionMediaDescriptionJson = motionMediaDescription !== null && typeof motionMediaDescription === "object" && "json" in motionMediaDescription ? (motionMediaDescription.json as any) : {};
    const visualDevelopmentDescription = "visualDevelopmentDescription" in motionMediaPiece ? motionMediaPiece.visualDevelopmentDescription : null;
    const visualDevelopmentDescriptionJson = visualDevelopmentDescription !== null && typeof visualDevelopmentDescription === "object" && "json" in visualDevelopmentDescription ? (visualDevelopmentDescription.json as any) : {};
    const visualDevelopmentImages = "visualDevelopmentImagesCollection" in motionMediaPiece && 
    motionMediaPiece.visualDevelopmentImagesCollection && typeof motionMediaPiece.visualDevelopmentImagesCollection === "object" && 
    "items" in motionMediaPiece.visualDevelopmentImagesCollection && Array.isArray(motionMediaPiece.visualDevelopmentImagesCollection.items) ? motionMediaPiece.visualDevelopmentImagesCollection.items : [];
    let embeddedVideoCode = "";
    if ("embeddedMotionMediaVideo" in motionMediaPiece && motionMediaPiece.embeddedMotionMediaVideo && "json" in motionMediaPiece.embeddedMotionMediaVideo && "content" in motionMediaPiece.embeddedMotionMediaVideo.json && Array.isArray(motionMediaPiece.embeddedMotionMediaVideo.json.content) && motionMediaPiece.embeddedMotionMediaVideo.json.content.length > 0) {
        const firstContent = motionMediaPiece.embeddedMotionMediaVideo.json.content[0];
        if ("content" in firstContent && Array.isArray(firstContent.content) && firstContent.content.length > 0) { 
            if ("value" in firstContent.content[0]) {
            embeddedVideoCode = firstContent.content[0].value;
            }
        }
    }

    const postImageDefault = {
        height: 0,
        url: "",
        width: 0
    }
    const [overlayImage, setOverlayImage] = useState(postImageDefault);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModalVal, setShowModalVal] = useState("true");
    const posterAttr = "motionMediaVideoImage" in motionMediaPiece && motionMediaPiece.motionMediaVideoImage !== null ? motionMediaPiece.motionMediaVideoImage.url : "/video_poster_default.png";
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    
    useEffect(() => {
        setShowModalVal("true");
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

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-extralight text-center text-gray-500 mb-4">
                {motionMediaPiece?.title}
            </h1>
            {Object.keys(motionMediaDescriptionJson).length > 0 && (
                <div className="text-lg font-extralight text-gray-500 leading-relaxed">
                    {documentToReactComponents(motionMediaDescriptionJson)}
                </div>
            )}
            <div className="w-full mb-6">
                {embeddedVideoCode === "" ? (
                    <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                        <source src={motionMediaPiece?.motionMedia?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div 
                        className="video-container" 
                        dangerouslySetInnerHTML={{__html: embeddedVideoCode}}
                        suppressHydrationWarning={true}
                    ></div>
                )}
            </div>
            <h2 className="text-xl text-center font-extralight text-gray-500 mt-12 mb-2">Visual Development</h2>
            {Object.keys(visualDevelopmentDescriptionJson).length > 0 && (
                <div className="description text-lg font-extralight text-gray-500 leading-relaxed mb-6">
                    {documentToReactComponents(visualDevelopmentDescriptionJson)}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visualDevelopmentImages.map((image: {
                    title: string; url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; 
}, index: number) => {
                    const vdUrl = typeof image.url === "string" ? image.url : "";
                    const vdHeight = typeof image.height === "number" ? image.height : 0;
                    const vdWidth = typeof image.width === "number" ? image.width : 0;
                    const vdTitle = typeof image.title === "string" ? image.title : "";

                    return (
                        <div className="relative" key={index}>
                            <div className="aspect-square">
                                {typeof vdUrl === "string" && (
                                    <Link href={`?showModal=${showModalVal}`} className='artwork-link' onClick={(e) => handleOverlayImage(e, image)}>
                                        <Image
                                            alt={vdTitle}
                                            src={vdUrl}
                                            quality={80}
                                            width={vdWidth}
                                            height={vdHeight}
                                            placeholder='blur'
                                            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                                            sizes="100vw"
                                            className='h-full w-full object-cover rounded-lg'
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
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
      )
}

export default SingleMotionMediaPiece