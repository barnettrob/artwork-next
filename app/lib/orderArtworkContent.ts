interface ArtworkContent {
    title: string;
    artworkImage: {
        url: string;
        width: number;
        height: number;
    }
}

export function orderArtworkContent(content: ArtworkContent[], order: string[]) {
    if (!content || !order) {
        return [];
    }
    const filteredContent = content.filter((item: { title: string; }) => order.includes(item.title));
    filteredContent.sort((a: { title: string; }, b: { title: string; }) => {
        return order.indexOf(a.title) - order.indexOf(b.title);
    });

    return filteredContent;
}