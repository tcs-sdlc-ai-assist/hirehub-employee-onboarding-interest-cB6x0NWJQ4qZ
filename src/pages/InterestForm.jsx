import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ALLOWED_DEPARTMENTS } from '../services/ValidationService.js'
import useSubmissions from '../hooks/useSubmissions.js'

function InterestForm() {
  const { addSubmission, validationErrors, successMessage } = useSubmissions()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    department: '',
  })

  const [localSuccess, setLocalSuccess] = useState('')

  useEffect(() => {
    if (localSuccess) {
      const timer = setTimeout(() => {
        setLocalSuccess('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [localSuccess])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const result = addSubmission(formData)

    if (result.success) {
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        department: '',
      })
      setLocalSuccess('Your interest has been submitted successfully!')
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Express Your Interest</h1>
        <p className="form-subtitle">
          Fill out the form below to let us know you're interested in joining our team.
        </p>

        {localSuccess && (
          <div className="message-banner message-banner-success">
            ✓ {localSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="fullName"
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
            <label className="form-label" htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
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
            <label className="form-label" htmlFor="mobile">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              id="mobile"
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
            <label className="form-label" htmlFor="department">
              Department of Interest <span className="required">*</span>
            </label>
            <select
              id="department"
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

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <div className="text-center mt-lg">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default InterestForm