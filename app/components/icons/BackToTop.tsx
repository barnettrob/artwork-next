'use client'
import { useEffect, useRef, useState } from 'react';
import Chevron from './Chevron';

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
        <Chevron direction="up" />
    </div>
  )
}

export default BackToTop