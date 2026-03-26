import { useState, useCallback, useEffect } from 'react'
import {
  getSubmissions,
  addSubmission as storageAdd,
  updateSubmission as storageUpdate,
  deleteSubmission as storageDelete,
} from '../services/StorageService.js'
import { validateSubmission } from '../services/ValidationService.js'

function useSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const refreshSubmissions = useCallback(() => {
    const data = getSubmissions()
    setSubmissions(data)
  }, [])

  useEffect(() => {
    refreshSubmissions()
  }, [refreshSubmissions])

  const clearMessages = useCallback(() => {
    setValidationErrors({})
    setSuccessMessage('')
  }, [])

  const addSubmission = useCallback((submission) => {
    clearMessages()

    const existing = getSubmissions()
    const { valid, errors } = validateSubmission(submission, existing)

    if (!valid) {
      setValidationErrors(errors)
      return { success: false, error: 'VALIDATION_ERROR', details: errors }
    }

    const newSubmission = storageAdd(submission)
    if (!newSubmission) {
      return { success: false, error: 'STORAGE_ERROR' }
    }

    refreshSubmissions()
    setSuccessMessage('Submission added successfully')
    return { success: true, data: newSubmission }
  }, [clearMessages, refreshSubmissions])

  const updateSubmission = useCallback((id, updates) => {
    clearMessages()

    const existing = getSubmissions()
    const current = existing.find((s) => s.id === id)
    if (!current) {
      return { success: false, error: 'NOT_FOUND' }
    }

    const merged = {
      ...current,
      ...updates,
      id: current.id,
      submissionDate: current.submissionDate,
    }

    const { valid, errors } = validateSubmission(merged, existing, id)

    if (!valid) {
      setValidationErrors(errors)
      return { success: false, error: 'VALIDATION_ERROR', details: errors }
    }

    const updated = storageUpdate(id, updates)
    if (!updated) {
      return { success: false, error: 'NOT_FOUND' }
    }

    refreshSubmissions()
    setSuccessMessage('Submission updated successfully')
    return { success: true, data: updated }
  }, [clearMessages, refreshSubmissions])

  const deleteSubmission = useCallback((id) => {
    clearMessages()

    const result = storageDelete(id)
    if (!result) {
      return { success: false, error: 'NOT_FOUND' }
    }

    refreshSubmissions()
    setSuccessMessage('Submission deleted successfully')
    return { success: true }
  }, [clearMessages, refreshSubmissions])

  return {
    submissions,
    addSubmission,
    updateSubmission,
    deleteSubmission,
    refreshSubmissions,
    validationErrors,
    successMessage,
  }
}

export default useSubmissions