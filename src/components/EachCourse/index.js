import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const APIVIWES = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

class EachCourse extends Component {
  state = {courseDetails: [], view: APIVIWES.loading}

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      let updatedData = data.course_details
      updatedData = {
        id: updatedData.id,
        name: updatedData.name,
        imageUrl: updatedData.image_url,
        description: updatedData.description,
      }
      this.setState({courseDetails: updatedData, view: APIVIWES.success})
    } else {
      this.setState({view: APIVIWES.failure})
    }
  }

  retryButton = () => {
    this.getDetails()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

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
    const {courseDetails} = this.state
    const {id, name, imageUrl, description} = courseDetails
    return (
      <div className="container">
        <img src={imageUrl} alt={name} className="eachImage" />
        <div className="detailsContainer">
          <h1 className="eachHeading">{name}</h1>
          <p className="eachPara">{description}</p>
        </div>
      </div>
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
    return (
      <div className="MainContainer">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default EachCourse
