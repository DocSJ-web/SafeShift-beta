import { useAuthStore } from '../store/authStore'
import { useGuidelinesStore } from '../store/guidelinesStore'
import GuidelineCard from '../components/GuidelineCard'

export default function Dashboard() {
  const { signOut } = useAuthStore()
  const { guidelines, loading } = useGuidelinesStore()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>SafeShift</h1>
        <button onClick={signOut} className="btn-secondary">
          Abmelden
        </button>
      </header>

      <main className="dashboard-content">
        <div className="content-header">
          <h2>Leitlinien</h2>
        </div>

        {loading ? (
          <div className="loading">Lädt Leitlinien...</div>
        ) : guidelines.length === 0 ? (
          <div className="empty-state">
            <p>Keine Leitlinien vorhanden</p>
          </div>
        ) : (
          <div className="guidelines-grid">
            {guidelines.map((guideline) => (
              <GuidelineCard key={guideline.id} guideline={guideline} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
