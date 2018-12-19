import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EVENT_TYPES} from '../../constants/EVENT_TYPES';
import {BALLOON_HEIGHTS} from '../../constants/BALLOON_HEIGHTS';
import {KITE_HEIGHTS} from '../../constants/KITE_HEIGHTS';
import {FIRE_SIZES} from '../../constants/FIRE_SIZES';
import {ReportService} from '../../../services/report.service';
import {UserAgentService} from '../../../services/userAgent.service';
import {BURNING_SIZES, CATEGORIES_NAMES, FLYING_OBJECTS_HEIGHT} from '../../constants/HebrewTranslations';

declare var $: any;

@Component({
  selector: 'sending-report-page',
  templateUrl: './sending-report-page.component.html',
  styleUrls: ['./sending-report-page.component.scss'],
  providers: [UserAgentService]
})
export class SendingReportPageComponent implements OnInit {

  eventType: string = null;
  eventSize: string = null;
  EVENT_TYPE_BUTTON = EVENT_TYPES;
  BALLOON_HEIGHTS = BALLOON_HEIGHTS;
  KITE_HEIGHTS = KITE_HEIGHTS;
  FIRE_SIZES = FIRE_SIZES;
  reportService: ReportService;

  constructor(private route: ActivatedRoute, private reportSrv: ReportService, private router: Router, private userAgent: UserAgentService) {
    this.reportService = reportSrv;
  }

  ngOnInit() {
    this.eventType = this.route.snapshot.params['event-type'];
    this.reportService.setEventType(this.eventType);
    this.eventSize = this.reportService.getEventSize();
  }

  setEventSize(eventSize) {
    this.eventSize = eventSize;
    this.reportService.setEventSize(eventSize);
  }

  cameraButtonClicked() {
    // activate camera
    this.router.navigate(['app-webcam-page']);
    // Activate file choosing service
    // $('input').click();
  }

  captureImage(image) {
    this.reportSrv.captureImageWithoutSending(image);
  }

  sendReportAndGoToEndingPage() {
    this.reportSrv.upload(this.getEventDescription());
    this.reportSrv.setWhatsappSharingUrl(encodeURIComponent(this.makeUserMessage()));
    this.router.navigate(['/ending']);
  }

  makeUserMessage() {
    const headingPart = `${this.userAgent.isiOSPhone() ? 'כיוון מצפן: \n' + parseInt(this.reportSrv.getAzimuth().toString()) : '' }`;
    const opening = "דיווח על'";
    return `${this.getGoogleMapsURL()}\n
    ${headingPart}
    ${opening}\n
    ${this.getEventDescription()}.`;
  }

  getGoogleMapsURL() {
    if (this.reportSrv.currLocation) {
      return `google.com/maps/?q=${this.reportSrv.currLocation.latitude},${this.reportSrv.currLocation.longitude}`;
    } else {
      return '';
    }
  }

  getEventDescription() {
    if (this.eventType === this.EVENT_TYPE_BUTTON.FIRE) {
      return `${CATEGORIES_NAMES[this.eventType]} ${BURNING_SIZES[this.eventSize]}`;
    } else {
      return `${CATEGORIES_NAMES[this.eventType]} ` + 'בגובה' + ` ${FLYING_OBJECTS_HEIGHT[this.eventSize]}`;
    }
  }

  addComment() {
    this.router.navigate(['/add-comment']);
  }

}
