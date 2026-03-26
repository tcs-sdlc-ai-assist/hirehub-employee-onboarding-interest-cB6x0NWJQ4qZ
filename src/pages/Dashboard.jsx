import { useState } from 'react'
import useProtectedRoute from '../hooks/useProtectedRoute.js'
import useSubmissions from '../hooks/useSubmissions.js'
import StatCard from '../components/StatCard.jsx'
import SubmissionTable from '../components/SubmissionTable.jsx'
import EditModal from '../components/EditModal.jsx'

function Dashboard() {
  const { isAuthorized } = useProtectedRoute()
  const {
    submissions,
    updateSubmission,
    deleteSubmission,
    validationErrors,
    successMessage,
  } = useSubmissions()

  const [editingSubmission, setEditingSubmission] = useState(null)

  if (!isAuthorized) {
    return null
  }

  const totalSubmissions = submissions.length

  const uniqueDepartments = new Set(submissions.map((s) => s.department)).size

  function getLatestDate() {
    if (submissions.length === 0) {
      return 'N/A'
    }
    try {
      const sorted = [...submissions].sort(
        (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
      )
      const latest = new Date(sorted[0].submissionDate)
      return latest.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch (error) {
      return 'N/A'
    }
  }

  function handleEdit(submission) {
    setEditingSubmission(submission)
  }

  function handleDelete(id) {
    deleteSubmission(id)
  }

  function handleSave(id, formData) {
    const result = updateSubmission(id, formData)
    if (result.success) {
      setEditingSubmission(null)
    }
  }

  function handleCloseModal() {
    setEditingSubmission(null)
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      {successMessage && (
        <div className="message-banner message-banner-success">
          ✓ {successMessage}
        </div>
      )}

      <div className="stat-cards">
        <StatCard label="Total Submissions" value={totalSubmissions} />
        <StatCard label="Unique Departments" value={uniqueDepartments} />
        <StatCard label="Latest Submission" value={getLatestDate()} />
      </div>

      <SubmissionTable
        submissions={submissions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingSubmission && (
        <EditModal
          submission={editingSubmission}
          onSave={handleSave}
          onClose={handleCloseModal}
          validationErrors={validationErrors}
        />
      )}
    </div>
  )
}

export default Dashboard