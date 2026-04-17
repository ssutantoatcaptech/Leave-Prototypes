import { Link } from 'react-router-dom';
import { overviewActiveAbsences } from '../../data/overviewData';
import './overview-react.css';

function formatDate(isoDate) {
  if (!isoDate) return 'TBD';
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const ABSENCE_ICONS = {
  medical:   { bg: '#f3f4f6', svg: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.5 2h3v4.5H14v3H9.5V14h-3V9.5H2v-3h4.5V2z" stroke="#0ea5e9" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  family:    { bg: '#f3f4f6', svg: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="5" r="2" stroke="#ec4899" strokeWidth="1.2"/><circle cx="10.5" cy="5" r="2" stroke="#ec4899" strokeWidth="1.2"/><path d="M1 14c0-2.5 2-4.5 4.5-4.5.7 0 1.4.2 2 .5m3 4c0-2.5-2-4.5-4.5-4.5" stroke="#ec4899" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  pregnancy: { bg: '#f3f4f6', svg: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4" r="2.5" stroke="#f59e0b" strokeWidth="1.2"/><path d="M4 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="1" fill="#f59e0b"/></svg> },
  personal:  { bg: '#f3f4f6', svg: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#6b7280" strokeWidth="1.2"/><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg> },
};

function SiteNav() {
  return (
    <div className="top-nav">
      <div className="nav-main">
        <div className="nav-main-left">
          <div className="nav-brand">my<span>Mutual</span></div>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Absences</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h12M6 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Find ID Card
          </button>
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Messages
          </button>
          <button className="nav-bell" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.69 3 6 5.69 6 9v4l-2 3h16l-2-3V9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="nav-bell-dot"/>
          </button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <button className="nav-tab active" type="button">Overview</button>
        <button className="nav-tab" type="button">Plan &amp; Request Absence</button>
        <button className="nav-tab" type="button">My Absences</button>
      </div>
    </div>
  );
}

function ActionCards() {
  return (
    <div className="ov-action-cards">
      <Link className="ov-action-card" to="/plan-absence" style={{textDecoration:'none'}}>
        <div className="ov-action-icon dark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#fff" strokeWidth="1.5"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <h3>Plan for Absence</h3>
          <p>Explore your coverage and plan your time off before submitting</p>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{flexShrink:0,color:'#a3a3a3'}}><path d="M1.5 1L6.5 7l-5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
      <Link className="ov-action-card" to="/request-leave-react" style={{textDecoration:'none'}}>
        <div className="ov-action-icon dark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2H4.5A1.5 1.5 0 003 3.5v9A1.5 1.5 0 004.5 14h7a1.5 1.5 0 001.5-1.5V5z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 2v3h3M6 9h4M6 11.5h2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <h3>Request Absence</h3>
          <p>Ready to submit? File your absence request now</p>
        </div>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{flexShrink:0,color:'#a3a3a3'}}><path d="M1.5 1L6.5 7l-5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </div>
  );
}

function AbsenceCard({ absence }) {
  const icon = ABSENCE_ICONS[absence.type] || ABSENCE_ICONS.personal;
  const statusClass = absence.status === 'APPROVED' ? 'st-approved' : 'st-pending';
  const isReduced = Boolean(absence.schedule);
  return (
    <Link className="ov-active-card" to={`/absence-details/${absence.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="ov-active-card-body">
        <div className="ov-active-card-header">
          <div className="ov-active-card-icon" style={{background:icon.bg}}>{icon.svg}</div>
          <span className="ov-active-card-title">{absence.title}</span>
          <span className={"ov-history-status " + statusClass}><span className="dot"/>{absence.status}</span>
        </div>
        <div className="ov-active-card-desc">Case #{absence.id} &middot; {absence.frequency} Absence{absence.benefits ? " \u00b7 " + absence.benefits : ""}</div>
        <div className="ov-active-card-fields">
          <div className="ov-active-card-flabel">Start Date</div>
          <div className="ov-active-card-flabel">End Date</div>
          <div className="ov-active-card-flabel">{isReduced ? 'Schedule' : 'Return to Work'}</div>
          <div className="ov-active-card-flabel">Duration</div>
          <div className="ov-active-card-fvalue">{formatDate(absence.startDate)}</div>
          <div className="ov-active-card-fvalue">{formatDate(absence.endDate)}</div>
          <div className="ov-active-card-fvalue">{isReduced ? absence.schedule : formatDate(absence.returnDate)}</div>
          <div className="ov-active-card-fvalue">{absence.duration}</div>
        </div>
        <div className="ov-active-card-footer">
          {absence.documentsRequired && (
            <div className="ov-docs-badge">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M9 1H4a1.5 1.5 0 00-1.5 1.5v11A1.5 1.5 0 004 15h8a1.5 1.5 0 001.5-1.5V5.5L9 1z" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 1v5h4.5" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {absence.documentsRequired}
            </div>
          )}
          <span className="ov-active-card-btn" style={{marginLeft:'auto'}}>
            View Details <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ActiveAbsences() {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
        <h3 style={{margin:0,fontSize:'18px',fontWeight:600,color:'#0f0f14'}}>Active Absences</h3>
        <Link to="/absence-history" style={{padding:'5px 14px',fontSize:'12px',fontWeight:600,fontFamily:'inherit',color:'#3d3d47',background:'#fff',border:'1px solid #d0d0d5',borderRadius:'6px',cursor:'pointer',textDecoration:'none'}}>View Absence History</Link>
      </div>
      <div className="ov-active-container-cards">
        {overviewActiveAbsences.map((a) => <AbsenceCard key={a.id} absence={a}/>)}
      </div>
    </div>
  );
}

function LearnAboutOptions() {
  const items = [
    { id:'federal', title:'Federal Job Protection', description:'Unpaid, job-protected absence for medical or family situations',
      svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 15s6-3 6-7.5V3.75L8 1.5 2 3.75V7.5C2 12 8 15 8 15z" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id:'state', title:'State Absence / Disability', description:'Programs that may provide income support depending on your state',
      svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#3d3d47" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id:'company', title:'Company-Sponsored Absence', description:'Absence benefits provided directly by your employer',
      svg:<svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M1 3a2 2 0 012-2h4l4 4v9a2 2 0 01-2 2H3a2 2 0 01-2-2V3z" stroke="#3d3d47" strokeWidth="1.2"/><path d="M7 1v4h4" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];
  return (
    <div className="ov-learn">
      <div className="ov-learn-header">
        <div>
          <h3>Learn About Absence Options</h3>
          <p>Explore different types of absence and coverage</p>
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{flexShrink:0}}><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="ov-learn-body">
        {items.map(item => (
          <div key={item.id} className="ov-learn-item">
            <div className="ov-learn-item-icon">{item.svg}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="ov-learn-link">Learn more <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M1 6h8M6 3l3 3-3 3" stroke="#0f0f14" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const items = [
    { id:'saved', label:'Saved absences', svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M2 4a2 2 0 012-2h5l3 3v7a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="#3d3d47" strokeWidth="1.2"/><path d="M5 9h6M5 11.5h4" stroke="#3d3d47" strokeWidth="1.1" strokeLinecap="round"/></svg> },
    { id:'accommodations', label:'Absence Accommodations', svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M8 1a7 7 0 100 14A7 7 0 008 1z" stroke="#3d3d47" strokeWidth="1.2"/><path d="M5 8h6" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round"/><path d="M8 5v6" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id:'support', label:'Contact Support', svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M14 11c0 1.66-2.69 3-6 3s-6-1.34-6-3" stroke="#3d3d47" strokeWidth="1.2"/><path d="M2 5c0 1.66 2.69 3 6 3s6-1.34 6-3" stroke="#3d3d47" strokeWidth="1.2"/><path d="M2 5v6M14 5v6M8 2v12" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="2" r="1" fill="#3d3d47"/></svg> },
    { id:'policy', label:'Absence Policy Guide', svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="#3d3d47" strokeWidth="1.2"/><path d="M5 7h6M5 10h4" stroke="#3d3d47" strokeWidth="1.1" strokeLinecap="round"/></svg> },
  ];
  return (
    <div className="ov-resources" style={{background:'#fff',border:'1px solid #e2e2e5',boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}>
      <div className="ov-sidebar-label">Quick Actions</div>
      <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
        {items.map(item => (
          <div key={item.id} className="ov-resource-item" style={{padding:'10px 12px'}}>
            {item.svg}
            <div className="ov-resource-text"><div className="title" style={{fontSize:'14px'}}>{item.label}</div></div>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OverviewReactPage() {
  return (
    <div style={{fontFamily:"'Source Sans Pro',system-ui,sans-serif",background:'#f5f5f7',color:'#0f0f14',WebkitFontSmoothing:'antialiased',minHeight:'100vh'}}>
      <SiteNav/>
      <div className="overview-page">
        <div className="overview-header">
          <h1>Plan or Request Time Off</h1>
          <p>Understand your options or start your absence request \u2014 we\u2019ll guide you step by step.</p>
        </div>
        <div className="overview-grid">
          <div className="overview-main">
            <ActionCards/>
            <ActiveAbsences/>
          </div>
          <div className="overview-sidebar">
            <QuickActions/>
          </div>
        </div>
      </div>
    </div>
  );
}
