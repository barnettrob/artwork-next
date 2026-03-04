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

  return (
    <SingleMotionMediaPiece content={motionMediaPiece} />
  )
}

export default MotionMediaPiece;