import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="auth-form">
      <div className="form-wrapper">
        <h1><i className="fa fa-rocket" aria-hidden="true"></i> Launchpad <span className="live">LIVE</span></h1>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" placeholder="Email"/>
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <div>
            <button type="submit" className="login-btn">
            {
              displayName === 'Login' ?
              <i className="fa fa-sign-in" aria-hidden="true"></i> :
              <i className="fa fa-user-plus" aria-hidden="true"></i>
            }
            &nbsp;{displayName}
            </button>
          </div>
          {error && error.response && <div className="error"> {error.response.data} </div>}
        </form>
        <a href="/auth/google"><i className="fa fa-google-plus social-login" aria-hidden="true"></i></a>
        <a href="/auth/facebook"><i className="fa fa-facebook social-login" aria-hidden="true"></i></a>
        <div className="sign-up">
          {displayName === 'Login' ?
          <p className="sign-up-text">Don't have an account? <Link to="/signup" className="sign-up-link">Sign Up!</Link></p> :
          <p className="sign-up-text">Already have an account? <Link to="/" className="sign-up-link">Login!</Link></p>
          }

        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}