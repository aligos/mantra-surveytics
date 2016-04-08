import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import axios from 'axios';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';

publications();
methods();
addInitialData();

  FlowRouter.route('/api/:username/:password', {
    name: 'api.login',
    action() {
    	var apikey = '5QTa1JtgBCtLn4BzeDWz';
    	axios.get(`http://member.surveytics.com/api/check-access/by-login-pass?_key=${apikey}&login=${username}&pass=${password}`)
    	  .then((amemberauth) => (console.log(amemberauth.data.ok)))
    }
  });