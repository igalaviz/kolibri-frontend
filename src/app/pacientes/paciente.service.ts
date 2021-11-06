import { Injectable } from '@angular/core';
import { DatosPersonales, Piel } from '../models/paciente.model';

const MotivacionPaciente = [
  "Recomendación",
  "Redes Sociales",
  "Desición Personal",
  "Artículos y revistas"
]

const ColorPiel = [
  "Muy blanco",
  "Blanco",
  "Moreno claro",
  "Moreno medio",
  "Moreno oscuro",
  "Negro"
]

const GrosorPiel = [
  "Delgado",
  "Medio",
  "Grueso"
]

const EnfermedadPiel = [
  "Acné",
  "Cicatrices",
  "Rosacea",
  "Vitiligo"
]

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }

  saveDatosPersonales(datosPersonales: DatosPersonales){
    console.log(datosPersonales);
  }

  saveCaracterizacionPiel(caracterizacionPiel: Piel){
    console.log(caracterizacionPiel);
  }

  getMotivaciones(){
    return MotivacionPaciente;
  }

  getOpcionesColorPiel(){
    return ColorPiel;
  }

  getOpcionesGrosorPiel(){
    return GrosorPiel;
  }

  getOpcionesEnfermedadesPiel(){
    return EnfermedadPiel;
  }

}
