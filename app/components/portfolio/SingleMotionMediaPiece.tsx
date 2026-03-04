'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import ImageOverlay from './ImageOverlay';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface SingleMotionMediaPieceProps {
    content: SingleMotionMediaPiece;
    visualDevelopmentReferences: VisualDevelopmentReference[];
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
}

interface VisualDevelopmentReference {
    sys: {
        id: string;
    };
    url: string;
    width: number;
    height: number;
}

const SingleMotionMediaPiece = ( props: SingleMotionMediaPieceProps) => {
    const motionMediaPiece = props.content;
    const motionMediaDescription = "description" in motionMediaPiece ? motionMediaPiece.description : null;
    const motionMediaDescriptionJson = motionMediaDescription !== null && typeof motionMediaDescription === "object" && "json" in motionMediaDescription ? (motionMediaDescription.json as any) : {};
    const visualDevelopmentDescription = "visualDevelopmentDescription" in motionMediaPiece ? motionMediaPiece.visualDevelopmentDescription : null;
    const visualDevelopmentDescriptionJson = visualDevelopmentDescription !== null && typeof visualDevelopmentDescription === "object" && "json" in visualDevelopmentDescription ? (visualDevelopmentDescription.json as any) : {};
    const visualDevelopmentReferences = props.visualDevelopmentReferences;
    
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
                <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                    <source src={motionMediaPiece?.motionMedia?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <h2 className="text-xl text-center font-extralight text-gray-500 mt-12 mb-2">Visual Development</h2>
            {Object.keys(visualDevelopmentDescriptionJson).length > 0 && (
                <div className="description text-lg font-extralight text-gray-500 leading-relaxed mb-6">
                    {documentToReactComponents(visualDevelopmentDescriptionJson)}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visualDevelopmentReferences.map((referenceItem: { url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; }, index: number) => {
                    if (!referenceItem || typeof referenceItem !== "object" || !("imageCollection" in referenceItem) || !referenceItem.imageCollection || typeof referenceItem.imageCollection !== "object" || !("items" in referenceItem.imageCollection) || !Array.isArray(referenceItem.imageCollection.items) || referenceItem.imageCollection.items.length === 0) {
                        return <></>
                    }
                    return referenceItem.imageCollection.items.map((item: { url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; }, itemIndex: number) => {
                        const vdUrl = typeof item.url === "string" ? item.url : "";
                        const vdHeight = typeof item.height === "number" ? item.height : 0;
                        const vdWidth = typeof item.width === "number" ? item.width : 0;   

                        return (
                            <div className="relative" key={itemIndex}>
                                <div className="aspect-square">
                                    {typeof vdUrl === "string" && (
                                        <Link href={`?showModal=${showModalVal}`} className='artwork-link' onClick={(e) => handleOverlayImage(e, item)}>
                                            <Image
                                                alt={vdUrl !== "" ? vdUrl : "image"}
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
                    })
                })}
            </div>
            <ImageOverlay 
                post={overlayImage} 
                show={showOverlay} 
                overlayControl={handleOverlayControl} 
                windowWidth={innerWidth}
            />
        </div>
      )
}

export default SingleMotionMediaPiece