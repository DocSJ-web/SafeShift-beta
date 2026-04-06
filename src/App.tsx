import { useEffect, useState } from 'react'
import { useAuthStore } from './store/authStore'
import { useGuidelinesStore } from './store/guidelinesStore'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { user, loading, initialize } = useAuthStore()
  const { fetchGuidelines } = useGuidelinesStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initialize().catch(err => {
      console.error('Initialize error:', err)
      setError(err.message)
    })
  }, [initialize])

  useEffect(() => {
    if (user) {
      fetchGuidelines().catch(err => {
        console.error('Fetch guidelines error:', err)
      })
    }
  }, [user, fetchGuidelines])

  if (error) {
    return (
      <div className="loading-screen">
        <h2>Fehler beim Laden</h2>
        <p>{error}</p>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>Die Datenbank ist verbunden, aber es gab ein Problem beim Initialisieren.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Lädt SafeShift...</p>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginPage />
}
