import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  @Input() translation!: Translation;
  @Input() focus:boolean=false;
  setFocus(setF:boolean){
    this.focus = setF;
  };
}
