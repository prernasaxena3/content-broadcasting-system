import { mockUsers } from '../mock/users'

export const loginUser = async ({ email, password }) => {
  // MOCK - replace with: return await api.post('/auth/login', { email, password })
  await new Promise((r) => setTimeout(r, 800)) // simulate network delay

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) throw new Error('Invalid email or password')

  const { password: _, ...safeUser } = user
  return { user: safeUser, token: user.token }
}