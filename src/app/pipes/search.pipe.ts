import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers : any [], searchTerm : string, property : string): any [] {
    let results : any = [];

    if(!allUsers || searchTerm === "" || property === ""){
        return allUsers;
    }
   
    allUsers.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        results.push(item);
      }
    });

    return results;

  }

}
