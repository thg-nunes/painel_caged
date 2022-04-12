import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './contexts/contextProvider';
import { Home } from './templates/home'

class App extends React.PureComponent {
  render() {
    return (
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/empregos/formais" component={Home} />
            <Redirect from='/' to="/empregos/formais"/>
            <Redirect from='*' to="/empregos/formais"/>
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    )
  }
}

export default App