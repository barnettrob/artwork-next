import { getMotionMediaPiece } from "../lib/api";

interface MotionMediaPageProps {
  params: Promise<{ slug: string }>;
}

const MotionMediaPiece = async ({ params }: MotionMediaPageProps) => {
  const { slug } = await params;
  const motionMediaPiece = await getMotionMediaPiece(slug);
  console.log("motionMediaPiece", motionMediaPiece);
  if (!motionMediaPiece) {
    return <div>Page Not Found</div>;
  }
  
  const posterAttr = "motionMediaVideoImage" in motionMediaPiece && motionMediaPiece.motionMediaVideoImage !== null ? motionMediaPiece.motionMediaVideoImage.url : "/video_poster_default.png";
  return (
    <div>
        <p>{motionMediaPiece?.title}</p>
        <div>{motionMediaPiece?.shortDescription}</div>
        <div className="video-container">
            <video width={"100%"} height={"100%"} poster={posterAttr} controls>
                <source src={motionMediaPiece?.motionMedia?.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div>
            {motionMediaPiece?.visualDevelopmentCollection?.items.map((item: { url: string | Blob | undefined; width: string | number | undefined; height: string | number | undefined; }, index: number) => (
                <img key={index} src={item.url} width={item.width} height={item.height} alt={`Visual Development ${index + 1}`} />
            ))}
        </div>
    </div>
  )
}

export default MotionMediaPiece;