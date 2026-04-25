import { useMemo, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../overview/overview-react.css';
import '../request-leave/request-leave-react.css';
import './plan-absence-react.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Reason', 'Employment & Details', 'Design Your Plan', 'Plan Review', 'Details', 'Provider', 'Schedule', 'Verify', 'Contact', 'Review & Submit'];

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
    title: 'Care for Sick Family Member',
    tooltip: "Someone close to you needs your care due to a serious health condition.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  },
  {
    value: 'nonbirth',
    title: 'Non-Birthing Parent, Adoption, or Foster Care',
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
  CA: { name: 'CA SDI / PFL', desc: 'California provides State Disability Insurance (SDI) at ~60-70% pay for own illness, and Paid Family Leave (PFL) at ~60-70% for family care and bonding, up to 8 weeks.', note: '60-70% pay via SDI/PFL', card: 'Up to 8 weeks paid' },
  NY: { name: 'NY DBL / PFL', desc: 'New York provides Disability Benefits Law (DBL) at 50% pay (capped) for own illness, and Paid Family Leave (PFL) at 67% pay for up to 12 weeks for family care and bonding.', note: '50-67% pay via DBL/PFL', card: 'Up to 12 weeks paid' },
  NJ: { name: 'NJ TDI / FLI', desc: 'New Jersey provides Temporary Disability Insurance (TDI) at ~85% pay for own illness, and Family Leave Insurance (FLI) at ~85% for up to 12 weeks for family care.', note: '~85% pay via TDI/FLI', card: 'Up to 12 weeks paid' },
  WA: { name: 'WA PFML', desc: 'Washington provides Paid Family and Medical Leave (PFML) at up to 90% pay for up to 12 weeks for medical leave and 12 weeks for family leave (16 weeks combined max).', note: 'Up to 90% pay via PFML', card: 'Up to 12-16 weeks paid' },
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
          <div className="nav-brand">my<span>Mutual</span></div>
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
  // Navigation
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1
  const [reason, setReason] = useState('illness');

  // Step 2
  const [workState, setWorkState] = useState('MO');
  const [homeState, setHomeState] = useState('same');
  const [hireDate, setHireDate] = useState('2019-01-15');
  const [avgHours, setAvgHours] = useState('40');
  const [leaveStart, setLeaveStart] = useState('2026-05-01');
  const [leaveReturn, setLeaveReturn] = useState('2026-06-26');
  const [leaveType, setLeaveType] = useState('continuous');
  const [intermittentFreq, setIntermittentFreq] = useState('');
  const [intermittentDur, setIntermittentDur] = useState('');
  const [reducedCurrentHrs, setReducedCurrentHrs] = useState('40');
  const [reducedProposedHrs, setReducedProposedHrs] = useState('');

  // Step 3 — sidebar fields (synced from step 2 on entering step 3)
  const [sideWorkState, setSideWorkState] = useState('MO');
  const [sideHireDate, setSideHireDate] = useState('2019-01-15');
  const [sideStart, setSideStart] = useState('2026-05-01');
  const [sideDueDate, setSideDueDate] = useState('2026-08-01');
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

  // Step 3 — UI state
  const [activeView, setActiveView] = useState('pay');
  const [openDetail, setOpenDetail] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Hover tooltip for timeline
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const timelineRef = useRef(null);
  const handleRowMouseMove = useCallback((e, rowId) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setHoveredRow(rowId);
  }, []);
  const handleRowMouseLeave = useCallback(() => setHoveredRow(null), []);

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
      const start = new Date((sideStart || '2026-05-01') + 'T00:00:00');
      const durWks = sideDuration;
      const fmlaWks = fmlaEligible ? Math.min(durWks, 12) : 0;
      const unpaidWks = Math.max(0, durWks - fmlaWks);
      const displayWks = Math.max(durWks, 4);
      const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));
      const fmlaEnd = addWeeksToDate(sideStart || '2026-05-01', fmlaWks);
      const totalEnd = addWeeksToDate(sideStart || '2026-05-01', durWks);
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
    const start = new Date((sideStart || '2026-05-01') + 'T00:00:00');
    const stdWks = stdOn ? stdDuration : 0;
    const fmlaWks = fmlaOn && fmlaEligible ? Math.min(Math.max(stdWks, 12), 12) : 0;
    const unpaidWks = unpaidOn ? unpaidDuration : 0;
    const protectedWks = Math.max(stdWks, fmlaWks);
    const totalAbsWks = protectedWks + unpaidWks;
    const displayWks = Math.max(totalAbsWks, 12);
    const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));

    const stdEnd   = addWeeksToDate(sideStart || '2026-05-01', stdWks);
    const fmlaEnd  = addWeeksToDate(sideStart || '2026-05-01', fmlaWks);
    const unpaidStartDate = addWeeksToDate(sideStart || '2026-05-01', protectedWks);
    const unpaidEndDate   = addWeeksToDate(sideStart || '2026-05-01', totalAbsWks);

    const rows = [];
    if (stdOn)   rows.push({ id: 'std',   label: 'STD',   left: 0,              width: pct(stdWks),   segClass: activeView === 'pay' ? 'partial' : 'insurance', tooltip: 'Short-Term Disability: 60% salary' });
    if (fmlaOn)  rows.push({ id: 'fmla',  label: 'FMLA',  left: 0,              width: pct(fmlaWks),  segClass: 'full',    tooltip: 'FMLA: Job-protected leave' });
    if (unpaidOn) rows.push({ id: 'unpaid', label: 'Unpaid', left: pct(protectedWks), width: pct(unpaidWks), segClass: 'none', tooltip: 'Extended unpaid leave' });

    return {
      rows,
      months: buildMonths(start, unpaidEndDate),
      paidWeeks: stdWks,
      absenceWeeks: totalAbsWks,
      weeklyPay: stdWks > 0 ? 3462 : 0,
      details: {
        std:   stdOn   ? { title: 'Short-Term Disability',              duration: `${stdWks} weeks`,   dates: `${fmtDate(start)} – ${fmtDate(stdEnd)}`,          protection: { text: fmlaEligible ? 'FMLA' : 'None', cls: fmlaEligible ? 'eligible' : 'unpaid' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Short-Term Disability insurance',         paidBy: 'STD insurance (60% of base salary, after 7-day waiting period)' } : null,
        fmla:  fmlaOn  ? { title: 'FMLA Job Protection',                duration: `${fmlaWks} weeks`,  dates: `${fmtDate(start)} – ${fmtDate(fmlaEnd)}`,         protection: { text: 'FMLA', cls: 'eligible' },                                                    pay: stdOn ? { text: '60% via STD (if enrolled)', cls: 'partial' } : { text: 'No income replacement', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (federal)', paidBy: stdOn ? 'STD runs concurrently with FMLA' : 'No paid benefit — job-protected only' } : null,
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
    fmlaEligible,
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
        setSideDueDate(leaveStart || '2026-08-01');
      } else {
        setSideStart(leaveStart || '2026-05-01');
        setSideDuration(snapDur(durWeeksHint));
        if (!isFamily) setStdDuration(snapDur(durWeeksHint));
      }
    }
    if (step === 1 && isBirth && leaveStart === '2026-05-01') {
      setLeaveStart('2026-08-01');
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

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="plan-absence-shell">
      <SiteNav />

      {/* Welcome screen */}
      {!started && (
        <div className="rlv2-page">
          <div className="sim-card pa-welcome">
            <div className="pa-kicker">Plan leave</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25 }}>Taking time off<br />shouldn&rsquo;t be stressful</h2>
            <p style={{ fontSize: 15, color: '#5d5d5d', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
              Tell us your reason and a few details &mdash; we&rsquo;ll show you your estimated benefits, timeline, and pay so you can plan with confidence.
            </p>
            <div className="pa-steps-icons">
              {[
                { label: 'Reason',   icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#525252" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.12 2-2.12 3.5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.75" fill="#525252"/></svg> },
                { label: 'Details',  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#525252" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Plan',     icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Review',   icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ].map((item, i, arr) => (
                <span key={item.label} style={{ display: 'contents' }}>
                  <div className="pa-step-icon-item">
                    <div className="pa-step-icon-box">{item.icon}</div>
                    <span className="pa-step-icon-label">{item.label}</span>
                  </div>
                  {i < arr.length - 1 && <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ color: '#c8cdd4', flexShrink: 0 }}><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              ))}
            </div>
            <button className="sim-btn-primary" type="button" onClick={handleStart} style={{ padding: '14px 48px', fontSize: 16, borderRadius: 8, marginTop: 16 }}>
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

      {/* Wizard steps */}
      {started && (
        <div className={`rlv2-page${step === 3 ? ' rlv2-page-wide' : ''}`}>
          {/* Stepper — only for plan steps 1-3 */}
          {step <= 3 && (
            <div className="sim-stepper">
              <div className="stepper">
                <div className="stepper-counter">Step <strong>{step}</strong> of <strong>3</strong></div>
                <div className="stepper-title">{STEP_LABELS[step - 1]}</div>
              </div>
            </div>
          )}

          {/* ─── Step 1: Reason ─── */}
          {step === 1 && (
            <div className="sim-card">
              <h2 style={{ marginBottom: 20 }}>
                Select Reason For Leave{' '}
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
                <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="sim-btn-primary" type="button" onClick={goNext}>Continue &#8594;</button>
              </div>
            </div>
          )}

          {/* ─── Step 2: Employment & Details ─── */}
          {step === 2 && (
            <div className="sim-card">
              <h2>Your employment &amp; leave details</h2>
              <p className="sim-desc">We use this to determine your eligibility for FMLA, Short-Term Disability, and state-specific benefits.</p>

              {/* Employment details */}
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
                  <label>Employment Start Date <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                </div>
                <div className="sim-field">
                  <label>Average hours worked per week <span style={{ color: '#dc2626' }}>*</span></label>
                  <select value={avgHours} onChange={(e) => setAvgHours(e.target.value)}>
                    <option value="40">40 hours (full-time)</option>
                    <option value="35">35 hours</option>
                    <option value="30">30 hours</option>
                    <option value="24">24 hours</option>
                    <option value="20">20 hours</option>
                  </select>
                </div>
                {isBirth && (
                  <div className="sim-field">
                    <label>Expected Due Date <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} />
                  </div>
                )}
              </div>

              {/* How will you take your leave — non-birth only */}
              {!isBirth && (
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
                  <div className="lt-context">
                    <p className="lt-context-desc">{leaveType === 'continuous' ? "You'll be fully away from work for the duration of your leave." : leaveType === 'intermittent' ? "You'll take time off periodically — for flare-ups, treatments, or appointments." : "You'll continue working but with fewer hours per day or days per week."}</p>
                    <div className="bordered-section">
                      {leaveType === 'continuous' ? (
                        <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>Expected End Date</label><input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} /><div className="helper">Your best estimate of when you expect to return to work.</div></div>
                        </div>
                      ) : leaveType === 'intermittent' ? (
                        <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>How often do you need time off?</label><input type="text" placeholder="e.g. 1-2 times per week" value={intermittentFreq} onChange={(e) => setIntermittentFreq(e.target.value)} /></div>
                        </div>
                      ) : (
                        <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} /></div>
                          <div className="form-group" style={{ marginBottom: 0 }}><label>Hours per week you plan to work</label><input type="number" value={reducedProposedHrs} onChange={(e) => setReducedProposedHrs(e.target.value)} /></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="sim-btn-row">
                <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="sim-btn-primary" type="button" onClick={goNext}>See My Coverage &#8594;</button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Design Your Plan ─── */}
          {step === 3 && (
            <div className="sim-split">
              {/* ── Main panel ── */}
              <div className="sim-split-main">
                <div className="sim-card" style={{ padding: '28px 32px' }}>

                  {/* Timeline section */}
                  <div style={{ background: '#fff', border: '1px solid #e8e8ec', borderRadius: 12, padding: 24, marginBottom: 28 }}>
                    <div className="dlp-section-head" style={{ marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Estimated Leave Timeline</h3>
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
                    <p className="dlp-section-sub">Hover over a row to see details. Pay figures are estimates based on standard STD (60% salary).</p>

                    <div className="dlp-timeline" ref={timelineRef}>
                      <div style={{ position: 'relative' }}>
                        <div className="dlp-tl-rows">
                          {tlData.rows.map((row) => (
                            <div
                              key={row.id}
                              className={`dlp-tl-row${openDetail === row.id ? ' active' : ''}`}
                              onClick={() => setOpenDetail(openDetail === row.id ? null : row.id)}
                              onMouseMove={(e) => handleRowMouseMove(e, row.id)}
                              onMouseLeave={handleRowMouseLeave}
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
                          {hoveredRow && (() => {
                            const row = tlData.rows.find(r => r.id === hoveredRow);
                            const detail = tlData.details?.[hoveredRow];
                            if (!row) return null;
                            return (
                              <div className="dlp-tl-hover-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
                                <div className="dlp-tl-hover-title">{detail?.title || row.label}</div>
                                <div className="dlp-tl-hover-body">{row.tooltip}</div>
                                {detail?.dates && <div className="dlp-tl-hover-dates">{detail.dates}</div>}
                                {detail?.duration && <div className="dlp-tl-hover-meta">{detail.duration}{detail?.pay ? ` · ${detail.pay.text}` : ''}</div>}
                              </div>
                            );
                          })()}
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
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />Unpaid</div>
                          </div>
                        ) : (
                          <div className="dlp-legend">
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />FMLA (federal job protection)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#a3a3a3' }} />Insurance (STD)</div>
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

                      {/* Detail panel */}
                      {openDetail && detailData && (
                        <div className="dlp-detail show">
                          <div className="dlp-detail-head">
                            <div>
                              <div className="dlp-detail-title">{detailData.title}</div>
                              <div className="dlp-detail-dates">{detailData.dates}</div>
                            </div>
                            <button className="dlp-detail-close" type="button" onClick={() => setOpenDetail(null)}>&times;</button>
                          </div>
                          <div className="dlp-detail-grid">
                            {[
                              { label: 'Duration',     value: detailData.duration },
                              { label: 'Dates',        value: detailData.dates },
                              { label: 'Job Protection', chip: detailData.protection },
                              { label: 'Pay',          chip: detailData.pay },
                              { label: 'Covered Under', value: detailData.coveredBy },
                              { label: 'Paid By',      value: detailData.paidBy },
                            ].map((item) => (
                              <div key={item.label} className="dlp-detail-item">
                                <div className="dlp-detail-item-label">{item.label}</div>
                                <div className="dlp-detail-item-value">
                                  {item.chip
                                    ? <span className={`dlp-detail-chip ${item.chip.cls}`}>{item.chip.text}</span>
                                    : item.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pay summary band */}
                    <div className="dlp-pay-band" style={{ marginTop: 20, marginBottom: 0 }}>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Total paid weeks</div>
                        <div className="dlp-pay-stat-value">{tlData.paidWeeks > 0 ? `${tlData.paidWeeks} weeks` : 'Unpaid'}</div>
                      </div>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Total leave</div>
                        <div className="dlp-pay-stat-value">{tlData.absenceWeeks} weeks</div>
                      </div>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Est. weekly pay range</div>
                        <div className="dlp-pay-stat-value">{tlData.weeklyPay > 0 ? `~$${tlData.weeklyPay.toLocaleString()}/wk` : '$0'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion policies */}
                  <div style={{ marginTop: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f0f14', margin: '0 0 12px' }}>Your employer&rsquo;s policies</h3>
                    <div className="dlp-accordion">
                      {!isBirth && [
                        { id: 'acc-fmla',     title: 'FMLA (Job Protection)',         body: 'FMLA provides up to 12 weeks of job-protected, unpaid leave per year for qualifying reasons (serious health condition, family care, or new child). You must have worked 12+ months and 1,250+ hours. Your position (or equivalent) is guaranteed upon return.' },
                        ...(!isFamily ? [{ id: 'acc-std', title: 'Short-Term Disability (STD)', body: 'If enrolled, STD provides income replacement at 60% of your base salary for up to 26 weeks after a 7-day waiting period. Coverage applies to your own medical condition only — not family care. Medical certification from your provider is required.' }] : []),
                        { id: 'acc-ext',      title: 'Extended leave (beyond FMLA)', body: 'If you need additional time beyond your FMLA entitlement, your employer may grant extended leave as a reasonable accommodation under the ADA. This leave is unpaid and not automatically job-protected.' },
                      ].map((item) => (
                        <div key={item.id} className={`dlp-accordion-item${openAccordion === item.id ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                            <span className="dlp-accordion-title">{item.title}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{item.body}</div>
                        </div>
                      ))}
                      {isBirth && [
                        { id: 'acc-pre',  title: 'Pre-birth disability',  body: 'Pre-birth disability leave covers the period before your due date if you are medically unable to work. Typically 4 weeks, this must be certified by your medical provider. Coverage is through STD insurance at 60% of base salary, and the leave is FMLA-protected.' },
                        { id: 'acc-post', title: 'Post-birth disability', body: 'Post-birth disability covers your physical recovery after delivery. Vaginal delivery: 6 weeks. C-section: 8 weeks. Paid through STD at 60% of base salary after a 7-day waiting period. This leave runs concurrently with FMLA.' },
                        { id: 'acc-bond', title: 'Bonding time',           body: "Bonding leave allows you up to 12 weeks to bond with your new child. This is FMLA-protected but typically unpaid unless your state offers Paid Family Leave (PFL). Bonding leave begins after your disability recovery period ends." },
                      ].map((item) => (
                        <div key={item.id} className={`dlp-accordion-item${openAccordion === item.id ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                            <span className="dlp-accordion-title">{item.title}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{item.body}</div>
                        </div>
                      ))}
                      {stateBenefit && (
                        <div className={`dlp-accordion-item${openAccordion === 'acc-state' ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === 'acc-state' ? null : 'acc-state')}>
                            <span className="dlp-accordion-title">{stateBenefit.name}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{stateBenefit.desc}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next / email card */}
                  <div className="dlp-next-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="dlp-next-title">Your coverage summary is ready.</div>
                        <div className="dlp-next-desc">Save it to review later, or continue to start your leave request.</div>
                      </div>
                      <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: 'none', border: '1px solid #d0d0d5', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 3l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Email Plan
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="wizard-footer">
                    <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-save" type="button">Save &amp; Come Back Later</button>
                      <button className="btn btn-next" type="button" onClick={goNext}>Let&rsquo;s Start My Leave Request &rarr;</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Sidebar ── */}
              <div className="sim-split-side">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {isBirth ? (
                    <>
                      {/* EMPLOYMENT — birth (top of sidebar per Figma) */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field">
                            <label>Work State</label>
                            <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                              {['MO','CA','NY','NJ','WA','TX','FL'].map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Start Date</label>
                            <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      {/* KEY DATE — birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">KEY DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Due Date</label>
                            <input type="date" value={sideDueDate} onChange={(e) => setSideDueDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      {/* LEAVE PERIODS — birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">LEAVE PERIODS</div>
                        <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                          <div className="dlp-side-period">
                            <div className="dlp-side-period-label">Pre-birth disability</div>
                            <div className="dlp-side-period-dates">{tlData.preDates || '—'}</div>
                            <div className="dlp-side-period-detail">{tlData.preSub || '4 work weeks'} &middot; 60% via STD</div>
                          </div>
                          <div className="dlp-side-period" style={{ borderTop: '1px solid #f0f0f2' }}>
                            <div className="dlp-side-period-label">Post-birth disability</div>
                            <div className="dlp-side-period-dates">{tlData.postDates || '—'}</div>
                            <div className="dlp-side-period-detail">{tlData.postSub || '6 work weeks'} &middot; 60% via STD</div>
                          </div>
                          <div className="dlp-side-period" style={{ borderTop: '1px solid #f0f0f2' }}>
                            <div className="dlp-side-period-label">Bonding time</div>
                            <div className="dlp-side-period-dates">{tlData.bondDates || '—'}</div>
                            <div className="dlp-side-period-detail">{tlData.bondSub || '12 work weeks'} &middot; FMLA protected</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* EMPLOYMENT — non-birth (top of sidebar per Figma) */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field">
                            <label>Work State</label>
                            <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                              {['MO','CA','NY','NJ','WA','TX','FL'].map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Start Date</label>
                            <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      {/* KEY DATE — non-birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">KEY DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Anticipated Start Date</label>
                            <input type="date" value={sideStart} onChange={(e) => setSideStart(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      {/* LEAVE PERIODS — illness */}
                      {!isFamily && (
                        <div className="dlp-sidebar">
                          <div className="dlp-sidebar-group-label">LEAVE PERIODS</div>
                          <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                            <div className="dlp-side-period">
                              <div className="dlp-side-period-label">Short-term disability</div>
                              <div className="dlp-side-period-dates">{tlData.stdDates || '—'}</div>
                              <div className="dlp-side-period-detail">{tlData.stdSub || 'Up to 26 weeks'} &middot; 60% via STD</div>
                            </div>
                            <div className="dlp-side-period" style={{ borderTop: '1px solid #f0f0f2' }}>
                              <div className="dlp-side-period-label">FMLA job protection</div>
                              <div className="dlp-side-period-dates">{tlData.fmlaDates || '—'}</div>
                              <div className="dlp-side-period-detail">{tlData.fmlaSub || 'Up to 12 weeks'}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LEAVE PERIODS — family */}
                      {isFamily && (
                        <div className="dlp-sidebar">
                          <div className="dlp-sidebar-group-label">LEAVE PERIODS</div>
                          <div className="dlp-sidebar-group-body" style={{ padding: '12px 20px 16px' }}>
                            <div className="dlp-side-period">
                              <div className="dlp-side-period-label">FMLA family care leave</div>
                              <div className="dlp-side-period-dates">{tlData.fmlaDates || '—'}</div>
                              <div className="dlp-side-period-detail">Up to 12 weeks &middot; Job protected</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Footer note */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, fontSize: 12, color: '#a3a3a3', padding: '0 4px' }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#a3a3a3" strokeWidth="1.2"/><path d="M8 7v4" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#a3a3a3"/></svg>
                    Changes update the timeline instantly.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 4: Plan Review ─── */}
          {step === 4 && (
            <div className="sim-card" style={{ margin: '0 auto' }}>
              <div className="pr-kicker">Review Your Plan</div>
              <div className="pr-title">Here&rsquo;s what you&rsquo;ve told us so far</div>
              <div className="pr-desc">Review the information below before continuing to your formal leave request.</div>

              <div className="pr-section">
                <div className="pr-section-header">
                  <div className="pr-section-title">Leave Reason</div>
                  <button className="pr-edit-link" type="button" onClick={() => setStep(1)}>Edit</button>
                </div>
                <div className="pr-row">
                  <span className="pr-row-label">Reason</span>
                  <span className="pr-row-value">{REASON_OPTIONS.find((o) => o.value === reason)?.title}</span>
                </div>
              </div>

              <div className="pr-section">
                <div className="pr-section-header">
                  <div className="pr-section-title">Dates &amp; Duration</div>
                  <button className="pr-edit-link" type="button" onClick={() => setStep(2)}>Edit</button>
                </div>
                <div className="pr-row">
                  <span className="pr-row-label">Type</span>
                  <span className="pr-row-value" style={{ textTransform: 'capitalize' }}>{leaveType}</span>
                </div>
                <div className="pr-row">
                  <span className="pr-row-label">{isBirth ? 'Due Date' : 'Start Date'}</span>
                  <span className="pr-row-value">{isBirth ? sideDueDate : sideStart}</span>
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
                  <button className="pr-edit-link" type="button" onClick={() => setStep(2)}>Edit</button>
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
                  <button className="pr-edit-link" type="button" onClick={() => setStep(3)}>Edit</button>
                </div>
                <div className="pr-badges">
                  <span className="pr-badge">{fmlaEligible ? 'FMLA Eligible' : 'FMLA Not Eligible'}</span>
                  {!isFamily && <span className="pr-badge">STD Enrolled</span>}
                  {stateBenefit && <span className="pr-badge">{stateBenefit.name}</span>}
                </div>
              </div>

              <div className="pr-collect-card">
                <div className="pr-collect-title">What we&rsquo;ll collect next</div>
                <ol className="pr-collect-list">
                  {['Diagnosis & Treatment Details', 'Healthcare Provider', 'Work Schedule', 'Verify Your Record', 'Contact Preferences', 'Review & Submit'].map((item, i) => (
                    <li key={i}><span className="pr-collect-num">{i + 1}</span>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back to Plan</button>
                <button className="btn btn-next" type="button" onClick={goNext}>Continue to Request &rarr;</button>
              </div>
            </div>
          )}

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
                <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
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
                  <div className="rq-auth-text">I authorize my healthcare provider to share medical information with Mutual of Omaha for the purpose of processing my leave claim.</div>
                  <div className="rq-auth-sub">Required under HIPAA to process your request.</div>
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
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
                <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
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
                  <div><div className="rq-verify-label">Employer</div><div className="rq-verify-value">Mutual of Omaha</div></div>
                  <div><div className="rq-verify-label">Employment Type</div><div className="rq-verify-value">Full-time</div></div>
                  <div><div className="rq-verify-label">Address</div><div className="rq-verify-value">3300 Mutual of Omaha Plaza, Omaha, NE 68175</div></div>
                </div>
                <div className="rq-verify-note">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 7v4" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#737373"/></svg>
                  This information is provided by your employer. If anything looks incorrect, contact HR before submitting.
                </div>
              </div>
              <div className="wizard-footer">
                <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
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
                <button className="btn btn-next" type="button" onClick={goNext}>Continue &rarr;</button>
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
                  <button className="btn btn-next" type="button" style={{ background: '#105fa8' }}>Submit Request</button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
