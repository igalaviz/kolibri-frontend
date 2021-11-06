import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-datos-personales-form',
  templateUrl: './datos-personales-form.component.html',
  styleUrls: ['./datos-personales-form.component.scss']
})
export class DatosPersonalesFormComponent implements OnInit {
  datosPersonales!: FormGroup;
  opcionesMotivacion: string[];
  filteredOpcionesMotivacion!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private pacienteService: PacienteService) {
    this.opcionesMotivacion = this.pacienteService.getMotivaciones();
  }

  ngOnInit(): void {
    this.buildDatosPersonalesGroup();

    
    this.filteredOpcionesMotivacion = this.datosPersonales.get('motivacion')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMotivacion(value))
      );
  }

  buildDatosPersonalesGroup(){
    this.datosPersonales = this.formBuilder.group({
      nombre: [''],
      email: ['', Validators.email],
      fechaNacimiento: [''],
      sexo: ['', Validators.required],
      celular: ['', Validators.required],
      telefonoFijo: ['', Validators.required],
      deportista: [false],
      fumador: [false],
      motivacion: ['']
    })
  }

  private _filterMotivacion(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.opcionesMotivacion.filter(option => option.toLowerCase().includes(filterValue));
  }

}
