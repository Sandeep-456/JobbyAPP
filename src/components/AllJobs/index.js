import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  componentDidUpdate(prevProps) {
    const {selectedEmploymentType, selectedSalaryRange} = this.props
    if (
      prevProps.selectedEmploymentType !== selectedEmploymentType ||
      prevProps.selectedSalaryRange !== selectedSalaryRange
    ) {
      console.log('Props changed. Fetching new job list...')
      this.getJobDetails()
    }
  }

  clickRetyButton = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {selectedEmploymentType, selectedSalaryRange} = this.props
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const employmentTypeString = selectedEmploymentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobData = await response.json()
      const updatedJobData = jobData.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetailsList: updatedJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = () => {
    this.getJobDetails()
  }

  renderLoadingView = () => (
    <div className="allJobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsList} = this.state
    const showJobList = jobDetailsList.length > 0
    return showJobList ? (
      <ul className="all-jobList-container">
        {jobDetailsList.map(each => (
          <JobCard key={each.id} jobDetails={each} />
        ))}
      </ul>
    ) : (
      <div className="noJobs-container">
        <img
          className="noJobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="noJobs-heading">No Jobs Found</h1>
        <p className="noJobs-note">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
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
    const {apiStatus, searchInput} = this.state
    let renderContainer
    switch (apiStatus) {
      case apiStatusConstants.success:
        renderContainer = this.renderSuccessView()
        break
      case apiStatusConstants.inProgress:
        renderContainer = this.renderLoadingView()
        break
      case apiStatusConstants.failure:
        renderContainer = this.renderFailureView()
        break
      default:
        renderContainer = null
    }
    return (
      <div className="all-jobs-container">
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            onChange={this.onChangeInput}
            value={searchInput}
          />
          <button
            data-testid="searchButton"
            onClick={this.onClickButton}
            type="button"
            className="search-icon-container"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {renderContainer}
      </div>
    )
  }
}
export default AllJobs
