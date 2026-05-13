import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import '../overview/overview-react.css';
import './request-leave-react.css';
import '../plan-absence/plan-absence-react.css';

const DRAFT_KEY = 'requestLeaveReactDraft';

const initialState = {
  employee: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    address: '456 Oak Avenue, New York, NY 10001',
    hireDate: '2022-01-15',
    occupation: 'Senior Marketing Manager',
    workLocation: 'New York, NY',
    employer: 'EnterpriseCorp Inc.',
    employmentType: 'Full-time',
    employeeId: 'EMP-2026-4821',
  },
  email: 'sarah.johnson@company.com',
  phone: '(555) 123-4567',
  commEmail: true,
  commPhone: false,
  commSMS: true,
  tempAddress: false,
  tempStreet: '8827 SW 8th Street',
  tempCity: 'Lee Summit',
  tempState: 'MO',
  tempZip: '64086',
  tempStart: '2026-05-01',
  tempEnd: '2026-08-15',
  leaveType: 'continuous',
  lastDayWorked: '2026-05-26',
  hoursLastDay: '08:00',
  alreadyMissedTime: false,
  missedDateEntries: [{ date: '2026-04-02', startTime: '8:00 AM', endTime: '4:00 PM', hours: '08:00', reason: 'Episode' }, { date: '2026-04-03', startTime: '8:00 AM', endTime: '4:00 PM', hours: '08:00', reason: 'Treatment' }, { date: '2026-04-04', startTime: '8:00 AM', endTime: '4:00 PM', hours: '08:00', reason: 'Treatment' }],
  reducedHoursPerWeek: '20',
  leaveStartDate: '2026-06-01',
  expectedReturnDate: '2026-09-15',
  scheduleHours: { sun: '0', mon: '8', tue: '8', wed: '8', thu: '8', fri: '8', sat: '0' },
  extraWeeks: [],
  childScenario: 'birth',
  childAlreadyExists: false,
  childDate: '',
  expectedDate: '2026-06-15',
  childName: 'Baby Johnson',
  childDob: '',
  spouseSameEmployer: false,
  spouseName: '',
  primaryCaregiver: true,
  bondingIntent: 'immediate',
  providerName: 'Dr. Dempsey',
  providerSuffix: 'OB-GYN',
  providerFacility: "St. Luke's Medical Center",
  providerPhone: '(816) 457-2934',
  providerFax: '(816) 457-2935',
  providerEmail: 'dempsey.herbett@stlukes.com',
  providerStreet: '123 Main Street, Unit 404',
  providerCity: 'Lee Summit',
  providerState: 'MO',
  providerZip: '64064',
  authorizeMedCert: true,
  sendCertToPhysician: false,
  diagnosis: '',
  firstTreatment: '',
  nextAppointment: '',
  familyFirstName: '',
  familyLastName: '',
  familyRelationship: '',
  familyDob: '',
  workersComp: 'no',
  leaveScenario: '',
  otherLeaveReason: '',
  seriousHealthCondition: true,
  episodeFrequency: '2-3 times per month',
  episodeDuration: '1-2 days per episode',
};

const planConfig = {
  fmla: { tenureMonths: 12, hoursRequired: 1250, maxWeeks: 12 },
  std: { offered: true, waitingDays: 7, durationWeeks: 26, percentPay: 60 },
  statePFL: { state: 'NY', offered: true, bondingWeeks: 12, caregivingWeeks: 12, percentPay: 67 },
  companyBonding: { offered: true, paidWeeks: 6, percentPay: 100 },
};

const stateOptions = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'];

const optionIcons = {
  continuous: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  intermittent: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  reduced: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7v5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  medical_self: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  medical_family: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5"/></svg>,
  child_nonbirth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  child: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 17v3M10 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  military: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25 5.25-1.12 9-6 9-11.25V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  other: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/></svg>,
  birth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  adoption: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-6 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 9v9a2 2 0 002 2h12a2 2 0 002-2V9" stroke="currentColor" strokeWidth="1.5"/></svg>,
  foster: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  immediate: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  later: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M14 15l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  unsure: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.12 2-2.12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.75" fill="currentColor"/></svg>,
};

function CalendarIcon() {
  return (
    <svg className="input-icon input-icon--calendar" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="input-icon input-icon--chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DateInput({ value, onChange, placeholder = 'mm/dd/yyyy', ...props }) {
  const displayValue = value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
  return (
    <div className="date-input-wrapper">
      <input type="text" value={displayValue} readOnly placeholder={placeholder} onClick={(e) => { const hidden = e.target.nextSibling; if (hidden) hidden.showPicker?.(); }} {...props} />
      <input type="date" className="date-input-hidden" value={value} onChange={onChange} tabIndex={-1} />
      <CalendarIcon />
    </div>
  );
}

function SelectInput({ value, onChange, children, ...props }) {
  const options = [];
  const extractOptions = (nodes) => {
    (Array.isArray(nodes) ? nodes : [nodes]).forEach((child) => {
      if (!child) return;
      if (Array.isArray(child)) { extractOptions(child); return; }
      if (child.props && child.type === 'option') {
        options.push({ value: child.props.value ?? child.props.children, label: child.props.children });
      }
    });
  };
  extractOptions(children);
  const selectedLabel = options.find((o) => String(o.value) === String(value))?.label || value || 'Select...';
  return (
    <div className="select-input-wrapper">
      <div className="select-display" onClick={(e) => { const sel = e.currentTarget.nextSibling; if (sel) sel.click(); }}>{selectedLabel}</div>
      <select className="select-hidden" value={value} onChange={onChange} {...props}>{children}</select>
      <ChevronIcon />
    </div>
  );
}

function CommCheckbox({ checked, onChange, label }) {
  return (
    <label className="comm-check" onClick={(e) => { e.preventDefault(); onChange({ target: { checked: !checked } }); }}>
      <span className={`comm-check-box${checked ? ' checked' : ''}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label}
    </label>
  );
}

let _cachedPlanTransfer = null;
function getPlanTransfer() {
  if (_cachedPlanTransfer) return _cachedPlanTransfer;
  try {
    const raw = sessionStorage.getItem('planTransfer');
    if (raw) {
      _cachedPlanTransfer = JSON.parse(raw);
      sessionStorage.removeItem('planTransfer');
      return _cachedPlanTransfer;
    }
  } catch { /* ignore */ }
  return null;
}

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function shortDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col">
            <h4>Resources</h4>
            <a>Leave Policies</a><a>FAQs</a><a>Forms &amp; Documents</a>
          </div>
          <div className="site-footer-col">
            <h4>Support</h4>
            <a>Contact HR</a><a>Help Center</a><a>Report an Issue</a>
          </div>
          <div className="site-footer-col">
            <h4>Legal</h4>
            <a>Privacy Policy</a><a>Terms of Use</a><a>Accessibility</a>
          </div>
          <div className="site-footer-col">
            <h4>Contact</h4>
            <a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon–Fri, 8am–6pm EST</a>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>&copy; 2026 HR Benefits Portal. All rights reserved.</span>
          <div className="site-footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.12 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SiteNav() {
  return (
    <div className="top-nav">
      <div className="nav-main">
        <div className="nav-main-left">
          <a href="/" style={{ textDecoration: "none" }}><div className="nav-brand">my<span>Benefits</span></div></a>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Leaves</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">Find ID Card</button>
          <button className="nav-util" type="button">Messages</button>
          <button className="nav-bell" type="button"><span className="nav-bell-dot"/></button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <Link className="nav-tab" to="/overview-react">My Leave</Link>
        <Link className="nav-tab" to="/plan-absence">Plan Leave</Link>
        <Link className="nav-tab active" to="/wizard">Request Leave</Link>
        <Link className="nav-tab" to="/absence-history">Leave History</Link>
        <Link className="nav-tab" to="/leave-documents">Leave Documents</Link>
      </div>
    </div>
  );
}

function ReadonlyField({ label, value }) {
  return <div className="readonly-field"><div className="field-label">{label}</div><div className="field-value">{value || '—'}</div></div>;
}

function ReviewField({ label, value }) {
  return <div className="review-item"><div className="r-label">{label}</div><div className="r-value">{value || '—'}</div></div>;
}

export default function RequestLeaveReactPage() {
  const navigate = useNavigate();
  const rlLocation = useLocation();
  const isMobileRequest = rlLocation.pathname.startsWith('/claims-and-leave-mobile');
  const rlBase = isMobileRequest ? '/claims-and-leave-mobile' : '/claims-and-leave';
  const [searchParams, setSearchParams] = useSearchParams();
  const hideChrome = searchParams.get('chrome') === '0';
  const [fromPlan] = useState(() => {
    const data = getPlanTransfer();
    console.log('[wizard] planTransfer data:', data);
    return data;
  });
  const [formState, setFormState] = useState(() => {
    var session = null;
    var saved = null;
    var isResume = searchParams.get('resume') === '1';
    try { session = JSON.parse(sessionStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    try { saved = JSON.parse(localStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    if (session && session.formState && !fromPlan) {
      return { ...initialState, ...session.formState };
    }
    if (saved && saved.formState && !fromPlan && isResume) {
      return { ...initialState, ...saved.formState };
    }
    if (fromPlan) {
      return {
        ...initialState,
        leaveScenario: fromPlan.leaveScenario || '',
        leaveType: fromPlan.leaveType || 'continuous',
        leaveStartDate: fromPlan.leaveStartDate || initialState.leaveStartDate,
        expectedReturnDate: fromPlan.expectedReturnDate || initialState.expectedReturnDate,
        reducedHoursPerWeek: fromPlan.reducedHours || initialState.reducedHoursPerWeek,
        employee: {
          ...initialState.employee,
          hireDate: fromPlan.hireDate || initialState.employee.hireDate,
          workLocation: fromPlan.workState ? `${fromPlan.workState}` : initialState.employee.workLocation,
        },
        diagnosis: fromPlan.diagnosis || '',
        firstTreatment: fromPlan.firstTreatment || '',
        nextAppointment: fromPlan.nextAppointment || '',
        providerName: fromPlan.providerName || initialState.providerName,
        providerFacility: fromPlan.providerFacility || initialState.providerFacility,
        providerPhone: fromPlan.providerPhone || initialState.providerPhone,
        providerCity: fromPlan.providerCity || initialState.providerCity,
        providerState: fromPlan.providerState || initialState.providerState,
        providerZip: fromPlan.providerZip || initialState.providerZip,
        authorizeMedCert: fromPlan.providerAuth !== undefined ? fromPlan.providerAuth : initialState.authorizeMedCert,
        email: fromPlan.contactEmail || initialState.email,
        phone: fromPlan.contactPhone || initialState.phone,
        commEmail: fromPlan.prefEmail !== undefined ? fromPlan.prefEmail : initialState.commEmail,
        commPhone: fromPlan.prefPhone !== undefined ? fromPlan.prefPhone : initialState.commPhone,
        commSMS: fromPlan.prefSMS !== undefined ? fromPlan.prefSMS : initialState.commSMS,
        tempAddress: fromPlan.tempAddr !== undefined ? fromPlan.tempAddr : initialState.tempAddress,
        tempStreet: fromPlan.tempStreet || initialState.tempStreet,
        tempCity: fromPlan.tempCity || initialState.tempCity,
        tempState: fromPlan.tempState || initialState.tempState,
        tempZip: fromPlan.tempZip || initialState.tempZip,
        tempStart: fromPlan.tempFrom || initialState.tempStart,
        tempEnd: fromPlan.tempTo || initialState.tempEnd,
      };
    }
    return initialState;
  });
  const [started, setStarted] = useState(() => {
    var session = null;
    var saved = null;
    var isResume = searchParams.get('resume') === '1';
    try { session = JSON.parse(sessionStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    try { saved = JSON.parse(localStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    if (session && session.stepIndex > 0) return true;
    if (saved && saved.stepIndex > 0 && isResume) return true;
    const urlStep = searchParams.get('step');
    return !!fromPlan || (urlStep && urlStep !== '0');
  });
  const [submittedCase, setSubmittedCase] = useState(() => {
    if (searchParams.get('submitted') === '1') {
      return { id: 'NTN-4821', startDate: '2026-06-01', endDate: '2026-09-15', durationDays: 106, leaveType: 'continuous', reason: 'Illness or Injury', provider: 'Dr. Dempsey', facility: "St. Luke's Medical Center", leaveScenario: 'medical_self' };
    }
    return null;
  });
  const [hidePlanBar, setHidePlanBar] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [hoveredBenefitBar, setHoveredBenefitBar] = useState(null);
  const [expandedBenefitBar, setExpandedBenefitBar] = useState(null);
  const [otherReasonError, setOtherReasonError] = useState(false);
  const [employeeInfoFlag, setEmployeeInfoFlag] = useState({ open: false, fields: {}, submitted: false });

  const isChildScenario = formState.leaveScenario === 'child' || formState.leaveScenario === 'child_nonbirth';
  const isBirthingParent = formState.leaveScenario === 'child';
  const isMedicalScenario = formState.leaveScenario === 'medical_self' || formState.leaveScenario === 'medical_family';
  const isMedicalSelf = formState.leaveScenario === 'medical_self';
  const isFamilyCare = formState.leaveScenario === 'medical_family';
  const isMilitary = formState.leaveScenario === 'military';
  const isOther = formState.leaveScenario === 'other';

  function buildSteps(scenario, childScen, birthing, medSelf, famCare) {
    const mil = scenario === 'military';
    const oth = scenario === 'other';
    const nonbirth = scenario === 'child_nonbirth';
    const s = [{ id: 'leaveReason', label: 'Reason', title: 'Why are you taking leave?' }];
    if (medSelf) {
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How would you like to structure your leave?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
      s.push({ id: 'medical', label: 'Condition', title: 'Tell us about your condition' });
      s.push({ id: 'medicalCertConsent', label: 'Consent', title: 'Medical Certification Consent' });
      s.push({ id: 'providerDetails', label: 'Provider', title: 'Provider Details' });
    } else if (birthing) {
      s.push({ id: 'childScenario', label: 'Child', title: 'Has the birth already occurred?' });
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How will you take your absence?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'What does your typical work week look like?' });
      s.push({ id: 'planAware', label: 'Benefits', title: 'A couple more questions' });
      s.push({ id: 'bondingIntent', label: 'Bonding', title: 'When would you like to bond with your child?' });
      s.push({ id: 'medicalCertConsent', label: 'Consent', title: 'Medical Certification Consent' });
      s.push({ id: 'providerDetails', label: 'Provider', title: 'Provider Details' });
    } else if (famCare) {
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How would you like to structure your leave?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
      s.push({ id: 'familyMember', label: 'Family', title: "Tell us about the person you're caring for" });
      s.push({ id: 'familyCondition', label: 'Condition', title: "About the patient's condition" });
      s.push({ id: 'medicalCertConsent', label: 'Consent', title: 'Medical Certification Consent' });
      s.push({ id: 'providerDetails', label: 'Provider', title: "The Patient's Provider Details" });
    } else if (nonbirth) {
      s.push({ id: 'childScenario', label: 'Child', title: 'How are you welcoming your child?' });
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How will you take your absence?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'What does your typical work week look like?' });
      s.push({ id: 'planAware', label: 'Benefits', title: 'A couple more questions' });
    } else if (mil) {
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How will you take your absence?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
    } else if (oth) {
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How would you like to structure your leave?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
    } else {
      s.push({ id: 'leaveStructure', label: 'Structure', title: 'How would you like to structure your leave?' });
      s.push({ id: 'missedTime', label: 'Missed Time', title: 'Did you miss any work time before starting this leave?' });
      s.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
    }
    s.push({ id: 'contact', label: 'Contact', title: 'How should we reach you?' });
    s.push({ id: 'benefits', label: 'Benefits', title: 'Your estimated leave benefits' });
    s.push({ id: 'review', label: 'Review', title: 'Review and submit' });
    return s;
  }

  const steps = useMemo(
    () => buildSteps(formState.leaveScenario, isChildScenario, isBirthingParent, isMedicalSelf, isFamilyCare),
    [formState.leaveScenario, isChildScenario, isBirthingParent, isMedicalSelf, isFamilyCare],
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    var session = null;
    var saved = null;
    var isResume = searchParams.get('resume') === '1';
    const urlStepIdx = searchParams.get('stepIdx');
    if (urlStepIdx !== null) return Math.min(parseInt(urlStepIdx, 10), steps.length - 1);
    try { session = JSON.parse(sessionStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    try { saved = JSON.parse(localStorage.getItem(DRAFT_KEY)); } catch (e) { /* ignore */ }
    if (session && session.stepIndex !== undefined && !fromPlan) {
      return Math.min(session.stepIndex, steps.length - 1);
    }
    if (saved && saved.stepIndex !== undefined && !fromPlan && isResume) {
      return Math.min(saved.stepIndex, steps.length - 1);
    }
    if (!fromPlan) return 0;
    const planSteps = buildSteps(fromPlan.leaveScenario, fromPlan.leaveScenario === 'child' || fromPlan.leaveScenario === 'child_nonbirth', fromPlan.leaveScenario === 'child', fromPlan.leaveScenario === 'medical_self', fromPlan.leaveScenario === 'medical_family');
    const idx = planSteps.findIndex((s) => s.id === 'leaveStructure');
    return idx >= 0 ? idx : 1;
  });

  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, stepIndex: currentStepIndex }));
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, stepIndex: currentStepIndex }));
  }, [formState, currentStepIndex]);

  useEffect(() => {
    if (submittedCase) {
      document.title = `Intake — ${String(steps.length + 1).padStart(2, '0')} Leave Request Submitted`;
    } else if (started && currentStep) {
      document.title = `Intake — ${String(currentStepIndex + 1).padStart(2, '0')} ${currentStep.title}`;
    } else {
      document.title = 'Request Leave — Get Started';
    }
  }, [currentStepIndex, currentStep, started, submittedCase, steps.length]);

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function updateEmployeeField(key, value) {
    setFormState((previous) => ({ ...previous, employee: { ...previous.employee, [key]: value } }));
  }

  function setScheduleValue(source, day, value) {
    setFormState((previous) => {
      if (source === 'scheduleHours') {
        return { ...previous, scheduleHours: { ...previous.scheduleHours, [day]: value } };
      }
      const weekIndex = source;
      const nextWeeks = previous.extraWeeks.map((week, index) => (index === weekIndex ? { ...week, [day]: value } : week));
      return { ...previous, extraWeeks: nextWeeks };
    });
  }

  function addExtraWeek() {
    setFormState((previous) => ({
      ...previous,
      extraWeeks: [...previous.extraWeeks, { sun: '0', mon: '8', tue: '8', wed: '8', thu: '8', fri: '8', sat: '0' }],
    }));
  }

  function removeExtraWeek(index) {
    setFormState((previous) => ({ ...previous, extraWeeks: previous.extraWeeks.filter((_, weekIndex) => weekIndex !== index) }));
  }

  function addMissedDateEntry() {
    setFormState((previous) => ({ ...previous, missedDateEntries: [...previous.missedDateEntries, { date: '', startTime: '', endTime: '', hours: '', reason: '' }] }));
  }

  function updateMissedDateEntry(index, key, value) {
    setFormState((previous) => ({
      ...previous,
      missedDateEntries: previous.missedDateEntries.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [key]: value } : entry)),
    }));
  }

  function removeMissedDateEntry(index) {
    setFormState((previous) => ({
      ...previous,
      missedDateEntries: previous.missedDateEntries.filter((_, entryIndex) => entryIndex !== index),
    }));
  }

  function prefillForScenario(scenario) {
    const prefills = {
      child: {
        diagnosis: 'Pregnancy — expected delivery',
        firstTreatment: '2026-10-15',
        nextAppointment: '2026-05-20',
        providerName: 'Dr. Dempsey',
        providerSuffix: 'OB-GYN',
        providerFacility: "St. Luke's Medical Center",
        providerPhone: '(816) 457-2934',
        providerFax: '(816) 457-2935',
        providerEmail: 'dempsey.herbett@stlukes.com',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      child_nonbirth: {
        diagnosis: '',
        firstTreatment: '',
        nextAppointment: '',
        providerName: '',
        providerSuffix: '',
        providerFacility: '',
        providerPhone: '',
        providerFax: '',
        providerEmail: '',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      medical_self: {
        diagnosis: 'Back Surgery',
        firstTreatment: '2026-04-13',
        nextAppointment: '2026-05-01',
        providerName: 'Dr. Dempsey',
        providerSuffix: 'MD',
        providerFacility: "St. Luke's Medical Center",
        providerPhone: '(816) 457-2934',
        providerFax: '(816) 457-2935',
        providerEmail: 'dempsey.herbett@stlukes.com',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      medical_family: {
        diagnosis: 'Post-stroke rehabilitation',
        firstTreatment: '2026-01-10',
        nextAppointment: '2026-04-25',
        providerName: 'Dr. Lin',
        providerSuffix: 'Neurologist',
        providerFacility: 'Mount Sinai Neurology',
        providerPhone: '(212) 241-7076',
        providerFax: '(212) 241-7077',
        providerEmail: 'c.lin@mountsinai.org',
        familyFirstName: 'Robert',
        familyLastName: 'Johnson',
        familyRelationship: 'parent',
        familyDob: '1958-07-14',
      },
      military: {},
      other: {},
    };
    setFormState((previous) => ({ ...previous, leaveScenario: scenario, ...prefills[scenario] }));
    // Update URL with selected reason
    setSearchParams({ reason: scenario });
  }

  function calculateEligibility() {
    const emp = formState.employee || {};
    const hireDate = new Date(`${emp.hireDate || '2020-01-01'}T00:00:00`);
    const now = new Date();
    const monthsEmployed = (now.getFullYear() - hireDate.getFullYear()) * 12 + (now.getMonth() - hireDate.getMonth());
    const fmlaEligible = monthsEmployed >= planConfig.fmla.tenureMonths;
    return {
      fmla: {
        eligible: fmlaEligible,
        reason: fmlaEligible ? 'Job-protected, unpaid leave' : `Need ${planConfig.fmla.tenureMonths} months tenure`,
        weeks: fmlaEligible ? planConfig.fmla.maxWeeks : 0,
      },
      std: {
        eligible: formState.leaveScenario === 'medical_self' || (formState.leaveScenario === 'child' && formState.childScenario === 'birth'),
        reason: `${planConfig.std.percentPay}% pay after ${planConfig.std.waitingDays}-day waiting period`,
        weeks: planConfig.std.durationWeeks,
      },
      statePFL: {
        eligible: isChildScenario || formState.leaveScenario === 'medical_family',
        reason: `${planConfig.statePFL.state} Paid Family Leave`,
        weeks: isChildScenario ? planConfig.statePFL.bondingWeeks : planConfig.statePFL.caregivingWeeks,
      },
      companyBonding: {
        eligible: isChildScenario,
        reason: `${planConfig.companyBonding.paidWeeks} weeks at ${planConfig.companyBonding.percentPay}% pay`,
        weeks: planConfig.companyBonding.paidWeeks,
      },
    };
  }

  const eligibility = calculateEligibility();

  function renderOptionCard(field, value, title, description, tooltipOnly = false, tooltipPosition) {
    const isSelected = formState[field] === value;
    return (
      <div className={`option-card ${isSelected ? 'selected' : ''}${tooltipOnly ? ' has-tooltip' : ''}`} onClick={() => {
        if (field === 'leaveScenario') {
          prefillForScenario(value);
          return;
        }
        updateField(field, value);
      }}>
        <div className="option-radio"><div className="option-radio-dot"/></div>
        {optionIcons[value] ? <div className="option-card-icon">{optionIcons[value]}</div> : null}
        <div className="option-text">
          <h4>{title}</h4>
          {!tooltipOnly ? <p>{description}</p> : null}
        </div>
        {tooltipOnly && description ? <span className={`oc-tooltip${tooltipPosition === 'right' ? ' oc-tooltip-right' : ''}`}>{description}</span> : null}
      </div>
    );
  }

  function renderEligibilitySummary() {
    const programs = [
      { name: 'FMLA', item: eligibility.fmla },
      { name: 'Short-Term Disability', item: eligibility.std },
      { name: `${planConfig.statePFL.state} Paid Family Leave`, item: eligibility.statePFL },
      { name: 'Company Bonding Benefit', item: eligibility.companyBonding },
    ].filter(({ item }) => item.eligible);
    if (!programs.length) return null;
    return (
      <div className="elig-summary">
        <div className="elig-summary-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3>Estimated Eligibility</h3>
        </div>
        <div className="elig-summary-body">
          {programs.map(({ name, item }) => (
            <div key={name} className="elig-program">
              <div>
                <div className="elig-program-name">{name}</div>
                <div className="elig-program-detail">{item.reason}</div>
              </div>
              <div className="elig-program-right">
                <span className="elig-program-duration">{item.weeks} weeks</span>
                <span className="elig-chip eligible">Eligible</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderTimeline() {
    const bars = [
      eligibility.fmla.eligible ? { label: 'FMLA', css: 'fmla', weeks: eligibility.fmla.weeks } : null,
      eligibility.std.eligible ? { label: 'STD', css: 'std', weeks: formState.leaveScenario === 'child' ? 8 : 6 } : null,
      eligibility.statePFL.eligible ? { label: 'PFL', css: 'pfl', weeks: eligibility.statePFL.weeks } : null,
      eligibility.companyBonding.eligible ? { label: 'Company', css: 'company', weeks: eligibility.companyBonding.weeks } : null,
    ].filter(Boolean);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tlStart = new Date(`${formState.leaveStartDate}T00:00:00`);
    const months = [];
    for (let i = 0; i < 8; i++) { months.push(monthNames[(tlStart.getMonth() + i) % 12]); }
    return (
      <div className="timeline-wrap">
        <div className="timeline-header">
          <div className="timeline-header-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <div>
              <h3>Leave Timeline</h3>
              <div className="helper">Estimated coverage — subject to approval</div>
            </div>
          </div>
        </div>
        <div className="timeline-body">
          <div className="timeline-axis">{months.map((month) => <span key={month}>{month}</span>)}</div>
          <div className="timeline-bars">
            {bars.map((bar) => (
              <div key={bar.label} className="timeline-bar-row">
                <div className="timeline-bar-label">{bar.label}</div>
                <div className="timeline-bar-track">
                  <div className={`timeline-bar-fill ${bar.css}`} style={{ width: `${Math.min((bar.weeks / 28) * 100, 100)}%` }}>{bar.label} {bar.weeks}wk</div>
                </div>
              </div>
            ))}
          </div>
          <div className="timeline-legend">
            {bars.map((bar) => <div key={bar.label} className="timeline-legend-item"><span className={`timeline-legend-dot ${bar.css}`}/>{bar.label}</div>)}
          </div>
        </div>
      </div>
    );
  }

  function scrollToTop() {
    setTimeout(function () {
      window.scrollTo({ top: 0 });
      var frames = document.querySelectorAll('.mobile-frame-screen');
      frames.forEach(function (frame) { frame.scrollTop = 0; });
    }, 0);
  }

  function goNext() {
    if (currentStep.id === 'leaveReason' && formState.leaveScenario === 'other' && !formState.otherLeaveReason) {
      setOtherReasonError(true);
      return;
    }
    setOtherReasonError(false);
    if (currentStep.id === 'medicalCertConsent' && formState.authorizeMedCert === false) {
      var providerIdx = steps.findIndex(function (s) { return s.id === 'providerDetails'; });
      if (providerIdx >= 0 && providerIdx === currentStepIndex + 1) {
        setCurrentStepIndex(function (index) { return Math.min(index + 2, steps.length - 1); });
        scrollToTop();
        return;
      }
    }
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
    scrollToTop();
  }

  function goBack() {
    var prevStep = steps[currentStepIndex - 1];
    if (prevStep && prevStep.id === 'providerDetails' && formState.authorizeMedCert === false) {
      setCurrentStepIndex(function (index) { return Math.max(index - 2, 0); });
      scrollToTop();
      return;
    }
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
    scrollToTop();
  }

  function jumpToStep(stepId) {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
      scrollToTop();
    }
  }

  function saveDraft() {
    const draft = {
      id: `draft-rl-${Date.now()}`,
      type: 'request-leave',
      title: formState.leaveScenario
        ? { medical_self: "Medical Leave (Own Illness)", medical_family: "Family Care Leave", child: "Birthing Parent Leave", child_nonbirth: "Non-Birthing Parent Leave", military: "Military Leave", other: "Other Leave" }[formState.leaveScenario] || 'Leave Request'
        : 'Leave Request',
      reason: formState.leaveScenario || '',
      stepIndex: currentStepIndex,
      totalSteps: steps.length,
      startDate: formState.leaveStartDate,
      savedAt: new Date().toISOString(),
      route: '/request-leave-react',
    };
    const existing = JSON.parse(localStorage.getItem('leaveDrafts') || '[]').filter(d => d.type !== 'request-leave');
    existing.push(draft);
    localStorage.setItem('leaveDrafts', JSON.stringify(existing));
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, stepIndex: currentStepIndex }));
  }

  function saveAndExit() {
    saveDraft();
    navigate('/overview-react');
  }

  function submitRequest() {
    const reference = `NTN-${String(Date.now()).slice(-4)}`;
    const startDate = new Date(`${formState.leaveStartDate}T00:00:00`);
    const endDate = new Date(`${formState.expectedReturnDate}T00:00:00`);
    const durationDays = Math.max(0, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const reason = ({ medical_self: 'Illness or Injury', medical_family: 'Caring for family member', child: 'Birthing parent pregnancy', child_nonbirth: 'Bonding Leave', military: 'Military-related' })[formState.leaveScenario] || 'Leave of Absence';
    const submittedOn = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, ' / ');
    const caseEntry = {
      type: reason,
      id: `NTN #${reference.split('-')[1]}`,
      lastUpdate: submittedOn,
      status: 'In Review',
      statusColor: 'blue',
      required: null,
      actions: ['View Details'],
      linkPath: '/case-detail',
      leaveType: formState.leaveType,
      startDate: formState.leaveStartDate,
      endDate: formState.expectedReturnDate,
      leaveScenario: formState.leaveScenario,
      sendCertToPhysician: formState.sendCertToPhysician,
      childScenario: formState.childScenario,
    };
    const existing = JSON.parse(localStorage.getItem('submittedLeaves') || '[]');
    existing.unshift(caseEntry);
    localStorage.setItem('submittedLeaves', JSON.stringify(existing));
    setSubmittedCase({
      id: reference,
      startDate: formState.leaveStartDate,
      endDate: formState.expectedReturnDate,
      durationDays,
      leaveType: formState.leaveType,
      reason,
      provider: formState.providerName,
      facility: formState.providerFacility,
      submittedOn: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    });
    scrollToTop();
  }

  function renderMissedEntries() {
    const showReason = formState.leaveType === 'intermittent' || formState.leaveType === 'reduced';
    const totalHours = formState.missedDateEntries.reduce((sum, e) => {
      const parsed = parseFloat(e.hours) || 0;
      return sum + parsed;
    }, 0);
    return (
      <>
        {formState.missedDateEntries.map((entry, index) => (
          <div key={`${index}-${entry.date}`} className="missed-entry">
            <div className="missed-entry-top">
              <strong className="missed-entry-title">Missed Day {index + 1}</strong>
              {formState.missedDateEntries.length > 1 ? <button type="button" className="missed-entry-remove-text" onClick={() => removeMissedDateEntry(index)}>—</button> : null}
            </div>
            <div className="missed-entry-row1">
              <div className="form-group missed-entry-date">
                <label>{showReason ? 'Day(s) you missed work' : 'Date'}</label>
                <DateInput value={entry.date} onChange={(event) => updateMissedDateEntry(index, 'date', event.target.value)}/>
              </div>
              {showReason && (
                <div className="form-group missed-entry-time">
                  <label>Start Time</label>
                  <input type="text" placeholder="8:00 AM" value={entry.startTime || ''} onChange={(event) => updateMissedDateEntry(index, 'startTime', event.target.value)}/>
                </div>
              )}
              {showReason && (
                <div className="form-group missed-entry-time">
                  <label>End Time</label>
                  <input type="text" placeholder="4:00 PM" value={entry.endTime || ''} onChange={(event) => updateMissedDateEntry(index, 'endTime', event.target.value)}/>
                </div>
              )}
              <div className="form-group missed-entry-hours">
                <label>{showReason ? 'Total Hrs/Min' : 'Hrs/Min'}</label>
                <input type="text" value={entry.hours} onChange={(event) => updateMissedDateEntry(index, 'hours', event.target.value)}/>
              </div>
            </div>
            {showReason ? (
              <div className="missed-entry-row2">
                <div className="form-group missed-entry-reason">
                  <label>Reason</label>
                  <SelectInput value={entry.reason || ''} onChange={(event) => updateMissedDateEntry(index, 'reason', event.target.value)}>
                    <option value="">Select reason</option>
                    <option value="Episode">Episode</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Flare-up">Flare-up</option>
                    <option value="Appointment">Appointment</option>
                    <option value="Other">Other</option>
                  </SelectInput>
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <button type="button" className="rotation-add" onClick={addMissedDateEntry}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Add Date</button>
        {showReason && totalHours > 0 ? (
          <div className="ds-total-hours">{totalHours} total hours missed</div>
        ) : null}
      </>
    );
  }

  function renderStepContent() {
    switch (currentStep.id) {
      case 'leaveReason': {
        const reasonDescriptions = {
          medical_self: 'You need time off for surgery, illness, injury, or recovery.',
          medical_family: 'Someone close to you needs your care due to a serious health condition.',
          child_nonbirth: "You're welcoming a child through adoption, foster care, or as a non-birthing parent.",
          child: "You're having a baby or need time for pregnancy and bonding.",
          military: 'You need time off for qualifying military exigency or to care for a service member.',
          other: "Your reason doesn't fit the categories above.",
        };
        return (
          <>
            <h2 style={{ marginBottom: 20 }}>Why are you taking leave?</h2>
            <div className="option-cards">
              {renderOptionCard('leaveScenario', 'medical_self', "Employee's Own Illness or Injury", '', true)}
              {renderOptionCard('leaveScenario', 'medical_family', 'Care for Sick Family Member with Health Condition', '', true)}
              {renderOptionCard('leaveScenario', 'child_nonbirth', 'Non-Birthing Parent, Adoption, or Foster Care Placement (Bonding)', '', true, 'right')}
              {renderOptionCard('leaveScenario', 'child', 'Birthing Parent, Pregnancy, or Bonding', '', true)}
              {renderOptionCard('leaveScenario', 'military', 'Military Related Activity', '', true)}
              {renderOptionCard('leaveScenario', 'other', 'Other', '', true)}
            </div>
            {formState.leaveScenario && reasonDescriptions[formState.leaveScenario] ? (
              <div className="lt-context" style={{ marginTop: 16 }}>
                <p className="lt-context-desc">{reasonDescriptions[formState.leaveScenario]}</p>
              </div>
            ) : null}
            {formState.leaveScenario === 'other' && (
              <div className="form-group" style={{ marginTop: 16 }}>
                <label>Select a reason</label>
                <SelectInput value={formState.otherLeaveReason} onChange={(event) => { updateField('otherLeaveReason', event.target.value); setOtherReasonError(false); }}>
                  <option value="">Select...</option>
                  <option value="Personal">Personal</option>
                  <option value="Court Appearance/Witness Leave">Court Appearance/Witness Leave</option>
                  <option value="Crime Victim/Safe Leave">Crime Victim/Safe Leave</option>
                  <option value="Volunteer Emergency Responder">Volunteer Emergency Responder</option>
                  <option value="Organ or Blood Donor">Organ or Blood Donor</option>
                  <option value="Voting">Voting</option>
                </SelectInput>
                {otherReasonError && !formState.otherLeaveReason && (
                  <div className="ds-error-msg">Please select a reason to continue.</div>
                )}
              </div>
            )}
          </>
        );
      }
      case 'leaveStructure':
        return (
          <>
            <h2>{isChildScenario || isMilitary ? 'How will you take your absence?' : 'How would you like to structure your leave?'}</h2>
            <p className="subtitle">This helps us figure out which benefits and protections apply.</p>
            <div className="lt-picker">
              {['continuous', 'intermittent', 'reduced'].map((type) => (
                <button key={type} type="button" className={`lt-btn ${formState.leaveType === type ? 'selected' : ''}`} onClick={() => updateField('leaveType', type)}>
                  <span className="lt-btn-icon">{optionIcons[type]}</span>
                  <span className="lt-btn-label">{type === 'continuous' ? 'Continuous' : type === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
                </button>
              ))}
            </div>
            <div className="lt-context">
              <p className="lt-context-desc">{formState.leaveType === 'continuous' ? "You'll be fully away from work for the duration of your absence." : formState.leaveType === 'intermittent' ? "Your schedule will vary, as you need time off for flare-ups, treatment, or appointments." : "Reduced Schedule is typically a set or consistent schedule adjustment per day, per week."}</p>
              <h3 className="section-title">Provide your leave details</h3>
              <div className="bordered-section">
                {formState.leaveType === 'continuous' ? (
                  <>
                    <div className="form-row cols-2">
                      <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><DateInput value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                      <div className="form-group"><label>Expected Return to Work Date</label><DateInput value={formState.expectedReturnDate} onChange={(event) => updateField('expectedReturnDate', event.target.value)}/><div className="helper">Your best estimate of when you expect to return to work.</div></div>
                    </div>
                    <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>What was your last day worked?</label><DateInput value={formState.lastDayWorked} onChange={(event) => updateField('lastDayWorked', event.target.value)}/></div>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>Hours missed on last day worked<span className="req">*</span></label><input type="text" value={formState.hoursLastDay} onChange={(event) => updateField('hoursLastDay', event.target.value)}/></div>
                    </div>
                  </>
                ) : formState.leaveType === 'intermittent' ? (
                  <>
                    <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><DateInput value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                    <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>What was your last day worked?</label><DateInput value={formState.lastDayWorked} onChange={(event) => updateField('lastDayWorked', event.target.value)}/></div>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>Hours missed on last day worked<span className="req">*</span></label><input type="text" value={formState.hoursLastDay} onChange={(event) => updateField('hoursLastDay', event.target.value)}/></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-row cols-2">
                      <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><DateInput value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                      <div className="form-group"><label>Hours per week you plan to work</label><input type="number" value={formState.reducedHoursPerWeek} onChange={(event) => updateField('reducedHoursPerWeek', event.target.value)}/></div>
                    </div>
                    <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>What was your last day worked?</label><DateInput value={formState.lastDayWorked} onChange={(event) => updateField('lastDayWorked', event.target.value)}/></div>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>Hours missed on last day worked<span className="req">*</span></label><input type="text" value={formState.hoursLastDay} onChange={(event) => updateField('hoursLastDay', event.target.value)}/></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );
      case 'missedTime': {
        const isIntermittentOrReduced = formState.leaveType === 'intermittent' || formState.leaveType === 'reduced';
        const isContinuous = formState.leaveType === 'continuous';
        return (
          <>
            <h2>Did you miss any work time before starting this leave?</h2>
            <p className="subtitle">Log any work days you've already missed for this condition.</p>
            <div className="radio-list" style={{ marginBottom: 16 }}>
              <label className="radio-option" onClick={() => updateField('alreadyMissedTime', false)}><span className={`radio-circle${formState.alreadyMissedTime === false ? ' selected' : ''}`}/> No</label>
              <label className="radio-option" onClick={() => updateField('alreadyMissedTime', true)}><span className={`radio-circle${formState.alreadyMissedTime === true ? ' selected' : ''}`}/> Yes</label>
            </div>
            {formState.alreadyMissedTime && isContinuous ? (
              <div className="bordered-section">
                <div className="form-row cols-2">
                  <div className="form-group">
                    <label>What was the first day you missed work? <span className="req">*</span></label>
                    <DateInput value={formState.missedDateEntries[0]?.date || ''} onChange={(event) => updateMissedDateEntry(0, 'date', event.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Hours scheduled to work <span className="req">*</span></label>
                    <input type="text" placeholder="HH:MM" value={formState.missedDateEntries[0]?.hours || ''} onChange={(event) => updateMissedDateEntry(0, 'hours', event.target.value)} />
                  </div>
                </div>
              </div>
            ) : formState.alreadyMissedTime && !isContinuous ? (
              <div className="bordered-section">
                {renderMissedEntries()}
              </div>
            ) : formState.alreadyMissedTime === false && !isIntermittentOrReduced ? (
              <div className="ds-info-hint">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/></svg>
                Time missed before your leave start date counts toward your eligibility and total
              </div>
            ) : null}
          </>
        );
      }
      case 'medical':
        if (formState.leaveScenario === 'medical_family') {
          return (
            <>
              <h2>Tell us about the person you're caring for</h2>
              <p className="subtitle">We need a few details about your family member to determine your coverage.</p>
              <div className="bordered-section">
                <div className="form-row cols-2">
                  <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={formState.familyFirstName} onChange={(event) => updateField('familyFirstName', event.target.value)}/></div>
                  <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={formState.familyLastName} onChange={(event) => updateField('familyLastName', event.target.value)}/></div>
                </div>
                <div className="form-row cols-2">
                  <div className="form-group"><label>Relationship <span className="req">*</span></label><SelectInput value={formState.familyRelationship} onChange={(event) => updateField('familyRelationship', event.target.value)}><option value="">Select...</option><option value="spouse">Spouse</option><option value="parent">Parent</option><option value="child">Child</option><option value="sibling">Sibling</option><option value="other">Other</option></SelectInput></div>
                  <div className="form-group"><label>Date of Birth</label><DateInput value={formState.familyDob} onChange={(event) => updateField('familyDob', event.target.value)}/></div>
                </div>
              </div>
              <div className="bordered-section">
                <div className="form-group"><label>Diagnosis / Condition</label><input type="text" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
                <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}><label>First Date of Treatment</label><DateInput value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
                  <div className="form-group" style={{ marginBottom: 0 }}><label>Next Scheduled Appointment</label><DateInput value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
                </div>
              </div>
            </>
          );
        }
        return (
          <>
            <h2>Tell us about your condition</h2>
            <p className="subtitle">Your provider will handle the clinical certification. This helps us start the right process.</p>
            <div className="bordered-section">
            <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Will you be hospitalized or need ongoing treatment? <span className="req">*</span></label>
            <div className="radio-list">
              <label className="radio-option" onClick={() => updateField('seriousHealthCondition', false)}><span className={`radio-circle${formState.seriousHealthCondition === false ? ' selected' : ''}`}/> No</label>
              <label className="radio-option" onClick={() => updateField('seriousHealthCondition', true)}><span className={`radio-circle${formState.seriousHealthCondition === true ? ' selected' : ''}`}/> Yes</label>
            </div>
            </div>
            {formState.seriousHealthCondition && (
            <div className="bordered-section">
            <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Is your injury/illness related to your job or workplace? <span className="req">*</span></label>
            <div className="radio-list">
              <label className="radio-option" onClick={() => updateField('workersComp', 'no')}><span className={`radio-circle${formState.workersComp === 'no' ? ' selected' : ''}`}/> No</label>
              <label className="radio-option" onClick={() => updateField('workersComp', 'yes')}><span className={`radio-circle${formState.workersComp === 'yes' ? ' selected' : ''}`}/> Yes</label>
            </div>
            </div>
            )}
            <div className="bordered-section">
              <h3 className="section-title">Your Condition Details</h3>
              <div className="form-group"><label>Medical Condition (Optional)</label><input type="text" placeholder="e.g., back surgery, chronic condition" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>First Date of Treatment (Optional)</label><DateInput value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Next Scheduled Appointment (Optional)</label><DateInput value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
              </div>
            </div>
          </>
        );
      case 'provider':
        return (
          <>
            <h2>Provider details</h2>
            <p className="subtitle">Tell us more about your medical provider.</p>
            <div className="bordered-section">
              <h3 className="section-title">Basic Provider Info</h3>
              <div className="form-group"><label>Facility / Practice Name</label><input type="text" value={formState.providerFacility} onChange={(event) => updateField('providerFacility', event.target.value)}/></div>
              <div className="form-group"><label>Provider Name</label>
                <div className="provider-name-row" style={{ marginBottom: 0 }}>
                  <SelectInput value={formState.providerSuffix || 'Dr'} onChange={(event) => updateField('providerSuffix', event.target.value)}><option value="Dr">Dr</option><option value="NP">NP</option><option value="PA">PA</option></SelectInput>
                  <input type="text" value={formState.providerName} onChange={(event) => updateField('providerName', event.target.value)}/>
                </div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group"><label>Phone</label><input type="tel" value={formState.providerPhone} onChange={(event) => updateField('providerPhone', event.target.value)}/></div>
                <div className="form-group"><label>Fax</label><input type="tel" value={formState.providerFax} onChange={(event) => updateField('providerFax', event.target.value)}/></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" value={formState.providerEmail} onChange={(event) => updateField('providerEmail', event.target.value)}/></div>
            </div>
            <div className="bordered-section">
              <h3 className="section-title">Address</h3>
              <div className="form-group"><label>Street Address</label><input type="text" value={formState.providerStreet} onChange={(event) => updateField('providerStreet', event.target.value)}/></div>
              <div className="form-row cols-3" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={formState.providerCity} onChange={(event) => updateField('providerCity', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><SelectInput value={formState.providerState} onChange={(event) => updateField('providerState', event.target.value)}><option value="">Select...</option>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>ZIP</label><input type="text" value={formState.providerZip} onChange={(event) => updateField('providerZip', event.target.value)}/></div>
              </div>
            </div>
            <div className="bordered-section bordered-section--white">
              <div className="checkbox-row" onClick={() => updateField('authorizeMedCert', !formState.authorizeMedCert)}>
                <div className={`checkbox-box ${formState.authorizeMedCert ? 'checked' : ''}`}><span className="check-icon">✓</span></div>
                <div>
                  <div className="checkbox-text">I authorize sending medical certification to my provider</div>
                  <div className="checkbox-desc">We'll send your provider a form to complete to support your leave request.</div>
                </div>
              </div>
            </div>
          </>
        );
      case 'familyMember':
        return (
          <>
            <h2>Tell us about the person you&rsquo;re caring for</h2>
            <p className="subtitle">We need a few details about your family member to determine your coverage. Their medical information will be kept confidential.</p>
            <div className="bordered-section">
              <div className="section-title ds-section-title-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>Family Member Information</div>
              <div className="form-row cols-2">
                <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={formState.familyFirstName} onChange={(event) => updateField('familyFirstName', event.target.value)}/></div>
                <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={formState.familyLastName} onChange={(event) => updateField('familyLastName', event.target.value)}/></div>
              </div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Relationship <span className="req">*</span></label><SelectInput value={formState.familyRelationship} onChange={(event) => updateField('familyRelationship', event.target.value)}><option value="">Select...</option><option value="spouse">Spouse</option><option value="parent">Parent</option><option value="child">Child</option><option value="sibling">Sibling</option><option value="other">Other</option></SelectInput></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Date of Birth</label><DateInput value={formState.familyDob} onChange={(event) => updateField('familyDob', event.target.value)}/></div>
              </div>
            </div>
          </>
        );
      case 'familyCondition':
        return (
          <>
            <h2>About the patient&rsquo;s condition</h2>
            <p className="subtitle">Your provider will handle the clinical certification. This helps us start the right process.</p>
            <div className="bordered-section">
              <div className="form-group"><label>Medical Condition <span className="req">*</span></label><input type="text" placeholder="e.g., back surgery, chronic condition" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>First Date of Treatment</label><DateInput value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Next Scheduled Appointment</label><DateInput value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
              </div>
            </div>
            <div className="bordered-section">
              <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Will the person being cared for be hospitalized or need ongoing treatment? <span className="req">*</span></label>
              <div className="radio-list" style={{ marginTop: 8 }}>
                <label className="radio-option" onClick={() => updateField('seriousHealthCondition', false)}><span className={`radio-circle${formState.seriousHealthCondition === false ? ' selected' : ''}`}/> No</label>
                <label className="radio-option" onClick={() => updateField('seriousHealthCondition', true)}><span className={`radio-circle${formState.seriousHealthCondition === true ? ' selected' : ''}`}/> Yes</label>
              </div>
            </div>
          </>
        );
      case 'providerDetails':
        return (
          <>
            <h2>{isFamilyCare ? "The Patient's Provider Details" : "Provider Details"}</h2>
            <p className="subtitle">{isFamilyCare ? "Tell us more how to contact the patient's medical provider." : "Tell us more how to contact your medical provider."}</p>
            <div className="bordered-section">
              <div className="form-group"><label>Facility / Practice Name</label><input type="text" value={formState.providerFacility} onChange={(event) => updateField('providerFacility', event.target.value)}/></div>
              <div className="provider-name-row">
                <div className="form-group" style={{ marginBottom: 0 }}><label>Provider Name</label><input type="text" value={formState.providerName} onChange={(event) => updateField('providerName', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Suffix</label><input type="text" value={formState.providerSuffix} onChange={(event) => updateField('providerSuffix', event.target.value)}/></div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group"><label>Phone</label><input type="tel" value={formState.providerPhone} onChange={(event) => updateField('providerPhone', event.target.value)}/></div>
                <div className="form-group"><label>Fax</label><input type="tel" value={formState.providerFax} onChange={(event) => updateField('providerFax', event.target.value)}/></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" value={formState.providerEmail} onChange={(event) => updateField('providerEmail', event.target.value)}/></div>
              <div className="form-group"><label>Street Address</label><input type="text" value={formState.providerStreet} onChange={(event) => updateField('providerStreet', event.target.value)}/></div>
              <div className="form-row cols-3" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={formState.providerCity} onChange={(event) => updateField('providerCity', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><SelectInput value={formState.providerState} onChange={(event) => updateField('providerState', event.target.value)}><option value="">Select...</option>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>ZIP</label><input type="text" value={formState.providerZip} onChange={(event) => updateField('providerZip', event.target.value)}/></div>
              </div>
            </div>
            <div className="ds-info-callout">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
              <span><strong>This is an estimate.</strong> By providing this information you're authorizing Mutual of Omaha to send paperwork to your health care provider.</span>
            </div>
            <button type="button" className="rotation-add"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Add Another Provider</button>
          </>
        );
      case 'medicalCertConsent':
        return (
          <>
            <h2>Medical certification consent</h2>
            <p className="subtitle" style={{ lineHeight: 1.7 }}>You are responsible for ensuring the healthcare provider receives and completes the certification and for providing the form to Mutual of Omaha on time. Mutual of Omaha can send the certifications to your provider to help expedite processing.</p>
            <div className="bordered-section">
              <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 400, letterSpacing: 0, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>Would you like to authorize Mutual of Omaha to send any required certifications directly to the healthcare provider for completion or clarification?</label>
              <div className="radio-list" style={{ marginTop: 12 }}>
                <label className="radio-option" onClick={() => updateField('authorizeMedCert', false)}><span className={`radio-circle${formState.authorizeMedCert === false ? ' selected' : ''}`}/> No</label>
                <label className="radio-option" onClick={() => updateField('authorizeMedCert', true)}><span className={`radio-circle${formState.authorizeMedCert === true ? ' selected' : ''}`}/> Yes</label>
              </div>
            </div>
          </>
        );
      case 'medicalCert':
        return (
          <>
            <h2>Medical certification consent</h2>
            <p className="subtitle" style={{ lineHeight: 1.7 }}>You are responsible for ensuring the healthcare provider receives and completes the certification and for providing the form to Mutual of Omaha on time. Mutual of Omaha can send the certifications to your provider to help expedite processing.</p>
            <div className="bordered-section">
              <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 400, letterSpacing: 0, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>Would you like to authorize Mutual of Omaha to send any required certifications directly to the healthcare provider for completion or clarification?</label>
              <div className="radio-list" style={{ marginTop: 12 }}>
                <label className="radio-option" onClick={() => updateField('sendCertToPhysician', false)}><span className={`radio-circle${formState.sendCertToPhysician === false ? ' selected' : ''}`}/> No</label>
                <label className="radio-option" onClick={() => updateField('sendCertToPhysician', true)}><span className={`radio-circle${formState.sendCertToPhysician === true ? ' selected' : ''}`}/> Yes</label>
              </div>
            </div>
            {formState.sendCertToPhysician ? (
              <>
                <div className="bordered-section">
                  <div className="form-group"><label>Facility / Practice Name</label><input type="text" value={formState.providerFacility} onChange={(event) => updateField('providerFacility', event.target.value)}/></div>
                  <div className="provider-name-row">
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Provider Name <span className="req">*</span></label><input type="text" value={formState.providerName} onChange={(event) => updateField('providerName', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Suffix</label><input type="text" value={formState.providerSuffix} onChange={(event) => updateField('providerSuffix', event.target.value)}/></div>
                  </div>
                  <div className="form-row cols-2">
                    <div className="form-group"><label>Phone</label><input type="tel" value={formState.providerPhone} onChange={(event) => updateField('providerPhone', event.target.value)}/></div>
                    <div className="form-group"><label>Fax</label><input type="tel" value={formState.providerFax} onChange={(event) => updateField('providerFax', event.target.value)}/></div>
                  </div>
                  <div className="form-group"><label>Email</label><input type="email" value={formState.providerEmail} onChange={(event) => updateField('providerEmail', event.target.value)}/></div>
                  <div className="form-group"><label>Street Address</label><input type="text" value={formState.providerStreet} onChange={(event) => updateField('providerStreet', event.target.value)}/></div>
                  <div className="form-row cols-3" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={formState.providerCity} onChange={(event) => updateField('providerCity', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><SelectInput value={formState.providerState} onChange={(event) => updateField('providerState', event.target.value)}><option value="">Select...</option>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>ZIP</label><input type="text" value={formState.providerZip} onChange={(event) => updateField('providerZip', event.target.value)}/></div>
                  </div>
                </div>
                <div className="bordered-section bordered-section--white">
                  <div className="checkbox-row" onClick={() => updateField('authorizeMedCert', !formState.authorizeMedCert)}>
                    <div className={`checkbox-box ${formState.authorizeMedCert ? 'checked' : ''}`}><span className="check-icon">✓</span></div>
                    <div>
                      <div className="checkbox-text">I authorize sending medical certification to my provider</div>
                      <div className="checkbox-desc">We'll send your provider a form to complete to support your leave request.</div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        );
      case 'leaveDetails':
        return (
          <>
            <h2>What does your typical week look like?</h2>
            <p className="subtitle">This helps us calculate your leave accurately. Most full-time employees work about 40 hours a week — just adjust the numbers if yours is different.</p>
            <div className="bordered-section">
              <div className="schedule-header-row">
                <h3 className="section-title" style={{ marginBottom: 0 }}>Weekly Hours</h3>
                <div className="schedule-total-badge">Weekly total <strong>{Object.values(formState.scheduleHours).reduce((sum, h) => sum + Number(h || 0), 0)}</strong> hrs / week</div>
              </div>
              <div className="helper" style={{ marginBottom: 12 }}>Click each day to enter hours. Default is 8 hours/day for weekdays.</div>
              <div className="schedule-grid">
                {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, index) => (
                  <div key={day} className="schedule-day">
                    <div className="schedule-day-label">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                    <div className="schedule-day-wrap">
                      <div className={`schedule-day-box ${Number(formState.scheduleHours[day]) > 0 ? 'has-hours' : ''}${day === 'sun' || day === 'sat' ? ' weekend' : ''}`}>
                        <input className="schedule-day-input" type="number" value={formState.scheduleHours[day]} onChange={(event) => setScheduleValue('scheduleHours', day, event.target.value)}/>
                      </div>
                      <div className="schedule-day-unit">hrs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {formState.extraWeeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="bordered-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div className="section-title" style={{ marginBottom: 0 }}>Alternate Week</div>
                  <button type="button" className="rotation-remove" onClick={() => removeExtraWeek(weekIndex)}>Remove</button>
                </div>
                <div className="schedule-grid">
                  {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, index) => (
                    <div key={`${weekIndex}-${day}`} className="schedule-day">
                      <div className="schedule-day-label">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                      <div className="schedule-day-wrap">
                        <div className={`schedule-day-box ${Number(week[day]) > 0 ? 'has-hours' : ''}${day === 'sun' || day === 'sat' ? ' weekend' : ''}`}>
                          <input className="schedule-day-input" type="number" value={week[day]} onChange={(event) => setScheduleValue(weekIndex, day, event.target.value)}/>
                        </div>
                        <div className="schedule-day-unit">hrs</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {formState.extraWeeks.length === 0 && (
              <>
                <button type="button" className="rotation-add" onClick={addExtraWeek}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Add Week</button>
                <div className="helper" style={{ marginTop: 8 }}>Add an alternate week if your schedule rotates or varies week-to-week (e.g., compressed schedules, alternating shifts).</div>
              </>
            )}
          </>
        );
      case 'childScenario':
        if (isBirthingParent) {
          return (
            <>
              <h2>Has the birth already occurred?</h2>
              <div className="yesno" style={{ marginBottom: 16 }}>
                <button type="button" className={`yesno-btn ${formState.childAlreadyExists ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.childAlreadyExists === false ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', false)}>No</button>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>{formState.childAlreadyExists ? 'Date of Birth' : 'Expected Due Date'} <span className="req">*</span></label><DateInput value={formState.childAlreadyExists ? formState.childDate : formState.expectedDate} onChange={(event) => formState.childAlreadyExists ? updateField('childDate', event.target.value) : updateField('expectedDate', event.target.value)}/></div>
            </>
          );
        }
        return (
          <>
            <h2>How are you welcoming your child?</h2>
            <p className="subtitle">This helps us determine which benefits apply.</p>
            <div className="lt-picker">
              {['birth', 'adoption', 'foster'].map((type) => (
                <button key={type} type="button" className={`lt-btn ${formState.childScenario === type ? 'selected' : ''}`} onClick={() => updateField('childScenario', type)}>
                  <span className="lt-btn-icon">{optionIcons[type]}</span>
                  <span className="lt-btn-label">{type === 'birth' ? 'Birth' : type === 'adoption' ? 'Adoption' : 'Foster Care'}</span>
                </button>
              ))}
            </div>
            <div className="lt-context">
              <p className="lt-context-desc">{formState.childScenario === 'birth' ? 'Includes medical recovery time plus bonding leave.' : 'Includes bonding leave from the date of placement.'}</p>
              <div className="lt-detail-fields">
                {formState.childScenario === 'foster' ? (
                  <div className="form-group" style={{ marginBottom: 0 }}><label>Placement Date <span className="req">*</span></label><DateInput value={formState.childDate} onChange={(event) => updateField('childDate', event.target.value)}/></div>
                ) : (
                  <>
                    <label>{formState.childScenario === 'birth' ? 'Has the birth already occurred?' : 'Has the child been placed with you yet?'}</label>
                    <div className="yesno" style={{ marginBottom: 0 }}>
                      <button type="button" className={`yesno-btn ${formState.childAlreadyExists ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', true)}>Yes</button>
                      <button type="button" className={`yesno-btn ${formState.childAlreadyExists === false ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', false)}>No</button>
                    </div>
                    <div style={{ marginTop: '14px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>{formState.childAlreadyExists ? (formState.childScenario === 'birth' ? 'Date of Birth' : 'Placement Date') : (formState.childScenario === 'birth' ? 'Expected Due Date' : 'Expected Placement Date')} <span className="req">*</span></label><DateInput value={formState.childAlreadyExists ? formState.childDate : formState.expectedDate} onChange={(event) => formState.childAlreadyExists ? updateField('childDate', event.target.value) : updateField('expectedDate', event.target.value)}/></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );
      case 'planAware':
        return (
          <>
            <h2>A couple more questions</h2>
            <p className="subtitle">These help us determine the right combination of benefits for your situation.</p>
            <div className="bordered-section">
              <div className="section-title ds-section-title-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Spousal Sharing</div>
              <p className="helper">Does your spouse or domestic partner work for the same company?</p>
              <p className="ds-field-note" style={{ lineHeight: 1.6, margin: '0 0 12px' }}>This matters because if you both work here, some bonding time is shared between you (a combined 12 weeks). If not, you each get your own.</p>
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer === false ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', false)}>No</button>
              </div>
              {formState.spouseSameEmployer ? <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}><label>Spouse / Partner Name <span className="req">*</span></label><input type="text" value={formState.spouseName} onChange={(event) => updateField('spouseName', event.target.value)}/></div> : null}
            </div>
            <div className="bordered-section">
              <div className="section-title ds-section-title-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/></svg>Primary Caregiver</div>
              <p className="helper">Will you be the primary caregiver for this child?</p>
              <p className="ds-field-note" style={{ lineHeight: 1.6, margin: '0 0 12px' }}>The primary caregiver is the parent who provides most of the day-to-day care. This can affect the length and type of absence you receive.</p>
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === true ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === false ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', false)}>No</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === 'unsure' ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', 'unsure')}>Not sure yet</button>
              </div>
            </div>
          </>
        );
      case 'bondingIntent':
        return (
          <>
            <h2>When would you like to bond with your child?</h2>
            <p className="subtitle">Bonding time is time set aside for you to be with your new child. You don't have to decide everything now.</p>
            <div className="option-cards">
              {renderOptionCard('bondingIntent', 'immediate', 'Right away', 'I want to go straight from recovery into bonding time.')}
              {renderOptionCard('bondingIntent', 'later', "I'll come back first", "I'd like to return to work and take bonding time later.")}
              {renderOptionCard('bondingIntent', 'unsure', 'Not sure yet', "I'll figure it out later — that's totally fine.")}
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            <h2>How should we reach you?</h2>
            <p className="subtitle">Tell us more about your medical provider.</p>
            <div className="bordered-section">
              <h3 className="section-title">Contact Details</h3>
              <div className="form-row cols-2">
                <div className="form-group"><label>Email Address <span className="req">*</span></label><input type="email" value={formState.email} onChange={(event) => updateField('email', event.target.value)}/></div>
                <div className="form-group"><label>Phone (Call) <span className="req">*</span></label><input type="tel" value={formState.phone} onChange={(event) => updateField('phone', event.target.value)}/></div>
              </div>
              <div style={{ marginTop: '4px' }}>
                <label className="comm-section-label">Preferred Communication Method</label>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <CommCheckbox checked={formState.commEmail} onChange={(event) => updateField('commEmail', event.target.checked)} label="Email" />
                  <CommCheckbox checked={formState.commPhone} onChange={(event) => updateField('commPhone', event.target.checked)} label="Phone (Call)" />
                  <CommCheckbox checked={formState.commSMS} onChange={(event) => updateField('commSMS', event.target.checked)} label="SMS" />
                </div>
              </div>
            </div>
            <div className="bordered-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="section-title" style={{ marginBottom: '4px' }}>Temporary Address</div>
                  <p className="helper" style={{ marginTop: 0 }}>Will you be at a different address during your leave?</p>
                </div>
                <div className={`toggle ${formState.tempAddress ? 'on' : ''}`} onClick={() => updateField('tempAddress', !formState.tempAddress)}><div className="toggle-knob"/></div>
              </div>
              {formState.tempAddress ? (
                <div className="comm-divider">
                  <div className="form-group"><label>Street Address</label><input type="text" value={formState.tempStreet} onChange={(event) => updateField('tempStreet', event.target.value)}/></div>
                  <div className="form-row cols-3">
                    <div className="form-group"><label>City</label><input type="text" value={formState.tempCity} onChange={(event) => updateField('tempCity', event.target.value)}/></div>
                    <div className="form-group"><label>State</label><SelectInput value={formState.tempState} onChange={(event) => updateField('tempState', event.target.value)}>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</SelectInput></div>
                    <div className="form-group"><label>ZIP</label><input type="text" value={formState.tempZip} onChange={(event) => updateField('tempZip', event.target.value)}/></div>
                  </div>
                  <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Start Date</label><DateInput value={formState.tempStart} onChange={(event) => updateField('tempStart', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>End Date</label><DateInput value={formState.tempEnd} onChange={(event) => updateField('tempEnd', event.target.value)}/></div>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        );
      case 'benefits': {
        const barColors = ['#003a70', '#105fa8', '#007a8a', '#16a34a'];
        const startDate = new Date(`${formState.leaveStartDate}T00:00:00`);
        const endDate = new Date(`${formState.expectedReturnDate}T00:00:00`);
        const addWeeks = (d, w) => { const r = new Date(d); r.setDate(r.getDate() + w * 7); return r; };

        const fmlaEnd = addWeeks(startDate, eligibility.fmla.weeks);
        const stdStart = new Date(startDate); stdStart.setDate(stdStart.getDate() + planConfig.std.waitingDays);
        const stdEnd = addWeeks(stdStart, eligibility.std.weeks);
        const pflEnd = addWeeks(startDate, eligibility.statePFL.weeks);
        const bondStart = eligibility.std.eligible ? stdEnd : endDate;
        const bondEnd = addWeeks(bondStart, eligibility.companyBonding.weeks);

        const benefitBars = [
          eligibility.fmla.eligible ? { label: 'FMLA', color: barColors[0], weeks: eligibility.fmla.weeks, pay: 'Job-protected, unpaid', startDate: startDate, endDate: fmlaEnd, note: 'Runs concurrently with paid benefits' } : null,
          eligibility.std.eligible ? { label: 'Short-Term Disability', color: barColors[1], weeks: eligibility.std.weeks, pay: `${planConfig.std.percentPay}% of salary`, startDate: stdStart, endDate: stdEnd, note: `${planConfig.std.waitingDays}-day waiting period before benefits begin` } : null,
          eligibility.statePFL.eligible ? { label: `${planConfig.statePFL.state} Paid Family Leave`, color: barColors[2], weeks: eligibility.statePFL.weeks, pay: `${planConfig.statePFL.percentPay}% of avg weekly wage`, startDate: startDate, endDate: pflEnd, note: 'Concurrent with FMLA' } : null,
          eligibility.companyBonding.eligible ? { label: 'Company Bonding', color: barColors[3], weeks: eligibility.companyBonding.weeks, pay: `${planConfig.companyBonding.percentPay}% of salary`, startDate: bondStart, endDate: bondEnd, note: 'After medical recovery period' } : null,
        ].filter(Boolean);

        const totalWeeks = Math.max(...benefitBars.map((b) => b.weeks), 0);
        const maxSpan = Math.max(totalWeeks, 28);
        const paidBars = benefitBars.filter((b) => b.label !== 'FMLA');
        const estPaidWeeks = paidBars.length > 0 ? Math.max(...paidBars.map((b) => b.weeks)) : 0;

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const startMonth = startDate.getMonth();
        const months = [];
        for (let i = 0; i < 8; i++) { months.push(monthNames[(startMonth + i) % 12]); }

        const weekCount = Math.ceil(totalWeeks) + 2;
        const weeksArr = Array.from({ length: weekCount }, (_, i) => i + 1);

        return (
          <>
            <h2>Your estimated leave benefits</h2>
            <p className="subtitle">Based on the information you've provided, here's an estimate of the benefits you may be eligible for. This is not a guarantee - final determination is made after review.</p>

            {/* Coverage Timeline \u2014 matches leave detail pattern */}
            <div className="eb-card eb-timeline-wrap">
              <div className="eb-section-header">
                <div>
                  <h3>Coverage Timeline</h3>
                  <p>How your benefits provide protection and income over time</p>
                </div>
                <span className="eb-card-badge">ESTIMATE</span>
              </div>

              <p className="eb-hover-hint eb-helper">Hover over a benefit to see details.</p>
              <p className="eb-tap-hint eb-helper">Tap a row to see details</p>

              <div className="eb-tl-chart">
                <div className="eb-tl-weeks-row">
                  <div className="eb-tl-label-spacer"></div>
                  <div className="eb-tl-months">
                    {months.slice(0, Math.ceil(weekCount / 4) + 1).map((m) => <span key={m}>{m}</span>)}
                  </div>
                </div>
                <div className="eb-tl-weeks-row">
                  <div className="eb-tl-label-spacer"></div>
                  <div className="eb-tl-weeks">
                    {weeksArr.map((w) => <div key={w} className="eb-tl-week-tick"><span>{w}</span></div>)}
                  </div>
                </div>
                <div className="eb-tl-rows-wrap">
                  <div className="eb-tl-rows">
                    {benefitBars.map((bar, idx) => (
                      <button
                        key={bar.label}
                        type="button"
                        className={`eb-tl-row${hoveredBenefitBar === idx ? ' active' : ''}`}
                        onMouseEnter={() => setHoveredBenefitBar(idx)}
                        onMouseLeave={() => setHoveredBenefitBar(null)}
                        onClick={() => setExpandedBenefitBar(expandedBenefitBar === idx ? null : idx)}
                      >
                        <div className="eb-tl-row-label">{bar.label}</div>
                        <div className="eb-tl-row-bar">
                          <div className="eb-tl-seg" style={{ left: '0%', width: `${Math.min((bar.weeks / weekCount) * 100, 100)}%`, background: bar.color }}>{bar.weeks} wk</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Desktop tooltip on hover */}
                  {hoveredBenefitBar !== null && benefitBars[hoveredBenefitBar] && (
                    <div className="eb-coverage-tooltip">
                      <div className="eb-coverage-tooltip-head">
                        <div className="title">{benefitBars[hoveredBenefitBar].label}</div>
                      </div>
                      <div className="eb-coverage-tooltip-grid">
                        <div><div className="label">DURATION</div><div className="value">{benefitBars[hoveredBenefitBar].weeks} weeks</div></div>
                        <div><div className="label">DATES</div><div className="value">{shortDate(benefitBars[hoveredBenefitBar].startDate.toISOString().slice(0, 10))} \u2013 {shortDate(benefitBars[hoveredBenefitBar].endDate.toISOString().slice(0, 10))}</div></div>
                        <div><div className="label">PAY</div><div className="value">{benefitBars[hoveredBenefitBar].pay}</div></div>
                        <div><div className="label">STATUS</div><div className="value">Estimated</div></div>
                      </div>
                      {benefitBars[hoveredBenefitBar].note && <div className="eb-coverage-tooltip-note">{benefitBars[hoveredBenefitBar].note}</div>}
                    </div>
                  )}
                </div>

                <div className="eb-tl-legend">
                  {benefitBars.map((bar) => <div key={bar.label} className="eb-tl-legend-item"><span className="eb-tl-legend-dot" style={{ background: bar.color }}/>{bar.label}</div>)}
                </div>
              </div>

              {/* Mobile accordion */}
              {expandedBenefitBar !== null && benefitBars[expandedBenefitBar] && (
                <div className="eb-accordion">
                  <div className="eb-accordion-header">
                    <span className="eb-accordion-dot" style={{ background: benefitBars[expandedBenefitBar].color }} />
                    <span className="eb-accordion-title">{benefitBars[expandedBenefitBar].label}</span>
                    <button className="eb-accordion-close" onClick={(e) => { e.stopPropagation(); setExpandedBenefitBar(null); }} aria-label="Close">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <div className="eb-accordion-grid">
                    <div className="eb-accordion-field"><span className="eb-accordion-label">Duration</span><span className="eb-accordion-value">{benefitBars[expandedBenefitBar].weeks} weeks</span></div>
                    <div className="eb-accordion-field"><span className="eb-accordion-label">Start</span><span className="eb-accordion-value">{shortDate(benefitBars[expandedBenefitBar].startDate.toISOString().slice(0, 10))}</span></div>
                    <div className="eb-accordion-field"><span className="eb-accordion-label">Pay</span><span className="eb-accordion-value">{benefitBars[expandedBenefitBar].pay}</span></div>
                    <div className="eb-accordion-field"><span className="eb-accordion-label">End</span><span className="eb-accordion-value">{shortDate(benefitBars[expandedBenefitBar].endDate.toISOString().slice(0, 10))}</span></div>
                  </div>
                  {benefitBars[expandedBenefitBar].note && <div className="eb-accordion-note">{benefitBars[expandedBenefitBar].note}</div>}
                </div>
              )}
            </div>

            {/* Coverage summary */}
            <div className="eb-breakdown">
              <div style={{ padding: '20px 20px 0' }}>
                <h3 className="eb-breakdown-title">Estimated coverage breakdown</h3>
                <p className="eb-breakdown-subtitle">Final details will be confirmed after your request is submitted and reviewed.</p>
              </div>

              {benefitBars.map((bar) => (
                <div key={bar.label} className="eb-breakdown-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div className="eb-breakdown-label">{bar.label}</div>
                    <div className="eb-breakdown-pay">{bar.pay}</div>
                  </div>
                  <div className="eb-breakdown-detail">
                    <span>{shortDate(bar.startDate.toISOString().slice(0, 10))} to {shortDate(bar.endDate.toISOString().slice(0, 10))}</span>
                    <span>{bar.weeks} weeks</span>
                  </div>
                </div>
              ))}

              {benefitBars.length > 0 && (
                <div className="eb-breakdown-footer">
                  <div>
                    <div className="eb-breakdown-footer-label">Est. total leave</div>
                    <div className="eb-breakdown-footer-detail">~{totalWeeks} weeks {estPaidWeeks > 0 ? `\u00b7 ~${estPaidWeeks} paid` : '\u00b7 Unpaid'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="eb-breakdown-footer-label">Benefits available</div>
                    <div className="eb-breakdown-footer-detail">{benefitBars.length} program{benefitBars.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }
      case 'review':
        return (
          <>
            <h2>Review and submit</h2>
            <p className="subtitle">Please review everything below before submitting. You can go back and edit any section if something doesn't look right.</p>
            <div className="br-section">
              <div className="br-section-header"><h3>Employee Information</h3><span className="br-employer-note">Provided by employer</span></div>
              <div className="br-grid">
                <ReviewField label="Name" value={`${formState.employee.firstName} ${formState.employee.lastName}`}/>
                <ReviewField label="Employee ID" value={formState.employee.employeeId}/>
                <ReviewField label="Employer" value={formState.employee.employer}/>
                <ReviewField label="Occupation" value={formState.employee.occupation}/>
                <ReviewField label="Work Location" value={formState.employee.workLocation}/>
                <ReviewField label="Hire Date" value={formatDate(formState.employee.hireDate)}/>
                <ReviewField label="Employment Type" value={formState.employee.employmentType}/>
                <ReviewField label="Address" value={formState.employee.address}/>
              </div>
              {employeeInfoFlag.submitted ? (
                <div className="emp-flag-summary">
                  <div className="emp-flag-summary-header">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8.5l4 4 8-8" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Flagged {Object.values(employeeInfoFlag.fields).filter((f) => f.checked).length} field{Object.values(employeeInfoFlag.fields).filter((f) => f.checked).length !== 1 ? 's' : ''} for review</span>
                    <button type="button" className="emp-flag-summary-edit" onClick={() => setEmployeeInfoFlag((prev) => ({ ...prev, open: true, submitted: false }))}>Edit</button>
                  </div>
                  <div className="emp-flag-summary-list">
                    {Object.entries(employeeInfoFlag.fields).filter(([, v]) => v.checked).map(([key, val]) => (
                      <div key={key} className="emp-flag-summary-item">
                        <span className="emp-flag-summary-label">{key}</span>
                        {val.note && <span className="emp-flag-summary-note">— {val.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="emp-flag-accordion">
                  <button type="button" className="emp-flag-accordion-trigger" onClick={() => setEmployeeInfoFlag((prev) => ({ ...prev, open: !prev.open }))}>
                    <span className="emp-flag-accordion-label">
                      <span className="emp-flag-dot"/>
                      <span>Something doesn't look right?</span>
                    </span>
                    <svg className={`emp-flag-chevron${employeeInfoFlag.open ? ' emp-flag-chevron--open' : ''}`} width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  {employeeInfoFlag.open && (
                    <div className="emp-flag-accordion-body">
                      <p className="emp-flag-hint">Check any fields that are incorrect and add a note. This flags them for your employer to review — it won't change your info now.</p>
                      <div className="emp-flag-list">
                        {[
                          { key: 'Name', value: `${formState.employee.firstName} ${formState.employee.lastName}` },
                          { key: 'Employee ID', value: formState.employee.employeeId },
                          { key: 'Employer', value: formState.employee.employer },
                          { key: 'Occupation', value: formState.employee.occupation },
                          { key: 'Work Location', value: formState.employee.workLocation },
                          { key: 'Hire Date', value: formatDate(formState.employee.hireDate) },
                          { key: 'Employment Type', value: formState.employee.employmentType },
                          { key: 'Address', value: formState.employee.address },
                        ].map((item) => {
                          const isChecked = employeeInfoFlag.fields[item.key]?.checked || false;
                          const note = employeeInfoFlag.fields[item.key]?.note || '';
                          return (
                            <div key={item.key} className={`emp-flag-row ${isChecked ? 'emp-flag-row--active' : ''}`}>
                              <label className="emp-flag-row-check">
                                <input type="checkbox" checked={isChecked} onChange={() => setEmployeeInfoFlag((prev) => ({ ...prev, fields: { ...prev.fields, [item.key]: { ...prev.fields[item.key], checked: !isChecked } } }))}/>
                                <span className="emp-flag-checkbox-custom">{isChecked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span>
                              </label>
                              <span className="emp-flag-row-value">{item.key}</span>
                              <input type="text" className="emp-flag-row-note" placeholder="What's incorrect?" value={note} onChange={(event) => setEmployeeInfoFlag((prev) => ({ ...prev, fields: { ...prev.fields, [item.key]: { ...prev.fields[item.key], checked: true, note: event.target.value } } }))}/>
                            </div>
                          );
                        })}
                      </div>
                      <div className="emp-flag-actions">
                        <button type="button" className="emp-flag-btn-save" disabled={!Object.values(employeeInfoFlag.fields).some((f) => f.checked)} onClick={() => setEmployeeInfoFlag((prev) => ({ ...prev, open: false, submitted: true }))}>Save</button>
                        <button type="button" className="emp-flag-btn-clear" onClick={() => setEmployeeInfoFlag({ open: false, fields: {}, submitted: false })}>Clear</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="br-section">
              <div className="br-section-header"><h3>Contact Information</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('contact')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Email" value={formState.email}/>
                <ReviewField label="Phone" value={formState.phone}/>
                <ReviewField label="Preferred Communication" value={[formState.commEmail ? 'Email' : '', formState.commPhone ? 'Phone' : '', formState.commSMS ? 'SMS' : ''].filter(Boolean).join(', ')}/>
                {formState.tempAddress ? <ReviewField label="Temporary Address" value={`${formState.tempStreet}, ${formState.tempCity}, ${formState.tempState} ${formState.tempZip}`}/> : null}
              </div>
            </div>
            <div className="br-section">
              <div className="br-section-header"><h3>Absence Details</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('leaveStructure')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Reason" value={isMedicalSelf ? 'Own health condition' : isBirthingParent ? 'Welcoming a child' : isFamilyCare ? 'Family care' : isChildScenario ? 'Bonding' : isMilitary ? 'Military Leave' : isOther ? 'Other' : (formState.leaveScenario || '—')}/>
                <ReviewField label="Absence Type" value={formState.leaveType === 'continuous' ? 'Continuous' : formState.leaveType === 'intermittent' ? 'Intermittent' : formState.leaveType === 'reduced' ? 'Reduced Schedule' : formState.leaveType}/>
                <ReviewField label="Start Date" value={formatDate(formState.leaveStartDate)}/>
                <ReviewField label="Expected Return Date" value={formatDate(formState.expectedReturnDate)}/>
              </div>
            </div>
            <div className="br-section">
              <div className="br-section-header"><h3>Work Schedule</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('leaveDetails')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Week 1 Schedule" value={['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => `${day} ${formState.scheduleHours[day.toLowerCase().slice(0, 3)]}h`).join(', ')}/>
              </div>
            </div>
            {isChildScenario ? (
              <div className="br-section">
                <div className="br-section-header"><h3>Child &amp; Bonding</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('childScenario')}>Edit</button></div>
                <div className="br-grid">
                  <ReviewField label="Scenario" value={formState.childScenario === 'birth' ? 'Birth' : formState.childScenario === 'adoption' ? 'Adoption' : 'Foster Care'}/>
                  <ReviewField label="Expected Date" value={formatDate(formState.childDate || formState.expectedDate)}/>
                  <ReviewField label="Primary Caregiver" value={formState.primaryCaregiver === true ? 'Yes' : formState.primaryCaregiver === false ? 'No' : 'Not sure yet'}/>
                  <ReviewField label="Bonding Plan" value={formState.bondingIntent === 'immediate' ? 'Immediately after recovery' : formState.bondingIntent === 'later' ? 'Return to work first' : 'Not decided yet'}/>
                </div>
              </div>
            ) : null}
            {(isMedicalScenario || isChildScenario) ? (
              <>
                <div className="br-section">
                  <div className="br-section-header"><h3>Medical Certification Consent</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep(isMedicalSelf ? 'medicalCertConsent' : isFamilyCare ? 'medicalCertConsent' : 'medicalCertConsent')}>Edit</button></div>
                  <div className="br-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <ReviewField label="Authorize The Release Of Any Required Certification Requests To My Healthcare Provider For Completion Or Clarification" value={formState.authorizeMedCert ? 'Yes' : 'No'}/>
                  </div>
                </div>
                <div className="br-section">
                  <div className="br-section-header"><h3>Healthcare Provider</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep(isMedicalSelf || isFamilyCare || isBirthingParent ? 'providerDetails' : 'medicalCert')}>Edit</button></div>
                  <div className="br-grid">
                    <ReviewField label="Provider" value={`${formState.providerName}${formState.providerSuffix ? `, ${formState.providerSuffix}` : ''}`}/>
                    <ReviewField label="Facility" value={formState.providerFacility}/>
                    <ReviewField label="Phone" value={formState.providerPhone}/>
                    <ReviewField label="Address" value={`${formState.providerStreet}, ${formState.providerCity}, ${formState.providerState} ${formState.providerZip}`}/>
                  </div>
                </div>
              </>
            ) : null}
            <div className="ds-review-callout">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#105fa8"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
              <p><strong>This is an estimate.</strong> By continuing, you confirm that the information above is accurate to the best of your knowledge. Your case manager may follow up if additional details are needed, and your manager may be notified as part of this process.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  function handleSaveAndExit() {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 5000);
  }

  function renderFooter() {
    if (currentStep.id === 'review') {
      return (
        <div className="wizard-footer">
          <div className="footer-left">
            <button type="button" className="btn btn-cancel-leave" onClick={handleSaveAndExit}>Save & Exit</button>
          </div>
          <div className="footer-right">
            <button type="button" className="btn btn-back" onClick={goBack}>Back</button>
            <button type="button" className="btn btn-submit" onClick={submitRequest}>Submit</button>
          </div>
        </div>
      );
    }
    return (
      <div className="wizard-footer">
        <div className="footer-left">
          <button type="button" className="btn btn-cancel-leave" onClick={handleSaveAndExit}>Save & Exit</button>
        </div>
        <div className="footer-right">
          {currentStepIndex > 0 ? <button type="button" className="btn btn-back" onClick={goBack}>Back</button> : null}
          <button type="button" className="btn btn-next" onClick={goNext}>Continue</button>
        </div>
        <div className="footer-save-note"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/></svg> All updates saved</div>
      </div>
    );
  }

  if (submittedCase) {
    if (isMedicalSelf) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 3 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">End Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility \u2014 we'll update you within 1\u20132 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Medical Absence  (Own Illness)</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Short-Term Disability</div>
                  </div>
                </div>
                <div className="success-enrollment-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0369a1" strokeWidth="1.5"/><path d="M12 8v4" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.75" fill="#0369a1"/></svg>
                  <div className="success-enrollment-text">
                    <span>You're enrolled in Hospital Indemnity and may be eligible for additional benefits.</span>
                    <a href="#" className="success-enrollment-link">Learn more →</a>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isBirthingParent) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 1 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Expected Return to Work Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Parental Leave (Birthing)</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Short Term Disability, NY Paid Family Leave & FMLA</div>
                  </div>
                </div>
                <div className="success-enrollment-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0369a1" strokeWidth="1.5"/><path d="M12 8v4" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.75" fill="#0369a1"/></svg>
                  <div className="success-enrollment-text">
                    <span>You're enrolled in Hospital Indemnity and may be eligible for additional benefits.</span>
                    <a href="#" className="success-enrollment-link">Learn more →</a>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isFamilyCare) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 1 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">End Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Care for Sick Family Member with Health Condition</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">NY Paid Family Leave & FMLA</div>
                  </div>
                </div>
                <div className="success-enrollment-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0369a1" strokeWidth="1.5"/><path d="M12 8v4" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.75" fill="#0369a1"/></svg>
                  <div className="success-enrollment-text">
                    <span>You're enrolled in Hospital Indemnity and may be eligible for additional benefits.</span>
                    <a href="#" className="success-enrollment-link">Learn more →</a>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isChildScenario && !isBirthingParent) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 1 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Expected Return to Work Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Non-Birthing Parent, Adoption, or Foster Care Placement (Bonding)</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Short Term Disability & NY Paid Family Leave</div>
                  </div>
                </div>
                <div className="success-enrollment-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0369a1" strokeWidth="1.5"/><path d="M12 8v4" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="0.75" fill="#0369a1"/></svg>
                  <div className="success-enrollment-text">
                    <span>You're enrolled in Hospital Indemnity and may be eligible for additional benefits.</span>
                    <a href="#" className="success-enrollment-link">Learn more →</a>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isMilitary) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 1 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Expected Return to Work Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Military Leave</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">FMLA</div>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isOther) {
      const returnWorkDate = new Date(new Date(`${submittedCase.endDate}T00:00:00`).getTime() + 1 * 24 * 60 * 60 * 1000);
      const returnWorkStr = returnWorkDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div className="success-header">
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2>Leave request submitted</h2>
                  <p>{submittedCase.id}</p>
                  <p className="success-case-review">Your Case In Review</p>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Expected Return to Work Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Return to Work Date</div>
                    <div className="success-date-value">{returnWorkStr}</div>
                  </div>
                </div>
                <div className="success-next-steps">
                  <h3>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your absence status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} className="success-next-item">
                      <div className="success-next-icon">{item.icon}</div>
                      <span className="success-next-text">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="success-cases">
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Absence Case - {submittedCase.id}-ABC-01</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">Other</div>
                  </div>
                  <div className="success-case-card">
                    <div className="success-case-header">
                      <div className="success-case-id">Claim Case - {submittedCase.id.replace('NTN', 'NTN')}-GDC-02</div>
                      <span className="success-case-badge"><span className="success-case-badge-dot"/> Pending</span>
                    </div>
                    <div className="success-case-title">FMLA</div>
                  </div>
                </div>
                <div className="success-footer">
                  <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                  {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate(`${rlBase}/my-cases`)}>Back to My Leaves</button>}
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    const durationText = submittedCase.durationDays >= 7 ? `${Math.floor(submittedCase.durationDays / 7)} weeks${submittedCase.durationDays % 7 > 0 ? `, ${submittedCase.durationDays % 7} days` : ''}` : `${submittedCase.durationDays} days`;
    return (
      <div className="request-leave-shell">
        <SiteNav />
        <div className="wizard-wrap">
          <div className="wizard-card" style={{ marginTop: 32 }}>
            <div className="success-state">
              <div className="success-header">
                <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <h2>Leave request submitted</h2>
                <p>{submittedCase.id}</p>
              </div>
              <div className="success-case-card" style={{ marginBottom: 20 }}>
                <div className="success-case-header" style={{ marginBottom: 16 }}>
                  <div className="confirm-header-row">
                    <div className="confirm-header-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div>
                      <div className="confirm-header-title">Leave Request</div>
                      <div className="confirm-header-date">Submitted {submittedCase.submittedOn}</div>
                    </div>
                  </div>
                  <span className="confirm-status-badge">Pending</span>
                </div>
                <div className="success-dates-grid">
                  <div className="success-date-box">
                    <div className="success-date-label">Start Date</div>
                    <div className="success-date-value">{shortDate(submittedCase.startDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Expected Return</div>
                    <div className="success-date-value">{shortDate(submittedCase.endDate)}</div>
                  </div>
                  <div className="success-date-box">
                    <div className="success-date-label">Duration</div>
                    <div className="success-date-value">{durationText}</div>
                  </div>
                </div>
              </div>
              <div className="success-next-steps">
                <h3>What happens next</h3>
                {[
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager has been notified of your upcoming leave' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents' },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your leave status anytime from the overview' },
                ].map((item) => (
                  <div key={item.text} className="success-next-item">
                    <div className="success-next-icon">{item.icon}</div>
                    <span className="success-next-text">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="success-footer">
                <button type="button" className="btn btn-next" onClick={() => navigate(`${rlBase}/case-detail-new`, { state: submittedCase })}>View Leave Details</button>
                {!isMobileRequest && <button type="button" className="btn btn-back">Email Manager / HR</button>}
                {!isMobileRequest && <button type="button" className="btn btn-back" onClick={() => navigate('/overview-react')}>Back to Overview</button>}
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="request-leave-shell">
      {!hideChrome && <SiteNav />}
      {!started ? (
        <div className="wizard-wrap">
          <div className="req-welcome-card">
            <div className="landing-eyebrow">Request Leave</div>
            <h2 className="landing-title">Start your leave request</h2>
            <p className="landing-subtitle">Enter your reason for leave, details, and work schedule. You'll be able to review and verify everything before you submit.</p>
            <div className="req-welcome-journey">
              {[
                { label: 'Reason', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4b5563" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.12 2-2.12 3.5" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.75" fill="#4b5563"/></svg> },
                { label: 'Details', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#4b5563" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Schedule', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#4b5563" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { label: 'Review', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ].map((phase, index) => (
                <div key={phase.label} style={{ display: 'contents' }}>
                  {index > 0 ? <div className="req-welcome-arrow"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div> : null}
                  <div className="req-welcome-step">
                    <div className="req-welcome-step-icon">{phase.icon}</div>
                    <div className="landing-phase-label">{phase.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-next btn-lg" onClick={() => setStarted(true)}>Get Started</button>
            <div className="landing-footer-note">Not sure where to start? <Link to="/plan-absence">Plan your leave first →</Link></div>
          </div>
        </div>
      ) : (
        <div className="wizard-wrap">
          {fromPlan && !hidePlanBar && (
            <div className="rq-from-plan-bar">
              <svg className="rq-from-plan-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#105fa8"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
              <span>Pre-filled from your leave plan. Review and adjust as needed.</span>
              <button type="button" className="rq-from-plan-close" onClick={() => setHidePlanBar(true)} aria-label="Dismiss">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          )}
          <div className="stepper"><div className="stepper-progress-label">Overall progress</div><div className="stepper-counter">Step <strong>{currentStepIndex + 1}</strong> of <strong>{steps.length}</strong></div></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}/></div>
          <div className="wizard-card">
            <div className="step-content">{renderStepContent()}{renderFooter()}</div>
          </div>
        </div>
      )}
      {showCancelModal && (
        <div className="pr-modal-backdrop" onClick={() => setShowCancelModal(false)}>
          <div className="cancel-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-confirm-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 9v4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#dc2626"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="cancel-confirm-title">Cancel leave request?</h3>
            <p className="cancel-confirm-desc">Your progress will be discarded.</p>
            <div className="cancel-confirm-actions-stack">
              <button type="button" className="btn-cancel-confirm-continue" onClick={() => setShowCancelModal(false)}>Continue Process</button>
              <button type="button" className="btn-cancel-confirm-discard" onClick={() => { localStorage.removeItem(DRAFT_KEY); const drafts = JSON.parse(localStorage.getItem('leaveDrafts') || '[]').filter(d => d.type !== 'request-leave'); localStorage.setItem('leaveDrafts', JSON.stringify(drafts)); navigate(`${rlBase}/file-claim`); }}>Discard</button>
            </div>
          </div>
        </div>
      )}
      {!hideChrome && <SiteFooter />}
      {showSaveToast && (
        <div className="rl-toast">
          <div className="rl-toast-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="var(--color-brand-primary)" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span className="rl-toast-text">Your progress has been saved. You can resume this request anytime from <a href={`${rlBase}/my-leaves`} className="rl-toast-link">My Leaves</a>.</span>
          <button className="rl-toast-close" onClick={() => setShowSaveToast(false)} aria-label="Dismiss">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}