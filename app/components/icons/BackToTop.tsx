'use client'
import { useEffect, useState } from 'react';
import Chevron from './Chevron';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const checkScrollHeight = () => {
      setShowButton(window.scrollY > 300);
    }

    window.addEventListener('scroll', checkScrollHeight);
    checkScrollHeight();
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  };

  return showButton ? (
    <button className="back-to-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
      <Chevron direction="up" />
    </button>
  ) : null;
}

export default BackToTop