const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const ix = `${i + 1}.`.green;
            console.log(
                `${ix} ${tarea.desc} :: ${
                    tarea.completado ? "Completada".green : "Pendiente".red
                }`
            );
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let cont = 1;
        this.listadoArr.forEach((tarea) => {
            if (completadas & (tarea.completado !== null)) {
                const ix = `${cont}.`.green;
                console.log(`${ix} ${tarea.desc} :: ${tarea.completado.green}`);
                cont++;
            } else if (!completadas & !tarea.completado) {
                const ix = `${cont}.`.green;
                console.log(`${ix} ${tarea.desc} :: ${"Incompleta".red}`);
                cont++;
            }
        });
    }

    toogleCompletadas = (ids = []) => {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completado) {
                tarea.completado = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completado = null;
            }
        });
    };
}

module.exports = Tareas;
