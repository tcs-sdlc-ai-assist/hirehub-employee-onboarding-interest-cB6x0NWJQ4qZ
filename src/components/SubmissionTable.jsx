function SubmissionTable({ submissions, onEdit, onDelete }) {
  function handleDelete(submission) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the submission for "${submission.fullName}"?`
    )
    if (confirmed) {
      onDelete(submission.id)
    }
  }

  function formatDate(dateString) {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch (error) {
      return 'N/A'
    }
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty">
          <div className="table-empty-title">No submissions yet</div>
          <div className="table-empty-description">
            Submissions will appear here once candidates express their interest.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.fullName}</td>
              <td>{submission.email}</td>
              <td>{submission.mobile}</td>
              <td>
                <span className="badge">{submission.department}</span>
              </td>
              <td>{formatDate(submission.submissionDate)}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onEdit(submission)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(submission)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubmissionTable