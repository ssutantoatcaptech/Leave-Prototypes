export default function MyCasesPage() {
  const casesData = [
    {
      type: 'FMLA - Pregnancy',
      id: 'CASE-2024-00312',
      lastUpdate: 'Oct 15, 2024',
      status: 'Open',
      statusColor: 'green',
      required: 'Certification due Oct 25',
      actions: ['View', 'Upload'],
    },
    {
      type: 'Short-Term Disability',
      id: 'CASE-2024-00287',
      lastUpdate: 'Oct 10, 2024',
      status: 'In Progress',
      statusColor: 'blue',
      required: 'None',
      actions: ['View'],
    },
    {
      type: 'State Leave - NY PFL',
      id: 'CASE-2024-00275',
      lastUpdate: 'Sep 28, 2024',
      status: 'Pending Info',
      statusColor: 'amber',
      required: 'Provider form needed',
      actions: ['View', 'Upload'],
    },
    {
      type: 'FMLA - Family Care',
      id: 'CASE-2024-00250',
      lastUpdate: 'Sep 15, 2024',
      status: 'Approved',
      statusColor: 'green',
      required: 'None',
      actions: ['View'],
    },
    {
      type: 'Military Leave',
      id: 'CASE-2024-00198',
      lastUpdate: 'Jun 14, 2024',
      status: 'Closed',
      statusColor: 'gray',
      required: '—',
      actions: ['View'],
    },
  ];

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <span>Claims &amp; Leave</span>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>My Cases</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">My Cases</h1>
          <p className="cl-page-desc">View and manage your leave and disability cases.</p>
        </div>
      </div>

      {/* Table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th>Type &amp; ID</th>
              <th>Last Update</th>
              <th>Status</th>
              <th>Required Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {casesData.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="cl-cell-stacked">
                    <span className="cl-cell-primary">{row.type}</span>
                    <span className="cl-cell-secondary">{row.id}</span>
                  </div>
                </td>
                <td>{row.lastUpdate}</td>
                <td>
                  <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
                </td>
                <td>{row.required}</td>
                <td>
                  <div className="cl-action-links">
                    {row.actions.map((action, j) => (
                      <button key={j} className="cl-link-btn">{action}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
