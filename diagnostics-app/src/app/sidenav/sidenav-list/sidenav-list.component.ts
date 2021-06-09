import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  //@ts-ignore
  @Input() header: string;
  //@ts-ignore
  @Input() items: any;

  constructor() {}

  ngOnInit(): void {}
}
