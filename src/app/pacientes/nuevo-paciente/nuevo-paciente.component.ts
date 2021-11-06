import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { DatosPersonalesFormComponent } from '../datos-personales-form/datos-personales-form.component';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { PacienteService } from '../paciente.service';
import { PielFormComponent } from '../piel-form/piel-form.component';
import { StepperOrientation } from '@angular/cdk/stepper';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.scss'],
})
export class NuevoPacienteComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  stepperOrientation: Observable<StepperOrientation>;
  showBottomBar: Observable<boolean>;

  @ViewChild('datosPersonales')
  private datosPersonales!: DatosPersonalesFormComponent;
  @ViewChild('piel') private piel!: PielFormComponent;

  constructor(
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private pacienteService: PacienteService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.showBottomBar = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? true : false)));
  }

  ngOnInit(): void {}

  goBack() {
    this.stepper.previous();
  }

  goForward(finishedStep: number) {
    switch (finishedStep) {
      case 1:
        this.pacienteService.saveDatosPersonales(
          this.datosPersonales.datosPersonales.value
        );
        break;
      case 2:
        this.pacienteService.saveCaracterizacionPiel({
          color: this.piel.piel.value.color,
          grosor: this.piel.piel.value.grosor,
          enfermedades: this.piel.selectedEnfermedadesPiel,
        });
    }
    this.stepper.next();
  }
}
