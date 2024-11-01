// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  name: string;
  className: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes: Theme[] = [
    { name: 'Default', className: 'default-theme' },
    { name: 'Dark', className: 'dark-theme' },
    { name: 'Light Green', className: 'light-green-theme' },
    { name: 'Deep Purple', className: 'deep-purple-theme' },
  ];

  private currentTheme = new BehaviorSubject<Theme>(
    this.themes.find((t) => t.className === localStorage.getItem('theme')) ||
      this.themes[0]
  );

  currentTheme$ = this.currentTheme.asObservable();
  availableThemes = this.themes;

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme.className);
    this.currentTheme.next(theme);
  }
}
