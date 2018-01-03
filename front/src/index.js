import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { Router, Route } from 'react-router-dom'
import history from './history'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/main" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
