'use client';
import Link from 'next/link';
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BackToTop from '../icons/BackToTop';
import { MotionMediaContentShort, SingleMotionMediaPieceContent, VisualDevelopmentItem } from '@/interfaces/Content';
import { getNextAndPreviousSlugs } from '../../lib/motionMediaPagination';
import Chevron from '../icons/Chevron';

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

    const motionMediaDescription = "description" in motionMediaPiece ? motionMediaPiece.description : null;
    const motionMediaDescriptionJson = motionMediaDescription !== null && typeof motionMediaDescription === "object" && "json" in motionMediaDescription ? (motionMediaDescription.json as any) : {};
    const visualDevelopmentDescriptionJson = motionMediaPiece.visualDevelopmentDescription?.json;
    const visualDevelopmentItems = motionMediaPiece.visualDevelopmentCollection?.items ?? [];
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
            <h2 className="text-xl text-center font-extralight text-gray-500 mt-12 mb-2">Visual Development</h2>
            <div className="w-full mb-6">
                {visualDevelopmentDescriptionJson && (
                    <div className="text-lg font-extralight text-gray-500 leading-relaxed mb-6">
                        {documentToReactComponents(visualDevelopmentDescriptionJson)}
                    </div>
                )}
            </div>
            <div className="space-y-10">
                {visualDevelopmentItems.map((item: VisualDevelopmentItem, index: number) => {
                    const media = item.media;
                    const mediaUrl = typeof media?.url === "string" ? media.url : "";
                    const embeddedMediaContent = item.embeddedMedia?.json?.content;
                    const embeddedMediaCode = Array.isArray(embeddedMediaContent)
                        ? embeddedMediaContent
                            .flatMap((node: any) => Array.isArray(node.content) ? node.content : [])
                            .map((node: any) => typeof node.value === "string" ? node.value : "")
                            .join("")
                        : "";
                    const descriptionJson = item.description?.json;
                    const mediaPosition = item.mediaPosition ?? "Media Top";
                    const layoutClass = mediaPosition === "Media Left"
                        ? "flex flex-col md:flex-row"
                        : mediaPosition === "Media Right"
                            ? "flex flex-col md:flex-row-reverse"
                            : mediaPosition === "Media Bottom"
                                ? "flex flex-col-reverse"
                                : "flex flex-col";
                    const isHorizontal = mediaPosition === "Media Left" || mediaPosition === "Media Right";
                    const columnWidthClass = isHorizontal ? "w-full md:w-1/2" : "w-full";
                    const isVideo = media?.contentType?.startsWith("video/") ||
                        /\.(mp4|m4v|mov|webm|ogg)(?:[?#]|$)/i.test(mediaUrl);

                    return (
                        <section className={`${layoutClass} items-center gap-6`} key={index}>
                            {(mediaUrl || embeddedMediaCode) && (
                                <div className={columnWidthClass}>
                                    {mediaUrl ? (
                                        isVideo ? (
                                            <video className="w-full rounded-lg" controls>
                                                <source src={mediaUrl} type={media?.contentType ?? undefined} />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <Image
                                                alt={media?.title ?? item.title ?? ""}
                                                src={mediaUrl}
                                                width={media?.width || 1200}
                                                height={media?.height || 800}
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="h-auto w-full rounded-lg"
                                            />
                                        )
                                    ) : (
                                        <div
                                            className="video-container"
                                            dangerouslySetInnerHTML={{ __html: embeddedMediaCode }}
                                            suppressHydrationWarning
                                        />
                                    )}
                                </div>
                            )}
                            {descriptionJson && Object.keys(descriptionJson).length > 0 && (
                                <div className={`${columnWidthClass} text-lg font-extralight text-gray-500 leading-relaxed`}>
                                    {documentToReactComponents(descriptionJson)}
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
            <div className="flex justify-between my-10">
                {previousAndNextSlugs.prev.slug !== "" && 
                previousAndNextSlugs.prev.title !== "" ? (
                    <div className="flex">
                        <span className='mr-2'>
                            <Chevron direction="left" />
                        </span>
                        <Link href={`/${previousAndNextSlugs.prev.slug}`} className="text-gray-700 hover:gray-blue-900 hover:underline">
                            {previousAndNextSlugs.prev.title}
                        </Link>
                    </div>
                ) : <div>&nbsp;</div>}
                {previousAndNextSlugs.next.slug !== "" && 
                previousAndNextSlugs.next.title !== "" && (
                    <div className="flex">
                        <Link href={`/${previousAndNextSlugs.next.slug}`} className="text-gray-700 hover:text-gray-900 hover:underline">
                            {previousAndNextSlugs.next.title}
                        </Link>
                        <span className='ml-2'>
                            <Chevron direction="right" />
                        </span>
                    </div>
                )}    
            </div>
            <BackToTop />
        </div>
      )
}

export default SingleMotionMediaPiece