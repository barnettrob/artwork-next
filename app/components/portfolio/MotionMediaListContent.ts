import { getAllMotionMediaPieces } from '@/app/lib/api';

const MotionMediaListContent = async () => {
    const motionMediaPieces = await getAllMotionMediaPieces();

    return motionMediaPieces;
}

export default MotionMediaListContent;