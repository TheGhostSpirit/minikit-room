import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { SidenavComponent } from 'app/layout/components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidenavComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
