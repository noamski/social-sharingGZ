import {Component, Input, OnInit} from '@angular/core';
import {RolesPipe} from '../../../pipes/roles.pipe';
import {Marker} from '../../../models/Marker';
import {isNullOrUndefined} from "util";

@Component({
  selector:'marker-description',
  template:`
    <h5 *ngIf="marker.markerType === 'fire'">שריפה</h5>
    <h5 *ngIf="marker.markerType !== 'fire'">{{this.rolesPipe.transform(getRole(marker))}}</h5>
    נ.צ.:
    {{marker.latitude}},{{marker.longitude}}<br/>
    דווח ב:
    {{reportedDate}}<br/>
  `
})
export class MarkerDescriptionComponent implements OnInit{
  @Input() marker:Marker;
  reportedDate:string;

  rolesPipe:RolesPipe = new RolesPipe();

  ngOnInit(): void {
    this.reportedDate = new Date(this.marker.content['timestamp']).toString();
  }

  getRole(m:Marker){
    if(!isNullOrUndefined(m.content['role'])){
      return m.content['role'];
    }
    return null;
  }
}
