export const ROLES = {
  TEACHER: 'teacher',
  PRINCIPAL: 'principal',
}

export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Arts',
]

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif']
export const MAX_FILE_SIZE_MB = 10
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024