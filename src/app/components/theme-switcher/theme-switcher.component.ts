import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatIcon, MatMenu, MatButton, MatMenuModule, CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);
  currentTheme$ = this.themeService.currentTheme$;
  themes = this.themeService.availableThemes;

  constructor() {}

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
