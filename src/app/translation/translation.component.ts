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
  
  @Input() translation: Translation = {
    sourcePhrase:'',
    translatedPhrase:'',
    createdTime:new Date(),
    testTime:[]
  };
  @Input() focus:boolean=false;
  
  constructor(private dialog: MatDialog) {}

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Edit translation',
      data: this.translation
    }

    const dialogRef = this.dialog.open(EditTranslationComponent,
      dialogConfig.data
    )

    dialogRef.afterClosed().subscribe(
      data => this.update(data/*console.log("Dialog output:", data*/)
    );    
  };

  update(data:any){
    this.translation.sourcePhrase = data.sourcePhraseControl;
    this.translation.translatedPhrase = data.translatedPhraseControl;
  }

  setFocus(setF:boolean){
    this.focus = setF;
  };
}
