import {  Meteor} from 'meteor/meteor';
import {  TypesCollection} from '../imports/api/TypeCollection';
import {  MoviesCollection} from '/imports/api/MovieCollection';

import '../imports/api/movieMethods';
import { GenresCollection } from '../imports/api/GenreCollection';
import { WhiteListCollection } from '../imports/api/WhiteListCollection';

const insertMovie = (movieName, typeId) => MoviesCollection.insert({
  name: movieName,
  typeId: typeId
})
const insertType = typeName => TypesCollection.insert({
  type: typeName
})
const insertGenre = genreName => GenresCollection.insert({
  genre: genreName
})



Meteor.startup(() => {
  /*
  user = Accounts.findUserByUsername('SSiluRS')
            if(!WhiteListCollection.findOne({ownerId:user._id}))
                WhiteListCollection.insert({ownerId: user._id, allowIds:[user._id]})
  */
  //Meteor.users.remove({username:"User"})
  //WhiteListCollection.remove({})
  //MoviesCollection.remove({})
  // const id = 'qeW4LtxWpA6r4dTLB'
  // const type = 'аниме'
  //console.log(TypesCollection.findOne({_id:id}))
  //TypesCollection.update(id,  {$set: {type}})
  if (TypesCollection.find().count() === 0) {
    [
      'фильм',
      'сериал',
      'мультфильм',
      'аниме'
    ].forEach(insertType)
  }
  if(GenresCollection.find().count() === 0){
    [
      'боевик',
      'вестерн',
      'детектив',
      'драма',
      'комедия',
      'фантастика',
      'триллер',
      'ужасы',
      'мелодрама',
      'аниме'
    ].forEach(insertGenre)
  }

  // if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  //   Accounts.createUser({
  //     username: SEED_USERNAME,
  //     password: SEED_PASSWORD,
  //   });
  // }

});
