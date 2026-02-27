import Image from "next/image";
import { getMotionMediaPiece } from "../lib/api";
import PageNotFound from "../components/PageNotFound";

interface MotionMediaPageProps {
  params: Promise<{ slug: string }>;
}

const MotionMediaPiece = async ({ params }: MotionMediaPageProps) => {
    const { slug } = await params;

    const motionMediaPiece = await getMotionMediaPiece(slug);

    if (!motionMediaPiece) {
        return <PageNotFound />;
    }

    const posterAttr = "motionMediaVideoImage" in motionMediaPiece && motionMediaPiece.motionMediaVideoImage !== null ? motionMediaPiece.motionMediaVideoImage.url : "/video_poster_default.png";

  return (
    <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-extralight text-center text-gray-500 mb-4">{motionMediaPiece?.title}</h1>
        <p className="text-lg font-extralight text-gray-500 leading-relaxed max-w-3xl">{motionMediaPiece?.shortDescription}</p>
        <div className="w-full mb-6">
            <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                <source src={motionMediaPiece?.motionMedia?.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <h2 className="text-xl text-center font-extralight text-gray-500 mt-12 mb-2">Visual Development</h2>
        <div className="masonry">
            {motionMediaPiece?.visualDevelopmentCollection?.items.map((item: { url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; }, index: number) => (
                <div className="artwork-card" key={index}>
                    {typeof item.url === "string" && (
                        <Image
                            alt={item.url !== "" ? item.url : "image"}
                            src={item.url}
                            quality={80}
                            width={item !== null && "width" in item ? Number(item.width) : 0}
                            height={item !== null && "height" in item ? Number(item.height) : 0}
                            placeholder='blur'
                            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                            sizes="100vw"
                            style={{
                                width: "100%",
                                height: "auto"
                            }} 
                        />
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default MotionMediaPiece;