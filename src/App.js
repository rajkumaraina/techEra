import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import EachCourse from './components/EachCourse'
import NotFound from './components/notFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={EachCourse} />
    <Route component={NotFound} />
  </Switch>
)

export default App
