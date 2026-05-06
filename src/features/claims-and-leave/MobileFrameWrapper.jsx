import './mobile-frame.css';

export default function MobileFrameWrapper({ children }) {
  return (
    <div className="mobile-frame-backdrop">
      <div className="mobile-frame-device">
        <div className="mobile-frame-notch" />
        <div className="mobile-frame-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
