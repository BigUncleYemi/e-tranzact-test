import React from 'react';
import { userData } from '../../helpers/seed';
import * as logo from '../../assets/images/logo.png';
import Input from "../../Componenets/Input";
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      errors: [],
      isLoggingIn: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { emailOrUsername, password } = this.state;
    this.setState(() => ({ isLoggingIn: true }));

    const errors = [];
    if (!emailOrUsername || !password) {
      if (!emailOrUsername) errors.push("It's compulsory you enter your email or username");
      if (!password) errors.push("It's compulsory you enter your password");
      this.setState(() => ({ isLoggingIn: false, errors }));
      return;
    }

    // Simulate API check
    const isRegistered = userData.filter(user => {
      return !!(
        [user.email.toLowerCase(), user.username.toLowerCase()].includes(emailOrUsername.toLowerCase())
        && user.password === password
      );
    });
    if (!isRegistered.length) {
      errors.push("Details entered not valid. Check and try again");
      this.setState(() => ({ isLoggingIn: false, errors }));
      return;
    }
    localStorage.setItem("userId", isRegistered[0]._id);

    // Simulate fetch admin details
    const adminUser = userData.find(user => user.username === "administrator");
    if ([adminUser.email.toLowerCase(), adminUser.username.toLowerCase()].includes(emailOrUsername.toLowerCase())) {
      localStorage.setItem("isAdmin", JSON.stringify(true));
      this.props.history.replace(`/dashboard`);
    } else {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      this.props.history.replace(`/profile`);
    }
  }

  render() {
    const { emailOrUsername, password, errors, isLoggingIn } = this.state;
    return (
      <div className="">
        <div className="row no-gutters">
          <div className="App col-md-5 p-0 d-none d-md-block">
            <header className="App-header">
              <img src={logo} className="App-logo img-fluid px-3" alt="logo" />
              <p className="text-italic" style={{ fontSize: 25 }}>
                Bridging the gap between bank and mobile.
          </p>
            </header>
          </div>
          <div className="col-md-7 p-0">
            <section className="h-100 d-flex flex-column justify-content-center mx-auto col-sm-7">
              <img src={logo} className="App-logo img-fluid px-3 d-block d-md-none  mt-5" alt="logo" />
              <h3 className="text-center mb-5">Welcome Back</h3>
              <form className="form mt-3" onSubmit={this.handleFormSubmit}>
                <Input
                  type="text"
                  label={"Username/Email"}
                  value={emailOrUsername}
                  placeholder="Your Email or Username"
                  onChange={e => {
                    e.persist();
                    this.setState(() => ({ emailOrUsername: e.target.value, errors: [] }));
                  }}
                  required
                />
                <Input
                  type="password"
                  label={"Password"}
                  value={password}
                  placeholder="Your Password"
                  onChange={e => {
                    e.persist();
                    this.setState(() => ({ password: e.target.value, errors: [] }));
                  }}
                  required
                />
                {errors.length !== 0 && 
                  <div className="alert alert-danger">
                    <ul>
                      {errors.map((error, index) => <li key={`error-${index}`}>{error}</li>)}
                    </ul>
                  </div>
                }
                <div className="d-flex py-4 w-100  flex-column align-items-center">
                  {!isLoggingIn ? (
                    <button className="mx-auto btn btn-outline-info" type="submit"> Login </button>
                  ) : (
                      <button className="mx-auto btn btn-outline-info" type="submit" disabled> Logging in... </button>
                    )}
                  <Link to="/signup" className="a my-3">or create an account.</Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
