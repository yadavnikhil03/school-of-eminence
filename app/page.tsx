'use client';
import { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  // Add proper typing to the ref
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Make sure we resize iframe to match content height
    const updateIframeHeight = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      try {
        // Try to access iframe content to adjust height
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        iframe.style.height = `${iframeDocument?.body.scrollHeight || 100}px`;
      } catch (e) {
        console.log('Cannot access iframe content due to same-origin policy');
      }
    };

    // Handle iframe load event
    const handleIframeLoad = () => {
      updateIframeHeight();
      window.addEventListener('resize', updateIframeHeight);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
      window.removeEventListener('resize', updateIframeHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>School of Eminence - Indrapuri, Ludhiana</title>
      </Head>
      <iframe 
        ref={iframeRef}
        id="school-website"
        src="/index.html" 
        style={{ 
          border: 'none', 
          width: '100%', 
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden'
        }}
        title="School of Eminence Website"
        allowFullScreen
      />
    </>
  );
}
