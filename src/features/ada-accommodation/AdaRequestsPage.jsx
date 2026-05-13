import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBasePath from '../claims-and-leave/useBasePath';
import './ada-accommodation.css';

const MOCK_REQUESTS = [
  {
    id: 'ADA-2026-0041',
    type: 'Flexible schedule',
    condition: 'Chronic Illness',
    submittedDate: '2026-04-22',
    status: 'active',
    statusLabel: 'Active',
    startDate: '2026-05-01',
    duration: 'Ongoing',
    timeline: [
      { date: 'May 1, 2026', event: 'Accommodation is now active.', type: 'success' },
      { date: 'Apr 28, 2026', event: 'Your request was approved. Flexible schedule confirmed with your manager.', type: 'success' },
      { date: 'Apr 25, 2026', event: 'Documentation reviewed — meets requirements.', type: 'info' },
      { date: 'Apr 23, 2026', event: 'You uploaded medical documentation.', type: 'info' },
      { date: 'Apr 22, 2026', event: 'Request submitted.', type: 'info' },
    ],
  },
  {
    id: 'ADA-2026-0058',
    type: 'Equipment adjustments',
    condition: 'Temporary Injury',
    submittedDate: '2026-05-08',
    status: 'info-needed',
    statusLabel: 'More Info Needed',
    startDate: '2026-05-15',
    duration: 'Temporary',
    message: 'Please provide documentation from your healthcare provider describing the functional limitations related to your request.',
    timeline: [
      { date: 'May 10, 2026', event: 'Additional documentation requested — please upload by May 17.', type: 'action' },
      { date: 'May 9, 2026', event: 'Your request is being reviewed.', type: 'info' },
      { date: 'May 8, 2026', event: 'Request submitted.', type: 'info' },
    ],
  },
  {
    id: 'ADA-2026-0063',
    type: 'Remote work',
    condition: 'Mental Health',
    submittedDate: '2026-05-11',
    status: 'submitted',
    statusLabel: 'Submitted',
    startDate: '2026-05-19',
    duration: 'Ongoing',
    timeline: [
      { date: 'May 11, 2026', event: 'Request submitted. We will begin reviewing shortly.', type: 'info' },
    ],
  },
];

function StatusBadge({ status, label }) {
  const classMap = {
    submitted: 'ada-status--submitted',
    'under-review': 'ada-status--review',
    'info-needed': 'ada-status--info',
    approved: 'ada-status--approved',
    denied: 'ada-status--denied',
    active: 'ada-status--active',
  };
  return <span className={`ada-status-badge ${classMap[status] || ''}`}>{label}</span>;
}

function RequestDetail({ request, onBack, onUpload, onRespond }) {
  return (
    <>
      <button className="ada-back" type="button" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to My Requests
      </button>

      <div className="ada-detail-card">
        <div className="ada-detail-header">
          <div>
            <h2 className="ada-detail-title">{request.type}</h2>
            <span className="ada-detail-id">{request.id}</span>
          </div>
          <StatusBadge status={request.status} label={request.statusLabel} />
        </div>

        <div className="ada-detail-grid">
          <div>
            <div className="ada-detail-label">Condition</div>
            <div className="ada-detail-value">{request.condition}</div>
          </div>
          <div>
            <div className="ada-detail-label">Start Date</div>
            <div className="ada-detail-value">{new Date(request.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div>
            <div className="ada-detail-label">Duration</div>
            <div className="ada-detail-value">{request.duration}</div>
          </div>
          <div>
            <div className="ada-detail-label">Submitted</div>
            <div className="ada-detail-value">{new Date(request.submittedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>

        {request.status === 'info-needed' && request.message && (
          <div className="ada-detail-alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#105fa8"/><path d="M12 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
            <div>
              <div className="ada-detail-alert-title">Action needed</div>
              <p className="ada-detail-alert-text">{request.message}</p>
              <div className="ada-detail-alert-actions">
                <button className="ada-btn-save" type="button" onClick={onUpload}>Upload Documents</button>
                <button className="ada-btn-discard" type="button" onClick={onRespond}>Send a Response</button>
              </div>
            </div>
          </div>
        )}

        <div className="ada-detail-timeline">
          <h3 className="ada-detail-section-title">Activity</h3>
          <div className="ada-timeline-list">
            {request.timeline.map((item, i) => (
              <div className="ada-timeline-item" key={i}>
                <div className={`ada-timeline-dot ada-timeline-dot--${item.type}`} />
                <div className="ada-timeline-content">
                  <div className="ada-timeline-event">{item.event}</div>
                  <div className="ada-timeline-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdaRequestsPage() {
  const navigate = useNavigate();
  const base = useBasePath();
  const [selectedId, setSelectedId] = useState(null);

  const selectedRequest = MOCK_REQUESTS.find((r) => r.id === selectedId);

  if (selectedRequest) {
    return (
      <div className="ada-page ada-embedded">
        <div className="ada-content">
          <RequestDetail
            request={selectedRequest}
            onBack={() => setSelectedId(null)}
            onUpload={() => {}}
            onRespond={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="ada-page ada-embedded">
      <div className="ada-content">
        <button className="ada-back" type="button" onClick={() => navigate(`${base}/file-claim`)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="ada-requests-card">
          <div className="ada-requests-header">
            <h2>My Accommodation Requests</h2>
            <button className="ada-btn-primary" type="button" onClick={() => navigate(`${base}/file-claim/ada-accommodation`)}>
              New Request
            </button>
          </div>

          <div className="ada-requests-list">
            {MOCK_REQUESTS.map((req) => (
              <button className="ada-request-row" key={req.id} type="button" onClick={() => setSelectedId(req.id)}>
                <div className="ada-request-row-main">
                  <div className="ada-request-row-title">{req.type}</div>
                  <div className="ada-request-row-meta">{req.id} · Submitted {new Date(req.submittedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <StatusBadge status={req.status} label={req.statusLabel} />
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ada-request-row-chevron"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
