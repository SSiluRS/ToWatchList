import { Template } from 'meteor/templating';
import { MoviesCollection } from '../api/MovieCollection';
import {Meteor} from 'meteor/meteor';
import './Movie.html'

Template.movie.events({
    'click .toggle-checked'(){
        Meteor.call('movie.setIsChecked',this.one_movie._id, !this.one_movie.isChecked)
    },
    'click .delete'(){        
        Meteor.call('movie.remove',this.one_movie._id)
    }
})