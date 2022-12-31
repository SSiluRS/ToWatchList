import { Template } from 'meteor/templating';
import { MoviesCollection } from '../api/MovieCollection';
import './Movie.html'

Template.movie.events({
    'click .toggle-checked'(){
        MoviesCollection.update(this.one_movie._id,{$set:{isChecked: !this.one_movie.isChecked}})
    },
    'click .delete'(){
        MoviesCollection.remove(this.one_movie._id)
    }
})