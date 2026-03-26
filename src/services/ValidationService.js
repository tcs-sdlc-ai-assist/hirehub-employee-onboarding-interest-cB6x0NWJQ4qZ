import { getSubmissions } from './StorageService.js'

const ALLOWED_DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Design',
  'Product',
]

function validateFullName(fullName) {
  if (!fullName || fullName.trim().length === 0) {
    return 'Full name is required'
  }
  if (fullName.trim().length < 2) {
    return 'Full name must be at least 2 characters'
  }
  if (fullName.trim().length > 50) {
    return 'Full name must not exceed 50 characters'
  }
  return null
}

function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address'
  }
  return null
}

function validateMobile(mobile) {
  if (!mobile || mobile.trim().length === 0) {
    return 'Mobile number is required'
  }
  const digitsOnly = mobile.trim().replace(/\D/g, '')
  if (digitsOnly.length !== mobile.trim().length) {
    return 'Mobile number must contain only digits'
  }
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return 'Mobile number must be between 10 and 15 digits'
  }
  return null
}

function validateDepartment(department) {
  if (!department || department.trim().length === 0) {
    return 'Department is required'
  }
  if (!ALLOWED_DEPARTMENTS.includes(department.trim())) {
    return 'Please select a valid department'
  }
  return null
}

function isDuplicateEmail(email, submissions, excludeId) {
  if (!email) {
    return false
  }
  const normalizedEmail = email.trim().toLowerCase()
  return submissions.some((s) => {
    if (excludeId && s.id === excludeId) {
      return false
    }
    return s.email && s.email.trim().toLowerCase() === normalizedEmail
  })
}

function validateSubmission(submission, existingSubmissions, excludeId) {
  const errors = {}

  const fullNameError = validateFullName(submission.fullName)
  if (fullNameError) {
    errors.fullName = fullNameError
  }

  const emailError = validateEmail(submission.email)
  if (emailError) {
    errors.email = emailError
  }

  const mobileError = validateMobile(submission.mobile)
  if (mobileError) {
    errors.mobile = mobileError
  }

  const departmentError = validateDepartment(submission.department)
  if (departmentError) {
    errors.department = departmentError
  }

  if (!errors.email) {
    const subs = existingSubmissions !== undefined ? existingSubmissions : getSubmissions()
    if (isDuplicateEmail(submission.email, subs, excludeId)) {
      errors.email = 'This email has already been submitted'
    }
  }

  const valid = Object.keys(errors).length === 0

  return { valid, errors }
}

export {
  validateFullName,
  validateEmail,
  validateMobile,
  validateDepartment,
  isDuplicateEmail,
  validateSubmission,
  ALLOWED_DEPARTMENTS,
}