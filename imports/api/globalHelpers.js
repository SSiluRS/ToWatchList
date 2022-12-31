import { Template } from 'meteor/templating';
import { TypesCollection } from './TypeCollection';


Template.registerHelper('types',function(){
  
  return TypesCollection.find({}); 
})

Template.registerHelper('type_name',function(elem){
  
  var name = TypesCollection.findOne({_id: elem}); 
  //console.log(faculty_n);
  return name["type"];
})