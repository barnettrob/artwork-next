import Link from 'next/link';
import Image from "next/image";

interface MotionMediaContent {
    slug: string;
    motionMediaVideoImage: {
        url: string;
        width: number;
        height: number;
    }
}

interface MotionMediaImageProps {
    images: MotionMediaContent[]
}

const MotionMediaAll = ( props: MotionMediaImageProps ) => {
    const images = props.images;

    return (
        <div className='masonry'>
            {images.map((image: any) => (
                <div key={image.slug} className="artwork-card">
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
                            style={{
                                width: "100%",
                                height: "auto"
                            }} 
                        />
                    </Link>
                </div>
             ))}
        </div>
    )
}

export default MotionMediaAll