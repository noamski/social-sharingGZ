import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import {ReportService} from '../../../services/report.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements AfterViewInit {

  comment:string=null;

  @ViewChild('commentArea') commentArea: any;


  ngAfterViewInit() {
    this.commentArea.nativeElement.focus();
  }

  constructor(private _location: Location, private reportService:ReportService) { }

  saveComment(){
    this.reportService.setCommentForReport(this.comment);
    this._location.back();
  }

}
