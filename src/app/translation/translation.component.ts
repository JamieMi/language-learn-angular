import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';

enum OpenMode {
  ADD,
  EDIT
};

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent {
  

  @Input() translation: Translation = {
    sourcePhrase:'',
    translatedPhrase:'',
    createdTime:new Date(),
    testTime:[]
  };
  @Input() focus:boolean=false;
  
  constructor(public dialog: MatDialog) {}

  openEditDialog() {
    this.openDialogAsEdit( true );
  }

  openAddDialog(){
    this.openDialogAsEdit( false );
  }

  // Takes a boolean, because workarounds for scope limitations of enums in JS are just too ugly.
  openDialogAsEdit(openEdit : boolean ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (openEdit){ // Edit dialog 
      dialogConfig.data = {
        //id: 1,
        title: 'Edit translation',
        data: this.translation
      }
    } else { // Add dialog
      dialogConfig.data = {
//        id: 1,
        title: 'Add translation',
        data: this.translation
      }
    }

    const dialogRef = this.dialog.open(EditTranslationComponent, dialogConfig.data)

    dialogRef.afterClosed().subscribe(
      data => (this.update(openEdit, data))
    );    
  };

  update ( editing: boolean , data:any){
    if (data != undefined) // i.e. Save, not Close
    {
      if (editing)
      {
        this.translation.sourcePhrase = data.sourcePhraseControl;
        this.translation.translatedPhrase = data.translatedPhraseControl;
      }
    }
  }

  setFocus(setF:boolean){
    this.focus = setF;
  };
}
