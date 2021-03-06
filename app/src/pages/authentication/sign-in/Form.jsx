import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { translate } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '../../../common/components/Button'
import { InputWithIcons } from '../../../common/components/Input'
import { isEmail } from '../../../utils'

const Form = styled.form`
  width: 300px;
  margin: auto
`

const Link = withTheme()(styled(RouterLink)`
  float: right;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme.palette.grey};
`)

const validate = (values) => {
  const errors = {}

  if (!values.email) errors.email = 'Required'
  else if (!isEmail(values.email)) errors.email = 'Wrong format'
  if (!values.password) errors.password = 'Required'
  
  return errors
}

class SignInForm extends Component {
  renderInput = ({ input, meta, placeholder, ...props }) => {
    const error = (meta.error && meta.touched && !meta.active) || false
    const isValid = !meta.error && meta.touched && !meta.active

    if (error) input.value = ''
    return (
      <InputWithIcons
        {...input}
        {...props}
        error={error}
        isValid={isValid}
        placeholder={error ? meta.error : placeholder}
      />
    )
  }

  handleSubmit = (values) => new Promise((resolve, reject) => this.props.dispatch({
    type: 'SIGNIN_FORM_SUBMIT',
    payload: { values, resolve, reject }
  }))

  render() {
    const { t } = this.props

    return (
      <Form className="form" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="columns">
          <div className="column">
            <Field
              name="email"
              icon="envelope"
              placeholder='Email'
              type="email"
              component={this.renderInput}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Field
              icon="lock"
              name="password"
              placeholder={t('password')}
              type="password"
              component={this.renderInput}
            />
            <Link to='/forgot-password'>{t('forgot_password_link_title')}</Link>
          </div>
        </div>
        <Button
          backgroundImage={this.props.theme.palette.mixGradient}
          type="submit"
          isLoading={this.props.submitting}
          isDisabled={this.props.submitting}
        >
          Sign In!
        </Button>
      </Form>
    )
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signIn',
  validate
})(translate()(withTheme()(SignInForm)))
