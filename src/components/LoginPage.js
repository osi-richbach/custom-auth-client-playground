import React, { Component } from 'react';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

class LoginPage extends Component {
  constructor(props, context) {
   super(props, context);

   this.state = {
    validating: false
  };
   this.login = this.login.bind(this);
   this.pushToValidationPage = this.pushToValidationPage.bind(this);
  }

  pushToValidationPage() {
    this.setState({validating: true});
  }

  login() {
    document.getElementById("code").value = '';
    let username = document.getElementById("name").value;
    var poolData = {
        UserPoolId : 'us-east-2_JDIuaVjlq',
        ClientId : '7ub8kdb6eaeiul3a07h27g4dfu'
    };
    var userPool = new CognitoUserPool(poolData);

    let pushToValidation = this.pushToValidationPage;

    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);

    //let password = 'YouAre#1';
    let password = document.getElementById("lname").value;
    var authenticationData = {
      Username : username,
      Password : password
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);
    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');
    cognitoUser.authenticateUserDefaultAuth(authenticationDetails, {
        onFailure: function() {          
           alert("Invalid username or password");
        },
        customChallenge: function() {
          //device challenge
          let challengeResponses;
            challengeResponses = cognitoUser.deviceKey ? cognitoUser.deviceKey : 'null';
            cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
                onSuccess: function() {
                    alert("Login Successful");
                    window.location.href = "http://www.google.com"
                },
                onFailure: function() {
                   alert("Invalid username or password");
                   window.location.href = "http://localhost:3000/login"
                },
                customChallenge: function() {
                    // User authentication depends on challenge response
                    let selfObject = this;
                    document.getElementById("validateButton").addEventListener("click", () => {
                      let challengeResponses = document.getElementById("code").value + " " + cognitoUser.deviceKey;
                      cognitoUser.sendCustomChallengeAnswer(challengeResponses, selfObject);
                    });
                    pushToValidation();
                    return;
                }
            });
        }
    });
  }

  render() {
    return (

      <div className="App">
        <div className="globalheader">
            <div className='cwscares'> CWS CARES </div>
        </div>
        <div className="logo">
            CWS-CARES
        </div>
        <div className="container" id="loginContainer">

          <div style={{display : (this.state.validating ? 'none' : 'inline')}}>
            <h2>Log in</h2>

            <label htmlFor="email">Email</label>
            <input type="text" id="name" name="email" defaultValue="ab3solutions+BKQA11@gmail.com"/><br/>

            <label htmlFor="email">Password</label>
            <input type="text" id="lname" name="password" defaultValue="YouAre#1"/><br/>


            <button type="button" onClick={this.login}>LOG IN</button>
          </div>

            <div style={{display : (this.state.validating ? 'inline' : 'none')}}>
              <h2>Verify Account</h2>
              <div className="container">
                  <span className="text">For additional security, we need to verify your account.</span>
                  <br/>
                  <br/>
                  <span className="text">We have sent a code to your email.</span>
                  <br/>
                  <br/>
                  <span className="text">Please enter the code below to complete verification.</span>
                  <br/>
                  <br/>
                  <label htmlFor="code">Enter Code</label>
                  <input type="text" id="code" name="code"/>
                  <button type="button" id="validateButton">Validate</button>
              </div>
            </div>
        </div>


      </div>
    );
  }
}

export default LoginPage;
