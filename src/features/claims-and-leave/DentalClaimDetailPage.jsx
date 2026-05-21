import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBasePath from './useBasePath';
import './claims-and-leave.css';

const IN_NETWORK_DATA = {
  date: 'February 23, 2026',
  network: 'in-network',
  outOfPocket: '$0.00',
  totalClaim: '$250.00',
  patient: 'Sarah Johnson',
  claimNumber: 'CL2026-001847',
  doctor: 'Dr. Pamulaparthi Venkata Lakshmi Rao',
  planPaid: '$250.00',
  youOwe: '$0.00',
  inNetworkSavings: '$40.00',
  amountBilled: '$250.00',
};

const OUT_OF_NETWORK_DATA = {
  date: 'February 23, 2026',
  network: 'out-of-network',
  outOfPocket: '$50.00',
  totalClaim: '$250.00',
  patient: 'Sarah Johnson',
  claimNumber: 'CL2026-001847',
  doctor: 'Dr. Pamulaparthi Venkata Lakshmi Rao',
  planPaid: '$150.00',
  youOwe: '$100.00',
  inNetworkSavings: null,
  amountBilled: '$250.00',
};

const COST_BREAKDOWN_IN = [
  {
    date: 'Feb 23, 2025',
    code: 'D1110',
    service: 'Periodic Oral Evaluation (Established) Patient',
    description: 'A preventative check-up where the dentist reviews and examines an existing patient\'s oral health.',
    billed: '$100.00',
    planPays: '$100.00',
    youPay: '$0.00',
  },
  {
    date: 'Feb 23, 2025',
    code: 'D1220',
    service: 'Routine Cleaning',
    description: 'A preventative procedure where the hygienist removes plaque and tartar, polishes the teeth, and helps keep gums healthy.',
    billed: '$50.00',
    planPays: '$50.00',
    youPay: '$0.00',
  },
  {
    date: 'Feb 23, 2025',
    code: 'D1217',
    service: 'X-Rays',
    description: 'A quick imaging procedure that captures pictures of your teeth and jaw, helping the dentist spot issues like cavities, bone loss, or infections.',
    billed: '$50.00',
    planPays: '$50.00',
    youPay: '$0.00',
  },
];

const COST_BREAKDOWN_OON = [
  {
    date: 'Feb 23, 2025',
    code: 'D1110',
    service: 'Periodic Oral Evaluation (Established) Patient',
    description: 'A preventative check-up where the dentist reviews and examines an existing patient\'s oral health.',
    billed: '$100.00',
    planPays: '$80.00',
    youPay: '$20.00',
  },
  {
    date: 'Feb 23, 2025',
    code: 'D1220',
    service: 'Routine Cleaning',
    description: 'A preventative procedure where the hygienist removes plaque and tartar, polishes the teeth, and helps keep gums healthy.',
    billed: '$100.00',
    planPays: '$80.00',
    youPay: '$20.00',
  },
  {
    date: 'Feb 23, 2025',
    code: 'D1217',
    service: 'X-Rays',
    description: 'A quick imaging procedure that captures pictures of your teeth and jaw, helping the dentist spot issues like cavities, bone loss, or infections.',
    billed: '$50.00',
    planPays: '$40.00',
    youPay: '$10.00',
  },
];

const FAQ_ITEMS = [
  {
    question: "What's the difference between a claim and a bill?",
    answer: "A claim is a request submitted to your insurance company to pay for dental services you've received. A bill is what your dentist charges you directly. After your insurance processes the claim, you may receive a bill for any remaining balance not covered by your plan.",
  },
  {
    question: 'What is an Explanation of Benefits (EOB)?',
    answer: "An Explanation of Benefits is a document from your insurance company that details what was billed, what your plan covered, and what you may owe. It is not a bill, but a summary of how your claim was processed.",
  },
  {
    question: 'Can I file a claim electronically?',
    answer: "Yes, most dental providers file claims electronically on your behalf. If you need to submit a claim yourself, you can do so through your online member portal or by mailing a completed claim form.",
  },
];

