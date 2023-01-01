import { Template } from 'meteor/templating';
import { GenresCollection } from './GenreCollection';
import { TypesCollection } from './TypeCollection';


Template.registerHelper('types',function(){
  
  return TypesCollection.find({}); 
})

Template.registerHelper('genres',function(){
  
  return GenresCollection.find({}); 
})

Template.registerHelper('type_name',function(elem){
  
  var name = TypesCollection.findOne({_id: elem}); 
  //console.log(faculty_n);
  return name["type"];
})

Template.registerHelper('get_genres',function(genres){
  
  if(genres['length'] == 1){
    //console.log(genres['0'])
    var name = GenresCollection.findOne({_id: genres['0']}); 
    return name["genre"]
  }
  
  var str = ''
  genres.forEach(genre => {
    //console.log(genre)
    var name = GenresCollection.findOne({_id: genre}); 
    str+= name["genre"] + ', '
  });
  return str.slice(0, str.length-2)
})