import {AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

export function createUser(state) {
    let username = state.email;
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

export function authenticationDetails(state) {
    var authenticationData = {
      Username : state.email,
      Password : state.password
    };

    return new AuthenticationDetails(authenticationData);
}