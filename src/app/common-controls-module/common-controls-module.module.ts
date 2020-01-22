import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseMenuAndTitleComponent } from '../navigation/collapse-menu-and-title/collapse-menu-and-title.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientService } from '../client-management/client.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CollapseMenuAndTitleComponent],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    CollapseMenuAndTitleComponent,
    RouterModule
  ],
  providers: [ClientService],
})
export class CommonControlsModuleModule { }
