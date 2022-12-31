import {
  Meteor
} from 'meteor/meteor';
import {
  TypesCollection
} from '../imports/api/TypeCollection';
import {
  MoviesCollection
} from '/imports/api/MovieCollection';
import {
  Accounts
} from 'meteor/accounts-base';

const insertMovie = (movieName, typeId) => MoviesCollection.insert({
  name: movieName,
  typeId: typeId
})
const insertType = typeName => TypesCollection.insert({
  type: typeName
})

const SEED_USERNAME = 'SSiluRS';
const SEED_PASSWORD = 'Kirya3010t0';

Meteor.startup(() => {
  //Meteor.users.remove({username:"asdf"})
  //MoviesCollection.remove({})
  if (TypesCollection.find().count() === 0) {
    [
      'film',
      'series',
      'cartoon',
      'anime'
    ].forEach(insertType)
  }
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

});

Meteor.methods({
  'create.user'(username, password) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        password: password,
      });
    }
  }
})