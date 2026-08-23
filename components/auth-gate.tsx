'use client'

import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  reload,
  type User,
} from 'firebase/auth'
import { Leaf, MailCheck, RefreshCw, LogOut } from 'lucide-react'
import { auth } from '@/lib/firebase'

function friendlyError(code?: string) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setLoading(false)
  }), [])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')
    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await sendEmailVerification(result.user)
        setMessage('Verification email sent. Check your inbox and verify your email before continuing.')
      } else {
        const result = await signInWithEmailAndPassword(auth, email.trim(), password)
        await reload(result.user)
        if (!result.user.emailVerified) {
          await signOut(auth)
          setUser(null)
          setMessage('Please verify your email first. We signed you out until verification is complete.')
        }
      }
    } catch (err) {
      setError(friendlyError((err as { code?: string }).code))
    }
  }

  async function resendVerification() {
    if (!user) return
    setRefreshing(true)
    setError('')
    setMessage('')
    try {
      await sendEmailVerification(user)
      setMessage('A new verification email has been sent.')
    } catch (err) {
      setError(friendlyError((err as { code?: string }).code))
    } finally {
      setRefreshing(false)
    }
  }

  async function checkVerification() {
    if (!user) return
    setRefreshing(true)
    setError('')
    setMessage('')
    try {
      await reload(user)
      if (user.emailVerified) {
        setMessage('Email verified successfully.')
      } else {
        setMessage('Your email is not verified yet. Open the verification email, then try again.')
      }
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading NeemPure...</div>

  if (user && !user.emailVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <section className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><MailCheck /></div>
          <h1 className="mt-5 text-center text-2xl font-extrabold">Verify your email</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">We sent a verification link to <strong>{user.email}</strong>.</p>
          {message && <p className="mt-4 rounded-xl bg-primary/10 p-3 text-sm">{message}</p>}
          {error && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm">{error}</p>}
          <div className="mt-6 grid gap-3">
            <button onClick={checkVerification} disabled={refreshing} className="rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground">{refreshing ? 'Checking...' : 'I verified my email'}</button>
            <button onClick={resendVerification} disabled={refreshing} className="rounded-xl border px-4 py-3 font-semibold">Resend verification email</button>
            <button onClick={() => signOut(auth)} className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"><LogOut className="size-4" /> Sign out</button>
          </div>
        </section>
      </main>
    )
  }

  if (user?.emailVerified) return <>{children}</>

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Leaf /></div>
        <h1 className="mt-5 text-center text-3xl font-extrabold">Welcome to Neem<span className="text-primary">Pure</span></h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Verify your email to access NeemPure.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email address" className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} placeholder="Password" className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          {error && <p className="rounded-xl bg-destructive/10 p-3 text-sm">{error}</p>}
          {message && <p className="rounded-xl bg-primary/10 p-3 text-sm">{message}</p>}
          <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground">{mode === 'signin' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage('') }} className="mt-5 w-full text-center text-sm font-semibold text-primary">
          {mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </section>
    </main>
  )
}
