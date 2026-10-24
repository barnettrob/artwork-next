import type { Document } from "@contentful/rich-text-types";

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
        items: VisualDevelopmentItem[];
    };
    description?: any;
    visualDevelopmentDescription?: {
        json?: Document;
    } | null;
    embeddedMotionMediaVideo?: any;
}

export interface VisualDevelopmentItem {
    title?: string | null;
    description?: {
        json?: any;
    } | null;
    mediaPosition?: string | null;
    media?: {
        url?: string | null;
        width?: number | null;
        height?: number | null;
        title?: string | null;
        contentType?: string | null;
    } | null;
    embeddedMedia?: {
        json?: any;
    } | null;
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

export interface ReelContent {
    title: string;
    shortDescription: string;
    embeddedVideoReel: any;
}