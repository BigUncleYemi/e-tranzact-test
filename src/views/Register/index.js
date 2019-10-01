import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Input from "../../Componenets/Input";
import { Link, Redirect } from 'react-router-dom';
import * as logo from '../../assets/images/logo.png';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      verifyEmail: "",
      verifyPhoneNumber: "",
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
    if(this.state.activeStep === 4 ) this.props.history.push("/");
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1
    }));
  }

  getStepContent() {
    const { activeStep, password, cPassword, verifyPhoneNumber, username, firstName, lastName, email, phoneNumber, verifyEmail } = this.state;
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
                if ("admini")
                  this.setState(() => ({ username: e.target.value }));
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
                this.setState(() => ({ firstName: e.target.value }));
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
                this.setState(() => ({ lastName: e.target.value }));
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
                this.setState(() => ({ email: e.target.value }));
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
                this.setState(() => ({ phoneNumber: e.target.value }));
              }}
              required
            />
          </div>
        )
      case 1:
        return(
          <div className="text-center">
            <Input
              type="text"
              label="Verify Email Address"
              value={verifyEmail}
              onChange={e => {
                e.persist();
                this.setState(() => ({ verifyEmail: e.target.value }));
              }}
              required
            />
          </div>
        )
      case 2:
        return (
          <div className="text-center">
            <Input
              type="text"
              label="Verify Phone Number"
              value={verifyPhoneNumber}
              onChange={e => {
                e.persist();
                this.setState(() => ({ verifyPhoneNumber: e.target.value }));
              }}
              required
            />
          </div>
        )
      case 3:
        return (
          <div>
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={e => {
                e.persist();
                this.setState(() => ({ password: e.target.value }));
              }}
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              value={cPassword}
              onChange={e => {
                e.persist();
                this.setState(() => ({ cPassword: e.target.value }));
              }}
              required
            />
          </div>
        )
      default:
        return;
    }
  }

  render() {
    const { activeStep } = this.state;

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
              <img src={logo} className="App-logo img-fluid px-3 d-block d-md-none" alt="logo" />
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
                    <p>Registration complete!</p>
                  </div>
                ) : (
                    <div className="d-flex flex-column">
                      <section className="my-4">{this.getStepContent()}</section>
                      <div className="d-flex flex-column align-items-center">
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