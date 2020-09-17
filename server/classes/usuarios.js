class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas.push(persona);
        return this.personas;
    }

    buscarIdPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonaPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    getPersonas() {
        return this.personas;
    }

    borrarPersona(id) {
        let personaBorrada = this.buscarIdPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }



}




module.exports = {
    Usuarios
}