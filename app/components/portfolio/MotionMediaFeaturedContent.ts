import { getFeaturedMotionMediaPieces, getMotionMediaOrder } from '@/app/lib/api';
import { orderMotionMediaContent } from '@/app/lib/orderMotionMediaContent';

const MotionMediaFeaturedContent = async () => {
    const motionMediaPieces = await getFeaturedMotionMediaPieces();
    const motionMediaOrderObj = await getMotionMediaOrder();
    let order = [];
    for (const key in motionMediaOrderObj) {
        if (motionMediaOrderObj.hasOwnProperty(key)) {
            const element = motionMediaOrderObj[key];
            if ("orderCollection" in element && "items" in element.orderCollection) {
                for (const item of element.orderCollection.items) {
                    if ("slug" in item) {
                        order.push(item.slug);
                    }
                }
            }
        }
    }

    // Order content based on order array
    const orderedContent = orderMotionMediaContent(motionMediaPieces, order);

    return orderedContent;
}

export default MotionMediaFeaturedContent;