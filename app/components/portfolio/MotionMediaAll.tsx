'use client'
import Link from 'next/link';
import Image from "next/image";
import BackToTop from '../icons/BackToTop';
import { MotionMediaContentShort } from '@/interfaces/Content';

interface MotionMediaImageProps {
    content: MotionMediaContentShort[],
    showBackToTop?: boolean
}

const MotionMediaAll = ( props: MotionMediaImageProps ) => {
    const content = props.content;

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
            content.length >= 3 
            ? 'w-full md:grid-cols-3' 
            : 'w-full md:w-3/4 mx-auto'
        }`}>
            {content.map((image: MotionMediaContentShort) => {
                const videoImage = image.motionMediaVideoImage;
                const imageUrl = videoImage?.url || "/video_poster_default.png";
                const imageWidth = videoImage?.width || 640;
                const imageHeight = videoImage?.height || 360;

                return (
                    <div
                        className="motion-media-card relative"
                        key={image.slug}
                    >
                        <div className="aspect-square">
                            <Link
                                href={`/${image.slug}`}
                                className='artwork-link'
                            >
                                <Image
                                    alt={image.title || "Motion media preview"}
                                    src={imageUrl}
                                    quality={80}
                                    width={imageWidth}
                                    height={imageHeight}
                                    placeholder='blur'
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                                    sizes="100vw"
                                    className='h-full w-full object-cover'
                                />
                                <div
                                    className="motion-media-title-overlay"
                                >
                                    <div className="media-title">
                                        {image.title}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
             {props.showBackToTop && <BackToTop />}
        </div>
    )
}

export default MotionMediaAll