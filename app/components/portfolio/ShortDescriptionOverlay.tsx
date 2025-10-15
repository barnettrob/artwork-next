import React, { useRef } from 'react';
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
    overlayDescriptionControl: any;
    windowWidth: number;
}

const ShortDescriptionOverlay = ( props: Props ) => {
  const overlayRef = useRef(null) as unknown as React.RefObject<HTMLDivElement>
  const shortDescription = "post" in props && "shortDescription" in props.post ? props.post.shortDescription : "";

  const handleShow = () => {
    if (props.show) {
        overlayRef.current.className = overlayRef.current.className.replace("hidden", "show");
    }
    else {
        overlayRef.current.className = overlayRef.current.className.replace("show", "hidden");
    }
  }

  if (overlayRef.current !== null && props.windowWidth > 768) {
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
            <div className="bg-white rounded-lg p-3 max-w-5xl w-11/12 h-[calc(100vh_-_4rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                    <button 
                        className="ml-auto border-0 text-black text-3xl leading-none font-thin outline-none focus:outline-none"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-body">
                    {shortDescription !== "" && (
                        shortDescription
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShortDescriptionOverlay;