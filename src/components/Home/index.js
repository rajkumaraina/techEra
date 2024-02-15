import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const APIVIWES = {
  initial: 'Initial',
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

const EachItem = props => {
  const {item} = props
  const {id, name, logoUrl} = item
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="listItem">
        <img src={logoUrl} className="courseLogo" alt={name} />
        <p className="courseHeading">{name}</p>
      </li>
    </Link>
  )
}

class Home extends Component {
  state = {courses: [], view: APIVIWES.loading}

  componentDidMount = () => {
    this.getCourses()
  }

  getCourses = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({courses: updatedData, view: APIVIWES.success})
    } else {
      this.setState({view: APIVIWES.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryButton = () => {
    this.getCourses()
  }

  renderFailureView = () => (
    <div className="loading">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failureHeading">Oops! Something went wrong</h1>
      <p className="failurePara">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="failureButon" type="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courses} = this.state
    return (
      <>
        <Header />
        <h1 className="courses">Courses</h1>
        <ul className="unordered">
          {courses.map(each => (
            <EachItem item={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderView = () => {
    const {view} = this.state
    console.log(view)
    switch (view) {
      case APIVIWES.loading:
        return this.renderLoadingView()
      case APIVIWES.success:
        return this.renderSuccessView()
      case APIVIWES.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="MainContainer">{this.renderView()}</div>
  }
}
export default Home
