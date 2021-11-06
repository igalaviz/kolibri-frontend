import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DatosPersonalesFormComponent } from './datos-personales-form/datos-personales-form.component';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { PielFormComponent } from './piel-form/piel-form.component';

@NgModule({
  declarations: [
    NuevoPacienteComponent,
    DatosPersonalesFormComponent,
    PielFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [NuevoPacienteComponent],
})
export class PacientesModule {}
