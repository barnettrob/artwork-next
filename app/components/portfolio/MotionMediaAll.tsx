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
    images: MotionMediaContent[],
    order: string[]
}

const MotionMediaAll = ( props: MotionMediaImageProps ) => {
    const images = props.images;
    const order = props.order;
    // Order content based on order array
    const filteredImages = images.filter(item => order.includes(item.slug));
    filteredImages.sort((a, b) => {
        return order.indexOf(a.slug) - order.indexOf(b.slug);
    });

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {filteredImages.filter(item => order.includes(item.slug)).map((image: any) => (
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
        </div>
    )
}

export default MotionMediaAll