import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Home extends Component {
  onClickExplore = () => {
    const { history } = this.props;
    history.replace("/products");
  };
  onClickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };
  onClickProducts = () => {
    const { history } = this.props;
    history.push("/products");
  };
  onClickProfile = () => {
    const { history } = this.props;
    history.push("/profile");
  };
  render() {
    return (
      <>
        <nav className="navbar">
          <img
            src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_640.png"
            alt="logo"
            className="logo-image"
          />
          <ul className="nav-items">
            <Link className="item">
              <li onClick={this.onClickProfile}>Profile</li>
            </Link>
            <Link className="item">
              <li onClick={this.onClickProducts}>Products</li>
            </Link>
            <Link className="item">
              <li onClick={this.onClickLogout}>Logout</li>
            </Link>
          </ul>
        </nav>
        <div className="main-container">
          <div className="matter-container">
            <h1 className="main-heading">Collection of Products</h1>
            <p className="description">
              We have a wide variety of products
              <br /> majorly the products that are
              <br />
              used daily and regularly.
              <br />
              Explore those products to find your
              <br />
              favourite ones.
            </p>
            <button className="explore-button" onClick={this.onClickExplore}>
              Explore Now
            </button>
          </div>
          <img
            src="https://i0.wp.com/www.gktoday.in/wp-content/uploads/2016/04/Product-in-Marketing.png?w=1140&ssl=1"
            className="product-image"
            alt="product"
          />
        </div>
      </>
    );
  }
}
export default Home;
