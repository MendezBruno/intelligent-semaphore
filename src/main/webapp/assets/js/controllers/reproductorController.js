/**
 * Created by Ezequiel on 26/07/2016.
 */

mapas = {
        modulo1 : '{"callesHorizontales":[{"cantCarriles":"2","sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-115"},{"longitud":100,"id":"cuadra-133","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-115","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-129","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-113","nodoDestino":"nodo-110"},{"longitud":100,"id":"cuadra-130","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-110","nodoDestino":"nodo-116"},{"longitud":100,"id":"cuadra-134","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-116","nodoDestino":"nodo-114"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-110"},{"longitud":100,"id":"cuadra-126","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-110","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-135","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-117","nodoDestino":"nodo-115"},{"longitud":100,"id":"cuadra-136","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-115","nodoDestino":"nodo-116"},{"longitud":100,"id":"cuadra-137","congestionTipo":"SIN_CONGESTION","congestionValor":0,"nodoOrigen":"nodo-116","nodoDestino":"nodo-118"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1","cantMaxima":"1","intervalo":"5"},{"id":"nodo-16","cantMaxima":"1","intervalo":"5"},{"id":"nodo-113","cantMaxima":1,"intervalo":5},{"id":"nodo-117","cantMaxima":1,"intervalo":5}],"nodosSalida":[{"id":"nodo-2","cantMaxima":"1","intervalo":"5"},{"id":"nodo-17","cantMaxima":"1","intervalo":"5"},{"id":"nodo-114","cantMaxima":1,"intervalo":5},{"id":"nodo-118","cantMaxima":1,"intervalo":5}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-110","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-115","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-116","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"Nombre de mapa"}',
        modulo2 : '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"},{"longitud":100,"id":"cuadra-32","nodoOrigen":"nodo-27","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"},{"longitud":100,"id":"cuadra-33","nodoOrigen":"nodo-28","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"},{"longitud":100,"id":"cuadra-34","nodoOrigen":"nodo-29","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-28","nodoOrigen":"nodo-25","nodoDestino":"nodo-22"},{"longitud":100,"id":"cuadra-29","nodoOrigen":"nodo-22","nodoDestino":"nodo-23"},{"longitud":100,"id":"cuadra-30","nodoOrigen":"nodo-23","nodoDestino":"nodo-24"},{"longitud":100,"id":"cuadra-31","nodoOrigen":"nodo-24","nodoDestino":"nodo-26"},{"longitud":100,"id":"cuadra-35","nodoOrigen":"nodo-30","nodoDestino":"nodo-26"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"},{"longitud":100,"id":"cuadra-25","nodoOrigen":"nodo-22","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"},{"longitud":100,"id":"cuadra-26","nodoOrigen":"nodo-23","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"},{"longitud":100,"id":"cuadra-27","nodoOrigen":"nodo-24","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-36","nodoOrigen":"nodo-31","nodoDestino":"nodo-27"},{"longitud":100,"id":"cuadra-37","nodoOrigen":"nodo-27","nodoDestino":"nodo-28"},{"longitud":100,"id":"cuadra-38","nodoOrigen":"nodo-28","nodoDestino":"nodo-29"},{"longitud":100,"id":"cuadra-39","nodoOrigen":"nodo-29","nodoDestino":"nodo-30"},{"longitud":100,"id":"cuadra-40","nodoOrigen":"nodo-30","nodoDestino":"nodo-32"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-2","cantMaxima":1,"intervalo":5},{"id":"nodo-6","cantMaxima":1,"intervalo":5},{"id":"nodo-11","cantMaxima":1,"intervalo":5},{"id":"nodo-16","cantMaxima":1,"intervalo":5},{"id":"nodo-18","cantMaxima":1,"intervalo":5},{"id":"nodo-20","cantMaxima":1,"intervalo":5},{"id":"nodo-25","cantMaxima":1,"intervalo":5},{"id":"nodo-31","cantMaxima":1,"intervalo":5}],"nodosSalida":[{"id":"nodo-1","cantMaxima":1,"intervalo":5},{"id":"nodo-7","cantMaxima":1,"intervalo":5},{"id":"nodo-12","cantMaxima":1,"intervalo":5},{"id":"nodo-17","cantMaxima":1,"intervalo":5},{"id":"nodo-19","cantMaxima":1,"intervalo":5},{"id":"nodo-21","cantMaxima":1,"intervalo":5},{"id":"nodo-26","cantMaxima":1,"intervalo":5},{"id":"nodo-32","cantMaxima":1,"intervalo":5}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-4","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-5","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-8","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-9","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-10","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-13","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-14","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-15","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-22","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-23","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-24","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-27","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-28","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-29","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-30","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"modulo5"}',
        modulo3 : '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"},{"longitud":100,"id":"cuadra-32","nodoOrigen":"nodo-27","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"},{"longitud":100,"id":"cuadra-33","nodoOrigen":"nodo-28","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"},{"longitud":100,"id":"cuadra-34","nodoOrigen":"nodo-29","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-28","nodoOrigen":"nodo-25","nodoDestino":"nodo-22"},{"longitud":100,"id":"cuadra-29","nodoOrigen":"nodo-22","nodoDestino":"nodo-23"},{"longitud":100,"id":"cuadra-30","nodoOrigen":"nodo-23","nodoDestino":"nodo-24"},{"longitud":100,"id":"cuadra-31","nodoOrigen":"nodo-24","nodoDestino":"nodo-26"},{"longitud":100,"id":"cuadra-35","nodoOrigen":"nodo-30","nodoDestino":"nodo-26"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"},{"longitud":100,"id":"cuadra-25","nodoOrigen":"nodo-22","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"},{"longitud":100,"id":"cuadra-26","nodoOrigen":"nodo-23","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"},{"longitud":100,"id":"cuadra-27","nodoOrigen":"nodo-24","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-36","nodoOrigen":"nodo-31","nodoDestino":"nodo-27"},{"longitud":100,"id":"cuadra-37","nodoOrigen":"nodo-27","nodoDestino":"nodo-28"},{"longitud":100,"id":"cuadra-38","nodoOrigen":"nodo-28","nodoDestino":"nodo-29"},{"longitud":100,"id":"cuadra-39","nodoOrigen":"nodo-29","nodoDestino":"nodo-30"},{"longitud":100,"id":"cuadra-40","nodoOrigen":"nodo-30","nodoDestino":"nodo-32"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-2","cantMaxima":1,"intervalo":5},{"id":"nodo-6","cantMaxima":1,"intervalo":5},{"id":"nodo-11","cantMaxima":1,"intervalo":5},{"id":"nodo-16","cantMaxima":1,"intervalo":5},{"id":"nodo-18","cantMaxima":1,"intervalo":5},{"id":"nodo-20","cantMaxima":1,"intervalo":5},{"id":"nodo-25","cantMaxima":1,"intervalo":5},{"id":"nodo-31","cantMaxima":1,"intervalo":5}],"nodosSalida":[{"id":"nodo-1","cantMaxima":1,"intervalo":5},{"id":"nodo-7","cantMaxima":1,"intervalo":5},{"id":"nodo-12","cantMaxima":1,"intervalo":5},{"id":"nodo-17","cantMaxima":1,"intervalo":5},{"id":"nodo-19","cantMaxima":1,"intervalo":5},{"id":"nodo-21","cantMaxima":1,"intervalo":5},{"id":"nodo-26","cantMaxima":1,"intervalo":5},{"id":"nodo-32","cantMaxima":1,"intervalo":5}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-4","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-5","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-8","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-9","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-10","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-13","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-14","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-15","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-22","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-23","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-24","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-27","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-28","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-29","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-30","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"modulo2"}',
        modulo4 : '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"},{"longitud":100,"id":"cuadra-32","nodoOrigen":"nodo-27","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"},{"longitud":100,"id":"cuadra-33","nodoOrigen":"nodo-28","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"},{"longitud":100,"id":"cuadra-34","nodoOrigen":"nodo-29","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-28","nodoOrigen":"nodo-25","nodoDestino":"nodo-22"},{"longitud":100,"id":"cuadra-29","nodoOrigen":"nodo-22","nodoDestino":"nodo-23"},{"longitud":100,"id":"cuadra-30","nodoOrigen":"nodo-23","nodoDestino":"nodo-24"},{"longitud":100,"id":"cuadra-31","nodoOrigen":"nodo-24","nodoDestino":"nodo-26"},{"longitud":100,"id":"cuadra-35","nodoOrigen":"nodo-30","nodoDestino":"nodo-26"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"},{"longitud":100,"id":"cuadra-25","nodoOrigen":"nodo-22","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"},{"longitud":100,"id":"cuadra-26","nodoOrigen":"nodo-23","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"},{"longitud":100,"id":"cuadra-27","nodoOrigen":"nodo-24","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-36","nodoOrigen":"nodo-31","nodoDestino":"nodo-27"},{"longitud":100,"id":"cuadra-37","nodoOrigen":"nodo-27","nodoDestino":"nodo-28"},{"longitud":100,"id":"cuadra-38","nodoOrigen":"nodo-28","nodoDestino":"nodo-29"},{"longitud":100,"id":"cuadra-39","nodoOrigen":"nodo-29","nodoDestino":"nodo-30"},{"longitud":100,"id":"cuadra-40","nodoOrigen":"nodo-30","nodoDestino":"nodo-32"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-2","cantMaxima":1,"intervalo":5},{"id":"nodo-6","cantMaxima":1,"intervalo":5},{"id":"nodo-11","cantMaxima":1,"intervalo":5},{"id":"nodo-16","cantMaxima":1,"intervalo":5},{"id":"nodo-18","cantMaxima":1,"intervalo":5},{"id":"nodo-20","cantMaxima":1,"intervalo":5},{"id":"nodo-25","cantMaxima":1,"intervalo":5},{"id":"nodo-31","cantMaxima":1,"intervalo":5}],"nodosSalida":[{"id":"nodo-1","cantMaxima":1,"intervalo":5},{"id":"nodo-7","cantMaxima":1,"intervalo":5},{"id":"nodo-12","cantMaxima":1,"intervalo":5},{"id":"nodo-17","cantMaxima":1,"intervalo":5},{"id":"nodo-19","cantMaxima":1,"intervalo":5},{"id":"nodo-21","cantMaxima":1,"intervalo":5},{"id":"nodo-26","cantMaxima":1,"intervalo":5},{"id":"nodo-32","cantMaxima":1,"intervalo":5}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-4","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-5","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-8","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-9","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-10","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-13","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-14","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-15","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-22","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-23","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-24","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-27","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-28","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-29","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-30","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"modulo3"}',
        modulo5 : '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"},{"longitud":100,"id":"cuadra-32","nodoOrigen":"nodo-27","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"},{"longitud":100,"id":"cuadra-33","nodoOrigen":"nodo-28","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"},{"longitud":100,"id":"cuadra-34","nodoOrigen":"nodo-29","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-28","nodoOrigen":"nodo-25","nodoDestino":"nodo-22"},{"longitud":100,"id":"cuadra-29","nodoOrigen":"nodo-22","nodoDestino":"nodo-23"},{"longitud":100,"id":"cuadra-30","nodoOrigen":"nodo-23","nodoDestino":"nodo-24"},{"longitud":100,"id":"cuadra-31","nodoOrigen":"nodo-24","nodoDestino":"nodo-26"},{"longitud":100,"id":"cuadra-35","nodoOrigen":"nodo-30","nodoDestino":"nodo-26"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"},{"longitud":100,"id":"cuadra-25","nodoOrigen":"nodo-22","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"},{"longitud":100,"id":"cuadra-26","nodoOrigen":"nodo-23","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"},{"longitud":100,"id":"cuadra-27","nodoOrigen":"nodo-24","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-36","nodoOrigen":"nodo-31","nodoDestino":"nodo-27"},{"longitud":100,"id":"cuadra-37","nodoOrigen":"nodo-27","nodoDestino":"nodo-28"},{"longitud":100,"id":"cuadra-38","nodoOrigen":"nodo-28","nodoDestino":"nodo-29"},{"longitud":100,"id":"cuadra-39","nodoOrigen":"nodo-29","nodoDestino":"nodo-30"},{"longitud":100,"id":"cuadra-40","nodoOrigen":"nodo-30","nodoDestino":"nodo-32"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-2","cantMaxima":10,"intervalo":5},{"id":"nodo-6","cantMaxima":10,"intervalo":5},{"id":"nodo-11","cantMaxima":10,"intervalo":5},{"id":"nodo-16","cantMaxima":10,"intervalo":5},{"id":"nodo-18","cantMaxima":10,"intervalo":5},{"id":"nodo-20","cantMaxima":10,"intervalo":5},{"id":"nodo-25","cantMaxima":10,"intervalo":5},{"id":"nodo-31","cantMaxima":10,"intervalo":5}],"nodosSalida":[{"id":"nodo-1","cantMaxima":10,"intervalo":5},{"id":"nodo-7","cantMaxima":10,"intervalo":5},{"id":"nodo-12","cantMaxima":10,"intervalo":5},{"id":"nodo-17","cantMaxima":10,"intervalo":5},{"id":"nodo-19","cantMaxima":10,"intervalo":5},{"id":"nodo-21","cantMaxima":10,"intervalo":5},{"id":"nodo-26","cantMaxima":10,"intervalo":5},{"id":"nodo-32","cantMaxima":10,"intervalo":5}],"nodosSemaforo":[],"nodosNoSemaforo":[{"id":"nodo-3","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-4","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-5","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-8","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-9","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-10","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-13","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-14","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-15","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-22","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-23","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-24","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-27","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-28","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-29","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-30","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"modulo4"}',
        modulo6 : '{"callesHorizontales":[{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1","cantMaxima":1,"intervalo":5},{"id":"nodo-6","cantMaxima":1,"intervalo":5},{"id":"nodo-11","cantMaxima":1,"intervalo":5},{"id":"nodo-16","cantMaxima":1,"intervalo":5},{"id":"nodo-18","cantMaxima":1,"intervalo":5},{"id":"nodo-20","cantMaxima":1,"intervalo":5}],"nodosSalida":[{"id":"nodo-2","cantMaxima":1,"intervalo":5},{"id":"nodo-7","cantMaxima":1,"intervalo":5},{"id":"nodo-12","cantMaxima":1,"intervalo":5},{"id":"nodo-17","cantMaxima":1,"intervalo":5},{"id":"nodo-19","cantMaxima":1,"intervalo":5},{"id":"nodo-21","cantMaxima":1,"intervalo":5}],"nodosSemaforo":[{"id":"nodo-8","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-9","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-10","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-5","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-15","tiempoHorizontal":4,"tiempoVertical":4}],"nodosNoSemaforo":[{"id":"nodo-3","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-4","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-13","tiempoHorizontal":150,"tiempoVertical":150},{"id":"nodo-14","tiempoHorizontal":150,"tiempoVertical":150}],"nombre":"modulo7","id":"soy_el_id_hash_del_modulo_6"}',
        modulo7 : '{"callesHorizontales":[{"cantCarriles":3,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":5,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":1,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":1,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":1,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":4,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1"},{"id":"nodo-6"},{"id":"nodo-11"},{"id":"nodo-16"},{"id":"nodo-18"},{"id":"nodo-20"}],"nodosSalida":[{"id":"nodo-2"},{"id":"nodo-7"},{"id":"nodo-12"},{"id":"nodo-17"},{"id":"nodo-19"},{"id":"nodo-21"}],"nodosSemaforo":[{"id":"nodo-10","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-14","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-8","tiempoHorizontal":4,"tiempoVertical":4},{"id":"nodo-5","tiempoHorizontal":4,"tiempoVertical":4}],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-4"},{"id":"nodo-9"},{"id":"nodo-13"},{"id":"nodo-15"}],"nombre":""}',
        prueba1 : '{"callesHorizontales":[{"cantCarriles":"2","sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-3","nodoOrigen":"nodo-4","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-4","nodoOrigen":"nodo-5","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":5,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-5","nodoOrigen":"nodo-6","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-6","nodoOrigen":"nodo-8","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-7","nodoOrigen":"nodo-9","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-8","nodoOrigen":"nodo-10","nodoDestino":"nodo-7"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]},{"cantCarriles":2,"sentido":"Este-Oeste","cuadras":[{"longitud":100,"id":"cuadra-9","nodoOrigen":"nodo-11","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-10","nodoOrigen":"nodo-13","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-11","nodoOrigen":"nodo-14","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-12","nodoOrigen":"nodo-15","nodoDestino":"nodo-12"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-8"},{"longitud":100,"id":"cuadra-15","nodoOrigen":"nodo-8","nodoDestino":"nodo-13"},{"longitud":100,"id":"cuadra-16","nodoOrigen":"nodo-13","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":2,"sentido":"Sur-Norte","cuadras":[{"longitud":100,"id":"cuadra-17","nodoOrigen":"nodo-18","nodoDestino":"nodo-4"},{"longitud":100,"id":"cuadra-18","nodoOrigen":"nodo-4","nodoDestino":"nodo-9"},{"longitud":100,"id":"cuadra-19","nodoOrigen":"nodo-9","nodoDestino":"nodo-14"},{"longitud":100,"id":"cuadra-20","nodoOrigen":"nodo-14","nodoDestino":"nodo-19"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]},{"cantCarriles":4,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-21","nodoOrigen":"nodo-20","nodoDestino":"nodo-5"},{"longitud":100,"id":"cuadra-22","nodoOrigen":"nodo-5","nodoDestino":"nodo-10"},{"longitud":100,"id":"cuadra-23","nodoOrigen":"nodo-10","nodoDestino":"nodo-15"},{"longitud":100,"id":"cuadra-24","nodoOrigen":"nodo-15","nodoDestino":"nodo-21"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-2","cantMaxima":"10","intervalo":"5"},{"id":"nodo-6","cantMaxima":"6","intervalo":"5"},{"id":"nodo-12","cantMaxima":"7","intervalo":"2"},{"id":"nodo-16","cantMaxima":"9","intervalo":"4"},{"id":"nodo-19","cantMaxima":"3","intervalo":"5"},{"id":"nodo-20","cantMaxima":"5","intervalo":"5"}],"nodosSalida":[{"id":"nodo-1","cantMaxima":"10","intervalo":"4"},{"id":"nodo-7","cantMaxima":"9","intervalo":"4"},{"id":"nodo-11","cantMaxima":"3","intervalo":"1"},{"id":"nodo-17","cantMaxima":"10","intervalo":"6"},{"id":"nodo-18","cantMaxima":"2","intervalo":"4"},{"id":"nodo-21","cantMaxima":"5","intervalo":"5"}],"nodosSemaforo":[{"id":"nodo-9","tiempoHorizontal":4,"tiempoVertical":4}],"nodosNoSemaforo":[{"id":"nodo-3"},{"id":"nodo-13"},{"id":"nodo-14"},{"id":"nodo-4"},{"id":"nodo-15"},{"id":"nodo-5"},{"id":"nodo-10"},{"id":"nodo-8"}],"nombre":"Modelo de Pruebas 1 semaforo"}',
        prueba2 : '{"callesHorizontales":[{"cantCarriles":3,"sentido":"Oeste-Este","cuadras":[{"longitud":100,"id":"cuadra-1","nodoOrigen":"nodo-1","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-2","nodoOrigen":"nodo-3","nodoDestino":"nodo-2"}],"preferencia":1,"sentidosPosibles":["Este-Oeste","Oeste-Este"]}],"callesVerticales":[{"cantCarriles":2,"sentido":"Norte-Sur","cuadras":[{"longitud":100,"id":"cuadra-13","nodoOrigen":"nodo-16","nodoDestino":"nodo-3"},{"longitud":100,"id":"cuadra-14","nodoOrigen":"nodo-3","nodoDestino":"nodo-17"}],"preferencia":1,"sentidosPosibles":["Norte-Sur","Sur-Norte"]}],"nodosEntrada":[{"id":"nodo-1","cantMaxima":"10","intervalo":"1"},{"id":"nodo-16","cantMaxima":"4","intervalo":"1"}],"nodosSalida":[{"id":"nodo-2","cantMaxima":"3","intervalo":"3"},{"id":"nodo-17","cantMaxima":"1","intervalo":"1"}],"nodosSemaforo":[{"id":"nodo-3","tiempoHorizontal":4,"tiempoVertical":4}],"nodosNoSemaforo":[],"nombre":"Prueba 1x1"}'
};

