import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarjobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarjobDetails
  return (
    <li className="similarJob-card">
      <div className="similarJob-title-container">
        <img
          className="similarJob-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similarJob-title-rating-container">
          <h1 className="similarJob-title">{title}</h1>
          <div className="similarJob-rating-container">
            <FaStar className="star-icon" />
            <p className="similarJob-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similarJob-decription-heading">Description</h1>
      <p className="similarJob-description">{jobDescription}</p>
      <div className="similarJob-location-details">
        <div className="similarJob-icon-container">
          <MdLocationOn className="similarJob-icon" />
          <p className="similarJob-icon-text">{location}</p>
        </div>
        <div className="similarJob-icon-container">
          <BsBriefcaseFill className="similarJob-icon" />
          <p className="similarJob-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
