import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-bg-container">
          <div className="text-container">
            <h1 className="main-heading">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link-text">
              <button type="button" className="home-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
