import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'core-map-content',
  template: '',
})
export class CoreMapContentComponent implements OnInit {
  @Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(public gMaps: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.gMaps.getNativeMap().then((map) => {
      this.onMapLoad.emit(map);
    });
  }
}
