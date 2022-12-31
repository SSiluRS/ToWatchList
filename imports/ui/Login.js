import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
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

        console.log()
        if ($(e.target).prop('id') == 'login-btn') {
            const username = $(e.target).parents()[1].username.value;
            const password = $(e.target).parents()[1].password.value;
            Meteor.loginWithPassword(username, password);
        } else if($(e.target).prop('id') == 'register-btn') {
            instance.state.set(true)
        }
    }
});