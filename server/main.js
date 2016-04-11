import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import addInitialUsers from './configs/initial_users.js';
import {Meteor} from 'meteor/meteor';

publications();
methods();
addInitialData();
addInitialUsers();
