import { Component } from '@angular/core';
import { ApicallService } from './apicall.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bidder';
  advertiserData;
  urls=[];
    
  constructor(private apicallService:ApicallService) {}


  ngOnInit(){

    //This function will fetch available advertiser list and compute best based on cpi value
    this.apicallService.getAdvertises().
    subscribe((data) => {
      this.urls = _.take(_.orderBy(data, ['cpi'],['desc']),2);
    },error=>{
      alert('Something went wrong')
    })

  }
  
  //This will update db when ad is clicked
  onAdClick(adDetails){
    this.apicallService.incAdCount(adDetails).
    subscribe((data) => {
      console.log('Data updated')
    },error=>{
      alert('Something went wrong')
    })
  }
}
