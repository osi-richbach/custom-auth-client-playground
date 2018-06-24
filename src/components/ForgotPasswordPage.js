import React, { Component } from 'react';
import * as Auth from '../utils/Auth';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

//TODO - redirect_uri on the url?  save it to state
class ForgotPasswordPage extends Component {
  constructor(props, context) {
   super(props, context);

   this.state = {
    reseting: false,
    email: '',
    errorMsg: undefined
  };
   this.showResetArea = this.showResetArea.bind(this);
   this.showError = this.showError.bind(this);
   this.updateEmailState = this.updateEmailState.bind(this);
   this.onEmailSubmit = this.onEmailSubmit.bind(this);
   this.updateCodeState = this.updateCodeState.bind(this);
   this.updateNewPasswordState = this.updateNewPasswordState.bind(this);
   this.updateConfirmPasswordState = this.updateConfirmPasswordState.bind(this);
   this.changePassword = this.changePassword.bind(this);
   this.mask = this.mask.bind(this);
  }

  mask(email) {
    return email.replace(/^(.)(.*)(.@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '*') + c
    );
  }

  onEmailSubmit() {
    let showResetArea = this.showResetArea;
    let showError = this.showError;
    let cognitoUser = Auth.createUser(this.state);
    this.setState({
      cognitoUser: cognitoUser
    });
 

    cognitoUser.forgotPassword({
      onFailure: function(err) {
        if(err.code === 'InvalidParameterException') {
          showError('Email is required');
        } else {
          showError(err.message);         
        }
      },
      inputVerificationCode() {
        showResetArea();
      }
  });
    
  }

  updateEmailState(event) {
    this.setState({
      email: event.target.value
    });
  }

  updateCodeState(event) {
    this.setState({
      code: event.target.value
    });
  }

  updateNewPasswordState(event) {
    this.setState({
      new_password: event.target.value
    });
  }

  updateConfirmPasswordState(event) {
    this.setState({
      confirm_password: event.target.value
    });
  }

  showResetArea() {
    this.setState({
      errorMsg: '',
      reseting: true,
      email: this.mask(this.state.email),
      code: '',
      new_password: '',
      confirm_password: ''
    });
  }

  showError(msg) {
    this.setState({
      errorMsg: msg
    });
  }

  changePassword() {
    let showError = this.showError;
    let cognitoUser = this.state.cognitoUser;
    let props = this.props;
    switch (this.state.confirm_password) {
      case this.state.new_password:
        cognitoUser.confirmPassword(this.state.code, this.state.new_password, {
          onSuccess: function() {
            props.history.push("/login");
          },
          onFailure: function(err) {
            showError(err.message);
          }
        });
        break;
      default: {
        this.setState({
          code: '',
          new_password: '',
          confirm_password: ''
        });
        showError("Passwords do not match");
      }
    }
  }

  render() {
    if( this.state.reseting ) {
      return (
      <ResetPasswordForm 
        email={this.state.email}
        errorMsg={this.state.errorMsg}
        code={this.state.code}
        new_password={this.state.new_password}
        confirm_password={this.state.confirm_password}
        onCodeChange={this.updateCodeState}
        onNewPasswordChange={this.updateNewPasswordState}
        onConfirmPasswordChange={this.updateConfirmPasswordState}
        onSubmit={this.changePassword}/> );
    } else {
      return (
        <ForgotPasswordForm 
          errorMsg={this.state.errorMsg}
          email={this.state.email}
          onChange={this.updateEmailState}
          onSubmit={this.onEmailSubmit}/> );
    }
  }
}

export default ForgotPasswordPage;
