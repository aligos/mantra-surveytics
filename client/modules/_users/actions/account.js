// import {Accounts} from 'meteor/meteor';
import axios from 'axios';
import cors from 'cors';


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

    axios.get(`http://localhost:8000/api/${username}/${password}`)
      .then((amemberauth) => {
        const loginaMember = amemberauth.data.ok;
        const errMsg = amemberauth.data.msg;
        const username = amemberauth.data.login;
        const email = amemberauth.data.email;
        const firstName = amemberauth.data.name_f;
        const lastName = amemberauth.data.name_l;
        var subs = [];
        if (amemberauth.data.subscriptions === undefined) {
          const json = '{ "employees" : "indro" }';  
          console.log(json);
          subs.push(json);
        } else {
          const json = amemberauth.data.subscriptions;
          subs.push(json);
        }
        
        console.log(subs);
        replacer = (key, value) => {
          if (key == 1) return true;
          else if (key == 2) return true;
          else if (key == 3) return true;
          else return value;
        }
        const substring = JSON.stringify(subs[0], replacer);
        console.log(substring);
        const pavs = JSON.parse(substring);
        console.log(pavs);
        const products = subs[0];
        if ( loginaMember === true ) {
          // FlowRouter.go('/');
          Meteor.call('isUsernameAvailable', username, function(error, result) {
            if (error) {
              Accounts.createUser({username, password, email, profile: {firstName: firstName, lastName: lastName, lumba: false, fiver: false, shark: false}}, (err) => {
                if (err && err.reason) {
                  return LocalState.set('REGISTER_ERROR', err.reason);
                }
                FlowRouter.go('/');
              });
            } 
            Meteor.loginWithPassword(username, password, (err) => {
              if (err && err.reason) {
                return LocalState.set('LOGIN_ERROR', err.reason);
              }
              //FlowRouter.go('/account');
              if (Meteor.user().profile.lumba == false) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.lumba": pavs[1]}});
              } else if (pavs[1] !== true) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.lumba": false}});
              }
              if (Meteor.user().profile.fiver == false) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.fiver": pavs[2]}});
              } else if (pavs[2] !== true) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.fiver": false}});
              }
              if (Meteor.user().profile.shark == false) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.shark": pavs[3]}});
              } else if (pavs[3] !== true) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.shark": false}});
              }
              Meteor.connectWithFacebook();
            });
          });
        } else if ( loginaMember === false ) {
          return LocalState.set('LOGIN_ERROR', errMsg);
        }
      })
    
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
