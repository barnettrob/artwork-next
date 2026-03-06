import Link from 'next/link';
import Image from "next/image";
import BackToTop from '../icons/BackToTop';
import { MotionMediaContentShort } from '@/interfaces/Content';

interface MotionMediaImageProps {
    content: MotionMediaContentShort[]
}

const MotionMediaAll = ( props: MotionMediaImageProps ) => {
    const content = props.content;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {content.map((image: MotionMediaContentShort) => (
                <div className="relative" key={image.slug}>
                    <div key={image.slug} className="aspect-square">
                        <Link href={`/${image.slug}`} className='artwork-link'>
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
                            />
                        </Link>
                    </div>
                </div>
             ))}
             <BackToTop />
        </div>
    )
}

export default MotionMediaAll