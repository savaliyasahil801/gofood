import React from 'react'
import { Link } from 'react-router-dom'
// import { Footer } from 'react-bootstrap';   

const Footer = () => {
  return (
    <div>
      <footer bg="light" className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <div className='col-md-4 d-flex align-items-center'>
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">

          </Link>
          <span className="mb-3 mb-md-0 text-light"> © 2025 GoFood, Inc</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
