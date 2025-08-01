import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Sidenav } from './components/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