export default function DentalClaimDetailPage() {
  const base = useBasePath();
  const location = useLocation();
  const isOutOfNetwork = location.state?.network === 'out-of-network';
  const claim = isOutOfNetwork ? OUT_OF_NETWORK_DATA : IN_NETWORK_DATA;
  const [expandedFaq, setExpandedFaq] = useState(0);

  const planPaidNum = parseFloat(claim.planPaid.replace(/[$,]/g, ''));
  const totalNum = parseFloat(claim.amountBilled.replace(/[$,]/g, ''));
  const planPaidPct = totalNum > 0 ? (planPaidNum / totalNum) * 100 : 0;

  return (
    <div className="cl-dental-detail-page" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14 }}>
        <Link to={base} className="cl-ml-breadcrumb-link">Claims &amp; Leave</Link>
        <span style={{ color: '#9ca3af' }}>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <Link to={`${base}/claims`} className="cl-ml-breadcrumb-link">Claims Center</Link>
        <span style={{ color: '#9ca3af' }}>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span style={{ color: '#002547', fontWeight: 600 }}>CLM-98234</span>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: '1 1 65%', minWidth: 0 }}>

          {/* Claim Header Card */}
          <div className="cl-dental-detail-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 24, fontWeight: 600, color: '#002547' }}>{claim.date}</span>
              <span className={`cl-dental-detail-badge ${isOutOfNetwork ? 'cl-dental-detail-badge--oon' : 'cl-dental-detail-badge--in'}`}>
                <span className={`cl-dental-detail-badge-dot ${isOutOfNetwork ? 'cl-dental-detail-badge-dot--red' : 'cl-dental-detail-badge-dot--green'}`} />
                {isOutOfNetwork ? 'Out-of-Network Claim' : 'In-Network Claim'}
              </span>
            </div>

            {/* Network Banner */}
            {!isOutOfNetwork ? (
              <div className="cl-dental-detail-banner cl-dental-detail-banner--green">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#1fa668"/>
                  <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 700, color: '#1b5e20', marginBottom: 2 }}>In-Network Provider</div>
                  <div style={{ fontSize: 13, color: '#2e7d32' }}>You maximized your benefits by visiting an in-network provider!</div>
                </div>
              </div>
            ) : (
              <div className="cl-dental-detail-banner cl-dental-detail-banner--orange">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L1 18h18L10 2z" fill="#e65100"/>
                  <path d="M10 8v4M10 14h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 700, color: '#bf360c', marginBottom: 2 }}>Out-of-Network Provider</div>
                  <div style={{ fontSize: 13, color: '#4e342e' }}>Choosing an in-network provider for future appointments could help you reduce your out of pocket expenses. Go to Find a Provider to search for in-network providers near you.</div>
                </div>
              </div>
            )}

            {/* Cost Summary Row */}
            <div className="cl-dental-detail-cost-row">
              <div className="cl-dental-detail-cost-item">
                <span style={{ fontSize: 36, fontWeight: 700, color: '#002547' }}>{claim.outOfPocket}</span>
                <span style={{ fontSize: 14, color: '#5d5d5d' }}>Out of pocket expenses</span>
              </div>
              <div className="cl-dental-detail-cost-item">
                <span className="cl-dental-detail-cost-label">TOTAL CLAIM AMOUNT</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#002547' }}>{claim.totalClaim}</span>
              </div>
              <div className="cl-dental-detail-cost-item">
                <span className="cl-dental-detail-cost-label">PATIENT</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#002547' }}>{claim.patient}</span>
              </div>
              <div className="cl-dental-detail-cost-item">
                <span className="cl-dental-detail-cost-label">CLAIM NUMBER</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#002547' }}>{claim.claimNumber}</span>
              </div>
              <div className="cl-dental-detail-cost-item">
                <span className="cl-dental-detail-cost-label">DOCTOR</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#002547' }}>{claim.doctor}</span>
              </div>
            </div>

            {/* PDF Button */}
            <button className="cl-dental-detail-btn-primary" style={{ marginTop: 20 }}>
              View Explanation of Benefits (PDF)
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 8 }}>
                <path d="M11 8v3a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3M8 2h4v4M6 8l6-6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Summary of Costs Card */}
          <div className="cl-dental-detail-card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#002547', marginBottom: 16 }}>Summary of Costs</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: '#002547' }}>{claim.amountBilled}</span>
              <span style={{ fontSize: 16, color: '#5d5d5d' }}>Total</span>
            </div>

            {/* Progress Bar */}
            <div className="cl-dental-detail-progress-bar">
              <div className="cl-dental-detail-progress-fill" style={{ width: `${planPaidPct}%` }} />
            </div>
            <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#5d5d5d', marginBottom: 24 }}>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#105fa8', marginRight: 6 }} />Your Plan Paid {claim.planPaid}</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#e8eef4', border: '1px solid #c5d3e0', marginRight: 6 }} />You Owe {claim.youOwe}</span>
            </div>

            {/* Cost Items Grid */}
            <div className={`cl-dental-detail-costs-grid${isOutOfNetwork ? ' cl-dental-detail-costs-grid--3col' : ''}`}>
              <div className="cl-dental-detail-cost-box">
                <span className="cl-dental-detail-cost-box-label">Amount Billed</span>
                <span className="cl-dental-detail-cost-box-amount">{claim.amountBilled}</span>
                <span className="cl-dental-detail-cost-box-desc">This is the total amount charged by your provider for the service(s) you received.</span>
              </div>
              <div className="cl-dental-detail-cost-box">
                <span className="cl-dental-detail-cost-box-label">Your Plan Paid</span>
                <span className="cl-dental-detail-cost-box-amount">{claim.planPaid}</span>
                <span className="cl-dental-detail-cost-box-desc">The amount from this claim paid by your plan. Amount is determined by your Benefits.</span>
              </div>
              <div className="cl-dental-detail-cost-box">
                <span className="cl-dental-detail-cost-box-label">Total You Owe</span>
                <span className="cl-dental-detail-cost-box-amount">{claim.youOwe}</span>
                <span className="cl-dental-detail-cost-box-desc">The total dollar amount you may owe your doctor or healthcare provider.</span>
              </div>
              {!isOutOfNetwork && (
                <div className="cl-dental-detail-cost-box">
                  <span className="cl-dental-detail-cost-box-label">In-Network Savings</span>
                  <span className="cl-dental-detail-cost-box-amount">{claim.inNetworkSavings}</span>
                  <span className="cl-dental-detail-cost-box-desc">The total amount you saved by visiting an in-network provider.</span>
                </div>
              )}
            </div>

            {isOutOfNetwork && (
              <div className="cl-dental-detail-oon-callout">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="9" cy="9" r="8" stroke="#105fa8" strokeWidth="1.5"/>
                  <path d="M9 8v4M9 6h.01" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 700, color: '#002547', marginBottom: 4 }}>How are out-of-network charges calculated?</div>
                  <div style={{ fontSize: 13, color: '#5d5d5d', lineHeight: 1.5 }}>For out-of-network dental claims, your plan pays based on UCR (Usual, Customary, and Reasonable) fees, reflecting typical charges in your area, or a set MAC (Maximum Allowable Charge) for the procedure. If the provider's fee exceeds the UCR or MAC amount, you may be responsible for the difference.</div>
                </div>
              </div>
            )}
          </div>

          {/* Cost Breakdown Card */}
          <div className="cl-dental-detail-card" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#002547', margin: 0 }}>Cost Breakdown</h2>
              <span className="cl-dental-detail-badge cl-dental-detail-badge--in">
                <span className="cl-dental-detail-badge-dot cl-dental-detail-badge-dot--green" />
                Processed
              </span>
            </div>

            <div className="cl-dental-detail-table-wrap">
              <table className="cl-dental-detail-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>CODE</th>
                    <th>SERVICE</th>
                    <th style={{ textAlign: 'right' }}>TOTAL BILLED</th>
                    <th style={{ textAlign: 'right' }}>PLAN PAYS</th>
                    <th style={{ textAlign: 'right' }}>YOU PAY</th>
                  </tr>
                </thead>
                <tbody>
                  {(isOutOfNetwork ? COST_BREAKDOWN_OON : COST_BREAKDOWN_IN).map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ whiteSpace: 'nowrap' }}>{row.date}</td>
                      <td><span className="cl-dental-detail-code-link">{row.code}</span></td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#002547', marginBottom: 4 }}>{row.service}</div>
                        <div style={{ fontSize: 13, color: '#5d5d5d', lineHeight: 1.4 }}>{row.description}</div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{row.billed}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{row.planPays}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{row.youPay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (sidebar) */}
        <div style={{ flex: '0 0 35%', minWidth: 280 }}>

          {/* Benefit Use Card */}
          <div className="cl-dental-detail-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#002547', margin: 0 }}>Benefit Use</h3>
              <span style={{ fontSize: 12, color: '#5d5d5d' }}>As of 03/01/2026</span>
            </div>

            {/* Individual Deductible */}
            <div className="cl-dental-detail-benefit-section">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#105fa8', marginBottom: 6 }}>Individual Deductible</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#002547' }}>$50</span>
                <span style={{ fontSize: 12, color: '#5d5d5d' }}>$50 of $50 used</span>
              </div>
              <div className="cl-dental-detail-progress-bar cl-dental-detail-progress-bar--sm">
                <div className="cl-dental-detail-progress-fill cl-dental-detail-progress-fill--warn" style={{ width: '100%' }} />
              </div>
              <p className="cl-dental-detail-benefit-desc">The amount you must pay out of pocket for covered dental services each year before your insurance begins to share the cost.</p>
            </div>

            {/* Family Deductible */}
            <div className="cl-dental-detail-benefit-section">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#105fa8', marginBottom: 6 }}>Family Deductible</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#002547' }}>$100</span>
                <span style={{ fontSize: 12, color: '#5d5d5d' }}>$100 of $100 used</span>
              </div>
              <div className="cl-dental-detail-progress-bar cl-dental-detail-progress-bar--sm">
                <div className="cl-dental-detail-progress-fill" style={{ width: '100%' }} />
              </div>
              <p className="cl-dental-detail-benefit-desc">The combined amount your family must pay out of pocket before insurance begins sharing costs for covered dental services.</p>
            </div>

            {/* Annual Maximum */}
            <div className="cl-dental-detail-benefit-section">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#105fa8', marginBottom: 6 }}>Annual Maximum</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#002547' }}>$1,250</span>
                <span style={{ fontSize: 12, color: '#5d5d5d' }}>$750 of $2,000 used</span>
              </div>
              <div className="cl-dental-detail-progress-bar cl-dental-detail-progress-bar--sm">
                <div className="cl-dental-detail-progress-fill" style={{ width: '37.5%' }} />
              </div>
              <p className="cl-dental-detail-benefit-desc">The total dollar amount your plan will pay for covered dental services in a year. Once you reach that limit, you pay any additional costs out of pocket.</p>
            </div>

            {/* Orthodontic Maximum */}
            <div className="cl-dental-detail-benefit-section">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#105fa8', marginBottom: 6 }}>Annual Maximum</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#002547' }}>$1,700</span>
                <span style={{ fontSize: 12, color: '#5d5d5d' }}>$500 of $2,200 used</span>
              </div>
              <div className="cl-dental-detail-progress-bar cl-dental-detail-progress-bar--sm">
                <div className="cl-dental-detail-progress-fill" style={{ width: '22.7%' }} />
              </div>
              <p className="cl-dental-detail-benefit-desc">The total amount your dental plan will pay for orthodontic treatment over your lifetime, regardless of how many years you're enrolled.</p>
            </div>

            <button className="cl-dental-detail-btn-outline" style={{ marginTop: 16 }}>
              View Benefit Details &gt;
            </button>
          </div>

          {/* Procedure and Code Lookup Card */}
          <div className="cl-dental-detail-card" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="#002547" strokeWidth="1.5"/>
                <path d="M14 14l4 4" stroke="#002547" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#002547' }}>Procedure and Code Lookup</span>
            </div>
            <p style={{ fontSize: 14, color: '#5d5d5d', marginBottom: 16, lineHeight: 1.5 }}>Search for procedures by name or ADA code to learn more about the care and how it is covered.</p>
            <button className="cl-dental-detail-btn-primary" style={{ width: '100%' }}>
              Go to Procedure Search &gt;
            </button>
          </div>

          {/* Claim FAQs Card */}
          <div className="cl-dental-detail-card" style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#002547', marginBottom: 16 }}>Claim FAQs</h3>
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="cl-dental-detail-faq-item">
                <button
                  className="cl-dental-detail-faq-toggle"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  aria-expanded={expandedFaq === idx}
                >
                  <span style={{ flex: 1, textAlign: 'left', fontWeight: 600, color: '#002547' }}>{faq.question}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <path d="M3 5l4 4 4-4" stroke="#5d5d5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {expandedFaq === idx && (
                  <div className="cl-dental-detail-faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
