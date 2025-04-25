import {Component} from 'react'

import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import AllJobs from '../AllJobs'
import './index.css'

class Job extends Component {
  state = {selectedEmploymentType: [], selectedSalaryRange: ''}

  updateEmploymentType = (employmentTypeId, isChecked) => {
    this.setState(prev => ({
      selectedEmploymentType: isChecked
        ? [...prev.selectedEmploymentType, employmentTypeId]
        : prev.selectedEmploymentType.filter(id => id !== employmentTypeId),
    }))
  }

  updateSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId})
  }

  render() {
    const {selectedEmploymentType, selectedSalaryRange} = this.state
    const {employmentTypesList, salaryRangesList} = this.props
    console.log(selectedEmploymentType, selectedSalaryRange)
    return (
      <div>
        <Header />
        <div className="job-bg-container">
          <div className="job-left-container">
            <Profile />
            <hr className="hr-line" />
            <FiltersGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              updateEmploymentType={this.updateEmploymentType}
              updateSalaryRange={this.updateSalaryRange}
            />
          </div>
          <div className="job-right-container">
            <AllJobs
              selectedEmploymentType={selectedEmploymentType}
              selectedSalaryRange={selectedSalaryRange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Job
