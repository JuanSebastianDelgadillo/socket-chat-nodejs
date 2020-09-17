const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.emit('bienPersona', crearMensaje('Administrador', `Se unio ${data.nombre} al Chat`));
        // client.broadcast.emit('listaPersona', usuarios.getPersonas());
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));
        callback(usuarios.getPersonaPorSala(data.sala));
    });

    client.on('crearMensaje', (mensaje) => {
        let persona = usuarios.buscarIdPersona(client.id);
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.nombre, mensaje.mensaje));

    });

    client.on('direct', data => {
        let persona = usuarios.buscarIdPersona(client.id);
        client.broadcast.to(data.para).emit('direct', crearMensaje(persona.nombre, data.mensaje));

    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `El usuario ${personaBorrada.nombre} dejo el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));
    });

});