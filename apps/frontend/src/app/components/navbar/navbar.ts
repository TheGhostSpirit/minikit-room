import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, AvatarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  items: MenuItem[] = [
    { label: 'Home' },
    { label: 'Features' },
    { label: 'Projects' },
  ];

}
