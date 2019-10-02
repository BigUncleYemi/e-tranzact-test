import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Input from "../../Componenets/Input";
import { Link, Redirect } from 'react-router-dom';
import * as logo from '../../assets/images/logo.png';
import { userData } from '../../helpers/seed';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      emailCode: "",
      phoneNumberCode: "",
      validEmailCode: "",
      validPhoneNumberCode: "",
      password: "",
      confirmPassword: "",
      errors: []
    }

    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }

  handleBack() {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep - 1
    }));
  }

  handleNext() {
    const { activeStep } = this.state;
    
    const errors = [];
    if (activeStep === 0) {
      const { username, firstName, lastName, email, phoneNumber } = this.state;

      if (username.toLowerCase() === "administrator") {
        errors.push(`Word "administrator" is reserved, please use a different username.`);
      }
      if (!username || !firstName || !lastName || !email || !phoneNumber) {
        errors.push(`All fields are required, please fill in the empty fields.`);
      }
      if (errors.length){
        this.setState(() => ({ errors }));
        return;
      } else {
        this.setState(() => ({
          validEmailCode: Date.now().toString().slice(-9, -3),
          validPhoneNumberCode: Date.now().toString().slice(-7, -1)
        }));
      }
    } else if (activeStep === 1) {
      const { emailCode, validEmailCode } = this.state;
      if (!emailCode) errors.push("Please enter the verification code");
      if (emailCode && (emailCode !== validEmailCode)) errors.push("Verification code incorrect!");
      if (errors.length){
        this.setState(() => ({ errors }));
        return;
      }
    } else if (activeStep === 2) {
      const { phoneNumberCode, validPhoneNumberCode } = this.state;
      if (!phoneNumberCode) errors.push("Please enter the verification code");
      if (phoneNumberCode && (phoneNumberCode !== validPhoneNumberCode)) {
        errors.push("Verification code incorrect!");
      }
      if (errors.length){
        this.setState(() => ({ errors }));
        return;
      }
    } else if (activeStep === 3) {
      const { password, confirmPassword, username, firstName, lastName, email, phoneNumber } = this.state;
      if (!password) errors.push("Please enter a password");
      if (password.length < 6) errors.push("Please enter six or more characters for the password");
      if (!confirmPassword) errors.push("Please confirm the password");
      if ((password && confirmPassword) && (password !== confirmPassword)) {
        errors.push("Passwords don't match");
      }
      if (errors.length){
        this.setState(() => ({ errors }));
        return;
      }
      userData.push({
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        _id: `hpc2erfc9rf83eq${Date.now().toString().slice(-6, -1)}`
      });
    }

    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1
    }));
  }

  getStepContent() {
    const { activeStep, username, firstName, lastName, email, phoneNumber } = this.state;
    switch (activeStep) {
      case 0:
        return (
          <div>
            <Input
              type="text"
              label="Username"
              value={username}
              placeholder="Username"
              onChange={e => {
                e.persist();
                this.setState(() => ({ username: e.target.value, errors: [] }));
              }}
              required
            />
            <Input
              type="text"
              label="First Name"
              value={firstName}
              placeholder="First Name"
              onChange={e => {
                e.persist();
                this.setState(() => ({ firstName: e.target.value, errors: [] }));
              }}
              required
            />
            <Input
              type="text"
              label="Last Name"
              value={lastName}
              placeholder="Last Name"
              onChange={e => {
                e.persist();
                this.setState(() => ({ lastName: e.target.value, errors: [] }));
              }}
              required
            />
            <Input
              type="email"
              label="Email Address"
              value={email}
              placeholder="Email Address"
              onChange={e => {
                e.persist();
                this.setState(() => ({ email: e.target.value, errors: [] }));
              }}
              required
            />
            <Input
              type="telephone"
              label="Phone Number"
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={e => {
                e.persist();
                this.setState(() => ({ phoneNumber: e.target.value, errors: [] }));
              }}
              required
            />
          </div>
        )
      case 1:
        const { emailCode, validEmailCode } = this.state;
        return (
          <React.Fragment>
            <p>(Code is {validEmailCode})</p>
            <div>
              <Input
                type="text"
                label="Email verification code (sent to email address provided)"
                value={emailCode}
                placeholder="Verification Code"
                onChange={e => {
                  e.persist();
                  this.setState(() => ({ emailCode: e.target.value, errors: [] }));
                }}
                required
              />
            </div>
          </React.Fragment>
        )
      case 2:
        const { phoneNumberCode,validPhoneNumberCode } = this.state;
        return (
          <React.Fragment>
            <p>(Code is {validPhoneNumberCode})</p>
            <div>
              <Input
                type="text"
                label="Phone verification code (sent to phone number provided)"
                value={phoneNumberCode}
                placeholder="Verification Code"
                onChange={e => {
                  e.persist();
                  this.setState(() => ({ phoneNumberCode: e.target.value, errors: [] }));
                }}
                required
              />
            </div>
          </React.Fragment>
        )
      case 3:
        const { password, confirmPassword } = this.state;
        return (
          <div>
            <Input
              type="password"
              label="Choose a password"
              value={password}
              placeholder="Password"
              onChange={e => {
                e.persist();
                this.setState(() => ({ password: e.target.value, errors: [] }));
              }}
              required
            />
            <Input
              type="password"
              label="Confirm password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={e => {
                e.persist();
                this.setState(() => ({ confirmPassword: e.target.value, errors: [] }));
              }}
              required
            />
          </div>
        )
      default:
        return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeStep } = this.state;
    if (activeStep === 4) {
      setTimeout(() => {
        this.props.history.replace("/");
      }, 3000);
    }
  }

  render() {
    const { activeStep, errors } = this.state;

    return (
      <div className="">
        {activeStep === 4 && <Redirect to="/" /> }
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
              <img src={logo} className="App-logo img-fluid px-3 d-block d-md-none mt-5" alt="logo" />
              <h3 className="text-center mb-2">Create an account</h3>
              <Stepper activeStep={activeStep} alternativeLabel>
                {["Basic Details", "Verify Email", "Verify Phone Number", "Secure account"].map((item, key) =>
                  <Step key={key}>
                    <StepLabel>{item}</StepLabel>
                  </Step>
                )}
              </Stepper>
              <div>
                {activeStep === 4 ? (
                  <div className="done">
                    <h1>Done!</h1>
                    <p>Registration complete! You'll soon be redirected to log in to your new account</p>
                  </div>
                ) : (
                    <div className="d-flex flex-column">
                      <section className="my-4">{this.getStepContent()}</section>
                      <div className="d-flex flex-column align-items-center">
                        {errors.length !== 0 && 
                          <div className="alert alert-danger">
                            <ul>
                              {errors.map((error, index) => <li key={`error-${index}`}>{error}</li>)}
                            </ul>
                          </div>
                        }
                        <div className="d-flex justify-content-center w-75 justify-content-between">
                          <Button disabled={activeStep === 0} onClick={this.handleBack}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                          >
                            {activeStep === 0 ? 'Save' : activeStep === 3 ? 'Register' : 'Verify' }
                          </Button>
                        </div>
                        <Link to="/" className="a my-3">or sign in.</Link>
                      </div>
                    </div>
                  )}
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}
