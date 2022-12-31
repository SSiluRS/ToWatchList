import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import './Register.html';

Template.register.onCreated(function loginOnCreated() {

    this.state = Template.instance().view.parentView.parentView.templateInstance().state
});

Template.register.events({
    'click button[type=submit]'(e, instance) {
        e.preventDefault();

        console.log()
        if ($(e.target).prop('id') == 'register-btn') {
            const username = $(e.target).parents()[1].username.value;
            const password = $(e.target).parents()[1].password.value;
            Meteor.call('create.user', username, password)
            Meteor.loginWithPassword(username, password);
        } else if ($(e.target).prop('id') == 'back-btn') {
            instance.state.set(false)
        }
    }
});