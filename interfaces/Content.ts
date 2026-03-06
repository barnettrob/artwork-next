export interface SingleMotionMediaPieceContent { 
    title: string;
    shortDescription: string;
    slug: string;
    motionMedia: {
        url: string;
    };
    motionMediaVideoImage: {
        url: string;
        width: number;
        height: number;
    } | null;
    visualDevelopmentCollection: {
        items: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    description?: any;
    visualDevelopmentDescription?: any;
    visualDevelopmentImagesCollection?: any;
    embeddedMotionMediaVideo?: any;
}

export interface MotionMediaContentShort {
    slug: string;
    title?: string;
    motionMediaVideoImage: {
        url: string;
        width: number;
        height: number;
    }
}

export interface Post {
    height: number;
    url: string;
    width: number;
}