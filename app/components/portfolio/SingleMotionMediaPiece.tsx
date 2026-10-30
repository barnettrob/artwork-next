'use client';
import Link from 'next/link';
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BackToTop from '../icons/BackToTop';
import { MotionMediaContentShort, SingleMotionMediaPieceContent, VisualDevelopmentItem } from '@/interfaces/Content';
import { getNextAndPreviousSlugs } from '../../lib/motionMediaPagination';
import Chevron from '../icons/Chevron';

const getRichTextValues = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap(getRichTextValues);
    }

    if (typeof value !== "object" || value === null) {
        return [];
    }

    const node = value as { value?: unknown; content?: unknown };
    return [
        ...(typeof node.value === "string" ? [node.value] : []),
        ...getRichTextValues(node.content),
    ];
};

interface SingleMotionMediaPieceProps {
    content: SingleMotionMediaPieceContent;
    allContent: MotionMediaContentShort[];
    slug: string;
}

const SingleMotionMediaPiece = ( props: SingleMotionMediaPieceProps) => {
    const motionMediaPiece = props.content;
    const allContent = props.allContent;
    const slug = props.slug;
    
    // Pagination logic for next and previous pieces.
    const previousAndNextSlugs = getNextAndPreviousSlugs(allContent, slug);
    const hasPreviousPiece = previousAndNextSlugs.prev.slug !== "" && previousAndNextSlugs.prev.title !== "";
    const hasNextPiece = previousAndNextSlugs.next.slug !== "" && previousAndNextSlugs.next.title !== "";
    const hasBothPieces = hasPreviousPiece && hasNextPiece;

    const motionMediaDescription = "description" in motionMediaPiece ? motionMediaPiece.description : null;
    const motionMediaDescriptionJson = motionMediaDescription !== null && typeof motionMediaDescription === "object" && "json" in motionMediaDescription ? (motionMediaDescription.json as any) : {};
    const visualDevelopmentDescriptionJson = motionMediaPiece.visualDevelopmentDescription?.json;
    const visualDevelopmentItems = motionMediaPiece.visualDevelopmentCollection?.items ?? [];
    const hasVisualDevelopmentDescription = getRichTextValues(visualDevelopmentDescriptionJson)
        .some((text) => text.trim() !== "");
    const hasVisualDevelopmentContent = visualDevelopmentItems.length > 0 || hasVisualDevelopmentDescription;
    let embeddedVideoCode = "";
    if ("embeddedMotionMediaVideo" in motionMediaPiece && motionMediaPiece.embeddedMotionMediaVideo && "json" in motionMediaPiece.embeddedMotionMediaVideo && "content" in motionMediaPiece.embeddedMotionMediaVideo.json && Array.isArray(motionMediaPiece.embeddedMotionMediaVideo.json.content) && motionMediaPiece.embeddedMotionMediaVideo.json.content.length > 0) {
        const firstContent = motionMediaPiece.embeddedMotionMediaVideo.json.content[0];
        if ("content" in firstContent && Array.isArray(firstContent.content) && firstContent.content.length > 0) { 
            if ("value" in firstContent.content[0]) {
            embeddedVideoCode = firstContent.content[0].value;
            }
        }
    }

    const posterAttr = "motionMediaVideoImage" in motionMediaPiece && motionMediaPiece.motionMediaVideoImage !== null ? motionMediaPiece.motionMediaVideoImage.url : "/video_poster_default.png";
    console.log("motionMediaPiece", motionMediaPiece);
    return (
        <div className="w-full mx-auto p-4 md:px-16 single-motion-media">
            <h1 className="text-2xl font-extralight text-center text-gray-500 mb-4">
                {motionMediaPiece?.title}
            </h1>
            {Object.keys(motionMediaDescriptionJson).length > 0 && (
                <div className="text-lg font-extralight text-gray-500 leading-relaxed">
                    {documentToReactComponents(motionMediaDescriptionJson)}
                </div>
            )}
            <div className="w-full mb-6">
                {embeddedVideoCode === "" ? (
                    <video className="block h-auto w-full" poster={posterAttr} controls>
                        <source src={motionMediaPiece?.motionMedia?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div 
                        className="video-container" 
                        dangerouslySetInnerHTML={{__html: embeddedVideoCode}}
                        suppressHydrationWarning={true}
                    ></div>
                )}
            </div>
            {hasVisualDevelopmentContent && (
                <h2 className="text-xl text-center font-extralight text-gray-500 mt-12 mb-2">Visual Development</h2>
            )}
            <div className="w-full mb-6">
                {hasVisualDevelopmentDescription && visualDevelopmentDescriptionJson && (
                    <div className="text-lg font-extralight text-gray-500 leading-relaxed mb-6">
                        {documentToReactComponents(visualDevelopmentDescriptionJson)}
                    </div>
                )}
            </div>
            <div className="space-y-10">
                {visualDevelopmentItems.map((item: VisualDevelopmentItem, index: number) => {
                    const mediaItems = item.mediaManyCollection?.items ?? [];
                    const embeddedMediaCode = getRichTextValues(item.embeddedMedia?.json?.content).join("");
                    const descriptionJson = item.description?.json;
                    const descriptionHasText = getRichTextValues(descriptionJson).some((text) => text.trim() !== "");
                    const oppositeMedia = item.oppositeMedia ?? "Description";
                    const mediaToRender = oppositeMedia === "Media" ? mediaItems : mediaItems.slice(0, 1);
                    const showDescription = oppositeMedia === "Description" && descriptionHasText;
                    const mediaToRenderWithUrl = mediaToRender.filter((media) => typeof media.url === "string" && media.url !== "");
                    const mediaPosition = item.mediaPosition ?? "Media Top";
                    const layoutClass = mediaPosition === "Media Left"
                        ? "flex flex-col md:flex-row"
                        : mediaPosition === "Media Right"
                            ? "flex flex-col md:flex-row-reverse"
                            : mediaPosition === "Media Bottom"
                                ? "flex flex-col-reverse"
                                : "flex flex-col";
                    const isHorizontal = showDescription && (mediaPosition === "Media Left" || mediaPosition === "Media Right");
                    const columnWidthClass = isHorizontal ? "w-full md:w-1/2" : "w-full";
                    const mediaColumn = mediaToRenderWithUrl.length > 0 ? (
                        <div className={`${columnWidthClass} space-y-6`}>
                            {mediaToRenderWithUrl.map((media, mediaIndex) => {
                                const mediaUrl = media.url!;
                                const isVideo = media.contentType?.toLowerCase().startsWith("video/") ||
                                    /\.(mp4|m4v|mov|webm|ogg)(?:[?#]|$)/i.test(mediaUrl);

                                return isVideo ? (
                                    <video
                                        key={`${mediaUrl}-${mediaIndex}`}
                                        className="w-full rounded-lg"
                                        poster={item.vdMotionMediaVideoImage?.url || "/video_poster_default.png"}
                                        controls
                                    >
                                        <source src={mediaUrl} type={media.contentType ?? undefined} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <Image
                                        key={`${mediaUrl}-${mediaIndex}`}
                                        alt={media.title ?? item.title ?? ""}
                                        src={mediaUrl}
                                        width={media.width || 1200}
                                        height={media.height || 800}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="h-auto w-full rounded-lg"
                                    />
                                );
                            })}
                        </div>
                    ) : embeddedMediaCode ? (
                        <div
                            className={`${columnWidthClass} video-container`}
                            dangerouslySetInnerHTML={{ __html: embeddedMediaCode }}
                            suppressHydrationWarning
                        />
                    ) : null;

                    return (
                        <section className={`${layoutClass} items-center gap-6`} key={index}>
                            {mediaColumn}
                            {showDescription && (
                                <div className={`${columnWidthClass} text-lg font-extralight text-gray-500 leading-relaxed`}>
                                    {documentToReactComponents(descriptionJson)}
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
            <div className="flex justify-between gap-4 my-10">
                {hasPreviousPiece && (
                    <Link
                        href={`/${previousAndNextSlugs.prev.slug}`}
                        className={`group flex min-w-0 items-center gap-2 ${hasBothPieces ? "flex-1" : "max-w-full"}`}
                    >
                        <span className="shrink-0">
                            <Chevron direction="left" />
                        </span>
                        <div className="min-w-0">
                            <span className="block text-xs text-gray-500">Previous</span>
                            <span className="block max-w-full truncate text-gray-700 group-hover:underline group-focus-visible:underline">
                                {previousAndNextSlugs.prev.title}
                            </span>
                        </div>
                    </Link>
                )}
                {hasNextPiece && (
                    <Link
                        href={`/${previousAndNextSlugs.next.slug}`}
                        className={`group ml-auto flex min-w-0 items-center justify-end gap-2 text-right ${hasBothPieces ? "flex-1" : "max-w-full"}`}
                    >
                        <div className="min-w-0">
                            <span className="block text-xs text-gray-500">Next</span>
                            <span className="block max-w-full truncate text-gray-700 group-hover:underline group-focus-visible:underline">
                                {previousAndNextSlugs.next.title}
                            </span>
                        </div>
                        <span className="shrink-0">
                            <Chevron direction="right" />
                        </span>
                    </Link>
                )}
            </div>
            <BackToTop />
        </div>
      )
}

export default SingleMotionMediaPiece