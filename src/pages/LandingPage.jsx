import { useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard.jsx'

function LandingPage() {
  const navigate = useNavigate()

  function handleApplyClick() {
    navigate('/apply')
  }

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Welcome to HireHub</h1>
          <p className="hero-subtitle">
            Your gateway to exciting career opportunities. Join our team and be part of something extraordinary.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={handleApplyClick}>
              Express Your Interest
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why Join Us?</h2>
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <FeatureCard
            icon="💡"
            title="Innovation"
            description="Work on cutting-edge projects that push the boundaries of technology and creativity."
          />
          <FeatureCard
            icon="🚀"
            title="Career Growth"
            description="Accelerate your career with mentorship programs, learning opportunities, and clear advancement paths."
          />
          <FeatureCard
            icon="🤝"
            title="Great Culture"
            description="Join a diverse and inclusive team that values collaboration, respect, and work-life balance."
          />
          <FeatureCard
            icon="🌍"
            title="Global Impact"
            description="Make a difference on a global scale by contributing to projects that reach millions of users worldwide."
          />
        </div>
      </section>

      <section className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Ready to Get Started?</h2>
          <p className="hero-subtitle">
            Take the first step towards an amazing career. Express your interest today and our team will be in touch.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={handleApplyClick}>
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage