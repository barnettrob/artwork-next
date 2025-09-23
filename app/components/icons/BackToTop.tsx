'use client'
import { useEffect, useRef, useState } from 'react';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const checkScrollHeight = () => {
        if (!showButton && window.scrollY > 300) {
          setShowButton(true);
          if (backToTopRef.current) {
            const backToTopRefClassName = backToTopRef.current.className;
            backToTopRef.current.className = backToTopRefClassName.replace("hidden", "show");
          }
        } else if (showButton && window.scrollY <= 300) {
          setShowButton(false);
          if (backToTopRef.current) {
            const backToTopRefClassName = backToTopRef.current.className;
            backToTopRef.current.className = backToTopRefClassName.replace("show", "hidden");
          }
        }
    }

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToTopRef = useRef<HTMLDivElement>(null);

  return (
    <div className='back-to-top hidden' ref={backToTopRef} onClick={scrollToTop}>
        <svg className='back-to-top-icon' fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 407.436 407.436" xmlSpace="preserve">
            <polygon points="203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 "/>
        </svg>
    </div>
  )
}

export default BackToTop