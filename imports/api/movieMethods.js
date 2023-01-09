import { check } from 'meteor/check';
import { MoviesCollection } from './MovieCollection'
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { WhiteListCollection } from './WhiteListCollection';

Meteor.methods({
    'create.user'(username, password) {

        //console.log(Accounts.findUserByUsername(username))
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                username: username,
                password: password,
            });
            user = Accounts.findUserByUsername(username)
            if (!WhiteListCollection.findOne({ ownerId: user._id }))
                WhiteListCollection.insert({ ownerId: user._id, allowIds: [user._id] })
            return true
        }
        else
            return false
    },
    'add.user'(username) {

        user = Accounts.findUserByUsername(username)._id
        console.log(this.userId)
        //console.log(WhiteListCollection.findOne({ownerId: this.userId }))
        if(!WhiteListCollection.findOne({ownerId: user, allowIds:this.userId })){
            //console.log(WhiteListCollection.findOne({ allowIds:user._id }))
            WhiteListCollection.update({ownerId:user},{$push:{allowIds:this.userId}})
        }
        
        console.log(WhiteListCollection.findOne({ownerId: user, allowIds:this.userId }))

    },
    'delete.user'(username) {

        user = Accounts.findUserByUsername(username)._id
        console.log(this.userId)
        //console.log(WhiteListCollection.findOne({ownerId: this.userId }))
        if(WhiteListCollection.findOne({ownerId: user, allowIds:this.userId })){
            //console.log(WhiteListCollection.findOne({ allowIds:user._id }))
            WhiteListCollection.update({ownerId:user},{$pull:{allowIds:this.userId}})
        }
        
        console.log(WhiteListCollection.findOne({ownerId: user, allowIds:this.userId }))

    },
    'movie.insert'(name, type, genres) {
        check(name, String);
        check(type, String)

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        MoviesCollection.insert({
            name,
            typeId: type,
            genres: genres,
            userId: this.userId
        });
    },
    'movie.remove'(movieId) {
        check(movieId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        MoviesCollection.remove(movieId);
    },

    'movie.setIsChecked'(movieId, isChecked) {
        check(movieId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        MoviesCollection.update(movieId, {
            $set: {
                isChecked
            }
        });
    }
})