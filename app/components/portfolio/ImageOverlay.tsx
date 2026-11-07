import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import CloseIcon from '../icons/CloseIcon';
import { Post } from '@/interfaces/Content';

interface Props {
    post: Post | any;
    show: boolean;
    overlayControl: any;
    windowWidth: number;
    type: string;
}

const ImageOverlay = ( props: Props ) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const url = props.post?.url ?? "";

  useEffect(() => {
    if (!props.show) {
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeButtonRef.current?.click();
        return;
      }

      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const focusableElements = dialog?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements?.length) {
          event.preventDefault();
          closeButtonRef.current?.focus();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [props.show]);

  if (!props.show) {
    return null;
  }

  return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div
                  className="bg-gray-900 text-gray-100 rounded-lg p-3 max-w-5xl w-11/12 h-[calc(100vh_-_4rem)] overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label={props.type === "image" ? "Expanded image" : "Expanded video"}
              >
                  <div className="flex justify-between items-center mb-3">
                      <button 
                          ref={closeButtonRef}
                          className="ml-auto border-0 text-gray-100 text-3xl leading-none font-thin"
                          type="button"
                          aria-label="Close expanded media"
                          onClick={() => props.overlayControl(false)}
                      >
                          <CloseIcon />
                      </button>
                  </div>
                  <div className="modal-body">
                      {props.type === "image" && url !== "" && (
                          <Image
                              alt={props.post.title || "Expanded artwork"}
                              src={url}
                              width={props.post.width}
                              height={props.post.height}
                              placeholder='blur'
                              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              style={{
                                  maxWidth: "100%",
                                  height: "auto"
                              }} />
                      )}
                        {props.type === "embeddedVideo" && (
                            <div 
                              className="embedded"
                              dangerouslySetInnerHTML={{__html: props.post}}
                              suppressHydrationWarning={true}
                            ></div>
                        )}
                  </div>
              </div>
      </div>
  );
}

export default ImageOverlay