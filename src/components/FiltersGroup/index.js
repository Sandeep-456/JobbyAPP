import './index.css'

const FiltersGroup = props => {
  const {
    updateSalaryRange,
    updateEmploymentType,
    salaryRangesList,
    employmentTypesList,
  } = props

  const onChangeSalary = event => {
    updateSalaryRange(event.target.id)
  }

  const onChangeEmployementType = event => {
    const employmentTypeId = event.target.value
    const isChecked = event.target.checked
    updateEmploymentType(employmentTypeId, isChecked)
  }

  const renderSalaryListType = () => {
    console.log(salaryRangesList)
    return salaryRangesList.map(each => (
      <li key={each.salaryRangeId} className="list-item">
        <input
          type="radio"
          name="salary"
          value={each.salaryRangeId}
          id={each.salaryRangeId}
          onChange={onChangeSalary}
        />
        <label htmlFor={each.salaryRangeId} className="filter-text">
          {each.label}
        </label>
      </li>
    ))
  }

  const renderSalaryContainer = () => (
    <>
      <h1 className="list-heading">Salary Range</h1>
      <ul className="filter-list-container">{renderSalaryListType()}</ul>
    </>
  )

  const renderEmploymentListType = () => {
    console.log(employmentTypesList)
    return employmentTypesList.map(each => (
      <li key={each.employmentTypeId} className="list-item">
        <input
          type="checkbox"
          id={each.employmentTypeId}
          value={each.employmentTypeId}
          onChange={onChangeEmployementType}
        />
        <label htmlFor={each.employmentTypeId} className="filter-text">
          {each.label}
        </label>
      </li>
    ))
  }

  const renderEmployemntContainer = () => (
    <>
      <h1 className="list-heading">Type of Employment</h1>
      <ul className="filter-list-container">{renderEmploymentListType()}</ul>
    </>
  )

  return (
    <div className="filter-group-container">
      {renderEmployemntContainer()}
      <hr className="hr-line" />
      {renderSalaryContainer()}
    </div>
  )
}
export default FiltersGroup
