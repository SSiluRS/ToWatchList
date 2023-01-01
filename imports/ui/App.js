import { Template } from 'meteor/templating';
import { MoviesCollection } from '../api/MovieCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import '../api/globalHelpers'

import './App.html';
import './Movie'
import "./Login.js";
import { WhiteListCollection } from '../api/WhiteListCollection';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const getMovieFilter = () => {
  const user = getUser();

  const hideSeenFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { hideSeenFilter, userFilter };

  return { userFilter, pendingOnlyFilter };
}

Template.mainContainer.helpers({
  movies() {
    const instance = Template.instance();
    const hideSeen = instance.state.get(HIDE_SEEN_STRING);
    const hideSeenFilter = { isChecked: { $ne: true } };
    if (!isUserLogged()) {
      return [];
    }

    const allowed_users = WhiteListCollection.findOne({ownerId:getUser()._id})['allowIds'];
    console.log(allowed_users)
    return MoviesCollection.find(hideSeen ? { isChecked: { $ne: true }, userId: {$in:allowed_users} } : {userId: {$in:allowed_users} }).fetch();
  },
  hideSeen() {
    return Template.instance().state.get(HIDE_SEEN_STRING);
  },
  addUser() {
    //Template.instance().add_user.set(!Template.instance().add_user.get())
    return Template.instance().add_user.get();
  },
  delUser() {
    //Template.instance().add_user.set(!Template.instance().add_user.get())
    return Template.instance().del_user.get();
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  }
});

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  
  this.state = new ReactiveDict();
  this.add_user = new ReactiveVar(false)
  this.del_user = new ReactiveVar(false)
});

const HIDE_SEEN_STRING = "hideSeen";
const ADD_USER_STRING = "addUser";

Template.mainContainer.events({
  "click #hide-seen-button"(event, instance) {
    const currentHideSeen = instance.state.get(HIDE_SEEN_STRING);
    instance.state.set(HIDE_SEEN_STRING, !currentHideSeen);
  },
  'click .user'() {
    Meteor.logout();
  },
  'click .add_user'(event, instance) {
    instance.add_user.set(true)
    instance.del_user.set(false)
  },
  'click .del_user'(event, instance) {
    instance.del_user.set(true)
    instance.add_user.set(false)
  },
  'click button[type=submit]'(e, instance) {
    e.preventDefault();

    if ($(e.target).prop('id') == 'add_user_back') {
      instance.add_user.set(false)

    }
    else if ($(e.target).prop('id') == 'del_user_back') {
      instance.del_user.set(false)
    }
    else if ($(e.target).prop('id') == 'add_user_submit') {
      const name = $(e.target).parents()['1'].name.value
      Meteor.call('add.user', name)
      //console.log(WhiteListCollection.find({}))
      $(e.target).parents()['1'].name.value = ''
      instance.add_user.set(false)

    }
    else if ($(e.target).prop('id') == 'del_user_submit') {
      const name = $(e.target).parents()['1'].name.value
      Meteor.call('delete.user', name)
      //console.log(WhiteListCollection.find({}))
      $(e.target).parents()['1'].name.value = ''
      instance.del_user.set(false)

    }
  }
});

Template.form.events({
  "submit .my_form"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value
    const type = target.type.value
    const genres = $(target.genre).val()

    // Insert a task into the collection
    Meteor.call('movie.insert', name, type, genres);


    // Clear form
    target.name.value = '';
  }
})