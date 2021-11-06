import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-piel-form',
  templateUrl: './piel-form.component.html',
  styleUrls: ['./piel-form.component.scss']
})
export class PielFormComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  opcionesColorPiel: string[];
  opcionesGrosorPiel: string[];
  opcionesEnfermedadPiel: string[];
  filteredOpcionesEnfermedad!: Observable<string[]>;

  piel!: FormGroup;
  @ViewChild('enfermedadInput') enfermedadInput!: ElementRef<HTMLInputElement>;
  selectedEnfermedadesPiel: string[] = [];

  constructor(private formBuilder: FormBuilder, private pacienteService: PacienteService) {
    this.opcionesColorPiel = this.pacienteService.getOpcionesColorPiel();
    this.opcionesGrosorPiel = this.pacienteService.getOpcionesGrosorPiel();
    this.opcionesEnfermedadPiel = this.pacienteService.getOpcionesEnfermedadesPiel();
  }

  ngOnInit(): void {
    this.buildPielGroup();

    this.filteredOpcionesEnfermedad = this.piel.get('enfermedades')!.valueChanges.pipe(
      startWith(null),
      map((enfermedad: string | null) => enfermedad ? this._filterEnfermedad(enfermedad) : this.opcionesEnfermedadPiel.slice()));
  }

  buildPielGroup() {
    this.piel = this.formBuilder.group({
      color: ['', Validators.required],
      grosor: ['', Validators.required],
      enfermedades: []
    })
  }

  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Añadir la enfermedad
    if (value) {
      this.selectedEnfermedadesPiel.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.piel.get('enfermedades')?.setValue(null);
  }

  remove(enfermedad: string): void {
    const index = this.selectedEnfermedadesPiel.indexOf(enfermedad);

    if (index >= 0) {
      this.selectedEnfermedadesPiel.splice(index, 1);
    }
  }
  

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedEnfermedadesPiel.push(event.option.viewValue);
    this.enfermedadInput.nativeElement.value = '';
    this.piel.get('enfermedades')?.setValue(null);
  }

  private _filterEnfermedad(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.opcionesEnfermedadPiel.filter(e => e.toLowerCase().includes(filterValue));
  }
}
