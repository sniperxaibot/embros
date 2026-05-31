// FORGE — /login redirect
// Redirects to the canonical auth login page at /auth/login

import { redirect } from 'next/navigation'

export default function LoginRedirect() {
  redirect('/auth/login')
}
