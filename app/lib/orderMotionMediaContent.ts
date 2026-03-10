interface MotionMediaContent {
    slug: string;
    motionMediaVideoImage: {
        url: string;
        width: number;
        height: number;
    }
}

export function orderMotionMediaContent(content: MotionMediaContent[], order: string[]) {
    if (!content || !order) {
        return [];
    }
    const filteredContent = content.filter((item: { slug: string; }) => order.includes(item.slug));
    filteredContent.sort((a: { slug: string; }, b: { slug: string; }) => {
        return order.indexOf(a.slug) - order.indexOf(b.slug);
    });

    return filteredContent;
}