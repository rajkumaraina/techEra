import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="NotFoundContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notFound"
      />
      <h1 className="notFoundHeading">Page Not Found</h1>
      <p className="notfoundPara">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
