import { useSearchParams } from 'react-router-dom';
import FileClaimWizardPage from './FileClaimWizardPage';
import './file-claim-wizard.css';
import './guest-file-claim.css';

function GuestHeader() {
  return (
    <div className="gc-header-wrapper">
      <header className="gc-header">
        <div className="gc-header-left">
          <span className="gc-header-brand">my<strong>Mutual</strong></span>
        </div>
        <div className="gc-header-right">
          <a href="/claims-and-leave" className="gc-header-signin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Sign In
          </a>
        </div>
      </header>
    </div>
  );
}

function GuestFooter() {
  return (
    <footer className="gc-footer">
      <div className="gc-footer-inner">
        <span className="gc-footer-brand">my<strong>Mutual</strong></span>
        <div className="gc-footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility Services</a>
        </div>
        <span className="gc-footer-copyright">&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default function GuestClaimWizardPage() {
  const [searchParams] = useSearchParams();
  const claimType = searchParams.get('type') || 'std';

  return (
    <div className="gc-shell">
      <GuestHeader />
      <main className="gc-main">
        <FileClaimWizardPage guestMode={true} guestClaimType={claimType} />
      </main>
      <GuestFooter />
    </div>
  );
}
