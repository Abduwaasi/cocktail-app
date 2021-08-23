import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h4>Oops...Page not found</h4>
        <Link to="/" className="btn-primary">
          Back home
        </Link>
      </div>
    </section>
  )
}

export default Error
