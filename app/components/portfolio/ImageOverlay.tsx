import React, { useRef } from 'react';
import Image from "next/legacy/image";
import CloseIcon from '../icons/CloseIcon';

interface Post {
    artworkImage: {
        height: number;
        url: string;
        width: number;
    }
    shortDescription: string;
    title: string;
    videoImage: null;
}

interface Props {
    post: Post;
    show: boolean;
    overlayControl: any;
}

const ImageOverlay = ( props: Props ) => {
  const overlayRef = useRef(null) as unknown as React.RefObject<HTMLDivElement>
  const url = "post" in props && "artworkImage" in props.post && "url" in props.post.artworkImage ? props.post.artworkImage.url : "";

  const handleShow = () => {
    if (props.show) {
        // setShow(true);
        overlayRef.current.className = overlayRef.current.className.replace("hidden", "show");
    }
    else {
        // setShow(false);
        overlayRef.current.className = overlayRef.current.className.replace("show", "hidden");
    }
  }

  if (overlayRef.current !== null) {
    handleShow();
  }

  const handleClose = () => {
    overlayRef.current.className = overlayRef.current.className.replace("show", "hidden");
    props.overlayControl(false);
  }

  return (
    <div className="hidden" ref={overlayRef}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-5xl w-11/12 h-[calc(100vh_-_4rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        className="ml-auto border-0 text-black text-3xl leading-none font-thin outline-none focus:outline-none"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-body">
                    {url !== "" && (
                        <Image
                            alt={props.post.title}
                            src={url}
                            width={props.post.artworkImage.width}
                            height={props.post.artworkImage.height}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder='blur'
                            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImageOverlay