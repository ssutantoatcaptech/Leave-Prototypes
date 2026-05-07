import { useMemo, useState, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import '../overview/overview-react.css';
import '../request-leave/request-leave-react.css';
import '../absence-details/absence-details-react.css';
import './plan-absence-react.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Reason', 'Employment & Details', 'Design Your Plan', 'Plan Review', 'Details', 'Provider', 'Schedule', 'Verify', 'Contact', 'Review & Submit'];

const ILLNESS_STEP_LABELS = ['Reason', 'Employment & Details', 'Design Your Plan'];

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const REASON_OPTIONS = [
  {
    value: 'illness',
    title: "Employee's Own Illness or Injury",
    tooltip: "You need time off for surgery, illness, injury, or recovery.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  },
  {
    value: 'family',
    title: 'Care for Sick Family Member with Health Condition',
    tooltip: "Someone close to you needs your care due to a serious health condition.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  },
  {
    value: 'nonbirth',
    title: 'Non-Birthing Parent, Adoption, or Foster Care Placement (Bonding)',
    tooltip: "You\u2019re welcoming a child through adoption, foster care, or as a non-birthing parent.",
    tooltipRight: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#3d3d47" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    value: 'birth',
    title: 'Birthing Parent, Pregnancy, or Bonding',
    tooltip: "You\u2019re having a baby or need time for pregnancy and bonding.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 17v3M10 22h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    value: 'military',
    title: 'Military Related Activity',
    tooltip: "You need time off for qualifying military exigency or to care for a service member.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25 5.25-1.12 9-6 9-11.25V7l-9-5z" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    value: 'other',
    title: 'Other',
    tooltip: "Your reason doesn\u2019t fit the categories above.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><circle cx="8" cy="12" r="1" fill="#3d3d47"/><circle cx="12" cy="12" r="1" fill="#3d3d47"/><circle cx="16" cy="12" r="1" fill="#3d3d47"/></svg>,
  },
];

const STATE_BENEFITS = {
  CA: { name: 'CA SDI / PFL', desc: 'California provides State Disability Insurance (SDI) at ~60-70% pay for own illness, and Paid Family Leave (PFL) at ~60-70% for family care and bonding, up to 8 weeks.', note: '60-70% pay via SDI/PFL', card: 'Up to 8 weeks paid', payPct: 67, medicalWeeks: 52, familyWeeks: 8, parentalWeeks: 8 },
  CO: { name: 'CO FAMLI', desc: 'Colorado Family and Medical Leave Insurance (FAMLI) provides up to 12 weeks of paid leave at ~90% of wages for medical, family, and parental leave. Additional 4 weeks for pregnancy complications.', note: 'Up to 90% pay via FAMLI', card: 'Up to 12 weeks paid', payPct: 90, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 16 },
  CT: { name: 'CT Paid Leave', desc: 'Connecticut Paid Leave provides up to 12 weeks at ~95% pay for medical, family, and parental leave. Additional 2 weeks for pregnancy complications.', note: 'Up to 95% pay via CTPL', card: 'Up to 12 weeks paid', payPct: 95, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 14 },
  DE: { name: 'DE Healthy Families', desc: 'Delaware Healthy Delaware Families Act provides up to 12 weeks for parental leave and 6 weeks for medical/caregiver leave with partial pay.', note: 'Partial pay via DE HDFA', card: 'Up to 12 weeks paid', payPct: 80, medicalWeeks: 6, familyWeeks: 6, parentalWeeks: 12 },
  DC: { name: 'DC PFL', desc: 'District of Columbia Paid Family Leave provides up to 12 weeks of partial pay for parental, family, and medical leave. Separate DC FMLA provides 16 weeks job protection.', note: '~90% pay via DC PFL', card: 'Up to 12 weeks paid', payPct: 90, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 12 },
  HI: { name: 'HI TDI', desc: 'Hawaii Temporary Disability Insurance (TDI) provides up to 26 weeks at ~58% pay for your own illness or disability.', note: '~58% pay via HI TDI', card: 'Up to 26 weeks medical', payPct: 58, medicalWeeks: 26, familyWeeks: 0, parentalWeeks: 4 },
  MA: { name: 'MA PFML', desc: 'Massachusetts Paid Family and Medical Leave provides up to 20 weeks for medical leave and 12 weeks for family/parental at ~80% pay.', note: '~80% pay via MA PFML', card: 'Up to 20 weeks paid', payPct: 80, medicalWeeks: 20, familyWeeks: 12, parentalWeeks: 12 },
  MN: { name: 'MN Paid Leave', desc: 'Minnesota Paid Family and Medical Leave provides up to 12 weeks at ~90% of wages for medical, family, and parental leave.', note: '~90% pay via MN PFL', card: 'Up to 12 weeks paid', payPct: 90, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 12 },
  NJ: { name: 'NJ TDI / FLI', desc: 'New Jersey provides Temporary Disability Insurance (TDI) at ~85% pay for own illness, and Family Leave Insurance (FLI) at ~85% for up to 12 weeks for family care.', note: '~85% pay via TDI/FLI', card: 'Up to 12 weeks paid', payPct: 85, medicalWeeks: 26, familyWeeks: 12, parentalWeeks: 12 },
  NY: { name: 'NY DBL / PFL', desc: 'New York provides Disability Benefits Law (DBL) at 50% pay (capped) for own illness, and Paid Family Leave (PFL) at 67% pay for up to 12 weeks for family care and bonding.', note: '50-67% pay via DBL/PFL', card: 'Up to 12 weeks paid', payPct: 67, medicalWeeks: 26, familyWeeks: 12, parentalWeeks: 12 },
  OR: { name: 'OR Paid Leave', desc: 'Oregon Paid Family and Medical Leave provides up to 12 weeks at ~100% pay (capped) for medical, family, and parental leave. Additional 2 weeks for pregnancy.', note: 'Up to 100% pay via OR PFL', card: 'Up to 12 weeks paid', payPct: 100, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 14 },
  RI: { name: 'RI TCI / TDI', desc: 'Rhode Island Temporary Caregiver Insurance (TCI) provides up to 6 weeks for family care at ~60% pay. TDI provides up to 30 weeks for own illness.', note: '~60% pay via RI TCI/TDI', card: 'Up to 30 weeks medical', payPct: 60, medicalWeeks: 30, familyWeeks: 6, parentalWeeks: 6 },
  WA: { name: 'WA PFML', desc: 'Washington provides Paid Family and Medical Leave (PFML) at up to 90% pay for up to 12 weeks for medical leave and 12 weeks for family leave (16 weeks combined max).', note: 'Up to 90% pay via PFML', card: 'Up to 12-16 weeks paid', payPct: 90, medicalWeeks: 12, familyWeeks: 12, parentalWeeks: 16 },
};

const LEAVE_TYPE_HINTS = {
  continuous: "You\u2019ll be away from work for a stretch of time.",
  intermittent: "You\u2019ll need time off here and there \u2014 like for appointments or flare-ups.",
  reduced: "You\u2019ll keep working, but with fewer hours or days each week.",
};

const STD_WEEKS_OPTIONS = [2, 4, 6, 8, 12, 16, 26];
const UNPAID_WEEKS_OPTIONS = [2, 4, 6, 8, 12];
const DUR_WEEKS_OPTIONS = [2, 4, 6, 8, 12, 16, 26];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addWeeksToDate(dateStr, weeks) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function fmtDate(d) {
  return ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear();
}

function buildMonths(startDate, endDate) {
  const NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const months = [];
  const cur = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (cur <= endDate) {
    months.push(NAMES[cur.getMonth()]);
    cur.setMonth(cur.getMonth() + 1);
  }
  months.push(NAMES[cur.getMonth()]);
  return months;
}

function snapDur(calcWeeks) {
  const opts = DUR_WEEKS_OPTIONS;
  return opts.reduce((prev, cur) => Math.abs(cur - calcWeeks) < Math.abs(prev - calcWeeks) ? cur : prev);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
          <button className="nav-bell" type="button"><span className="nav-bell-dot" /></button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <Link className="nav-tab" to="/overview-react">My Leave</Link>
        <Link className="nav-tab active" to="/plan-absence">Plan Leave</Link>
        <Link className="nav-tab" to="/wizard">Request Leave</Link>
        <Link className="nav-tab" to="/absence-history">Leave History</Link>
        <Link className="nav-tab" to="/leave-documents">Leave Documents</Link>
      </div>
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle${on ? ' on' : ''}`} style={{ width: 36, height: 20, flexShrink: 0 }} onClick={onClick}>
      <div className="toggle-knob" style={{ width: 16, height: 16 }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlanAbsenceReactPage() {
  const [searchParams] = useSearchParams();
  const urlStep = searchParams.get('step');
  const urlReason = searchParams.get('reason');
  const urlIStep = searchParams.get('istep');

  // Navigation
  const [started, setStarted] = useState(true);
  const [step, setStep] = useState(() => urlStep && urlStep !== '0' ? parseInt(urlStep, 10) : 1);

  // Step 1
  const [reason, setReason] = useState(() => urlReason || 'illness');

  // Step 2
  const [workState, setWorkState] = useState('MO');
  const [homeState, setHomeState] = useState('same');
  const [hireDate, setHireDate] = useState('2019-01-15');
  const [avgHours, setAvgHours] = useState('40');
  const [leaveStart, setLeaveStart] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [leaveReturn, setLeaveReturn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 56);
    return d.toISOString().slice(0, 10);
  });
  const [leaveType, setLeaveType] = useState('continuous');
  const [intermittentFreq, setIntermittentFreq] = useState('');
  const [intermittentDur, setIntermittentDur] = useState('');
  const [reducedCurrentHrs, setReducedCurrentHrs] = useState('40');
  const [reducedProposedHrs, setReducedProposedHrs] = useState('');

  // Step 3 — sidebar fields (synced from step 2 on entering step 3)
  const [sideWorkState, setSideWorkState] = useState('MO');
  const [sideHireDate, setSideHireDate] = useState('2019-01-15');
  const [sideStart, setSideStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [sideDueDate, setSideDueDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [sideDuration, setSideDuration] = useState(8);

  // Step 3 — illness toggles
  const [stdOn, setStdOn] = useState(true);
  const [fmlaOn, setFmlaOn] = useState(true);
  const [unpaidOn, setUnpaidOn] = useState(false);
  const [stdDuration, setStdDuration] = useState(8);
  const [unpaidDuration, setUnpaidDuration] = useState(4);

  // Step 3 — birth toggles
  const [preBirthOn, setPreBirthOn] = useState(true);
  const [postBirthOn, setPostBirthOn] = useState(true);
  const [bondingOn, setBondingOn] = useState(true);

  // Step 5 — Details (Diagnosis & Treatment)
  const [diagnosis, setDiagnosis] = useState('');
  const [firstTreatment, setFirstTreatment] = useState('');
  const [nextAppt, setNextAppt] = useState('');
  const [hospitalized, setHospitalized] = useState(null);
  const [jobRelated, setJobRelated] = useState(null);

  // Step 6 — Provider
  const [facilityName, setFacilityName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [providerSuffix, setProviderSuffix] = useState('');
  const [providerPhone, setProviderPhone] = useState('');
  const [providerFax, setProviderFax] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [providerStreet, setProviderStreet] = useState('');
  const [providerCity, setProviderCity] = useState('');
  const [providerState, setProviderState] = useState('');
  const [providerZip, setProviderZip] = useState('');
  const [providerAuth, setProviderAuth] = useState(true);

  // Step 7 — Schedule
  const [schedWeeks, setSchedWeeks] = useState([
    { sun: 0, mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0 },
  ]);

  // Step 9 — Contact
  const [contactEmail, setContactEmail] = useState('sarah.johnson@email.com');
  const [contactPhone, setContactPhone] = useState('(402) 555-0147');
  const [prefEmail, setPrefEmail] = useState(true);
  const [prefPhone, setPrefPhone] = useState(false);
  const [prefSMS, setPrefSMS] = useState(false);
  const [tempAddr, setTempAddr] = useState(false);
  const [tempStreet, setTempStreet] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [tempState, setTempState] = useState('');
  const [tempZip, setTempZip] = useState('');
  const [tempFrom, setTempFrom] = useState('');
  const [tempTo, setTempTo] = useState('');

  // Illness flow — Leave Dates (step 2)
  const [lastDayWorked, setLastDayWorked] = useState('');
  const [hoursLastDay, setHoursLastDay] = useState('08:00');

  // Illness flow — Missed Time (step 3)
  const [hasMissedTime, setHasMissedTime] = useState(null);
  const [missedFirstDay, setMissedFirstDay] = useState('');
  const [missedHoursScheduled, setMissedHoursScheduled] = useState('08:00');
  const [missedEntries, setMissedEntries] = useState([
    { date: '', hours: '08:00', reason: '' },
  ]);

  // Illness flow — Medical Certification Consent (step 7)
  const [certConsent, setCertConsent] = useState(null);

  // Illness flow step tracking (steps 1-3: Reason → Employment → Design Your Plan)
  const [illnessStep, setIllnessStep] = useState(() => urlIStep ? parseInt(urlIStep, 10) : 1);
  const [showIllnessConfirmation, setShowIllnessConfirmation] = useState(() => urlIStep === 'confirm');

  // Illness intake steps (post-modal): Leave Structure, Missed Time, Work Schedule, Condition, Provider, Med Cert, Contact, Review
  const ILLNESS_INTAKE_LABELS = ['Leave Structure', 'Missed Time', 'Work Schedule', 'Condition', 'Provider Details', 'Medical Certification', 'Contact'];
  const [illnessIntakeStep, setIllnessIntakeStep] = useState(0);

  // Step 3 — UI state
  const [activeView, setActiveView] = useState('pay');
  const [openDetail, setOpenDetail] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showTransitionModal, setShowTransitionModal] = useState(() => searchParams.get('modal') === '1');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const timelineRef = useRef(null);

  // ─── Derived ──────────────────────────────────────────────────────────────

  const isBirth = reason === 'birth';
  const isFamily = reason === 'family' || reason === 'nonbirth';

  // Duration hint for step 2
  const durWeeksHint = useMemo(() => {
    if (!leaveStart || !leaveReturn) return 8;
    const diff = (new Date(leaveReturn + 'T00:00:00') - new Date(leaveStart + 'T00:00:00')) / (1000 * 60 * 60 * 24 * 7);
    return Math.max(1, Math.round(diff));
  }, [leaveStart, leaveReturn]);

  // FMLA eligibility (based on sidebar hire date, ref date = current date)
  const fmlaEligible = useMemo(() => {
    if (!sideHireDate) return false;
    const hire = new Date(sideHireDate + 'T00:00:00');
    const now = new Date();
    const months = (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
    return months >= 12;
  }, [sideHireDate]);

  // Timeline data
  const tlData = useMemo(() => {
    if (isBirth) {
      // ── Birth timeline ──
      if (!sideDueDate) return { rows: [], months: ['—'], paidWeeks: 0, absenceWeeks: 0, weeklyPay: 0 };
      const due = new Date(sideDueDate + 'T00:00:00');
      const preWeeks = 4, postWeeks = 6, bondWeeks = 12;
      const MS_WEEK = 7 * 86400000;
      const preStart = new Date(due.getTime() - preWeeks * MS_WEEK);
      const postEnd = new Date(due.getTime() + postWeeks * MS_WEEK);
      const bondStart = new Date(postEnd);
      const bondEnd = new Date(bondStart.getTime() + bondWeeks * MS_WEEK);

      const tlStart = preBirthOn ? preStart : due;
      const tlEnd = bondingOn ? bondEnd : postBirthOn ? postEnd : new Date(due.getTime() + MS_WEEK);
      const totalDays = Math.max(1, (tlEnd - tlStart) / 86400000);
      const pct = (d) => Math.max(0, Math.min(100, (d - tlStart) / 86400000 / totalDays * 100));

      const rows = [];
      if (preBirthOn) rows.push({ id: 'pre', label: 'PRE-BIRTH', left: pct(preStart), width: pct(due) - pct(preStart), segClass: 'partial', tooltip: `Pre-birth disability: ${fmtDate(preStart)} – ${fmtDate(due)}` });
      if (postBirthOn) rows.push({ id: 'post', label: 'POST-BIRTH', left: pct(due), width: pct(postEnd) - pct(due), segClass: 'partial', tooltip: `Post-birth disability: ${postWeeks} wks at 60% STD` });
      if (bondingOn) rows.push({ id: 'bond', label: 'BONDING', left: pct(bondStart), width: pct(bondEnd) - pct(bondStart), segClass: 'full', tooltip: `Bonding leave: ${bondWeeks} wks (FMLA protected)` });

      const paidWks = (preBirthOn ? preWeeks : 0) + (postBirthOn ? postWeeks : 0);
      const totalWks = paidWks + (bondingOn ? bondWeeks : 0);

      return {
        rows,
        duePct: pct(due),
        showDueMarker: preBirthOn || postBirthOn || bondingOn,
        months: buildMonths(tlStart, tlEnd),
        paidWeeks: paidWks,
        absenceWeeks: totalWks,
        weeklyPay: paidWks > 0 ? 5769 : 0,
        details: {
          pre: preBirthOn ? { title: 'Pre-birth disability', duration: `${preWeeks} weeks`, dates: `${fmtDate(preStart)} – ${fmtDate(due)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Pregnancy Disability Leave (PDL), FMLA', paidBy: 'Short-Term Disability insurance (60% salary)' } : null,
          post: postBirthOn ? { title: 'Post-birth disability', duration: `${postWeeks} weeks (vaginal)`, dates: `${fmtDate(due)} – ${fmtDate(postEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Short-Term Disability insurance', paidBy: 'STD insurance (60% salary, after 7-day waiting period)' } : null,
          bond: bondingOn ? { title: 'Bonding time', duration: `${bondWeeks} weeks`, dates: `${fmtDate(bondStart)} – ${fmtDate(bondEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: 'Unpaid (unless state PFL)', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (FMLA)', paidBy: 'Unpaid — check state Paid Family Leave' } : null,
        },
        preDates: preBirthOn ? `${fmtDate(preStart)} – ${fmtDate(due)}` : '',
        postDates: postBirthOn ? `${fmtDate(due)} – ${fmtDate(postEnd)}` : '',
        bondDates: bondingOn ? `${fmtDate(bondStart)} – ${fmtDate(bondEnd)}` : '',
        preSub: `${preWeeks} work weeks`,
        postSub: `${postWeeks} work weeks`,
        bondSub: `${bondWeeks} work weeks`,
      };
    }

    if (isFamily) {
      // ── Family timeline ──
      const start = new Date((sideStart || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
      const durWks = sideDuration;
      const fmlaWks = fmlaEligible ? Math.min(durWks, 12) : 0;
      const unpaidWks = Math.max(0, durWks - fmlaWks);
      const displayWks = Math.max(durWks, 4);
      const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));
      const fmlaEnd = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), fmlaWks);
      const totalEnd = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), durWks);
      const rows = [];
      if (fmlaWks > 0) rows.push({ id: 'fmla', label: 'FMLA', left: 0, width: pct(fmlaWks), segClass: 'full', tooltip: 'FMLA: Job-protected leave' });
      if (unpaidWks > 0) rows.push({ id: 'unpaid', label: 'Unpaid', left: pct(fmlaWks), width: pct(unpaidWks), segClass: 'none', tooltip: 'Extended unpaid leave' });

      return {
        rows,
        months: buildMonths(start, totalEnd),
        paidWeeks: 0,
        absenceWeeks: durWks,
        weeklyPay: 0,
        details: {
          fmla: fmlaWks > 0 ? { title: 'FMLA Job Protection', duration: `${fmlaWks} weeks`, dates: `${fmtDate(start)} – ${fmtDate(fmlaEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: 'No income replacement', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (federal)', paidBy: 'No paid benefit — job-protected leave only' } : null,
          unpaid: unpaidWks > 0 ? { title: 'Extended Leave (beyond FMLA)', duration: `${unpaidWks} weeks`, dates: `${fmtDate(fmlaEnd)} – ${fmtDate(totalEnd)}`, protection: { text: 'Not protected', cls: 'unpaid' }, pay: { text: 'Unpaid', cls: 'unpaid' }, coveredBy: 'Employer discretion / ADA accommodation', paidBy: 'No paid benefit' } : null,
        },
      };
    }

    // ── Illness / military / other timeline ──
    const start = new Date((sideStart || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
    const stdWks = stdOn ? stdDuration : 0;
    const fmlaWks = fmlaOn && fmlaEligible ? Math.min(Math.max(stdWks, 12), 12) : 0;
    const unpaidWks = unpaidOn ? unpaidDuration : 0;
    const stBenefit = STATE_BENEFITS[sideWorkState] || null;
    const stateWks = stBenefit ? stBenefit.medicalWeeks : 0;
    const protectedWks = Math.max(stdWks, fmlaWks);
    const totalAbsWks = protectedWks + unpaidWks;
    const displayWks = Math.max(totalAbsWks, stateWks, 12);
    const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));

    const stdEnd   = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), stdWks);
    const fmlaEnd  = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), fmlaWks);
    const stateEnd = stBenefit ? addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), stateWks) : null;
    const unpaidStartDate = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), protectedWks);
    const unpaidEndDate   = addWeeksToDate(sideStart || new Date().toISOString().slice(0, 10), totalAbsWks);

    const rows = [];
    if (stdOn)   rows.push({ id: 'std',   label: 'STD',   left: 0,              width: pct(stdWks),   segClass: activeView === 'pay' ? 'partial' : 'insurance', tooltip: 'Short-Term Disability: 60% salary' });
    if (fmlaOn)  rows.push({ id: 'fmla',  label: 'FMLA',  left: 0,              width: pct(fmlaWks),  segClass: 'full',    tooltip: 'FMLA: Job-protected leave' });
    if (stBenefit) rows.push({ id: 'state', label: stBenefit.name.split(' ')[0], left: 0, width: pct(stateWks), segClass: 'state', tooltip: `${stBenefit.name}: ${stBenefit.note}` });
    if (unpaidOn) rows.push({ id: 'unpaid', label: 'Unpaid', left: pct(protectedWks), width: pct(unpaidWks), segClass: 'none', tooltip: 'Extended unpaid leave' });

    return {
      rows,
      months: buildMonths(start, stateEnd && stateEnd > unpaidEndDate ? stateEnd : unpaidEndDate),
      paidWeeks: stdWks + (stBenefit ? Math.max(0, stateWks - stdWks) : 0),
      absenceWeeks: totalAbsWks,
      weeklyPay: stdWks > 0 ? 3462 : (stBenefit ? Math.round(5769 * stBenefit.payPct / 100) : 0),
      stateBenefit: stBenefit,
      details: {
        std:   stdOn   ? { title: 'Short-Term Disability',              duration: `${stdWks} weeks`,   dates: `${fmtDate(start)} – ${fmtDate(stdEnd)}`,          protection: { text: fmlaEligible ? 'FMLA' : 'None', cls: fmlaEligible ? 'eligible' : 'unpaid' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Short-Term Disability insurance',         paidBy: 'STD insurance (60% of base salary, after 7-day waiting period)' } : null,
        fmla:  fmlaOn  ? { title: 'FMLA Job Protection',                duration: `${fmlaWks} weeks`,  dates: `${fmtDate(start)} – ${fmtDate(fmlaEnd)}`,         protection: { text: 'FMLA', cls: 'eligible' },                                                    pay: stdOn ? { text: '60% via STD (if enrolled)', cls: 'partial' } : { text: 'No income replacement', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (federal)', paidBy: stdOn ? 'STD runs concurrently with FMLA' : 'No paid benefit — job-protected only' } : null,
        state: stBenefit ? { title: stBenefit.name, duration: `${stateWks} weeks`, dates: `${fmtDate(start)} – ${fmtDate(stateEnd)}`, protection: { text: 'State law', cls: 'eligible' }, pay: { text: `${stBenefit.payPct}% via ${stBenefit.name}`, cls: 'partial' }, coveredBy: stBenefit.name, paidBy: stBenefit.desc } : null,
        unpaid: unpaidOn ? { title: 'Extended Leave (beyond protections)', duration: `${unpaidWks} weeks`, dates: `${fmtDate(unpaidStartDate)} – ${fmtDate(unpaidEndDate)}`, protection: { text: 'Not protected', cls: 'unpaid' }, pay: { text: 'Unpaid', cls: 'unpaid' }, coveredBy: 'Employer discretion / ADA accommodation', paidBy: 'No paid benefit' } : null,
      },
      stdDates:   stdOn   ? `${fmtDate(start)} – ${fmtDate(stdEnd)}` : '',
      fmlaDates:  fmlaOn  ? `${fmtDate(start)} – ${fmtDate(fmlaEnd)}` : '',
      unpaidDates: unpaidOn ? `${fmtDate(unpaidStartDate)} – ${fmtDate(unpaidEndDate)}` : '',
      stdSub:    stdOn    ? `${stdWks} weeks at 60% pay` : 'Up to 26 weeks',
      fmlaSub:   fmlaOn   ? (fmlaWks > 0 ? `${fmlaWks} weeks protected` : fmlaEligible ? 'Up to 12 weeks' : 'Not eligible') : 'Up to 12 weeks',
      unpaidSub: unpaidOn ? `${unpaidWks} additional weeks` : 'Beyond protections',
    };
  }, [
    isBirth, isFamily,
    sideStart, sideDueDate, sideDuration,
    fmlaEligible, sideWorkState,
    stdOn, fmlaOn, unpaidOn, stdDuration, unpaidDuration,
    preBirthOn, postBirthOn, bondingOn,
    activeView,
  ]);

  const stateBenefit = STATE_BENEFITS[sideWorkState] || null;
  const detailData = openDetail ? (tlData.details?.[openDetail] || null) : null;

  // ─── Navigation handlers ──────────────────────────────────────────────────

  function handleStart() {
    setStarted(true);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goNext() {
    if (step === 2) {
      setSideWorkState(workState);
      setSideHireDate(hireDate);
      if (isBirth) {
        setSideDueDate(leaveStart || new Date().toISOString().slice(0, 10));
      } else {
        setSideStart(leaveStart || new Date().toISOString().slice(0, 10));
        setSideDuration(snapDur(durWeeksHint));
        if (!isFamily) setStdDuration(snapDur(durWeeksHint));
      }
    }
    if (step === 1 && isBirth && leaveStart === new Date().toISOString().slice(0, 10)) {
      const d = new Date();
      d.setMonth(d.getMonth() + 3);
      setLeaveStart(d.toISOString().slice(0, 10));
    }
    setStep((prev) => Math.min(prev + 1, STEP_LABELS.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    if (step === 1) {
      setStarted(false);
    } else {
      setStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Illness flow navigation ──
  const illnessTotalSteps = ILLNESS_STEP_LABELS.length;

  function goIllnessNext() {
    if (illnessStep === 1 && reason !== 'illness') {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (illnessStep === 2) {
      setSideWorkState(workState);
      setSideHireDate(hireDate);
      setSideStart(leaveStart || new Date().toISOString().slice(0, 10));
      setSideDuration(snapDur(durWeeksHint));
      setStdDuration(snapDur(durWeeksHint));
    }
    setIllnessStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goIllnessBack() {
    if (illnessStep === 1) {
      setStarted(false);
    } else {
      setIllnessStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goIllnessIntakeNext() {
    setIllnessIntakeStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goIllnessIntakeBack() {
    if (illnessIntakeStep === 1) {
      setIllnessIntakeStep(0);
      setIllnessStep(3);
    } else {
      setIllnessIntakeStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function savePlanDraft() {
    const reasonLabel = REASON_OPTIONS.find(o => o.value === reason)?.title || 'Leave Plan';
    const draft = {
      id: `draft-pl-${Date.now()}`,
      type: 'plan-leave',
      title: reasonLabel,
      reason,
      step,
      totalSteps: 3,
      startDate: isBirth ? sideDueDate : sideStart,
      savedAt: new Date().toISOString(),
      route: '/plan-absence',
    };
    const existing = JSON.parse(localStorage.getItem('leaveDrafts') || '[]').filter(d => d.type !== 'plan-leave');
    existing.push(draft);
    localStorage.setItem('leaveDrafts', JSON.stringify(existing));
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="plan-absence-shell">
      <SiteNav />

      {/* Welcome screen */}
      {!started && (
        <div className="rlv2-page">
          <div className="sim-card pa-welcome">
            <div className="pa-kicker">Plan a Leave</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25 }}>Plan your Leave</h2>
            <p style={{ fontSize: 15, color: '#5d5d5d', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
              Tell us your reason and a few details &mdash; we&rsquo;ll show you <em style={{ fontStyle: 'italic', color: '#404040', fontWeight: 600 }}>estimated</em> benefits, timeline, and pay so you can plan with confidence. Final amounts are determined after approval.
            </p>
            <div className="pa-illustration">
              <div className="pa-illustration-circle">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="16" y="12" width="28" height="32" rx="3" stroke="#525252" strokeWidth="2" fill="#fff"/>
                  <path d="M22 12V8M38 12V8" stroke="#525252" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 20h28" stroke="#525252" strokeWidth="2"/>
                  <circle cx="24" cy="28" r="2" fill="#525252"/><circle cx="30" cy="28" r="2" fill="#525252"/><circle cx="36" cy="28" r="2" fill="#525252"/>
                  <circle cx="24" cy="34" r="2" fill="#525252"/><circle cx="30" cy="34" r="2" fill="#525252"/><circle cx="36" cy="34" r="2" fill="#525252"/>
                  <rect x="38" y="18" width="14" height="18" rx="2" stroke="#525252" strokeWidth="1.5" fill="#fff"/>
                  <path d="M42 22h6M42 26h6M42 30h4" stroke="#c4c4c8" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="pa-illustration-badge pa-illustration-badge-clock">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#525252" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div className="pa-illustration-badge pa-illustration-badge-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#0f0f14" stroke="#0f0f14" strokeWidth="1"/><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
            <button className="sim-btn-primary" type="button" onClick={handleStart} style={{ padding: '14px 48px', fontSize: 16, borderRadius: 8 }}>
              Get Started
            </button>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #f0f0f2' }}>
              <Link to="/request-leave-react" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, color: '#525252', textDecoration: 'none' }}>
                <span>Already know what you need?</span>
                <span style={{ fontWeight: 600, color: '#0f0f14' }}>Request leave directly &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ILLNESS-SPECIFIC FLOW — Planning Phase (steps 1-3) ═══ */}
      {started && reason === 'illness' && illnessStep >= 1 && illnessStep <= illnessTotalSteps && illnessIntakeStep === 0 && !showIllnessConfirmation && (
        <div className={`rlv2-page${illnessStep === 3 ? ' rlv2-page-wide' : ''}`}>

          {/* ─── Illness Step 1: Reason ─── */}
          {illnessStep === 1 && (
            <div className="sim-card">
              <h2 style={{ marginBottom: 20 }}>
                Why are you taking leave?{' '}
                <span className="wiz-tooltip-wrap">
                  <svg className="wiz-tooltip-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#737373" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#737373"/></svg>
                  <span className="wiz-tooltip-text">Select the primary reason for your leave. Don&rsquo;t worry if you&rsquo;re not sure about the details yet &mdash; we&rsquo;ll walk through everything together.</span>
                </span>
              </h2>
              <div className="option-cards">
                {REASON_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className={`option-card has-tooltip${reason === opt.value ? ' selected' : ''}`}
                    onClick={() => setReason(opt.value)}
                  >
                    <div className="option-radio"><div className="option-radio-dot" /></div>
                    <div className="option-card-icon">{opt.icon}</div>
                    <div className="option-text"><h4>{opt.title}</h4></div>
                    <span className={`oc-tooltip${opt.tooltipRight ? ' oc-tooltip-right' : ''}`}>{opt.tooltip}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#737373', marginBottom: 16, lineHeight: 1.5 }}>
                This helps us identify which benefits and protections may apply to you.
              </div>
              <div className="sim-btn-row">
                <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessBack}>&larr; Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessNext}>Continue &#8594;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 2: Employment & Details ─── */}
          {illnessStep === 2 && (
            <div className="sim-card">
              <h2>Your employment &amp; leave details</h2>
              <p className="sim-desc">We use this to determine your eligibility for FMLA, Short-Term Disability, and state-specific benefits.</p>

              <div className="pa-grid">
                <div className="sim-field">
                  <label>Work State <span style={{ color: '#dc2626' }}>*</span></label>
                  <select value={workState} onChange={(e) => setWorkState(e.target.value)}>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sim-field">
                  <label>Hired Date <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e8e8ec', paddingTop: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f0f14', marginBottom: 10 }}>How will you take your leave? <span style={{ color: '#dc2626' }}>*</span></label>
                <div className="lt-picker">
                  {['continuous', 'intermittent', 'reduced'].map((type) => (
                    <button key={type} type="button" className={`lt-btn ${leaveType === type ? 'selected' : ''}`} onClick={() => setLeaveType(type)}>
                      <span className="lt-btn-icon">
                        {type === 'continuous' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M3 10h18" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                        {type === 'intermittent' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        {type === 'reduced' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7v5h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span className="lt-btn-label">{type === 'continuous' ? 'Continuous' : type === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: '#525252', margin: '12px 0 16px' }}>{leaveType === 'continuous' ? "You'll be fully away from work for the duration of your leave." : leaveType === 'intermittent' ? "You'll take time off periodically — for flare-ups, treatments, or appointments." : "You'll continue working but with fewer hours per day or days per week."}</p>
                {leaveType === 'reduced' && (
                  <div className="sim-field" style={{ marginBottom: 16 }}>
                    <label>Hours per week you plan to work <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="number" placeholder="e.g. 20" value={reducedProposedHrs} onChange={(e) => setReducedProposedHrs(e.target.value)} />
                  </div>
                )}
                <div className="pa-grid">
                  <div className="sim-field"><label>Anticipated Start Date <span style={{ color: '#dc2626' }}>*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                  <div className="sim-field"><label>Expected End Date</label><input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} /></div>
                </div>
              </div>

              <div className="sim-btn-row">
                <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessBack}>&larr; Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessNext}>See My Coverage &#8594;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 3: Design Your Plan ─── */}
          {illnessStep === 3 && (() => {
            const estStart = new Date((leaveStart || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
            const estEnd = new Date((leaveReturn || new Date().toISOString().slice(0, 10)) + 'T00:00:00');
            const diffWeeks = Math.max(1, Math.round((estEnd - estStart) / (1000 * 60 * 60 * 24 * 7)));
            const fmlaWks = fmlaEligible ? Math.min(diffWeeks, 12) : 12;
            const stdWks = Math.min(diffWeeks, 26);
            const stBenefit = STATE_BENEFITS[sideWorkState];
            const stateWks = stBenefit ? Math.min(diffWeeks, stBenefit.medicalWeeks) : 0;
            const fmlaEndDate = addWeeksToDate(leaveStart || new Date().toISOString().slice(0, 10), fmlaWks);
            const stdEndDate = addWeeksToDate(leaveStart || new Date().toISOString().slice(0, 10), stdWks);
            const stateEndDate = stBenefit ? addWeeksToDate(leaveStart || new Date().toISOString().slice(0, 10), stateWks) : null;
            const estMonths = buildMonths(estStart, stateEndDate && stateEndDate > stdEndDate ? stateEndDate : stdEndDate);

            const displayWks = Math.max(stdWks, fmlaWks, stateWks, 12);
            const fmlaPct = (fmlaWks / displayWks) * 100;
            const stdPct = (stdWks / displayWks) * 100;
            const statePct = (stateWks / displayWks) * 100;

            return (
              <div className="sim-split">
                <div className="sim-split-main">
                  <div className="sim-card" style={{ padding: '28px 32px' }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Your Leave Scenario</h2>
                    <div style={{ background: '#f0f4f8', border: '1px solid #e0e7ef', borderRadius: 8, padding: '12px 16px', marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#0033a0" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#0033a0" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#0033a0"/></svg>
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                        <strong>This is an estimate.</strong> Actual eligibility, coverage dates, and payment amounts will be determined after you submit your request and documentation is reviewed.
                      </p>
                    </div>

                    <div style={{ background: '#fff', border: '1px solid #e8e8ec', borderRadius: 12, padding: 24, marginBottom: 28 }}>
                      <div className="dlp-section-head" style={{ marginBottom: 6 }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Leave Timeline <span style={{ fontSize: 12, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4, marginLeft: 8, verticalAlign: 'middle' }}>ESTIMATE</span></h3>
                      </div>
                      <p className="dlp-section-sub">Hover over a row to see details. <strong>All dates, durations, and pay figures shown are <em>estimates only</em>.</strong></p>

                      <div className="dlp-tl-months" style={{ paddingLeft: 120, marginBottom: 12 }}>
                        {estMonths.map((m, i) => <span key={i}>{m}</span>)}
                      </div>

                      <div className="dlp-tl-row" style={{ marginBottom: 8 }}>
                        <div className="dlp-tl-row-label">FMLA</div>
                        <div className="dlp-tl-row-bar">
                          <div className="dlp-tl-seg full" style={{ left: '0%', width: `${fmlaPct}%` }} />
                        </div>
                      </div>

                      <div className="dlp-tl-row">
                        <div className="dlp-tl-row-label">STD</div>
                        <div className="dlp-tl-row-bar">
                          <div className="dlp-tl-seg partial" style={{ left: '0%', width: `${stdPct}%` }} />
                        </div>
                      </div>

                      {stBenefit && (
                        <div className="dlp-tl-row" style={{ marginTop: 8 }}>
                          <div className="dlp-tl-row-label">State</div>
                          <div className="dlp-tl-row-bar">
                            <div className="dlp-tl-seg state" style={{ left: '0%', width: `${statePct}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="dlp-legend" style={{ marginTop: 16 }}>
                        <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#0033a0' }} />FMLA</div>
                        <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#3b82f6' }} />Short-Term Disability</div>
                        {stBenefit && <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#0d9488' }} />State Paid Leave</div>}
                      </div>

                      <div style={{ fontSize: 11, color: '#525252', background: '#f5f5f7', borderRadius: 6, padding: '8px 12px', marginTop: 16, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 5v3" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.5" fill="#737373"/></svg>
                        <span><strong>This is an estimate.</strong> Actual eligibility, coverage dates, and payment amounts will be determined after you submit your request and documentation is reviewed.</span>
                      </div>
                    </div>

                    <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
                      <div style={{ padding: '20px 20px 0' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', margin: '0 0 4px' }}>Estimated coverage breakdown</h3>
                        <p style={{ fontSize: 13, color: '#737373', margin: '0 0 16px' }}>Final details will be confirmed after your request is submitted and reviewed.</p>
                      </div>

                      <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f0f14' }}>FMLA</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>Job-protected, unpaid</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#737373' }}>
                          <span>{fmtDate(estStart)} – {fmtDate(fmlaEndDate)}</span>
                          <span>{fmlaWks} weeks</span>
                        </div>
                      </div>

                      <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f0f14' }}>Short-Term Disability</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>60% of salary</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#737373' }}>
                          <span>After 7-day waiting period</span>
                          <span>{stdWks} weeks</span>
                        </div>
                      </div>

                      {stBenefit && (
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f2' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0d9488' }}>{stBenefit.name}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>{stBenefit.payPct}% of salary</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#737373' }}>
                            <span>{fmtDate(estStart)} – {fmtDate(stateEndDate)}</span>
                            <span>{stateWks} weeks</span>
                          </div>
                        </div>
                      )}

                      <div style={{ padding: '14px 20px', borderTop: '1px solid #e5e5e5', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0f14' }}>Est. total leave</div>
                          <div style={{ fontSize: 12, color: '#737373' }}>~{Math.max(fmlaWks, stdWks, stateWks)} weeks ~{Math.max(stdWks, stateWks)} paid</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0f14' }}>Benefits available</div>
                          <div style={{ fontSize: 12, color: '#737373' }}>{stBenefit ? 3 : 2} programs</div>
                        </div>
                      </div>
                    </div>

                    {stBenefit && (
                      <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
                        <div style={{ padding: '20px 20px 12px' }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', margin: 0 }}>Other Benefits You May be Eligible for</h3>
                        </div>
                        <div style={{ padding: '0 20px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#525252', marginBottom: 12 }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#0033a0" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#0033a0" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#0033a0"/></svg>
                            You may still need to apply for state benefits on your state site
                          </div>
                          <div style={{ background: '#f9fafb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '14px 16px', marginBottom: 10 }}>
                            <div style={{ fontSize: 11, color: '#737373', marginBottom: 4 }}>Benefits you May be Eligible for</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f0f14' }}>{stBenefit.name}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{ padding: '20px 0 0', textAlign: 'center' }}>
                      <button className="btn btn-next" type="button" onClick={() => setShowTransitionModal(true)} style={{ padding: '12px 36px', fontSize: 14, borderRadius: 8 }}>Start My Leave Request &rarr;</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                      <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                      <button type="button" onClick={goIllnessBack} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit' }}>&larr; Back</button>
                      <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit' }}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 3l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Email Plan
                      </button>
                    </div>
                  </div>
                </div>

                <div className="sim-split-side">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="dlp-sidebar">
                      <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                      <div className="dlp-sidebar-group-body">
                        <div className="dlp-side-field">
                          <label>Work State</label>
                          <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                          <label>Hired Date</label>
                          <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="dlp-sidebar">
                      <div className="dlp-sidebar-group-label">LEAVE DATE</div>
                      <div className="dlp-sidebar-group-body">
                        <div className="dlp-side-field">
                          <label>Anticipated Start Date</label>
                          <input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} />
                        </div>
                        <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                          <label>Estimated End Date</label>
                          <input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="dlp-sidebar">
                      <div className="dlp-sidebar-group-label">LEAVE TYPE</div>
                      <div className="dlp-sidebar-group-body">
                        <div style={{ fontSize: 14, color: '#0f0f14' }}>{leaveType === 'continuous' ? 'Continuous' : leaveType === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</div>
                      </div>
                    </div>

                    {stBenefit ? (
                      <div className="dlp-sidebar" style={{ borderLeft: '3px solid #0d9488' }}>
                        <div className="dlp-sidebar-group-label" style={{ color: '#0d9488' }}>STATE BENEFITS</div>
                        <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0f14', marginBottom: 4 }}>{stBenefit.name}</div>
                          <div style={{ fontSize: 12, color: '#525252', lineHeight: 1.5, marginBottom: 8 }}>{stBenefit.desc}</div>
                          <div style={{ fontSize: 11, color: '#0d9488', fontWeight: 600 }}>{stBenefit.card}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="dlp-sidebar" style={{ borderLeft: '3px solid #e5e5e5' }}>
                        <div className="dlp-sidebar-group-label">STATE BENEFITS</div>
                        <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                          <div style={{ fontSize: 12, color: '#737373', lineHeight: 1.5 }}>No state-level paid leave program found for {sideWorkState}. Only federal (FMLA) and employer programs apply.</div>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, fontSize: 11, color: '#a3a3a3', padding: '4px 4px 0' }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#a3a3a3" strokeWidth="1.2"/><path d="M8 7v4" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#a3a3a3"/></svg>
                      All values are estimates. Changes update the timeline instantly.
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ═══ ILLNESS INTAKE FLOW (post-modal) ═══ */}
      {started && reason === 'illness' && illnessIntakeStep >= 1 && illnessIntakeStep <= ILLNESS_INTAKE_LABELS.length && !showIllnessConfirmation && (
        <div className="rlv2-page">
          <div className="sim-stepper">
            <div className="stepper">
              <div className="stepper-counter">Step <strong>{illnessIntakeStep}</strong> of <strong>{ILLNESS_INTAKE_LABELS.length}</strong></div>
              <div className="stepper-title">{ILLNESS_INTAKE_LABELS[illnessIntakeStep - 1]}</div>
            </div>
          </div>

          {/* ─── Intake Step 1: Leave Structure ─── */}
          {illnessIntakeStep === 1 && (
            <div className="sim-card">
              <h2>How would you like to structure your leave?</h2>
              <p className="sim-desc">This helps us figure out which benefits and protections apply.</p>

              <div className="lt-picker">
                {['continuous', 'intermittent', 'reduced'].map((type) => (
                  <button key={type} type="button" className={`lt-btn ${leaveType === type ? 'selected' : ''}`} onClick={() => setLeaveType(type)}>
                    <span className="lt-btn-icon">
                      {type === 'continuous' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M3 10h18" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      {type === 'intermittent' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {type === 'reduced' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7v5h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span className="lt-btn-label">{type === 'continuous' ? 'Continuous' : type === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
                  </button>
                ))}
              </div>

              <div className="lt-context">
                <p className="lt-context-desc">{leaveType === 'continuous' ? "You'll be fully away from work for the duration of your absence." : leaveType === 'intermittent' ? "You'll take time off periodically — for flare-ups, treatments, or appointments." : "You'll continue working but with fewer hours per day or days per week."}</p>
                <div className="bordered-section">
                  {leaveType === 'continuous' ? (
                    <>
                      <div className="form-row cols-2">
                        <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                        <div className="form-group"><label>Expected End Date</label><input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} /><div className="helper">Your best estimate of when you expect to return to work.</div></div>
                      </div>
                      <div className="form-row cols-2" style={{ marginTop: 16 }}>
                        <div className="form-group"><label>What was your last day worked?</label><input type="date" value={lastDayWorked} onChange={(e) => setLastDayWorked(e.target.value)} /></div>
                        <div className="form-group"><label>Hours worked on last day<span className="req">*</span></label><input type="text" value={hoursLastDay} onChange={(e) => setHoursLastDay(e.target.value)} placeholder="08:00" /></div>
                      </div>
                    </>
                  ) : leaveType === 'intermittent' ? (
                    <div className="form-row cols-2">
                      <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                      <div className="form-group"><label>How often do you need time off?</label><input type="text" placeholder="e.g. 1-2 times per week" value={intermittentFreq} onChange={(e) => setIntermittentFreq(e.target.value)} /></div>
                    </div>
                  ) : (
                    <div className="form-row cols-2">
                      <div className="form-group"><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                      <div className="form-group"><label>Hours per week you plan to work</label><input type="number" value={reducedProposedHrs} onChange={(e) => setReducedProposedHrs(e.target.value)} /></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Intake Step 2: Missed Time ─── */}
          {illnessIntakeStep === 2 && (
            <div className="sim-card">
              <h2>Add any time you&rsquo;ve already missed?</h2>
              <p className="sim-desc">Log any work days you&rsquo;ve already missed for this condition.</p>

              <div className="rq-yn-group" style={{ marginBottom: 20 }}>
                <button className={`rq-yn-btn${hasMissedTime === true ? ' active' : ''}`} type="button" onClick={() => setHasMissedTime(true)}>Yes</button>
                <button className={`rq-yn-btn${hasMissedTime === false ? ' active' : ''}`} type="button" onClick={() => setHasMissedTime(false)}>No</button>
              </div>

              {hasMissedTime === true && leaveType === 'continuous' && (
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <div className="form-row cols-2">
                    <div className="form-group"><label>What was the first day you missed work?</label><input type="date" value={missedFirstDay} onChange={(e) => setMissedFirstDay(e.target.value)} /></div>
                    <div className="form-group"><label>Hours scheduled to work<span className="req">*</span></label><input type="text" value={missedHoursScheduled} onChange={(e) => setMissedHoursScheduled(e.target.value)} placeholder="08:00" /></div>
                  </div>
                </div>
              )}

              {hasMissedTime === true && leaveType === 'intermittent' && (
                <div style={{ marginBottom: 20 }}>
                  <div className="rq-grid" style={{ gridTemplateColumns: '1fr auto auto auto', gap: 12, alignItems: 'end', marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#525252' }}>Day(s) you missed work</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#525252' }}>Hrs | Min</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#525252' }}>Reason</div>
                    <div style={{ width: 32 }} />
                  </div>
                  {missedEntries.map((entry, i) => (
                    <div key={i} className="rq-grid" style={{ gridTemplateColumns: '1fr auto auto auto', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                      <input type="date" value={entry.date} onChange={(e) => { const arr = [...missedEntries]; arr[i] = { ...arr[i], date: e.target.value }; setMissedEntries(arr); }} />
                      <input type="text" value={entry.hours} style={{ width: 80 }} onChange={(e) => { const arr = [...missedEntries]; arr[i] = { ...arr[i], hours: e.target.value }; setMissedEntries(arr); }} />
                      <input type="text" value={entry.reason} style={{ width: 120 }} placeholder="Episode" onChange={(e) => { const arr = [...missedEntries]; arr[i] = { ...arr[i], reason: e.target.value }; setMissedEntries(arr); }} />
                      <button type="button" onClick={() => setMissedEntries((prev) => prev.filter((_, j) => j !== i))} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d4d4d8', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 16 }}>&minus;</button>
                    </div>
                  ))}
                  <button type="button" className="rq-add-week" onClick={() => setMissedEntries((prev) => [...prev, { date: '', hours: '08:00', reason: '' }])}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Add another date
                  </button>
                  <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#0f0f14', marginTop: 8 }}>
                    {missedEntries.reduce((sum, e) => {
                      const parts = e.hours.split(':');
                      return sum + (parseInt(parts[0]) || 0) + ((parseInt(parts[1]) || 0) / 60);
                    }, 0).toFixed(0)} total hours missed
                  </div>
                </div>
              )}

              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 4: Work Schedule ─── */}
          {illnessIntakeStep === 3 && (
            <div className="sim-card">
              <h2>Tell us about your typical work schedule</h2>
              <p className="sim-desc">This should reflect your usual work schedule before your absence.</p>
              {schedWeeks.map((week, wi) => {
                const total = Object.values(week).reduce((s, v) => s + (Number(v) || 0), 0);
                return (
                  <div className="rq-week-card" key={wi}>
                    <div className="rq-week-header">
                      <div className="rq-week-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#525252" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        Week {wi + 1}
                      </div>
                      <span className="rq-week-total">{total} hrs / week</span>
                    </div>
                    {wi === 0 && <div className="rq-week-hint">Click each day to enter hours. Default is 8 hours/day for weekdays.</div>}
                    <div className="rq-days-grid">
                      {['sun','mon','tue','wed','thu','fri','sat'].map((day) => (
                        <div className="rq-day-cell" key={day}>
                          <div className="rq-day-label">{day.toUpperCase()}</div>
                          <input
                            className="rq-day-input"
                            type="number"
                            min="0"
                            max="24"
                            value={week[day]}
                            onChange={(e) => {
                              const val = Math.max(0, Math.min(24, Number(e.target.value) || 0));
                              setSchedWeeks((prev) => prev.map((w, i) => i === wi ? { ...w, [day]: val } : w));
                            }}
                          />
                          <div className="rq-day-unit">hrs</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button className="rq-add-week" type="button" onClick={() => setSchedWeeks((prev) => [...prev, { sun: 0, mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0 }])}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Add another week
              </button>
              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 5: Tell us about your condition ─── */}
          {illnessIntakeStep === 4 && (
            <div className="sim-card">
              <h2>Tell us about your condition</h2>
              <p className="sim-desc">Your provider will handle the clinical certification. This helps us start the right process.</p>
              <div style={{ marginBottom: 20 }}>
                <div className="sim-field" style={{ marginBottom: 16 }}>
                  <label>Medical Condition <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" placeholder="e.g. Back Surgery" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div className="sim-field"><label>First Date of Treatment</label><input type="date" value={firstTreatment} onChange={(e) => setFirstTreatment(e.target.value)} /></div>
                  <div className="sim-field"><label>Next Scheduled Appointment</label><input type="date" value={nextAppt} onChange={(e) => setNextAppt(e.target.value)} /></div>
                </div>
                <div className="bordered-section" style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Will you be hospitalized or need ongoing treatment? <span style={{ color: '#dc2626' }}>*</span></label>
                  <div className="rq-yn-group">
                    <button className={`rq-yn-btn${hospitalized === true ? ' active' : ''}`} type="button" onClick={() => setHospitalized(true)}>Yes</button>
                    <button className={`rq-yn-btn${hospitalized === false ? ' active' : ''}`} type="button" onClick={() => setHospitalized(false)}>No</button>
                  </div>
                </div>
                <div className="bordered-section">
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Is your injury/illness related to your job or workplace?<span style={{ color: '#dc2626' }}>*</span></label>
                  <div className="rq-yn-group">
                    <button className={`rq-yn-btn${jobRelated === true ? ' active' : ''}`} type="button" onClick={() => setJobRelated(true)}>Yes</button>
                    <button className={`rq-yn-btn${jobRelated === false ? ' active' : ''}`} type="button" onClick={() => setJobRelated(false)}>No</button>
                  </div>
                </div>
              </div>
              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 6: Provider Details ─── */}
          {illnessIntakeStep === 5 && (
            <div className="sim-card">
              <h2>Provider Details</h2>
              <p className="sim-desc">Tell us more about your medical provider.</p>
              <div className="bordered-section" style={{ marginBottom: 20 }}>
                <div className="sim-field" style={{ marginBottom: 16 }}>
                  <label>Facility / Practice Name</label>
                  <input type="text" placeholder="e.g. St. Luke's Medical Center" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 12, marginBottom: 16 }}>
                  <div className="sim-field"><label>Provider Name</label><input type="text" placeholder="Dr. First Last" value={providerName} onChange={(e) => setProviderName(e.target.value)} /></div>
                  <div className="sim-field"><label>Suffix</label><select value={providerSuffix} onChange={(e) => setProviderSuffix(e.target.value)} style={{ width: '100%' }}><option value="">—</option><option value="MD">MD</option><option value="DO">DO</option><option value="NP">NP</option><option value="PA">PA</option></select></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div className="sim-field"><label>Phone</label><input type="tel" placeholder="(555) 000-0000" value={providerPhone} onChange={(e) => setProviderPhone(e.target.value)} /></div>
                  <div className="sim-field"><label>Fax</label><input type="tel" placeholder="(555) 000-0000" value={providerFax} onChange={(e) => setProviderFax(e.target.value)} /></div>
                </div>
                <div className="sim-field" style={{ marginBottom: 16 }}>
                  <label>Email</label>
                  <input type="email" placeholder="provider@facility.com" value={providerEmail} onChange={(e) => setProviderEmail(e.target.value)} />
                </div>
                <div className="sim-field" style={{ marginBottom: 16 }}>
                  <label>Street Address</label>
                  <input type="text" placeholder="123 Main Street, Unit 404" value={providerStreet} onChange={(e) => setProviderStreet(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div className="sim-field"><label>City</label><input type="text" value={providerCity} onChange={(e) => setProviderCity(e.target.value)} /></div>
                  <div className="sim-field"><label>State</label><select value={providerState} onChange={(e) => setProviderState(e.target.value)} style={{ width: '100%' }}><option value="">—</option>{US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="sim-field"><label>ZIP</label><input type="text" maxLength={5} value={providerZip} onChange={(e) => setProviderZip(e.target.value)} /></div>
                </div>
              </div>
              <button type="button" className="rq-add-week">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Add another provider
              </button>
              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 7: Medical Certification Consent ─── */}
          {illnessIntakeStep === 6 && (
            <div className="sim-card">
              <h2>Medical Certification Consent</h2>
              <p className="sim-desc" style={{ lineHeight: 1.7 }}>You are responsible for ensuring the healthcare provider receives and completes the certification and for providing the form to Benefits Hub on time. Please check with the healthcare provider&rsquo;s office about any fees that may charge to complete a form to make revisions.</p>
              <div className="bordered-section" style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 14, lineHeight: 1.5 }}>Would you like to authorize to send any required certifications directly to the healthcare provider for completion or clarification?</label>
                <div className="rq-yn-group">
                  <button className={`rq-yn-btn${certConsent === true ? ' active' : ''}`} type="button" onClick={() => setCertConsent(true)}>Yes</button>
                  <button className={`rq-yn-btn${certConsent === false ? ' active' : ''}`} type="button" onClick={() => setCertConsent(false)}>NO</button>
                </div>
              </div>
              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Illness Step 8: How should we reach you ─── */}
          {illnessIntakeStep === 7 && (
            <div className="sim-card">
              <h2>How should we reach you?</h2>
              <p className="sim-desc">Please review and update anything that&rsquo;s changed, including an email address you&rsquo;ll have access to during your leave (such as a personal email).</p>

              <div className="bordered-section" style={{ marginBottom: 20, padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 15, fontWeight: 700, color: '#0f0f14' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Contact Details
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div className="sim-field"><label>Email Address <span style={{ color: '#dc2626' }}>*</span></label><input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} /></div>
                  <div className="sim-field"><label>Phone (Call) <span style={{ color: '#dc2626' }}>*</span></label><input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} /></div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1e1e28', marginBottom: 10 }}>Preferred Communication Method</label>
                  <div className="rq-pref-group">
                    {[
                      { key: 'email', label: 'Email', on: prefEmail, set: setPrefEmail },
                      { key: 'phone', label: 'Phone (Call)', on: prefPhone, set: setPrefPhone },
                      { key: 'sms', label: 'SMS', on: prefSMS, set: setPrefSMS },
                    ].map((item) => (
                      <div className="rq-pref-item" key={item.key} onClick={() => item.set(!item.on)}>
                        <div className="rq-pref-check" style={item.on ? {} : { background: '#fff', borderColor: '#d0d0d5' }}>
                          {item.on && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bordered-section" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="3" stroke="#525252" strokeWidth="1.5"/><path d="M12 21c-4.97 0-9-2.69-9-6s4.03-6 9-6 9 2.69 9 6" stroke="#525252" strokeWidth="1.5"/></svg>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#0f0f14' }}>Temporary Address</span>
                  </div>
                  <Toggle on={tempAddr} onClick={() => setTempAddr(!tempAddr)} />
                </div>
                <div style={{ fontSize: 13, color: '#737373', marginBottom: tempAddr ? 16 : 0 }}>Will you be at a different address during your absence?</div>
                {tempAddr && (
                  <>
                    <div className="sim-field" style={{ marginBottom: 16 }}>
                      <label>Street Address</label>
                      <input type="text" value={tempStreet} onChange={(e) => setTempStreet(e.target.value)} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                      <div className="sim-field"><label>City</label><input type="text" value={tempCity} onChange={(e) => setTempCity(e.target.value)} /></div>
                      <div className="sim-field"><label>State</label><select value={tempState} onChange={(e) => setTempState(e.target.value)} style={{ width: '100%' }}><option value="">—</option>{US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                      <div className="sim-field"><label>ZIP</label><input type="text" maxLength={5} value={tempZip} onChange={(e) => setTempZip(e.target.value)} /></div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#525252', marginBottom: 8 }}>Temporary Address Dates</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div className="sim-field"><label>Start Date</label><input type="date" value={tempFrom} onChange={(e) => setTempFrom(e.target.value)} /></div>
                        <div className="sim-field"><label>End Date</label><input type="date" value={tempTo} onChange={(e) => setTempTo(e.target.value)} /></div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goIllnessIntakeBack}>Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goIllnessIntakeNext}>Next</button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ═══ ILLNESS FLOW — Review & Submit ═══ */}
      {started && reason === 'illness' && illnessIntakeStep === 8 && !showIllnessConfirmation && (() => {
        const schedTotal = schedWeeks[0] ? Object.values(schedWeeks[0]).reduce((s, v) => s + (Number(v) || 0), 0) : 40;
        const weekSched = schedWeeks[0] || {};
        const weekDays = ['mon','tue','wed','thu','fri'].filter(d => weekSched[d] > 0).map(d => `${d.charAt(0).toUpperCase() + d.slice(1)} ${weekSched[d]}h`).join(', ');
        return (
          <div className="rlv2-page">
            <div className="sim-card">
              <h2>Review and submit</h2>
              <p className="sim-desc">Please review everything below before submitting. You can go back and edit any section if something doesn&rsquo;t look right.</p>

              {/* Employee Information */}
              <div className="rq-review-section">
                <div className="rq-review-header"><div className="rq-review-title">Employee Information</div></div>
                <div className="rq-review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><div className="rq-review-label">NAME</div><div className="rq-review-value">Sarah Johnson</div></div>
                  <div><div className="rq-review-label">EMPLOYEE ID</div><div className="rq-review-value">EMP-2026-4821</div></div>
                  <div><div className="rq-review-label">EMPLOYER</div><div className="rq-review-value">EnterpriseCorp Inc.</div></div>
                  <div><div className="rq-review-label">OCCUPATION</div><div className="rq-review-value">Senior Marketing Manager</div></div>
                  <div><div className="rq-review-label">WORK LOCATION</div><div className="rq-review-value">New York, NY</div></div>
                  <div><div className="rq-review-label">HIRE DATE</div><div className="rq-review-value">January 15, 2022</div></div>
                  <div><div className="rq-review-label">EMPLOYMENT TYPE</div><div className="rq-review-value">Full-time</div></div>
                  <div><div className="rq-review-label">ADDRESS</div><div className="rq-review-value">456 Oak Avenue, New York, NY 10001</div></div>
                </div>
                <div className="rq-verify-note" style={{ marginTop: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 7v4" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#737373"/></svg>
                  This information is provided by your employer. Contact your employer to make changes.
                </div>
              </div>

              {/* Contact Information */}
              <div className="rq-review-section">
                <div className="rq-review-header">
                  <div className="rq-review-title">Contact Information</div>
                  <button className="pr-edit-link" type="button" onClick={() => setIllnessStep(8)} style={{ color: '#2563eb' }}>Edit</button>
                </div>
                <div className="rq-review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><div className="rq-review-label">EMAIL</div><div className="rq-review-value">{contactEmail}</div></div>
                  <div><div className="rq-review-label">PHONE</div><div className="rq-review-value">{contactPhone}</div></div>
                  <div><div className="rq-review-label">PREFERRED COMMUNICATION</div><div className="rq-review-value">{[prefEmail && 'Email', prefSMS && 'SMS'].filter(Boolean).join(', ') || '—'}</div></div>
                  {tempAddr && <div><div className="rq-review-label">TEMPORARY ADDRESS</div><div className="rq-review-value">{[tempStreet, tempCity, tempState, tempZip].filter(Boolean).join(', ')}</div></div>}
                </div>
              </div>

              {/* Absence Details */}
              <div className="rq-review-section">
                <div className="rq-review-header">
                  <div className="rq-review-title">Absence Details</div>
                  <button className="pr-edit-link" type="button" onClick={() => setIllnessStep(2)} style={{ color: '#2563eb' }}>Edit</button>
                </div>
                <div className="rq-review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><div className="rq-review-label">REASON</div><div className="rq-review-value">Own health condition</div></div>
                  <div><div className="rq-review-label">ABSENCE TYPE</div><div className="rq-review-value" style={{ textTransform: 'capitalize' }}>{leaveType}</div></div>
                  <div><div className="rq-review-label">START DATE</div><div className="rq-review-value">{leaveStart ? fmtDate(new Date(leaveStart + 'T00:00:00')) : '—'}</div></div>
                  <div><div className="rq-review-label">EXPECTED RETURN DATE</div><div className="rq-review-value">{leaveReturn ? fmtDate(new Date(leaveReturn + 'T00:00:00')) : '—'}</div></div>
                </div>
              </div>

              {/* Work Schedule */}
              <div className="rq-review-section">
                <div className="rq-review-header">
                  <div className="rq-review-title">Work Schedule</div>
                  <button className="pr-edit-link" type="button" onClick={() => setIllnessStep(4)} style={{ color: '#2563eb' }}>Edit</button>
                </div>
                <div className="rq-review-grid">
                  <div><div className="rq-review-label">WEEK 1 SCHEDULE</div><div className="rq-review-value">{weekDays}</div></div>
                </div>
              </div>

              {/* Medical Certification Consent */}
              <div className="rq-review-section">
                <div className="rq-review-header">
                  <div className="rq-review-title">Medical Certification Consent</div>
                  <button className="pr-edit-link" type="button" onClick={() => setIllnessStep(7)} style={{ color: '#2563eb' }}>Edit</button>
                </div>
                <div className="rq-review-grid">
                  <div>
                    <div className="rq-review-label">Authorize The Release Of Any Required Certification Requests To My Healthcare Provider For Completion Or Clarification</div>
                    <div className="rq-review-value">{certConsent === true ? 'Yes' : certConsent === false ? 'No' : '—'}</div>
                  </div>
                </div>
              </div>

              {/* Healthcare Provider */}
              <div className="rq-review-section">
                <div className="rq-review-header">
                  <div className="rq-review-title">Healthcare Provider</div>
                  <button className="pr-edit-link" type="button" onClick={() => setIllnessStep(6)} style={{ color: '#2563eb' }}>Edit</button>
                </div>
                <div className="rq-review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><div className="rq-review-label">PROVIDER</div><div className="rq-review-value">{providerName || '—'}{providerSuffix ? `, ${providerSuffix}` : ''}</div></div>
                  <div><div className="rq-review-label">FACILITY</div><div className="rq-review-value">{facilityName || '—'}</div></div>
                  <div><div className="rq-review-label">PHONE</div><div className="rq-review-value">{providerPhone || '—'}</div></div>
                  <div><div className="rq-review-label">ADDRESS</div><div className="rq-review-value">{[providerStreet, providerCity, providerState, providerZip].filter(Boolean).join(', ') || '—'}</div></div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rq-disclaimer" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.2"/><path d="M8 7v4" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#3b82f6"/></svg>
                <div style={{ fontSize: 12, color: '#1e3a5f', lineHeight: 1.5 }}>
                  By continuing, you confirm that the information above is accurate to the best of your knowledge. Your case manager may follow up if additional details are needed, and your manager may be notified as part of this process.
                </div>
              </div>

              <div className="sim-btn-row" style={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={() => setIllnessStep(illnessTotalSteps)}>Back</button>
                  <button className="sim-btn-primary" type="button" style={{ background: '#2563eb' }} onClick={() => setShowIllnessConfirmation(true)}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ═══ ILLNESS FLOW — Confirmation ═══ */}
      {started && reason === 'illness' && showIllnessConfirmation && (
        <div className="rlv2-page">
          <div className="sim-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Leave request submitted</h2>
            <div style={{ fontSize: 14, color: '#737373', marginBottom: 4 }}>NTN-1234</div>
            <div style={{ fontSize: 14, fontStyle: 'italic', color: '#525252', marginBottom: 28 }}>Your Case In Review</div>

            {/* Date row */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
              {[
                { label: 'START DATE', value: leaveStart ? fmtDate(new Date(leaveStart + 'T00:00:00')) : '—' },
                { label: 'END DATE', value: leaveReturn ? fmtDate(new Date(leaveReturn + 'T00:00:00')) : '—' },
                { label: 'RETURN TO WORK DATE', value: leaveReturn ? fmtDate(addWeeksToDate(leaveReturn, 0)) : '—' },
              ].map((d, i) => (
                <div key={i} style={{ flex: 1, background: '#f9fafb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 16px', textAlign: 'left' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f0f14' }}>{d.value}</div>
                </div>
              ))}
            </div>

            {/* Case cards */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                { type: 'ABSENCE CASE', id: 'NTN-2345-ABC-01', title: 'Medical Absence  (Own Illness)' },
                { type: 'CLAIM CASE', id: 'NTN-3456-GDC-02', title: 'Short-Term Disability' },
                { type: 'SUPPLEMENTAL HEALTH', id: 'NTN-2345-ABC-03', title: 'Hospital Indemnity' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e8e8ec', borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: 0.3 }}>{c.type} - {c.id}</div>
                    <span className="confirm-badge confirm-badge-pending">Pending</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14' }}>{c.title}</div>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div style={{ textAlign: 'left', marginBottom: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What happens next</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5"/></svg>, text: 'Your manager will be notified of your upcoming absence' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#737373" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We're reviewing your eligibility — we'll update you within 1–2 business days" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M12 18v-6M9 15h6" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#737373" strokeWidth="1.5"/><path d="M9 12h6M12 9v6" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: 'Track your absence status anytime from the overview' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                    <span style={{ fontSize: 14, color: '#525252', lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Link to="/absence-details" className="btn" style={{ padding: '12px 24px', fontSize: 14, border: '1px solid #d4d4d8', borderRadius: 8, textDecoration: 'none', color: '#0f0f14', fontWeight: 600 }}>View Absence Details</Link>
              <Link to="/overview-react" className="btn" style={{ padding: '12px 24px', fontSize: 14, border: '1px solid #d4d4d8', borderRadius: 8, textDecoration: 'none', color: '#0f0f14', fontWeight: 600 }}>Back to Leave</Link>
            </div>
          </div>
        </div>
      )}

      {/* ═══ NON-ILLNESS WIZARD STEPS (original flow) ═══ */}
      {started && reason !== 'illness' && (
        <div className={`rlv2-page${step === 3 ? ' rlv2-page-wide' : ''}`}>

          {/* ─── Step 1: Reason ─── */}
          {step === 1 && (
            <div className="sim-card">
              <h2 style={{ marginBottom: 20 }}>
                Why are you taking leave?{' '}
                <span className="wiz-tooltip-wrap">
                  <svg className="wiz-tooltip-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#737373" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#737373"/></svg>
                  <span className="wiz-tooltip-text">Select the primary reason for your leave. Don&rsquo;t worry if you&rsquo;re not sure about the details yet &mdash; we&rsquo;ll walk through everything together.</span>
                </span>
              </h2>
              <div className="option-cards">
                {REASON_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className={`option-card has-tooltip${reason === opt.value ? ' selected' : ''}`}
                    onClick={() => setReason(opt.value)}
                  >
                    <div className="option-radio"><div className="option-radio-dot" /></div>
                    <div className="option-card-icon">{opt.icon}</div>
                    <div className="option-text"><h4>{opt.title}</h4></div>
                    <span className={`oc-tooltip${opt.tooltipRight ? ' oc-tooltip-right' : ''}`}>{opt.tooltip}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#737373', marginBottom: 16, lineHeight: 1.5 }}>
                This helps us identify which benefits and protections may apply to you.
              </div>
              <div className="sim-btn-row">
                <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goNext}>Continue &#8594;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 2: Employment & Details ─── */}
          {step === 2 && (
            <div className="sim-card">
              <h2>Your employment &amp; leave details</h2>
              <p className="sim-desc">We use this to determine your eligibility for FMLA, Short-Term Disability, and state-specific benefits.</p>

              <div className="pa-grid">
                <div className="sim-field">
                  <label>Work State <span style={{ color: '#dc2626' }}>*</span></label>
                  <select value={workState} onChange={(e) => setWorkState(e.target.value)}>
                    <option value="MO">Missouri (MO)</option>
                    <option value="CA">California (CA)</option>
                    <option value="NY">New York (NY)</option>
                    <option value="NJ">New Jersey (NJ)</option>
                    <option value="WA">Washington (WA)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="FL">Florida (FL)</option>
                  </select>
                </div>
                <div className="sim-field">
                  <label>Hired Date <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e8e8ec', paddingTop: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f0f14', marginBottom: 10 }}>How will you take your leave? <span style={{ color: '#dc2626' }}>*</span></label>
                <div className="lt-picker">
                  {['continuous', 'intermittent', 'reduced'].map((type) => (
                    <button key={type} type="button" className={`lt-btn ${leaveType === type ? 'selected' : ''}`} onClick={() => setLeaveType(type)}>
                      <span className="lt-btn-icon">
                        {type === 'continuous' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M3 10h18" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                        {type === 'intermittent' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        {type === 'reduced' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7v5h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span className="lt-btn-label">{type === 'continuous' ? 'Continuous' : type === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: '#525252', margin: '12px 0 16px' }}>{leaveType === 'continuous' ? "You'll be fully away from work for the duration of your leave." : leaveType === 'intermittent' ? "You'll take time off periodically — for flare-ups, treatments, or appointments." : "You'll continue working but with fewer hours per day or days per week."}</p>
                {leaveType === 'reduced' && (
                  <div className="sim-field" style={{ marginBottom: 16 }}>
                    <label>Hours per week you plan to work <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="number" placeholder="e.g. 20" value={reducedProposedHrs} onChange={(e) => setReducedProposedHrs(e.target.value)} />
                  </div>
                )}
                <div className="pa-grid">
                  <div className="sim-field"><label>{isBirth ? 'Expected Due Date' : 'Anticipated Start Date'} <span style={{ color: '#dc2626' }}>*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                  <div className="sim-field"><label>Expected End Date</label><input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} /></div>
                </div>
              </div>
              <div className="sim-btn-row">
                <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                  <button className="sim-btn-primary" type="button" onClick={goNext}>See My Coverage &#8594;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 3: Design Your Plan ─── */}
          {step === 3 && (
            <div className="sim-split">
              {/* ── Main panel ── */}
              <div className="sim-split-main">
                <div className="sim-card" style={{ padding: '28px 32px' }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Your Leave Scenario</h2>
                  <div style={{ background: '#f0f4f8', border: '1px solid #e0e7ef', borderRadius: 8, padding: '12px 16px', marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#0033a0" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#0033a0" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#0033a0"/></svg>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                      <strong>This is an estimate.</strong> Actual eligibility, coverage dates, and payment amounts will be determined after you submit your request and documentation is reviewed.
                    </p>
                  </div>

                  {/* Timeline section */}
                  <div style={{ background: '#fff', border: '1px solid #e8e8ec', borderRadius: 12, padding: 24, marginBottom: 28 }}>
                    <div className="dlp-section-head" style={{ marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Leave Timeline <span style={{ fontSize: 12, fontWeight: 600, color: '#525252', background: '#f0f0f2', padding: '2px 8px', borderRadius: 4, marginLeft: 8, verticalAlign: 'middle' }}>ESTIMATE</span></h3>
                      <div className="dlp-view-tabs">
                        {['pay', 'coverage'].map((v) => (
                          <button
                            key={v}
                            className={`dlp-view-tab${activeView === v ? ' active' : ''}`}
                            type="button"
                            onClick={() => { setActiveView(v); setOpenDetail(null); }}
                          >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="dlp-section-sub">Hover over a row to see details. <strong>All dates, durations, and pay figures shown are <em>estimates only</em></strong> — actual benefits are subject to eligibility review and final approval.</p>

                    <div className="dlp-timeline" ref={timelineRef} onMouseLeave={() => setOpenDetail(null)}>
                      <div style={{ position: 'relative' }}>
                        <div className="dlp-tl-rows">
                          {tlData.rows.map((row) => (
                            <div
                              key={row.id}
                              className={`dlp-tl-row${openDetail === row.id ? ' active' : ''}`}
                              onMouseEnter={() => setOpenDetail(row.id)}
                            >
                              <div className="dlp-tl-row-label">{row.label}</div>
                              <div className="dlp-tl-row-bar">
                                <div
                                  className={`dlp-tl-seg ${row.segClass}`}
                                  style={{ left: `${row.left}%`, width: `${row.width}%` }}
                                />
                              </div>
                            </div>
                          ))}
                          {tlData.rows.length === 0 && (
                            <div style={{ padding: '12px 0 12px 120px', fontSize: 12, color: '#737373', textAlign: 'center' }}>
                              No leave periods to display. Update your dates to see the timeline.
                            </div>
                          )}
                        </div>
                        {/* Due date marker */}
                        {isBirth && tlData.showDueMarker && (
                          <div className="dlp-tl-marker" style={{ left: `calc(120px + ${tlData.duePct}% * (100% - 120px) / 100)`, position: 'absolute', top: 0, bottom: 0 }}>
                            <div style={{ position: 'absolute', top: -4, left: -4, width: 10, height: 10, background: '#a3860a', borderRadius: '50%', border: '2px solid #fff' }} />
                          </div>
                        )}
                      </div>

                      {/* Hover tooltip */}
                      {openDetail && detailData && (() => {
                        const rowIdx = tlData.rows.findIndex((r) => r.id === openDetail);
                        const row = tlData.rows[rowIdx];
                        const tooltipLeft = Math.max(24, Math.min(92, row.left + row.width / 2));
                        return (
                          <div
                            className="ad-coverage-tooltip ad-coverage-tooltip-floating"
                            style={{
                              '--tooltip-top': `${rowIdx * 38 + 10}px`,
                              '--tooltip-left': `${tooltipLeft}%`,
                            }}
                          >
                            <div className="ad-coverage-tooltip-head">
                              <div className="title">{detailData.title}</div>
                            </div>
                            <div className="ad-coverage-tooltip-grid">
                              <div>
                                <div className="label">Duration</div>
                                <div className="value">{detailData.duration}</div>
                              </div>
                              <div>
                                <div className="label">Dates</div>
                                <div className="value">{detailData.dates}</div>
                              </div>
                              <div>
                                <div className="label">Pay</div>
                                <div className="value">{detailData.pay?.text || '—'}</div>
                              </div>
                              <div>
                                <div className="label">Protection</div>
                                <div className="value">{detailData.protection?.text || '—'}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Week ticks */}
                      {tlData.absenceWeeks > 0 && (
                        <div className="dlp-tl-weeks">
                          {Array.from({ length: Math.min(tlData.absenceWeeks, 26) }, (_, i) => (
                            <div key={i} className="dlp-tl-week-tick">
                              <span className="dlp-tl-week-num">Wk {i + 1}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Month axis */}
                      <div className="dlp-tl-months">
                        {tlData.months.map((m, i) => <span key={i}>{m}</span>)}
                      </div>

                      {/* Legend */}
                      {!isBirth ? (
                        activeView === 'pay' ? (
                          <div className="dlp-legend">
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />Job-protected (FMLA)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#737373' }} />Paid (STD 60%)</div>
                            {tlData.stateBenefit && <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#0d9488' }} />State Paid Leave</div>}
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />Unpaid</div>
                          </div>
                        ) : (
                          <div className="dlp-legend">
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />FMLA (federal job protection)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#a3a3a3' }} />Insurance (STD)</div>
                            {tlData.stateBenefit && <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#0d9488' }} />State Paid Leave</div>}
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />No coverage</div>
                          </div>
                        )
                      ) : (
                        <div className="dlp-legend">
                          <div className="dlp-legend-item"><div className="dlp-legend-dot dlp-legend-dot-marker" />Due date</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#737373' }} />Partial pay (60% STD)</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />FMLA job protection</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />Unpaid</div>
                        </div>
                      )}
                    </div>

                    {/* Estimate info bar */}
                    <div style={{ fontSize: 11, color: '#525252', background: '#f5f5f7', borderRadius: 6, padding: '8px 12px', marginTop: 16, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 5v3" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.5" fill="#737373"/></svg>
                      <span><strong>This is an estimate.</strong> Actual eligibility, coverage dates, and payment amounts will be determined after you submit your request and documentation is reviewed.</span>
                    </div>
                  </div>

                  {/* Estimated coverage review — single card */}
                  <div style={{ marginTop: 28, background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 20px 0' }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', margin: '0 0 6px' }}>Review your estimated leave coverage</h3>
                      <p style={{ fontSize: 13, color: '#737373', margin: '0 0 16px', lineHeight: 1.5 }}>This is an estimated breakdown for what you may be entitled to. Final details will be confirmed after your request is submitted and reviewed.</p>
                    </div>

                    {tlData.rows.map((row, idx) => {
                      const detail = tlData.details?.[row.id];
                      return (
                        <div key={row.id} style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f2' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{detail?.title || row.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>{detail?.pay?.text || '—'}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#737373' }}>
                            <span>{detail?.dates || '—'}</span>
                            <span>{detail?.duration || '—'}</span>
                          </div>
                        </div>
                      );
                    })}

                    {tlData.rows.length > 0 && (
                      <div style={{ padding: '14px 20px', borderTop: '1px solid #e5e5e5', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>Est. total leave</div>
                          <div style={{ fontSize: 12, color: '#737373' }}>~{tlData.absenceWeeks} weeks · {tlData.paidWeeks > 0 ? `~${tlData.paidWeeks} paid` : 'Unpaid'}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f14' }}>Est. weekly pay</div>
                          <div style={{ fontSize: 12, color: '#737373' }}>{tlData.weeklyPay > 0 ? `~$${tlData.weeklyPay.toLocaleString()}/wk` : '$0'}</div>
                        </div>
                      </div>
                    )}

                    <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5', textAlign: 'center' }}>
                      <button className="btn btn-next" type="button" onClick={() => setShowTransitionModal(true)} style={{ padding: '12px 36px', fontSize: 14, borderRadius: 8 }}>Start My Leave Request &rarr;</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                    <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                    <button type="button" onClick={goBack} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit' }}>&larr; Back</button>
                    <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 3l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Email Plan
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Sidebar ── */}
              <div className="sim-split-side">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {isBirth ? (
                    <>
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field">
                            <label>Work State</label>
                            <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Hired Date</label>
                            <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">LEAVE DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Due Date</label>
                            <input type="date" value={sideDueDate} onChange={(e) => setSideDueDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">LEAVE TYPE</div>
                        <div className="dlp-sidebar-group-body">
                          <div style={{ fontSize: 14, color: '#0f0f14' }}>{leaveType === 'continuous' ? 'Continuous' : leaveType === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field">
                            <label>Work State</label>
                            <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Hired Date</label>
                            <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">LEAVE DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field">
                            <label>Anticipated Start Date</label>
                            <input type="date" value={sideStart} onChange={(e) => setSideStart(e.target.value)} />
                          </div>
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Estimated End Date</label>
                            <input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">LEAVE TYPE</div>
                        <div className="dlp-sidebar-group-body">
                          <div style={{ fontSize: 14, color: '#0f0f14' }}>{leaveType === 'continuous' ? 'Continuous' : leaveType === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</div>
                        </div>
                      </div>


                      {/* STATE BENEFITS — shown when state has paid leave */}
                      {stateBenefit && (
                        <div className="dlp-sidebar" style={{ borderLeft: '3px solid #0d9488' }}>
                          <div className="dlp-sidebar-group-label" style={{ color: '#0d9488' }}>STATE PAID LEAVE</div>
                          <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f0f14', marginBottom: 4 }}>{stateBenefit.name}</div>
                            <div style={{ fontSize: 12, color: '#525252', lineHeight: 1.5, marginBottom: 10 }}>{stateBenefit.desc}</div>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                              <div style={{ background: '#f5f3ff', borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#5b21b6' }}>
                                {stateBenefit.payPct}% pay
                              </div>
                              <div style={{ background: '#f5f3ff', borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#5b21b6' }}>
                                {stateBenefit.medicalWeeks}wk medical
                              </div>
                              <div style={{ background: '#f5f3ff', borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#5b21b6' }}>
                                {stateBenefit.familyWeeks}wk family
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {!stateBenefit && (
                        <div className="dlp-sidebar" style={{ borderLeft: '3px solid #d4d4d8' }}>
                          <div className="dlp-sidebar-group-label">STATE PAID LEAVE</div>
                          <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                            <div style={{ fontSize: 13, color: '#737373', lineHeight: 1.5 }}>
                              Your state ({sideWorkState}) does not currently have a state-level paid leave program. Federal FMLA and employer-sponsored benefits still apply.
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Footer note */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, fontSize: 12, color: '#a3a3a3', padding: '0 4px' }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#a3a3a3" strokeWidth="1.2"/><path d="M8 7v4" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#a3a3a3"/></svg>
                    All values are estimates. Changes update the timeline instantly.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 is now handled by the transition modal — no inline content */}

          {/* ─── Request Steps 5-10: context bar ─── */}
          {step >= 5 && step <= 10 && (
            <>
              <div className="rq-plan-bar">
                <span className="rq-plan-bar-left">From Your Plan</span>
                <span className="rq-plan-bar-center">
                  {REASON_OPTIONS.find((o) => o.value === reason)?.title?.replace("Employee's ", '')} &middot;{' '}
                  <span style={{ textTransform: 'capitalize' }}>{leaveType}</span> &middot;{' '}
                  {isBirth ? sideDueDate : `${sideStart} – ${leaveReturn}`}
                </span>
                <button className="rq-plan-bar-right" type="button" onClick={() => setStep(4)}>Review Plan</button>
              </div>

              <div className="rq-step-label">Step {step - 4} of 6 &mdash; {STEP_LABELS[step - 1]}</div>
            </>
          )}

          {/* ─── Step 5: Details (Diagnosis & Treatment) ─── */}
          {step === 5 && (
            <div className="sim-card">
              <h2>Diagnosis &amp; Treatment Details</h2>
              <p className="sim-desc">Tell us about the medical condition related to your leave.</p>
              <div className="rq-grid" style={{ marginBottom: 20 }}>
                <div className="rq-field rq-span-2">
                  <label>Diagnosis or Condition <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" placeholder="e.g. Lumbar disc herniation" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                  <div className="rq-hint">We&rsquo;ll keep this confidential. Only your claims examiner will see it.</div>
                </div>
                <div className="rq-field">
                  <label>First Date of Treatment <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={firstTreatment} onChange={(e) => setFirstTreatment(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Next Scheduled Appointment</label>
                  <input type="date" value={nextAppt} onChange={(e) => setNextAppt(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Will you be hospitalized? <span style={{ color: '#dc2626' }}>*</span></label>
                  <div className="rq-yn-group">
                    <button className={`rq-yn-btn${hospitalized === true ? ' active' : ''}`} type="button" onClick={() => setHospitalized(true)}>Yes</button>
                    <button className={`rq-yn-btn${hospitalized === false ? ' active' : ''}`} type="button" onClick={() => setHospitalized(false)}>No</button>
                  </div>
                </div>
                <div className="rq-field">
                  <label>Is this related to your job? <span style={{ color: '#dc2626' }}>*</span></label>
                  <div className="rq-yn-group">
                    <button className={`rq-yn-btn${jobRelated === true ? ' active' : ''}`} type="button" onClick={() => setJobRelated(true)}>Yes</button>
                    <button className={`rq-yn-btn${jobRelated === false ? ' active' : ''}`} type="button" onClick={() => setJobRelated(false)}>No</button>
                  </div>
                  <div className="rq-hint">If yes, you may also need to file a workers&rsquo; compensation claim.</div>
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                  <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 6: Provider ─── */}
          {step === 6 && (
            <div className="sim-card">
              <h2>Healthcare Provider</h2>
              <p className="sim-desc">Enter your treating provider&rsquo;s information. We&rsquo;ll use this to verify your medical certification.</p>
              <div className="rq-grid" style={{ marginBottom: 20 }}>
                <div className="rq-field rq-span-2">
                  <label>Facility / Practice Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" placeholder="e.g. Midwest Orthopedic Center" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Provider Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" placeholder="Dr. First Last" value={providerName} onChange={(e) => setProviderName(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Suffix</label>
                  <select value={providerSuffix} onChange={(e) => setProviderSuffix(e.target.value)}>
                    <option value="">Select</option>
                    <option value="MD">MD</option>
                    <option value="DO">DO</option>
                    <option value="NP">NP</option>
                    <option value="PA">PA</option>
                  </select>
                </div>
                <div className="rq-field">
                  <label>Phone <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="tel" placeholder="(555) 000-0000" value={providerPhone} onChange={(e) => setProviderPhone(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Fax</label>
                  <input type="tel" placeholder="(555) 000-0000" value={providerFax} onChange={(e) => setProviderFax(e.target.value)} />
                </div>
                <div className="rq-field rq-span-2">
                  <label>Email</label>
                  <input type="email" placeholder="provider@facility.com" value={providerEmail} onChange={(e) => setProviderEmail(e.target.value)} />
                </div>
                <div className="rq-field rq-span-2">
                  <label>Street Address <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" placeholder="123 Medical Dr" value={providerStreet} onChange={(e) => setProviderStreet(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>City <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" value={providerCity} onChange={(e) => setProviderCity(e.target.value)} />
                </div>
                <div className="rq-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label>State <span style={{ color: '#dc2626' }}>*</span></label>
                    <select value={providerState} onChange={(e) => setProviderState(e.target.value)} style={{ width: '100%' }}>
                      <option value="">—</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>ZIP <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="text" maxLength={5} value={providerZip} onChange={(e) => setProviderZip(e.target.value)} style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
              <div className="rq-auth-card">
                <div className="rq-checkbox" onClick={() => setProviderAuth(!providerAuth)}>
                  {providerAuth && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <div className="rq-auth-text">I authorize my healthcare provider to share medical information with Benefits Hub for the purpose of processing my leave claim.</div>
                  <div className="rq-auth-sub">Required under HIPAA to process your request.</div>
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                  <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 7: Schedule ─── */}
          {step === 7 && (
            <div className="sim-card">
              <h2>Work Schedule</h2>
              <p className="sim-desc">Enter the hours you normally work each day. This helps us calculate your benefit amount.</p>
              {schedWeeks.map((week, wi) => {
                const total = Object.values(week).reduce((s, v) => s + (Number(v) || 0), 0);
                return (
                  <div className="rq-week-card" key={wi}>
                    <div className="rq-week-header">
                      <div className="rq-week-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#525252" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        Week {wi + 1}
                      </div>
                      <span className="rq-week-total">{total} hrs/week</span>
                    </div>
                    {wi === 0 && <div className="rq-week-hint">Enter 0 for days you don&rsquo;t work.</div>}
                    <div className="rq-days-grid">
                      {['sun','mon','tue','wed','thu','fri','sat'].map((day) => (
                        <div className="rq-day-cell" key={day}>
                          <div className="rq-day-label">{day.toUpperCase()}</div>
                          <input
                            className="rq-day-input"
                            type="number"
                            min="0"
                            max="24"
                            value={week[day]}
                            onChange={(e) => {
                              const val = Math.max(0, Math.min(24, Number(e.target.value) || 0));
                              setSchedWeeks((prev) => prev.map((w, i) => i === wi ? { ...w, [day]: val } : w));
                            }}
                          />
                          <div className="rq-day-unit">hrs</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button className="rq-add-week" type="button" onClick={() => setSchedWeeks((prev) => [...prev, { sun: 0, mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0 }])}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Add another week
              </button>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                  <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 8: Verify ─── */}
          {step === 8 && (
            <div className="sim-card">
              <h2>Verify Your Information</h2>
              <p className="sim-desc">Please confirm the information your employer has on file for you.</p>
              <div className="rq-verify-card">
                <div className="rq-verify-title">Employee Record</div>
                <div className="rq-verify-provided">Provided by your employer</div>
                <div className="rq-verify-grid">
                  <div><div className="rq-verify-label">Full Name</div><div className="rq-verify-value">Sarah Johnson</div></div>
                  <div><div className="rq-verify-label">Employee ID</div><div className="rq-verify-value">EMP-004821</div></div>
                  <div><div className="rq-verify-label">Occupation</div><div className="rq-verify-value">Senior Analyst</div></div>
                  <div><div className="rq-verify-label">Hire Date</div><div className="rq-verify-value">{sideHireDate}</div></div>
                  <div><div className="rq-verify-label">Work Location</div><div className="rq-verify-value">Omaha, NE</div></div>
                  <div><div className="rq-verify-label">Employer</div><div className="rq-verify-value">Benefits Hub</div></div>
                  <div><div className="rq-verify-label">Employment Type</div><div className="rq-verify-value">Full-time</div></div>
                  <div><div className="rq-verify-label">Address</div><div className="rq-verify-value">3300 Corporate Plaza, Omaha, NE 68175</div></div>
                </div>
                <div className="rq-verify-note">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 7v4" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#737373"/></svg>
                  This information is provided by your employer. If anything looks incorrect, contact HR before submitting.
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                  <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 9: Contact ─── */}
          {step === 9 && (
            <div className="sim-card">
              <h2>Contact Preferences</h2>
              <p className="sim-desc">How should we reach you during your leave?</p>
              <div className="rq-grid" style={{ marginBottom: 20 }}>
                <div className="rq-field">
                  <label>Email Address <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
                <div className="rq-field">
                  <label>Phone Number <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1e1e28', marginBottom: 10 }}>Preferred Communication Method</label>
                <div className="rq-pref-group">
                  {[
                    { key: 'email', label: 'Email', on: prefEmail, set: setPrefEmail },
                    { key: 'phone', label: 'Phone', on: prefPhone, set: setPrefPhone },
                    { key: 'sms', label: 'SMS / Text', on: prefSMS, set: setPrefSMS },
                  ].map((item) => (
                    <div className="rq-pref-item" key={item.key} onClick={() => item.set(!item.on)}>
                      <div className="rq-pref-check" style={item.on ? {} : { background: '#fff', borderColor: '#d0d0d5' }}>
                        {item.on && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid #e8e8ec', paddingTop: 16 }}>
                <div className="rq-toggle-row">
                  <div>
                    <div className="rq-toggle-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Temporary Address
                    </div>
                    <div className="rq-toggle-sub">I&rsquo;ll be at a different address during my leave</div>
                  </div>
                  <Toggle on={tempAddr} onClick={() => setTempAddr(!tempAddr)} />
                </div>
                {tempAddr && (
                  <div className="rq-grid" style={{ marginTop: 12 }}>
                    <div className="rq-field rq-span-2">
                      <label>Street Address</label>
                      <input type="text" value={tempStreet} onChange={(e) => setTempStreet(e.target.value)} />
                    </div>
                    <div className="rq-field">
                      <label>City</label>
                      <input type="text" value={tempCity} onChange={(e) => setTempCity(e.target.value)} />
                    </div>
                    <div className="rq-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label>State</label>
                        <select value={tempState} onChange={(e) => setTempState(e.target.value)} style={{ width: '100%' }}>
                          <option value="">—</option>
                          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label>ZIP</label>
                        <input type="text" maxLength={5} value={tempZip} onChange={(e) => setTempZip(e.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="rq-field">
                      <label>From</label>
                      <input type="date" value={tempFrom} onChange={(e) => setTempFrom(e.target.value)} />
                    </div>
                    <div className="rq-field">
                      <label>To</label>
                      <input type="date" value={tempTo} onChange={(e) => setTempTo(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                  <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 10: Review & Submit ─── */}
          {step === 10 && (() => {
            const schedTotal = schedWeeks[0] ? Object.values(schedWeeks[0]).reduce((s, v) => s + (Number(v) || 0), 0) : 40;
            return (
              <div className="sim-card">
                <h2>Confirm Your Information</h2>
                <p className="sim-desc">Review everything below, then submit your leave request.</p>

                <div className="rq-review-section">
                  <div className="rq-review-header">
                    <div className="rq-review-title">Employee Information</div>
                    <button className="pr-edit-link" type="button" onClick={() => setStep(8)}>Edit</button>
                  </div>
                  <div className="rq-review-grid">
                    <div><div className="rq-review-label">Full Name</div><div className="rq-review-value">Sarah Johnson</div></div>
                    <div><div className="rq-review-label">Employee ID</div><div className="rq-review-value">EMP-004821</div></div>
                    <div><div className="rq-review-label">Occupation</div><div className="rq-review-value">Senior Analyst</div></div>
                    <div><div className="rq-review-label">Hire Date</div><div className="rq-review-value">{sideHireDate}</div></div>
                  </div>
                </div>

                <div className="rq-review-section">
                  <div className="rq-review-header">
                    <div className="rq-review-title">Contact Information</div>
                    <button className="pr-edit-link" type="button" onClick={() => setStep(9)}>Edit</button>
                  </div>
                  <div className="rq-review-grid">
                    <div><div className="rq-review-label">Email</div><div className="rq-review-value">{contactEmail}</div></div>
                    <div><div className="rq-review-label">Phone</div><div className="rq-review-value">{contactPhone}</div></div>
                    <div><div className="rq-review-label">Communication</div><div className="rq-review-value">{[prefEmail && 'Email', prefPhone && 'Phone', prefSMS && 'SMS'].filter(Boolean).join(', ') || '—'}</div></div>
                    {tempAddr && <div><div className="rq-review-label">Temp Address</div><div className="rq-review-value">{[tempStreet, tempCity, tempState, tempZip].filter(Boolean).join(', ')}</div></div>}
                  </div>
                </div>

                <div className="rq-review-section">
                  <div className="rq-review-header">
                    <div className="rq-review-title">
                      Leave Details
                      <span className="rq-review-badge">From your plan</span>
                    </div>
                    <button className="pr-edit-link" type="button" onClick={() => setStep(4)}>Edit</button>
                  </div>
                  <div className="rq-review-grid">
                    <div><div className="rq-review-label">Reason</div><div className="rq-review-value">{REASON_OPTIONS.find((o) => o.value === reason)?.title}</div></div>
                    <div><div className="rq-review-label">Type</div><div className="rq-review-value" style={{ textTransform: 'capitalize' }}>{leaveType}</div></div>
                    <div><div className="rq-review-label">{isBirth ? 'Due Date' : 'Start Date'}</div><div className="rq-review-value">{isBirth ? sideDueDate : sideStart}</div></div>
                    {!isBirth && <div><div className="rq-review-label">Duration</div><div className="rq-review-value">{sideDuration} weeks</div></div>}
                    <div><div className="rq-review-label">Diagnosis</div><div className="rq-review-value">{diagnosis || '—'}</div></div>
                    <div><div className="rq-review-label">Provider</div><div className="rq-review-value">{providerName || '—'}{providerSuffix ? `, ${providerSuffix}` : ''}</div></div>
                  </div>
                </div>

                <div className="rq-review-section">
                  <div className="rq-review-header">
                    <div className="rq-review-title">Work Schedule</div>
                    <button className="pr-edit-link" type="button" onClick={() => setStep(7)}>Edit</button>
                  </div>
                  <div className="rq-review-grid">
                    <div><div className="rq-review-label">Hours Per Week</div><div className="rq-review-value">{schedTotal} hrs</div></div>
                    <div><div className="rq-review-label">Weeks Reported</div><div className="rq-review-value">{schedWeeks.length}</div></div>
                  </div>
                </div>

                <div className="rq-disclaimer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7" stroke="#525252" strokeWidth="1.2"/><path d="M8 7v4" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#525252"/></svg>
                  <div>
                    By submitting this request, I certify that the information provided is accurate and complete to the best of my knowledge. I understand that submitting false information may result in denial of benefits and/or disciplinary action.
                  </div>
                </div>

                <div className="wizard-footer">
                  <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-cancel-leave" type="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
                    <button className="btn btn-next" type="button" style={{ background: '#105fa8' }}>Submit Request</button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      {showTransitionModal && (
        <div className="pr-modal-backdrop" onClick={() => setShowTransitionModal(false)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pr-modal-header">
              <div>
                <h3>Review your plan and submit</h3>
              </div>
              <button className="pr-modal-close" type="button" onClick={() => setShowTransitionModal(false)}>&times;</button>
            </div>

            <div className="pr-modal-body">
              <div className="pr-transition-banner">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1a8 8 0 100 16A8 8 0 009 1zm0 3.5v4.5M9 12.5h.008" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>The details from your plan will carry over and pre-fill your request. You can still make changes during the intake process.</span>
              </div>

              <div className="pr-modal-summary">
                <div className="pr-section">
                  <div className="pr-section-header">
                    <div className="pr-section-title">Leave Reason</div>
                    <button className="pr-edit-link" type="button" onClick={() => { setShowTransitionModal(false); if (reason === 'illness') { setIllnessIntakeStep(0); setIllnessStep(1); } else { setStep(1); } }}>Edit</button>
                  </div>
                  <div className="pr-row">
                    <span className="pr-row-label">Reason</span>
                    <span className="pr-row-value">{REASON_OPTIONS.find((o) => o.value === reason)?.title}</span>
                  </div>
                </div>

                <div className="pr-section">
                  <div className="pr-section-header">
                    <div className="pr-section-title">Dates &amp; Duration</div>
                    <button className="pr-edit-link" type="button" onClick={() => { setShowTransitionModal(false); if (reason === 'illness') { setIllnessIntakeStep(0); setIllnessStep(2); } else { setStep(2); } }}>Edit</button>
                  </div>
                  <div className="pr-row">
                    <span className="pr-row-label">Type</span>
                    <span className="pr-row-value" style={{ textTransform: 'capitalize' }}>{leaveType}</span>
                  </div>
                  <div className="pr-row">
                    <span className="pr-row-label">{isBirth ? 'Due Date' : 'Start Date'}</span>
                    <span className="pr-row-value">{isBirth ? sideDueDate : (leaveStart || sideStart)}</span>
                  </div>
                  {!isBirth && (
                    <div className="pr-row">
                      <span className="pr-row-label">Duration</span>
                      <span className="pr-row-value">{sideDuration} weeks</span>
                    </div>
                  )}
                </div>

                <div className="pr-section">
                  <div className="pr-section-header">
                    <div className="pr-section-title">Employment</div>
                    <button className="pr-edit-link" type="button" onClick={() => { setShowTransitionModal(false); if (reason === 'illness') { setIllnessIntakeStep(0); setIllnessStep(2); } else { setStep(2); } }}>Edit</button>
                  </div>
                  <div className="pr-row">
                    <span className="pr-row-label">Work State</span>
                    <span className="pr-row-value">{sideWorkState}</span>
                  </div>
                  <div className="pr-row">
                    <span className="pr-row-label">Hire Date</span>
                    <span className="pr-row-value">{sideHireDate}</span>
                  </div>
                </div>

                <div className="pr-section">
                  <div className="pr-section-header">
                    <div className="pr-section-title">Estimated Eligibility</div>
                    <button className="pr-edit-link" type="button" onClick={() => { setShowTransitionModal(false); if (reason === 'illness') { setIllnessIntakeStep(0); setIllnessStep(3); } else { setStep(3); } }}>Edit</button>
                  </div>
                  <div className="pr-badges">
                    <span className="pr-badge">{fmlaEligible ? 'FMLA Eligible' : 'FMLA Not Eligible'}</span>
                    {!isFamily && <span className="pr-badge">STD Enrolled</span>}
                    {stateBenefit && <span className="pr-badge">{stateBenefit.name}</span>}
                  </div>
                </div>
              </div>

              <div className="pr-collect-card">
                <div className="pr-collect-title">What we&rsquo;ll collect next</div>
                <ol className="pr-collect-list">
                  {(reason === 'illness'
                    ? ['Leave Structure', 'Missed Time', 'Work Schedule', 'Condition Details', 'Healthcare Provider', 'Medical Certification', 'Contact Preferences', 'Review & Submit']
                    : ['Diagnosis & Treatment Details', 'Healthcare Provider', 'Work Schedule', 'Verify Your Record', 'Contact Preferences', 'Review & Submit']
                  ).map((item, i) => (
                    <li key={i}><span className="pr-collect-num">{i + 1}</span>{item}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pr-modal-footer">
              <button className="pr-modal-cancel" type="button" onClick={() => setShowTransitionModal(false)}>Go Back</button>
              <button type="button" className="pr-modal-submit" onClick={() => {
                setShowTransitionModal(false);
                if (reason === 'illness') {
                  setIllnessIntakeStep(1);
                } else {
                  setStep(5);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>Request Leave Now &rarr;</button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="pr-modal-backdrop" onClick={() => setShowCancelModal(false)}>
          <div className="cancel-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-confirm-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 9v4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#dc2626"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="cancel-confirm-title">Cancel leave plan?</h3>
            <p className="cancel-confirm-desc">You can save your progress as a draft and come back later, or discard it entirely.</p>
            <div className="cancel-confirm-actions-stack">
              <button type="button" className="btn-cancel-confirm-continue" onClick={() => setShowCancelModal(false)}>Continue Process</button>
              <button type="button" className="btn-cancel-confirm-save" onClick={() => { savePlanDraft(); navigate('/overview-react'); }}>Save as Draft</button>
              <button type="button" className="btn-cancel-confirm-discard" onClick={() => { const drafts = JSON.parse(localStorage.getItem('leaveDrafts') || '[]').filter(d => d.type !== 'plan-leave'); localStorage.setItem('leaveDrafts', JSON.stringify(drafts)); navigate('/overview-react'); }}>Discard</button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
