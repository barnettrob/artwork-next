'use client'
import BackToTop from '../icons/BackToTop';
import { ReelContent } from '@/interfaces/Content';

interface ReelProps {
    content: ReelContent[]
}

const Reel = ( props: ReelProps ) => {
    const content = props.content;
    const titleValue = (content as unknown as { title?: unknown }).title;
    const shortDescriptionValue = (content as unknown as { shortDescription?: unknown }).shortDescription;
    const title: string = typeof titleValue === "string" ? titleValue : "Motion Reel";
    const shortDescription: string = typeof shortDescriptionValue === "string" ? shortDescriptionValue : "";
    const reelVideo: any = typeof content === "object" && content !== null && "embeddedVideoReel" in content ? content.embeddedVideoReel : "";

    let embeddedVideoCode = "";
    if ("json" in reelVideo && Array.isArray(reelVideo.json.content) && reelVideo.json.content.length > 0) {
        const firstContent = reelVideo.json.content[0];
        if ("content" in firstContent && Array.isArray(firstContent.content) && firstContent.content.length > 0) { 
            if ("value" in firstContent.content[0]) {
            embeddedVideoCode = firstContent.content[0].value;
            }
        }
    }

    return (
        <div>
            <div>
                <h1 className='text-center font-extralight text-xl mb-2'>{title}</h1>
                {/* <div className='p-6 font-extralight'>
                    {shortDescription}
                </div> */}
                <div className="w-full mb-6">
                {reelVideo === "" ? (
                    <div 
                        className="reel-container" 
                        dangerouslySetInnerHTML={{__html: embeddedVideoCode}}
                        suppressHydrationWarning={true}
                    ></div>
                ) : (
                    <div 
                        className="reel-container" 
                        dangerouslySetInnerHTML={{__html: embeddedVideoCode}}
                        suppressHydrationWarning={true}
                    ></div>
                )}
            </div>
                <BackToTop />
            </div>
        </div>
    )
}

export default Reel;