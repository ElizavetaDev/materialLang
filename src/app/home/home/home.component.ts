import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceService } from '../../services/service.service';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ThemeSwitcherComponent } from '../../components/theme-switcher/theme-switcher.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    MatListItem,
    MatList,
    MatDivider,
    MatChipsModule,
    MatChipListbox,
    MatButton,
    CommonModule,
    FormsModule,
    MatNavList,
    MatSidenavModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ThemeSwitcherComponent,
    MatCardTitle,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('dialog') dialog!: ElementRef;
  api = inject(ServiceService);
  words: any;
  cats: any;
  SelectedCat: any = 'All';
  search: string = '';
  constructor() {
    this.getAllWords();
    this.getCategories();
  }
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
  async getAllWords() {
    let x = await this.api.getAllWords();
    this.words = x;
    console.log(x);
  }
  async getCategories() {
    let x = await this.api.getCategories();
    this.cats = x;
    console.log(x);
  }
  get _words() {
    let x = this.words.filter((x: any) =>
      x.word_eng.toLowerCase().includes(this.search.toLowerCase())
    );
    if (this.SelectedCat === 'All') {
      return x;
    } else {
      return x.filter((x: { cat_id: any }) => x.cat_id === this.SelectedCat.id);
    }
  }
}
