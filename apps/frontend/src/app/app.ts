import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from 'app/components/navbar/navbar';
import { Sidenav } from 'app/components/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
