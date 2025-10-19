import React, { useRef } from 'react';
import Image from "next/image";
import CloseIcon from '../icons/CloseIcon';

interface Post {
    artworkImage: {
        height: number;
        url: string;
        width: number;
    }
    shortDescription: string;
    title: string;
    videoImage: { url: string } | null;
}

interface Props {
    post: Post;
    show: boolean;
    overlayDescriptionControl: any;
    windowWidth: number;
}

const ShortDescriptionOverlay = ( props: Props ) => {
  const overlayRef = useRef(null) as unknown as React.RefObject<HTMLDivElement>
  let url = "post" in props && "artworkImage" in props.post && "url" in props.post.artworkImage ? props.post.artworkImage.url : "";
  const shortDescription = "post" in props && "shortDescription" in props.post ? props.post.shortDescription : "";
  const urlCheck = url.replace(/^https?:\/\//, '');
  const urlArray = urlCheck.split("/");
  const isVideo = urlArray[0] === "videos.ctfassets.net" ? true : false;
  if (isVideo) {
    url = "post" in props && "videoImage" in props.post && props.post.videoImage && "url" in props.post.videoImage ? props.post.videoImage.url : "";
  }

  const handleShow = () => {
    if (props.show) {
        overlayRef.current.className = overlayRef.current.className.replace("hidden", "show");
    }
    else {
        overlayRef.current.className = overlayRef.current.className.replace("show", "hidden");
    }
  }

  if (overlayRef.current !== null) {
    handleShow();
  }

  const handleClose = () => {
    overlayRef.current.className = overlayRef.current.className.replace("show", "hidden");
    // Send back to parent where it will set showOverlay back to false 
    // via the handleShortDescriptionOverlayControl function in the parent
    // so that other images can be properly opened.
    props.overlayDescriptionControl(false);
  }

  return (
    <div className="hidden" ref={overlayRef}>
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-200 rounded-lg p-3 max-w-xl w-11/12 pb-10 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                    <button 
                        className="ml-auto border-0 text-black text-3xl leading-none font-thin outline-none focus:outline-none"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-body bg-gray-300 rounded-md py-5 border border-gray-400">
                    {url !== "" && (
                        <div style={{ position: 'relative', width: '200px', height: '150px', textAlign: 'center', margin: '0 auto 1rem auto' }}>
                            <Image
                                alt={props.post.title}
                                src={url}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'contain' }}
                                quality={80}
                                placeholder='blur'
                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                            />
                        </div>
                    )}
                    {shortDescription !== "" && (
                        <div className="px-5">
                            {shortDescription}
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShortDescriptionOverlay;