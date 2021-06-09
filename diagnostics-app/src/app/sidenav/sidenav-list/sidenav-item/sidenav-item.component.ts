import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.css']
})
export class SidenavItemComponent implements OnInit {

  @Input() key: string = 'unknown';
  @Input() value: string = 'Unknown';
  @Input() icon: string = 'help_outline';

  constructor() { }

  ngOnInit(): void {
  }

}
