// import {Accounts} from 'meteor/meteor';
import axios from 'axios';

export default {

  login({Meteor, LocalState, FlowRouter}, username, password) {

    if (!username || !password) {
      return LocalState.set('LOGIN_ERROR', 'Username & Password are required!');
    }

    LocalState.set('LOGIN_ERROR', null);

    // Meteor.loginWithPassword(email, password, (err) => {
    //   if (err && err.reason) {
    //     return LocalState.set('LOGIN_ERROR', err.reason);
    //   }
    //   FlowRouter.go('/account');
    // });

    var apikey = 'toWQyQh1GMfjIQLx7dqc';
    axios.get(`http://member.penjajahfb.com/api/check-access/by-login-pass?_key=${apikey}&login=${username}&pass=${password}`)
      .then((amemberauth) => (console.log(amemberauth.data.ok)))
  },

  loginErrorClear({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  },

  register({Meteor, LocalState, FlowRouter}, email, password1, password2) {

    if (!email || !password1 || !password2) {
      return LocalState.set('REGISTER_ERROR', 'Please fill out all the required fileds!');
    }

    if (password1 !== password2 ) {
      return LocalState.set('REGISTER_ERROR', 'Passwords do not match!');
    }

    Accounts.createUser({email, password: password1}, (err) => {
      if (err && err.reason) {
        return LocalState.set('REGISTER_ERROR', err.reason);
      }
      FlowRouter.go('/home');
    });
  },

  registerErrorClear({LocalState}) {
    return LocalState.set('REGISTER_ERROR', null);
  },

};
