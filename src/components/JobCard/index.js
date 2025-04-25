import {Link} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import {Component} from 'react'

import './index.css'

class JobCard extends Component {
  render() {
    const {jobDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = jobDetails
    return (
      <li className="job-card">
        <Link to={`/jobs/${id}`} className="link-text">
          <div className="job-title-container">
            <img className="job-logo" src={companyLogoUrl} alt="company logo" />
            <div className="job-title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <FaStar className="star-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-short-bio-container">
            <div className="job-location-container">
              <div className="job-short-bio-icon-container">
                <MdLocationOn className="job-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="job-short-bio-icon-container">
                <BsBriefcaseFill className="job-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="pakage">{packagePerAnnum}</p>
          </div>
          <hr className="job-card-hr-line" />
          <div>
            <h1 className="job-card-decription-heading">Description</h1>
            <p className="job-card-decription">{jobDescription}</p>
          </div>
        </Link>
      </li>
    )
  }
}

export default JobCard
