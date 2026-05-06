import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './mobile-frame.css';

export default function MobileFrameWrapper({ children }) {
  var location = useLocation();
  var screenRef = useRef(null);

  useEffect(function () {
    if (screenRef.current) {
      screenRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="mobile-frame-backdrop">
      <div className="mobile-frame-device">
        <div className="mobile-frame-notch" />
        <div className="mobile-frame-screen" ref={screenRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
