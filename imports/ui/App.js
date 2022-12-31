import { Template } from 'meteor/templating';
import { MoviesCollection } from '../api/MovieCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../api/globalHelpers'
 
import './App.html';
import './Movie'
import "./Login.js";

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
  movies(){
    const instance = Template.instance();
    const hideSeen = instance.state.get(HIDE_SEEN_STRING);
    const hideSeenFilter = { isChecked: { $ne: true } };
    if (!isUserLogged()) {
      return [];
    }

    const user_ = getUser();
    return MoviesCollection.find(hideSeen ? {isChecked: { $ne: true }/*, userId: user_._id */} : {/*userId: user_._id*/}).fetch();
  },
  hideSeen() {
    return Template.instance().state.get(HIDE_SEEN_STRING);
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
});

const HIDE_SEEN_STRING = "hideSeen";

Template.mainContainer.events({
  "click #hide-seen-button"(event, instance) {
    const currentHideSeen = instance.state.get(HIDE_SEEN_STRING);
    instance.state.set(HIDE_SEEN_STRING, !currentHideSeen);
  },  
  'click .user'() {
    Meteor.logout();
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

    // Insert a task into the collection
    MoviesCollection.insert({
      name,
      typeId: type,
      userId: getUser()._id
    });

    // Clear form
    target.name.value = '';
  }
})