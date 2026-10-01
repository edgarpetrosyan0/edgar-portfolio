'use client';

import { useEffect } from 'react';

export default function ZoomBlocker() {

  useEffect(() => {

    // Handler to prevent zooming with Ctrl+wheel (desktop)
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Stop zooming action
      }
    };

    // Handlers to prevent zooming on some browsers/devices (like pinch zoom on Safari)
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };


    // Prevent multi-touch events (like pinch zoom)
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap to zoom on touch devices.
    let lastTouchTime = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {

      const now = Date.now();

      if (now - lastTouchTime < 300) {
        e.preventDefault(); // If two taps happen within 300ms, prevent zoom
      }
      lastTouchTime = now;  // Update last touch time
    };

    // Add event listeners with
    window.addEventListener('wheel', preventZoom, { passive: false });
    window.addEventListener('gesturestart', preventGesture, { passive: false });
    window.addEventListener('gesturechange', preventGesture, { passive: false });
    window.addEventListener('gestureend', preventGesture, { passive: false });
    window.addEventListener('touchstart', preventMultiTouch, { passive: false });
    window.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

     // Remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('wheel', preventZoom);
      window.removeEventListener('gesturestart', preventGesture);
      window.removeEventListener('gesturechange', preventGesture);
      window.removeEventListener('gestureend', preventGesture);
      window.removeEventListener('touchstart', preventMultiTouch);
      window.removeEventListener('touchend', preventDoubleTapZoom);
    };
    
  }, []); // Empty dependency array ensures effect runs only once on mount/unmount

  return null;
}
