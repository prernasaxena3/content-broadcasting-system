import { ROLES } from '../utils/constants'

export const mockUsers = [
  {
    id: 'teacher-1',
    name: 'Ajay Saxena',
    email: 'teacher@demo.com',
    password: 'teacher123',
    role: ROLES.TEACHER,
    token: 'mock-jwt-teacher-token-xyz',
  },
  {
    id: 'teacher-2',
    name: 'Rashmi Saxena',
    email: 'teacher2@demo.com',
    password: 'teacher123',
    role: ROLES.TEACHER,
    token: 'mock-jwt-teacher2-token-xyz',
  },
  {
    id: 'principal-1',
    name: 'Dr. Nupur Saxena',
    email: 'principal@demo.com',
    password: 'principal123',
    role: ROLES.PRINCIPAL,
    token: 'mock-jwt-principal-token-xyz',
  },
]