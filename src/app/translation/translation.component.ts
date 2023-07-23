import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  constructor(private dialog: MatDialog) {}

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    alert(this.translation.sourcePhrase);
    dialogConfig.data = {
      id: 1,
      title: 'Add translation',
      data       :this.translation.sourcePhrase
      // TO DO: nothing gets passed over
      /*{
        translation : {   
          sourcePhrase: this.translation.sourcePhrase,
          translatedPhrase: this.translation.translatedPhrase,
          createdTime: this.translation.createdTime,
          testTime: []
        }
      },*/
    };

    this.dialog.open(EditTranslationComponent, dialogConfig);    
  }

  @Input() translation!: Translation;
  @Input() focus:boolean=false;
  
  setFocus(setF:boolean){
    this.focus = setF;
  };
}
