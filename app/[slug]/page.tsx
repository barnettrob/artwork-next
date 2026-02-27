import { getMotionMediaPiece } from "../lib/api";
import PageNotFound from "../components/PageNotFound";

interface MotionMediaPageProps {
  params: Promise<{ slug: string }>;
}

const MotionMediaPiece = async ({ params }: MotionMediaPageProps) => {
  const { slug } = await params;
  const motionMediaPiece = await getMotionMediaPiece(slug);
  console.log("motionMediaPiece", motionMediaPiece);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {motionMediaPiece?.visualDevelopmentCollection?.items.map((item: { url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; }, index: number) => (
                <div className="" key={index}>
                    <img key={index} src={item.url} width={item.width} height={item.height} alt={`Visual Development ${index + 1}`} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default MotionMediaPiece;