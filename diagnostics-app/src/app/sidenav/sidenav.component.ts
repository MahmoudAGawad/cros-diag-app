import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  navItems = [
    {
      header: '',
      items: [
        {
          key: 'dashboard',
          value: 'Dashboard',
          icon: 'home',
        },
      ],
    },
    {
      header: 'Metrics',
      items: [
        {
          key: 'cpu',
          value: 'CPU',
          icon: 'memory',
        },
        {
          key: 'ram',
          value: 'RAM',
          icon: 'developer_board',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
