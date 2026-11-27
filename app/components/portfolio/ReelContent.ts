import { getMotionReel } from '@/app/lib/api';

const ReelContent = async () => {
    const reelContent = await getMotionReel();
    return reelContent;
}

export default ReelContent;