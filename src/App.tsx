import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { ContextProvider } from './contexts/contextProvider';
import { Home } from './templates/home'

const client = new QueryClient()

class App extends React.PureComponent {
  render() {
    return (
      <QueryClientProvider client={client}>
        <ContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/empregos/formais" component={Home} />
              <Redirect from='/' to="/empregos/formais"/>
              <Redirect from='*' to="/empregos/formais"/>
            </Switch>
          </BrowserRouter>
        </ContextProvider>
      </QueryClientProvider>
    )
  }
}

export default App