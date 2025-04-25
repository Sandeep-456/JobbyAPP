import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-bg-container">
      <div className="header-image-container">
        <Link to="/" className="link-text" data-testid="homeLink">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-wesite-logo"
          />
        </Link>
      </div>
      <ul className="list-container">
        <li className="list-text">
          <Link to="/" className="link-text" data-testid="homeLink">
            Home
          </Link>
        </li>

        <li className="list-text">
          <Link to="/jobs" className="link-text" data-testid="jobsLink">
            Jobs
          </Link>
        </li>
        <li className="logOut-btn-conatiner">
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
            data-testid="logoutButton"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
