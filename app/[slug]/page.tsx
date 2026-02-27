import Image from "next/image";
import { getMotionMediaPiece } from "../lib/api";
import PageNotFound from "../components/PageNotFound";
import SingleMotionMediaPiece from "../components/portfolio/SingleMotionMediaPiece";

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
    <SingleMotionMediaPiece content={motionMediaPiece} />
  )
}

export default MotionMediaPiece;