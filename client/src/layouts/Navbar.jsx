import React from 'react'
import { Link} from 'react-router-dom'


const Navbar = () => {

  
  const username = localStorage.getItem('username')

  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">View Blogs</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/blog">Create Blog</Link>
      </li>
            
      <div className='profile'>
      <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {username}</a>
    <div className="dropdown-menu">
      <Link className="dropdown-item" to='/home'>Logout</Link> 
    </div>
</div>

    </ul>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar