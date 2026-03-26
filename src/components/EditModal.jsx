import { useState, useEffect, useRef } from 'react'
import { ALLOWED_DEPARTMENTS } from '../services/ValidationService.js'

function EditModal({ submission, onSave, onClose, validationErrors }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    department: '',
  })

  const modalRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (submission) {
      setFormData({
        fullName: submission.fullName || '',
        email: submission.email || '',
        mobile: submission.mobile || '',
        department: submission.department || '',
      })
    }
  }, [submission])

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(submission.id, formData)
  }

  if (!submission) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="edit-modal-title">Edit Submission</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="edit-fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="edit-fullName"
                type="text"
                name="fullName"
                className={'form-input' + (validationErrors.fullName ? ' input-error' : '')}
                value={formData.fullName}
                onChange={handleChange}
              />
              {validationErrors.fullName && (
                <div className="form-error">{validationErrors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-email">
                Email <span className="required">*</span>
              </label>
              <input
                id="edit-email"
                type="email"
                name="email"
                className={'form-input' + (validationErrors.email ? ' input-error' : '')}
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <div className="form-error">{validationErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-mobile">
                Mobile <span className="required">*</span>
              </label>
              <input
                id="edit-mobile"
                type="text"
                name="mobile"
                className={'form-input' + (validationErrors.mobile ? ' input-error' : '')}
                value={formData.mobile}
                onChange={handleChange}
              />
              {validationErrors.mobile && (
                <div className="form-error">{validationErrors.mobile}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-department">
                Department <span className="required">*</span>
              </label>
              <select
                id="edit-department"
                name="department"
                className={'form-select' + (validationErrors.department ? ' input-error' : '')}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {ALLOWED_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {validationErrors.department && (
                <div className="form-error">{validationErrors.department}</div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal