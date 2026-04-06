interface GuidelineCardProps {
  guideline: {
    id: string
    title: string
    category: string
    content: string
    status: string
  }
}

export default function GuidelineCard({ guideline }: GuidelineCardProps) {
  return (
    <div className="guideline-card">
      <div className="card-header">
        <h3>{guideline.title}</h3>
        <span className={`status-badge status-${guideline.status}`}>
          {guideline.status}
        </span>
      </div>
      <div className="card-category">{guideline.category}</div>
      <div className="card-content">{guideline.content}</div>
    </div>
  )
}
