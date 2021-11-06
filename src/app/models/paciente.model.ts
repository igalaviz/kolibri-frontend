export interface DatosPersonales {
    nombre: string,
    email: string,
    fechaNacimiento: string,
    sexo: string,
    celular: string,
    telefonoFijo: string,
    deportista: boolean,
    fumador: boolean,
    motivacion: string
}

export interface Piel {
    color: string,
    grosor: string,
    enfermedades: string[]
}

export interface Paciente {
    datosPersonales: DatosPersonales,
    piel: Piel,
    signosSintomas: string[]
    diagnostico: string[]
}