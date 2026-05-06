import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './mobile-frame.css';

function useIsRealMobile() {
  var [isMobile, setIsMobile] = useState(function () {
    return window.innerWidth <= 480;
  });
  useEffect(function () {
    function check() { setIsMobile(window.innerWidth <= 480); }
    window.addEventListener('resize', check);
    return function () { window.removeEventListener('resize', check); };
  }, []);
  return isMobile;
}

export default function MobileFrameWrapper({ children }) {
  var location = useLocation();
  var screenRef = useRef(null);
  var isRealMobile = useIsRealMobile();

  useEffect(function () {
    if (isRealMobile) {
      window.scrollTo(0, 0);
    } else if (screenRef.current) {
      screenRef.current.scrollTop = 0;
    }
  }, [location.pathname, isRealMobile]);

  if (isRealMobile) {
    return (
      <div className="mobile-frame-screen mobile-frame-native">
        {children}
      </div>
    );
  }

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
