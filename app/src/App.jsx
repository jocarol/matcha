import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { I18nextProvider } from 'react-i18next'

import LogoutLayout from './Layouts/logout/LogoutLayout'
import LoggedLayout from './Layouts/logged/LoggedLayout'
import { history, muiTheme, i18n } from './config'
import { createStore } from './store'
import { IsLogout, IsLogged } from './hocs/components'

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MuiThemeProvider theme={muiTheme}>
            <Router history={history}>
              <Switch>
                <Route path="/dashboard" component={IsLogged(LoggedLayout)} />
                <Route path="/" component={IsLogout(LogoutLayout)} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default App