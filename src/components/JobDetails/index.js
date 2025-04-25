import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  clickRetyButton = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedData = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
        rating: jobDetails.rating,
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      const similarJobsdata = data.similar_jobs
      const updatedSimilarJobs = similarJobsdata.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const jobSkills = jobDetails.skills
      const updatedSkills = jobSkills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({
        jobDetails: updatedData,
        similarJobs: updatedSimilarJobs,
        skills: updatedSkills,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsContainer = skillProps => {
    const {name, imageUrl} = skillProps
    return (
      <li key={name} className="skill-card">
        <img src={imageUrl} alt={name} className="skill-img" />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  renderSuccessContainer = () => {
    const {jobDetails, similarJobs, skills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      rating,
      description,
      imageUrl,
    } = jobDetails
    return (
      <div>
        <Header />
        <div className="job-detials-container">
          <div className="job-details-topContainer">
            <div className="job-detials-title-container">
              <img
                className="job-detials-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job--details-title-rating-container">
                <h1 className="job-details-title">{title}</h1>
                <div className="job-details-rating-container">
                  <FaStar className="star-icon" />
                  <p className="job-details-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-short-bio-container">
              <div className="job-details-location-container">
                <div className="jobDetails-short-bio-icon-container">
                  <MdLocationOn className="job-details-icon" />
                  <p className="job-details-location">{location}</p>
                </div>
                <div className="jobDetails-short-bio-icon-container">
                  <BsBriefcaseFill className="job-details-icon" />
                  <p className="job-details-employment-type">
                    {employmentType}
                  </p>
                </div>
              </div>
              <p className="job-details-pakage">{packagePerAnnum}</p>
            </div>
            <hr className="job-card-hr-line" />
            <div>
              <div className="description-heading-container">
                <h1 className="job-details-card-decription-heading">
                  Description
                </h1>
                <div className="hyper-link-container">
                  <a
                    href={companyWebsiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hyper-link"
                  >
                    <p>Visit</p>
                    <RiShareBoxFill className="share-icon" />
                  </a>
                </div>
              </div>
              <p className="job-details-card-decription">{jobDescription}</p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skill-list-container">
              {skills.map(each => this.renderSkillsContainer(each))}
            </ul>
            <div className="comapny-description-container">
              <div className="company-text-container">
                <h1 className="description-heading">Life at Company</h1>
                <p className="company-description">{description}</p>
              </div>
              <img
                className="company-img"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="similarjob-heading">Similar Jobs</h1>
          <ul className="similarJob-container-list">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} similarjobDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingContainer = () => (
    <div className="jobDetails-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureContainer = () => (
    <div className="jobDetials-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobDetails-failure-view-img"
      />
      <h1 className="jobDetails-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobDetails-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.clickRetyButton}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoadingContainer()
      case apiStatusConstants.failure:
        return this.renderFailureContainer()
      default:
        return null
    }
  }
}

export default JobDetails
