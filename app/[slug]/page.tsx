import { getMotionMediaPiece, getVisualDevelopmentReferences } from "../lib/api";
import PageNotFound from "../components/PageNotFound";
import SingleMotionMediaPiece from "../components/portfolio/SingleMotionMediaPiece";

interface MotionMediaPageProps {
  params: Promise<{ slug: string }>;
}

const MotionMediaPiece = async ({ params }: MotionMediaPageProps) => {
    const { slug } = await params;

    const motionMediaPiece = await getMotionMediaPiece(slug);
    const visualDevelopmentArray = motionMediaPiece?.visualDevelopmentCollection?.items || [];
    let visualDevelopmentIds: string[] = [];
    visualDevelopmentArray.forEach((item: { sys: { id: string; }; }) => {
        if (item.sys && item.sys.id) {
            visualDevelopmentIds.push(item.sys.id);
        }
    });
    
    const visualDevelopmentReferences = await getVisualDevelopmentReferences(visualDevelopmentIds);

    if (!motionMediaPiece) {
        return <PageNotFound />;
    }

  return (
    <SingleMotionMediaPiece content={motionMediaPiece} visualDevelopmentReferences={visualDevelopmentReferences} />
  )
}

export default MotionMediaPiece;