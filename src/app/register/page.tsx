// FORGE — /register redirect
// Redirects to the canonical auth register page at /auth/register

import { redirect } from 'next/navigation'

export default function RegisterRedirect() {
  redirect('/auth/register')
}
