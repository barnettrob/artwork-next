import { getAllMotionMediaPieces, getMotionMediaOrder } from '@/app/lib/api';

const MotionMediaListContent = async () => {
    const motionMediaPieces = await getAllMotionMediaPieces();
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

    return {
        content: motionMediaPieces,
        order: order
    };
}

export default MotionMediaListContent;