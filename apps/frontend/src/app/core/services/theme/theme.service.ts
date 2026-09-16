import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const DARK_MODE_KEY = 'theme.dark';
const DARK_MODE_CLASS = 'app-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly darkSubject = new BehaviorSubject<boolean>(this.isDark());
  readonly dark$ = this.darkSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkSubject.value);
  }

  isDark(): boolean {
    return localStorage.getItem(DARK_MODE_KEY) === 'true';
  }

  setDark(dark: boolean) {
    localStorage.setItem(DARK_MODE_KEY, String(dark));
    this.applyTheme(dark);
    this.darkSubject.next(dark);
  }

  toggle() {
    this.setDark(!this.darkSubject.value);
  }

  private applyTheme(dark: boolean) {
    document.documentElement.classList.toggle(DARK_MODE_CLASS, dark);
  }

}
