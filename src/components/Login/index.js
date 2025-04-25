import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 360,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMes => {
    this.setState({showErrorMessage: true, errorMessage: errorMes})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMessage, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="wesite-logo"
          />
          <form onSubmit={this.submitForm} className="from-container">
            <div className="input-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                className="input"
                id="username"
                type="text"
                value={username}
              />
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                value={password}
                id="password"
                className="input"
                type="password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMessage ? (
              <p className="error-mes">*{errorMessage}</p>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
