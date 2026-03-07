'use client'
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import BackToTop from '../icons/BackToTop';
import { MotionMediaContentShort } from '@/interfaces/Content';

interface MotionMediaImageProps {
    content: MotionMediaContentShort[]
}

const MotionMediaAll = ( props: MotionMediaImageProps ) => {
    const content = props.content;
    const contentArrayLength = content.length;
    const motionMediaImageRef = useRef(new Array(contentArrayLength));
    const motionMediaImageOverlayRef = useRef(new Array(contentArrayLength));

    const onImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const height = (e.target as HTMLElement).clientHeight;
        const width = (e.target as HTMLElement).clientWidth;
        const index = target.dataset.index;
        if (typeof index !== "undefined" && typeof index === "string") {
            const idx = parseInt(index, 10);
            motionMediaImageRef.current[idx].className = motionMediaImageRef.current[idx].className + " overlay";
            motionMediaImageOverlayRef.current[idx].className = motionMediaImageOverlayRef.current[idx].className + " show";
            motionMediaImageOverlayRef.current[idx].style.width = width + "px";
            motionMediaImageOverlayRef.current[idx].style.height = height + "px";
        }
    }

    const onImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const index = target.dataset.index;
        if (typeof index !== "undefined" && typeof index === "string") {
            const idx = parseInt(index, 10);
            motionMediaImageRef.current[idx].className = motionMediaImageRef.current[idx].className.replace("overlay", "");
            motionMediaImageOverlayRef.current[idx].className = motionMediaImageOverlayRef.current[idx].className.replace("show", "");
        }
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {content.map((image: MotionMediaContentShort, index: number) => (
                <div 
                    className="relative"
                    data-index={index}
                    key={image.slug}
                    onMouseEnter={onImageHover}
                    onMouseLeave={onImageLeave}
                >
                    <div key={image.slug} className="aspect-square">
                        <Link 
                            href={`/${image.slug}`} 
                            className='artwork-link'
                            data-index={index}
                            ref={(element) => {
                                if (typeof image.slug === "string" && element) {
                                    motionMediaImageRef.current[index] = element;
                                }
                            }}
                        >
                            <Image
                                alt={image.motionMediaVideoImage.url !== "" ? image.motionMediaVideoImage.url : "image"}
                                src={image.motionMediaVideoImage.url}
                                quality={80}
                                width={image !== null && "width" in image.motionMediaVideoImage ? Number(image.motionMediaVideoImage.width) : 0}
                                height={image !== null && "height" in image.motionMediaVideoImage ? Number(image.motionMediaVideoImage.height) : 0}
                                placeholder='blur'
                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                                sizes="100vw"
                                className='h-full w-full object-cover'
                                data-index={index}
                            />
                            <div 
                                className="motion-media-title-overlay"
                                data-index={index}
                                ref={(element) => {
                                    if (typeof image.slug === "string" && element) {
                                        motionMediaImageOverlayRef.current[index] = element;
                                    }
                                }}
                            >
                                <div className="media-title">
                                    {image.title}
                                </div>
                            </div>
                        </Link>
                        
                    </div>
                </div>
             ))}
             <BackToTop />
        </div>
    )
}

export default MotionMediaAll