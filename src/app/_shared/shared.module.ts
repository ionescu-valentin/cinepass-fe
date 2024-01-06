import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconDefinition } from '@ant-design/icons-angular';
import { PlusOutline, UserOutline, LockOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { NzCardModule } from 'ng-zorro-antd/card';

const icons: IconDefinition[] = [ UserOutline, LockOutline, PlusOutline, SearchOutline ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    HttpClientModule,
    NzIconModule.forChild(icons),
    NzCardModule

  ],
   exports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    HttpClientModule,
    NzIconModule,
    NzCardModule
   ]
})
export class SharedModule { }
