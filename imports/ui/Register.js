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
    async 'click button[type=submit]'(e, instance) {
        e.preventDefault();

        console.log('123')
        if ($(e.target).prop('id') == 'register-btn') {
            const username = $(e.target).parents()[1].username.value;
            const password = $(e.target).parents()[1].password.value;
            isCreated = false
            Meteor.call('create.user', username, password, function (error, result) {
                if (error) {
                    console.log(error.reason);
                    return;
                }
                if (result)
                    Meteor.loginWithPassword(username, password);
                else {
                    $(e.target).parents()[1].username.value = ''
                    $(e.target).parents()[1].password.value = ''
                    $($(e.target).parents()[1].username).attr("placeholder", 'Имя пользователя занято')
                }
            })


        } else if ($(e.target).prop('id') == 'back-btn') {
            instance.state.set(false)
        }
    }
});