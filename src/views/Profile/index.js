import React from 'react';
import { userData } from '../../helpers/seed';
import Nav from '../../Componenets/Nav';
import Footer from '../../Componenets/Footer';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) this.props.history.replace("/login");
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      this.props.history.replace("/login");
      return false;
    }
    // Simulate API call for details for that user id
    const user = userData.filter(user => userId === user._id);
    if (!user.length) {
      this.props.history.replace("/login");
      return false;
    }
    this.setState(() => ({
      user: user[0],
      loading: false
    }));
  }
  
  render() {
    const { loading, user = {} } = this.state;
    return loading
    ? (<div>Loading...</div>)
    : (
        <div className="container profile">
          <Nav/>
          <div className="row no-gutters py-5 my-5">
            <div className="col-md-4">
              <img className="rounded-circle w-100 shadow" alt="profile" src={`https://joeschmoe.io/api/v1/${user.username}`} />
            </div>
            <div className="col-md-7 ml-auto profile-details">
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>Username</h5>
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>First name</h5>
                  <p>{user.firstName}</p>
                </div>
                <div className="mx-3">
                  <h5>Last name</h5>
                  <p>{user.lastName}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>Email</h5>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="mx-3">
                  <h5>Phone Number</h5>
                  <p>{user.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    )
  }
}

export default Profile
