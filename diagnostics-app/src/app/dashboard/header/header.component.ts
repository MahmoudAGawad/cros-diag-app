import { Component, OnInit } from '@angular/core';
import { VpdInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';

const defaultVpdInfo: VpdInfo = {
  skuNumber: '',
  serialNumber: '',
  modelName: '',
};

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private _cachedVpdInfo: VpdInfo = defaultVpdInfo;

  get vpdInfo() {
    return this._cachedVpdInfo;
  }

  constructor(private telemetryService: TelemetryService) {}

  ngOnInit(): void {
    this.telemetryService.fetchVpdInfo().then((data: VpdInfo) => {
      this._cachedVpdInfo = data;
    });
  }
}
