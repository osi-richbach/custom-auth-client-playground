import React, { Component } from 'react';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import qs from 'query-string';
import LoginForm from './LoginForm';
import MfaForm from './MfaForm';

class LoginPage extends Component {
  constructor(props, context) {
   super(props, context);

   this.state = {
    validating: false,
    errorMsg: undefined,
    email: '',
    password: '',
    code: ''
  };
   this.login = this.login.bind(this);
   this.validate = this.validate.bind(this);
   this.showValidationArea = this.showValidationArea.bind(this);
   this.showError = this.showError.bind(this);
   this.updateEmailState = this.updateEmailState.bind(this);
   this.updatePasswordState = this.updatePasswordState.bind(this);
   this.updateCodeState = this.updateCodeState.bind(this);
  }

  updateCodeState(event) {
    this.setState({
      code: event.target.value
    });
  }

  updateEmailState(event) {
    this.setState({
      email: event.target.value
    });
  }

  updatePasswordState(event) {
    this.setState({
      password: event.target.value
    });
  }

  showValidationArea(maskedEmail) {
    this.setState({
      validating: true,
      maskedEmail: maskedEmail
    });
  }

  showError(msg) {
    this.setState({
      validating: false,
      maskedEmail: undefined,
      errorMsg: msg,
      email: '',
      password: ''
    });
  }

  validate() {
    let cognitoUser = this.state.cognitoUser;

    let challengeResponses = this.state.code + " " + cognitoUser.deviceKey;
    let showError = this.showError;
    cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
      onSuccess: function() {
        //TODO - this is where the integration with Perry is.
        const parsed = qs.parse(location.search);
        //FOR NOW JUST SEND TO PAGE
        //INTEGRATION WITH PERRY WILL BE A REST CALL WITH RESULT
          window.location.href = parsed.redirect_uri;
      },
      onFailure: function() {
        showError("Unable to verify account");
      }
    });
  }

  cognitoUser() {
    let username = this.state.email;
    var poolData = {
        UserPoolId : 'us-east-2_JDIuaVjlq',
        ClientId : '7ub8kdb6eaeiul3a07h27g4dfu'
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    return new CognitoUser(userData);
  }

  authenticationDetails() {
    var authenticationData = {
      Username : this.state.email,
      Password : this.state.password
    };

    return new AuthenticationDetails(authenticationData);
  }

  login() {
    let showValidationArea = this.showValidationArea;
    let showError = this.showError;

    let cognitoUser = this.cognitoUser();
    this.setState({
      cognitoUser: cognitoUser
    })
    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');
    let authenticationDetails = this.authenticationDetails();
    cognitoUser.authenticateUserDefaultAuth(authenticationDetails, {
        onFailure: function(err) { 
          if(err.code === 'InvalidParameterException') {
            showError('Email is required');
          } else {
           showError(err.message);         
          }
        },
        customChallenge: function() {
          //device challenge
          let challengeResponses;
            challengeResponses = cognitoUser.deviceKey ? cognitoUser.deviceKey : 'null';
            cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
                onFailure: function(err) {
                  showError(err.message);
                },
                customChallenge: function(challengeParameters) {
                    showValidationArea(challengeParameters.maskedEmail);
                    return;
                }
            });
        }
    });
  }

  render() {
    if( !this.state.validating ) {
      return (
      <LoginForm 
        onSubmit={this.login}
        errorMsg={this.state.errorMsg}
        email={this.state.email}
        password={this.state.password}
        onEmailChange={this.updateEmailState}
        onPasswordChange={this.updatePasswordState} /> );
    } else {
      return (
      <MfaForm 
        maskedEmail={this.state.maskedEmail}
        code={this.state.code}
        onCodeChange={this.updateCodeState}
        onValidate={this.validate}/> );
    }
  }
}

export default LoginPage;
