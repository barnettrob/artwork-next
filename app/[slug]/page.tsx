import { getMotionMediaPiece } from "../lib/api";
import PageNotFound from "../components/PageNotFound";
import SingleMotionMediaPiece from "../components/portfolio/SingleMotionMediaPiece";
import MotionMediaListContent from "../components/portfolio/MotionMediaListContent";

interface MotionMediaPageProps {
  params: Promise<{ slug: string }>;
}

const MotionMediaPiece = async ({ params }: MotionMediaPageProps) => {
    const { slug } = await params;

    const motionMediaPiece = await getMotionMediaPiece(slug);
    // Need all content data for single piece if we want 
    // a pagination to the next motion media piece.
    const motionMediaAllContent = await MotionMediaListContent();

    if (!motionMediaPiece) {
        return <PageNotFound />;
    }

  return (
    <SingleMotionMediaPiece 
      content={motionMediaPiece} 
      allContent={motionMediaAllContent} 
      slug={slug}
    />
  )
}

export default MotionMediaPiece;