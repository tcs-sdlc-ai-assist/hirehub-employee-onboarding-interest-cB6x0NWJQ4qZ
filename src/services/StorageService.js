const STORAGE_KEY = 'hirehub_submissions'

function getSubmissions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return []
    }
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) {
      console.error('StorageService: corrupted data detected, resetting to empty array')
      resetSubmissions()
      return []
    }
    return parsed
  } catch (error) {
    console.error('StorageService: failed to parse submissions, resetting to empty array', error)
    resetSubmissions()
    return []
  }
}

function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
  } catch (error) {
    console.error('StorageService: failed to save submissions', error)
  }
}

function addSubmission(submission) {
  const submissions = getSubmissions()
  const newSubmission = {
    id: generateId(),
    fullName: submission.fullName,
    email: submission.email,
    mobile: submission.mobile,
    department: submission.department,
    submissionDate: new Date().toISOString(),
  }
  submissions.push(newSubmission)
  saveSubmissions(submissions)
  return newSubmission
}

function updateSubmission(id, updates) {
  const submissions = getSubmissions()
  const index = submissions.findIndex((s) => s.id === id)
  if (index === -1) {
    return null
  }
  const updated = {
    ...submissions[index],
    ...updates,
    id: submissions[index].id,
    submissionDate: submissions[index].submissionDate,
  }
  submissions[index] = updated
  saveSubmissions(submissions)
  return updated
}

function deleteSubmission(id) {
  const submissions = getSubmissions()
  const filtered = submissions.filter((s) => s.id !== id)
  if (filtered.length === submissions.length) {
    return false
  }
  saveSubmissions(filtered)
  return true
}

function resetSubmissions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  } catch (error) {
    console.error('StorageService: failed to reset submissions', error)
  }
}

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export {
  getSubmissions,
  saveSubmissions,
  addSubmission,
  updateSubmission,
  deleteSubmission,
  resetSubmissions,
}