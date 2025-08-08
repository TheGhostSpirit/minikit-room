import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  items: MenuItem[] = [
    { label: 'Minikit-Room' }
  ];

}
