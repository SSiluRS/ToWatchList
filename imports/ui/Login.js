import {    Meteor} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
import { WhiteListCollection } from '../api/WhiteListCollection';
import './Login.html';
import './Register.js'

Template.login.onCreated(function loginOnCreated() {
    this.state = new ReactiveVar(false);
});


Template.login.helpers({
    isRegister() {
        return !(Template.instance().state.get())
    }
})

Template.login.events({
    'click button[type=submit]'(e, instance) {
        e.preventDefault();

        if ($(e.target).prop('id') == 'login-btn') {
            const username = $(e.target).parents()[1].username.value;
            const password = $(e.target).parents()[1].password.value;
            
            console.log(WhiteListCollection.find({}))
            Meteor.loginWithPassword(username, password);
        } else if($(e.target).prop('id') == 'register-btn') {
            instance.state.set(true)
        }
    }
});