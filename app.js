require("colors");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarTareasCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

//const { mostrarMenu, pausa } = require("./helpers/mensajes");

console.clear();

const main = async () => {
    let opt = "";

    const tareas = new Tareas();
    const TareasDB = leerDB();
    if (TareasDB) {
        tareas.cargarTareasFromArray(TareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const desc = await leerInput("Descripcion: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                const ids = await mostrarTareasCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar("Estas seguro?");
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);

        if (opt != "0") await pausa();
    } while (opt != "0");
};

main();