updates = {
        update1 : '{"blockStatus":[{"id": "cuadra-4","stock": 14,"color": {"r": 125,"g": 125,"b": 125,"a": 0}},{"id": "cuadra-1","stock": 50,"color": {"r": 255,"g": 255,"b": 255,"a": 0}}],"semaphoreStatus":[{"id": "nodo-10","state": "HORIZONTAL"},{"id": "nodo-8","state": "VERTICAL"}]}'      //modulo 7
};



app.controller('reproductorController',function($scope,$interval,$location,$uibModal,Resultados,Mapa,MapaUpdate,NodoBorde,Tef,Simulacion,ModoUpdate,$routeParams,$timeout,serveData,$cookies) {

        var sesion = $cookies.get(claveSesionUsuario)

        if (!sesion) {
            $location.url("/app/login");
        }

        inicilizarDicDatos = function () {
                var dicDatos = {};
                dicDatos["SIN_CONGESTION"] = 0;
                dicDatos["LEVE"] = 0;
                dicDatos["MEDIANA"] = 0;
                dicDatos["PESADA"] = 0;
                dicDatos["INTRANSITABLE"] = 0;
                return dicDatos;
        };
        var logicaReproductor;
        var dicDatosCuadras = inicilizarDicDatos();
        var stageReproductor = new createjs.Stage("reproductor");
        $scope.valorSema="imgblanco.png"
        createjs.Ticker.on("tick", stageReproductor);
        var modelo;

        cargarScopeConNodoBorde = function () {
            var nodosBorde = new Array();
            modelo.nodosEntrada.forEach(function (nodo) {
                    nodosBorde.push(nodo.id)
            });
            modelo.nodosSalida.forEach(function (nodo) {
                    nodosBorde.push(nodo.id)
            });
            $scope.nodosBordes = nodosBorde;
        };

        var iniciar = function() {
            if ($routeParams.id && json_mapas[$routeParams.id]) {
                modelo = json_mapas[$routeParams.id]
            } else {
                modelo = JSON.parse(mapas["modulo1"])
            }
            cargarScopeConNodoBorde();

            $scope.modelo = modelo;
            $scope.tipoEjecucion = "SIM";
            var cantidadDeCuadras = modelo.callesHorizontales.length + modelo.callesVerticales.length; //A modo de prueba
            logicaReproductor = new ReproductorController(modelo, stageReproductor, $scope, $timeout);
            logicaReproductor.dibujar();
            $timeout(function() {
                $scope.$apply();
            });


            var originalWidth = stageReproductor.canvas.width;
            var originalHeight = stageReproductor.canvas.height;
            var canvaspanel = $("#canvaspanel");
            canvaspanel.css("background-color", "#dce5f4");
            var initZoom = canvaspanel[0].clientWidth / originalWidth;
            var pendiente = (1 - initZoom) / (200 - 100)
            var ordenadaAlOrigen = (200 * initZoom - 100 * 1) / (200 - 100)

            var aFactorEscala = function (zoom) {
                return zoom * pendiente + ordenadaAlOrigen;
            }

            var aplicarZoom = function (value) {
                var factor = aFactorEscala(value)
                stageReproductor.canvas.width = originalWidth * factor;
                stageReproductor.canvas.height = originalHeight * factor;
                stageReproductor.update();
                stageReproductor.scaleX = factor;
                stageReproductor.scaleY = factor;
            }

            // With JQuery
            $("#ex6").slider();
            $("#ex6").on("slide", function (slideEvt) {
                var value = slideEvt.value;
                $("#ex6SliderVal").text(value + "%");
                aplicarZoom(value);
            });

            aplicarZoom(100)
        }

        if(window.json_mapas)
            iniciar();
        else
            dao.obtenerMapas(sesion, iniciar)

        var iniciarUpdateHiloFront = function (){

                $scope.Timer = $interval(function () {
                    //Display the current time.
                    $scope.contador = $scope.contador + 1;
                    if (!($scope.contador % $scope.intervalo)) {
                        update()
                    }
                }, 1000);

        };

        var detenerHiloFront = function () {
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
                $scope.Timer = null;
            }
        }

        $scope.contador = 0;
        $scope.Timer = null;
        $scope.intervalo = 5; //se puede sertear en el reproductor antes de arrancar
        //Timer start function.
        $scope.iniciar = function () {
                Mapa.save(JSON.stringify(modelo));
                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
                if ($scope.Timer) {
                    detenerHiloFront();
                    iniciarUpdateHiloFront();
                } else {
                    iniciarUpdateHiloFront();
                }
            $scope.contador = 0;
        };
        $scope.detener = function () {
                detenerHiloFront();
                var simulacionUpdate = {};
                simulacionUpdate["nuevoTiempo"] = 0;
                simulacionUpdate["operacion"] = "DETENER";
                Simulacion.save(JSON.stringify(simulacionUpdate));
        };

        update = function () {

                //ACA ESTOY PIDIENDO ACTUALIZACIONES AL ENDPOINT DEL BACKEND

                MapaUpdate.query(function (data) {
                        console.log("blockstatus");
                        console.log(data);
                        console.log(dicDatosCuadras);
                        logicaReproductor.actualizar(data);
                        modelo.actualizarCongestion(data, dicDatosCuadras);
                        modelo.tamizarDatosCongestion(dicDatosCuadras);
                        drawChart(dicDatosCuadras);
                        actualizarVelocimetro();
                });
                
        };
    
        $scope.generarResultados = function () {
//            $location.url("/app/resultado/" + modelo.id);
            window.open('/app/resultado/' + modelo.id, '_blank');
        }

        $scope.actualizarNodoBorde = function () {
                if(!$scope.cuadraSeleccionada) return;
                var uNodoBorde = {};
                uNodoBorde["id"] = $scope.nodoEntrada.id;
                uNodoBorde["cantMaxima"] = $scope.nodoEntrada.cantMaxima;
                uNodoBorde["intervalo"] = $scope.nodoEntrada.intervalo;
                NodoBorde.save(JSON.stringify(uNodoBorde));
                uNodoBorde["id"] = $scope.nodoSalida.id;
                uNodoBorde["cantMaxima"] = $scope.nodoSalida.cantMaxima;
                uNodoBorde["intervalo"] = $scope.nodoSalida.intervalo;
                NodoBorde.save(JSON.stringify(uNodoBorde));
        };
        $scope.avanzarEvento = function () {
                var simulacionUpdate = {};
                simulacionUpdate["nuevoTiempo"] = 0;
                simulacionUpdate["operacion"] = "AVANZAR";
                Simulacion.save(JSON.stringify(simulacionUpdate));
        };
        $scope.reanudar = function () {
                var simulacionUpdate = {};
                simulacionUpdate["nuevoTiempo"] = 0;
                simulacionUpdate["operacion"] = "REANUDAR";
                Simulacion.save(JSON.stringify(simulacionUpdate));
                if (!$scope.Timer) {
                iniciarUpdateHiloFront();
                }
        };
        $scope.masTiempo = function () {
                var simulacionUpdate = {};
                simulacionUpdate["nuevoTiempo"] = 1000;
                simulacionUpdate["operacion"] = "BAJAR";
                Simulacion.save(JSON.stringify(simulacionUpdate));
        };
        $scope.menosTiempo = function () {
                var simulacionUpdate = {};
                simulacionUpdate["nuevoTiempo"] = 1000;
                simulacionUpdate["operacion"] = "SUBIR";
                Simulacion.save(JSON.stringify(simulacionUpdate));
        }

        $scope.cambiarModo = function (){
            ModoUpdate.put({modo: $scope.tipoEjecucion})
        }


        // Retorna un número aleatorio entre min (incluido) y max (excluido)
        randomEntre = function (min, max) {
                return Math.random() * (max - min) + min;
        };

        actualizarVelocimetro = function () {
                var dic = {};
                dic["1"] = randomEntre(10, 80);
                dic["2"] = randomEntre(10, 50);
                drawChartVelocimetro(dic);
        };

        var resize = function () {
                var headerHeight = parseInt($("#header").height(), 10);
                var controlesHeight = parseInt($("#controles").height(), 10);
                $("#canvaspanel").css("height", tgngviewheight - 80 - headerHeight - controlesHeight);
                $("#info").height($("#player").height())
                $(".panel-body").height(
                    $("#info").height() - $("#titulo-modulo").height() - 130 -
                    $(".tgpanelbutton").length * $(".tgpanelbutton").height()
                )
        };

        $(".tgpanelbutton").click(resize)

        window.addEventListener("resize", resize);
        resize();

        var redondear = function (nro) {
                var s = nro.toString();
                var r = s.substring(0, s.indexOf('.') + 3);
                if (s.indexOf('.') == -1) r = r + ".00"
                if (r.indexOf('.') == (r.length - 2)) r = r + "0";
                return r
        }

        //cargarMapa = function (unMapa){
        //HABRÀ AQUI UNA CARGA DEL MAPA DESDE LA PERSISTENCIA CON ID DE LA URL ACTUAL
        //}
     //   $scope.abrir = function () {
       //         open('views/tef.html', '', 'top=300,left=300,width=300,height=300');
              // Tef.query(function(data){
                //        $scope.laTef = data;
                   //     alert(JSON.stringify(data));
               // });
    //    };
        $scope.abrir = function () {
                console.log('opening pop up');
                 Tef.query(function(data){
                        $scope.laTef = JSON.stringify(data);
                  //   alert(JSON.stringify(data));
                 });

                var modalInstance = $uibModal.open({
                        templateUrl: 'views/tef.html',
                        controller: 'tefController',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                });
        }
});