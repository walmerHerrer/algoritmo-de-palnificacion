var informacionGrafica = {};
var procesoAnterior = "";
var main = function () {
    informacionGrafica = {};
    procesoAnterior = "";
    //document.getElementById("SeccionCritica").innerHTML = "";
    //   document.getElementById("proceso-0").innerHTML = "";
    //   document.getElementById("proceso-1").innerHTML = "";
    //   document.getElementById("proceso-2").innerHTML = "";
    //   document.getElementById("bloqueado").innerHTML = "";
    //   document.getElementById("listos").innerHTML = "";
    // //  document.getElementById("tablaProcesos").innerHTML = "";
    var semaforo = new Semaforo();
    var len = semaforo.planificadores.length;
    var tiempo = 0;
    var process = document.querySelector(".main-table").rows.length;
    process = process - Math.round(process / 2);
    var i = 1;
    var time = setInterval(function () {
        semaforo.transcurrirTiempo();
        if (process > 0) {
            let rowCells1 = document.querySelector(".main-table").rows[2 * i - 1].cells;
            let rowCells2 = document.querySelector(".main-table").rows[2 * i].cells;
            var nodo = new Nodo();
            nodo.cola = (Math.round(Math.random() * 100) % len);
            nodo.llegada = tiempo;
            nodo.nombre = i;
            nodo.prioridad = rowCells1[1].firstElementChild.value;
            nodo.rafaga = rowCells2[0].firstElementChild.value;
            nodo.transcurrido = 0;
            nodo.siguiente = null;
            semaforo.agregarNodo(nodo);
            process--;
            i++;
        }
        //semaforo.validarEnvejecimiento();
        informacionDivs(semaforo, tiempo);
        informacionTimeLine(semaforo, tiempo);
        informacionTabla();
        tiempo++;
        if (semaforo.procesoActual === null && semaforo.bloqueado === semaforo.bloqueado.siguiente) {
            clearInterval(time);
        }
    }, 0);
    //console.log(process);

    // for (let i = 1; i <= process; i++) {

    //     // input.processId.push(i - 1);
    //     let rowCells1 = document.querySelector(".main-table").rows[2 * i - 1].cells;
    //     let rowCells2 = document.querySelector(".main-table").rows[2 * i].cells;
    //     // input.priority.push(Number(rowCells1[1].firstElementChild.value));
    //     // input.arrivalTime.push(Number(rowCells1[2].firstElementChild.value));
    //     // let ptn = Number(rowCells2.length);
    //     // let pta = [];
    //     // for (let j = 0; j < ptn; j++) {
    //     //     pta.push(Number(rowCells2[j].firstElementChild.value));
    //     // }
    //     // input.processTime.push(pta);
    //     // input.processTimeLength.push(ptn);

    //     var time = setInterval(function () {
    //         semaforo.transcurrirTiempo();
    //         var nodo = new Nodo();
    //         nodo.cola = (Math.round(Math.random() * 100) % len);
    //         nodo.llegada = tiempo;
    //         nodo.nombre = i;
    //         nodo.prioridad = 1;
    //         nodo.rafaga = Number(rowCells1[2].firstElementChild.value);
    //         nodo.transcurrido = 0;
    //         nodo.siguiente = null;
    //         semaforo.agregarNodo(nodo);


    //         semaforo.validarEnvejecimiento();
    //         informacionDivs(semaforo, tiempo);
    //         informacionTimeLine(semaforo, tiempo);
    //         informacionTabla();
    //         tiempo++;
    //         if (semaforo.procesoActual === null && semaforo.bloqueado === semaforo.bloqueado.siguiente) {
    //             clearInterval(time);
    //         }
    //     }, 0);
    // }


};
var informacionDivs = function (semaforo, tiempo) {
    var len = semaforo.planificadores.length;
    var texto = "";
    var pre;
    var pos;
    if (semaforo.procesoActual === null) {
        texto = "sin proceso actual";
    } else {
        numCola = semaforo.procesoActual.cola;
        nomCola = "";
        switch (numCola) {
            case numCola = 0:
                nomCola = "FCFS";
                break;
            case numCola = 1:
                nomCola = "R.Robbin";
                break;
            case numCola = 2:
                nomCola = "SJF";
                break;
            default:
                nomCola = "SJF";
                break;
        }
        texto = "Proceso: " + semaforo.procesoActual.nombre + " T.Rafaga: " + semaforo.procesoActual.rafaga + " Cola: " + nomCola;
    }
    document.getElementById("SeccionCritica").innerHTML = texto;
    for (var i = 0; i < len; i++) {
        texto = "";
        var plan = semaforo.planificadores[i];
        pre = plan.cabeza;
        pos = plan.cabeza.siguiente;
        while (pos !== plan.cabeza) {
            texto += "Proceso: " + pos.nombre + " T.rafaga: " + pos.rafaga + "<br>";
            pre = pos;
            pos = pos.siguiente;
        }
        document.getElementById("proceso-" + i).innerHTML = texto;
    }
    pre = semaforo.bloqueado;
    pos = semaforo.bloqueado.siguiente;
    texto = "";
    while (pos !== semaforo.bloqueado) {
        texto += "Proceso: " + pos.nombre + " T.rafaga: " + pos.rafaga + "T.Bloqueo: " + pos.rafagaBloqueado + "<br>";
        pre = pos;
        pos = pos.siguiente;
    }
    document.getElementById("bloqueados1").innerHTML = texto;
    pre = semaforo.listo;
    pos = semaforo.listo.siguiente;
    texto = "";
    while (pos !== semaforo.listo) {
        numCola = pos.cola;
        nomCola = "";
        switch (numCola) {
            case numCola = 0:
                nomCola = "FCFS";
                break;
            case numCola = 1:
                nomCola = "R.Robbin";
                break;
            case numCola = 2:
                nomCola = "SJF";
                break;
            default:
                nomCola = "SJF";
                break;

        }
        texto += "Proceso: " + pos.nombre + " Cola: " + nomCola + "<br>";
        pre = pos;
        pos = pos.siguiente;
    }
    document.getElementById("terminados1").innerHTML = texto;
};
var informacionTimeLine = function (semaforo, tiempo) {
    if (semaforo.procesoActual !== null) {
        if (semaforo.procesoActual.nombre === procesoAnterior) {
            var len = informacionGrafica[semaforo.procesoActual.nombre].length;
            informacionGrafica[semaforo.procesoActual.nombre][len - 1].transcurrido++;
        } else {
            if (informacionGrafica[semaforo.procesoActual.nombre]) {
                var len = informacionGrafica[semaforo.procesoActual.nombre].length;
                var informacion = informacionGrafica[semaforo.procesoActual.nombre][len - 1];
                var transcurrido = 0;
                if (tiempo - semaforo.procesoActual.llegada <= 0) {
                    transcurrido = tiempo;
                } else {
                    transcurrido = semaforo.procesoActual.llegada;
                }
                // if (semaforo.procesoActual.llegada - (informacion.inicio + informacion.transcurrido) > 0) {
                //     informacionGrafica[semaforo.procesoActual.nombre].push({
                //         nombre: "Bloqueo",
                //         inicio: informacion.inicio + informacion.transcurrido,
                //         transcurrido: transcurrido - (informacion.inicio + informacion.transcurrido)
                //     });
                // }
            } else {
                informacionGrafica[semaforo.procesoActual.nombre] = [];
            }
            if (tiempo - semaforo.procesoActual.llegada > 0) {
                informacionGrafica[semaforo.procesoActual.nombre].push({
                    nombre: "Espera",
                    inicio: semaforo.procesoActual.llegada,
                    transcurrido: tiempo - semaforo.procesoActual.llegada
                });
            }
            informacionGrafica[semaforo.procesoActual.nombre].push({
                cola: semaforo.planificadores[semaforo.procesoActual.cola].nombre,
                nombre: "Ejecucion",
                inicio: tiempo,
                transcurrido: 1
            });
            procesoAnterior = semaforo.procesoActual.nombre;
        }
    } else {
        procesoAnterior = "";
    }
    pintarGrafica(informacionGrafica);
};
var informacionTabla = function () {
    var texto = "<tr><td>Proceso</td><td>Algoritmo</td><td>Tiempo Servicio</td><td>Tiempo Inicio</td><td>Tiempo Finalizacion</td><td>Tiempo Espera</td><td>Tiempo de retorno</td><td>Tiempo de retorno normalizado</td></tr>";
    var ejecucion;
    var espera;
    var inicio;
    var final;
    var cola;
    var len;

    var suminicio = 0;
    var sumfinal = 0;
    var sumejecucion = 0;
    var sumespera = 0;
    var contador = 0;
    var sumretorno = 0;
    var sumnormalizado = 0;

    for (var key in informacionGrafica) {
        ejecucion = 0;
        espera = 0;
        inicio = 0;
        final = 0;
        cola = "";
        len = informacionGrafica[key].length;
        for (var i = 0; i < len; i++) {
            var item = informacionGrafica[key][i];
            if (i === 0) {
                inicio = item.inicio;
            }
            if (i === len - 1) {
                final = item.inicio + item.transcurrido;
            }
            switch (item.nombre) {
                case "Ejecucion":
                    ejecucion += item.transcurrido;
                    cola = item.cola;
                    break;
                case "Espera":
                    espera += item.transcurrido;
                    break;
            }
        }

        texto += "<tr>";
        texto += "<td>" + "P" + key + "</td>";
        texto += "<td>" + cola + "</td>";
        texto += "<td>" + ejecucion + "</td>";
        texto += "<td>" + inicio + "</td>";
        texto += "<td>" + final + "</td>";
        texto += "<td>" + espera + "</td>";
        texto += "<td>" + (final - ejecucion) + "</td>";
        texto += "<td>" + Number(((final - ejecucion) / ejecucion).toFixed(2)) + "</td>";
        texto += "</tr>";

        document.getElementById("vrendimiento1").innerHTML = texto;

        suminicio = suminicio + inicio;
        sumfinal = sumfinal + final;
        sumejecucion = sumejecucion + ejecucion;
        sumespera = sumespera + espera;
        sumretorno = sumretorno + (final - ejecucion);
        sumnormalizado = sumnormalizado + Number(((final - ejecucion) / ejecucion).toFixed(2));
        contador = contador + 1;
    }
    texto += "<tr>";
    texto += "<td>" + "TIEMPOS PROMEDIOS" + "</td>";
    texto += "<td>" + "" + "</td>";
    texto += "<td>" + "" + "</td>";
    texto += "<td>" + Number((suminicio / contador).toFixed(2)) + "</td>";
    texto += "<td>" + Number((sumfinal / contador).toFixed(2)) + "</td>";
    texto += "<td>" + Number((sumespera / contador).toFixed(2)) + "</td>";
    texto += "<td>" + Number((sumretorno / contador).toFixed(2)) + "</td>";
    texto += "<td>" + Number((sumnormalizado / contador).toFixed(2)) + "</td>";
    texto += "</tr>";
    document.getElementById("vrendimiento1").innerHTML = texto;
};