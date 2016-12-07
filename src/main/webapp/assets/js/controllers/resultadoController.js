/**
 * Created by bruno on 14/10/2016.
 */
app.controller('resultadoController', function($scope,Resultados,$cookies,$timeout,$routeParams) {

    var sesion = $cookies.get(claveSesionUsuario);

    if (!sesion) {
        $location.url("/app/login");
    }

    document.title = "Resultados de ejecucion"

    var inicializarTiempoSemaforo = function (cantGenes) {
        var array = new Array();
        for (var i=1; i<cantGenes+1; i++){
            var item = {};
            item.id = i;
            array.push(item);
        }
        return array;
    }

     var cargarScopeConMejorTiempoSemaforo = function (datalini) {
         //sort de datalini por aptitud
         datalini.sort(function (tcaA, tcaB) {
             return tcaA - tcaB;});
         $scope.tiempoSemaforo = inicializarTiempoSemaforo(datalini[0].cromosoma.genes.length /2);
         var elMejor = datalini[0].cromosoma;
         var elSegundo = datalini[1].cromosoma;
         var elTercero = datalini[2].cromosoma;

         var tiempoH = 0;
         var tiempoV = 1;
         $scope.tiempoSemaforo.forEach(function (item) {
                 item.tiempoUnoH = elMejor.genes[tiempoH];
                 item.tiempoUnoV = elMejor.genes[tiempoV];
                 item.tiempoDosH = elSegundo.genes[tiempoH];
                 item.tiempoDosV = elSegundo.genes[tiempoV];
                 item.tiempoTresH = elTercero.genes[tiempoH];
                 item.tiempoTresV = elTercero.genes[tiempoV];
             tiempoH++;
             tiempoV++;
             } );
     };

    var ejecutarCargarResultados = function () {
        Resultados.query(function (data) {
            if (data.tiempoCromosomaAptitud) {
                cargarScopeConMejorTiempoSemaforo(data.tiempoCromosomaAptitud);
                $scope.tiempoCromosoma = true;
            }

            if (data.tiempoCongestion) {
                drawChartLinearTiempoCongestion(data);
            }
            if (data.tiempoCongestionXcuadra){
                drawHistogramaCuadras(data.tiempoCongestionXcuadra)
            }
            if (data.tiempoVelocidad){
                drawChartLinearTiempoVelocidad(data);
            }
            if (data.tiempoVelocidadXCuadra){
                drawChartVelocidadXCuadra(data);
            }

            if(data.tiempoAptitud){
                drawChartLinearTiempoAptitud(data)
            }

            if(data.datosRna){

                function descargarArchivo(contenidoEnBlob, nombreArchivo) {
                    //creamos un FileReader para leer el Blob
                    var reader = new FileReader();
                    //Definimos la función que manejará el archivo
                    //una vez haya terminado de leerlo
                    reader.onload = function (event) {
                        //Usaremos un link para iniciar la descarga
                        var save = document.createElement('a');
                        save.href = event.target.result;
                        save.target = '_blank';
                        //Truco: así le damos el nombre al archivo
                        save.download = nombreArchivo || 'archivo.dat';
                        var clicEvent = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                        //Simulamos un clic del usuario
                        //no es necesario agregar el link al DOM.
                        save.dispatchEvent(clicEvent);
                        //Y liberamos recursos...
                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    };
                    //Leemos el blob y esperamos a que dispare el evento "load"
                    reader.readAsDataURL(contenidoEnBlob);
                };

                function generarTexto(valores) {
                    var data = valores;
                    var texto = new Array();
                    var csvContent = "IteracionActual;FuncionError;TazaDeAprendizaje;ErrorMaximo;ErrorMinimo\n";

                    csvContent =csvContent + data.getCurrentIteracion + ";" + data.getErrorFunction + ";" + data.getLearninRate + ";" + data.getMaxError + ";" + data.getMinErrorChange + "\n";

                    texto.push(csvContent);

                    //El constructor de Blob requiere un Array en el primer
                    //parámetro así que no es necesario usar toString. El
                    //segundo parámetro es el tipo MIME del archivo
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                };

                descargarArchivo(generarTexto(data.datosRna), 'datosRNA.csv');

            };

            if(data.tiempoResultadoRna){

                function descargarArchivo(contenidoEnBlob, nombreArchivo) {
                    //creamos un FileReader para leer el Blob
                    var reader = new FileReader();
                    //Definimos la función que manejará el archivo
                    //una vez haya terminado de leerlo
                    reader.onload = function (event) {
                        //Usaremos un link para iniciar la descarga
                        var save = document.createElement('a');
                        save.href = event.target.result;
                        save.target = '_blank';
                        //Truco: así le damos el nombre al archivo
                        save.download = nombreArchivo || 'archivo.dat';
                        var clicEvent = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                        //Simulamos un clic del usuario
                        //no es necesario agregar el link al DOM.
                        save.dispatchEvent(clicEvent);
                        //Y liberamos recursos...
                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    };
                    //Leemos el blob y esperamos a que dispare el evento "load"
                    reader.readAsDataURL(contenidoEnBlob);
                };

                function generarTexto(valores) {
                    var data = valores;
                    var texto = new Array();
                    var csvContent = "Aptitud;Cambio;Semaforo1;Semaforo2;Semaforo3;Semaforo4;Semaforo5;Semaforo6;Semaforo7;Semaforo8;Semaforo9;Semaforo10\n";
                    data.forEach(function(infoArray, index){

                            dataString = infoArray.aptitud + ";";

                            dataString = dataString + infoArray.cambio + ";";

                            aux = dataString + infoArray.tiempoSemafors.join(";");

                            aux = replaceAll(aux,".",",");

                            csvContent = csvContent +aux + "\n";

                        //   dataString = infoArray.join(";");
                        //   csvContent = csvContent + dataString + "\n";
                        //csvContent += index < data.length ? dataString+ "\n" : dataString;

                    });

                    texto.push(csvContent);

                    //El constructor de Blob requiere un Array en el primer
                    //parámetro así que no es necesario usar toString. El
                    //segundo parámetro es el tipo MIME del archivo
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                };

                descargarArchivo(generarTexto(data.tiempoResultadoRna), 'archivoRNA.csv');

            }

            function replaceAll( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1)
                text = text.toString().replace(busca,reemplaza);
                return text;
            }

            if(data.tiempoPoblacion){

                function descargarArchivo(contenidoEnBlob, nombreArchivo) {
                    //creamos un FileReader para leer el Blob
                    var reader = new FileReader();
                    //Definimos la función que manejará el archivo
                    //una vez haya terminado de leerlo
                    reader.onload = function (event) {
                        //Usaremos un link para iniciar la descarga
                        var save = document.createElement('a');
                        save.href = event.target.result;
                        save.target = '_blank';
                        //Truco: así le damos el nombre al archivo
                        save.download = nombreArchivo || 'archivo.dat';
                        var clicEvent = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                        //Simulamos un clic del usuario
                        //no es necesario agregar el link al DOM.
                        save.dispatchEvent(clicEvent);
                        //Y liberamos recursos...
                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    };
                    //Leemos el blob y esperamos a que dispare el evento "load"
                    reader.readAsDataURL(contenidoEnBlob);
                };

                function generarTexto(valores) {
                    var data = valores;
                    var texto = new Array();
                    var csvContent = "Aptitud;Tiempo;Gen1;Gen2;Gen3;Gen4;Gen5;Gen6;Gen7;Gen8;Gen9;Gen10\n";
                    data.forEach(function(infoArray, index){

                        var tiempo;

                        tiempo = infoArray.time;

                        infoArray.poblacion.forEach(function(infoArray1, index){

                            dataString = infoArray1.aptitud + ";";

                            dataString = dataString + tiempo + ";";

                            aux = dataString + infoArray1.genes.join(";");

                            csvContent = csvContent +aux + "\n";

                        });

                     //   dataString = infoArray.join(";");
                     //   csvContent = csvContent + dataString + "\n";
                        //csvContent += index < data.length ? dataString+ "\n" : dataString;

                    });

                    texto.push(csvContent);

                    //El constructor de Blob requiere un Array en el primer
                    //parámetro así que no es necesario usar toString. El
                    //segundo parámetro es el tipo MIME del archivo
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                };

                descargarArchivo(generarTexto(data.tiempoPoblacion), 'archivoPoblacion.csv');

            }

            if(data.tiempoQueMuta){

                function descargarArchivo(contenidoEnBlob, nombreArchivo) {
                    //creamos un FileReader para leer el Blob
                    var reader = new FileReader();
                    //Definimos la función que manejará el archivo
                    //una vez haya terminado de leerlo
                    reader.onload = function (event) {
                        //Usaremos un link para iniciar la descarga
                        var save = document.createElement('a');
                        save.href = event.target.result;
                        save.target = '_blank';
                        //Truco: así le damos el nombre al archivo
                        save.download = nombreArchivo || 'archivo.dat';
                        var clicEvent = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                        //Simulamos un clic del usuario
                        //no es necesario agregar el link al DOM.
                        save.dispatchEvent(clicEvent);
                        //Y liberamos recursos...
                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    };
                    //Leemos el blob y esperamos a que dispare el evento "load"
                    reader.readAsDataURL(contenidoEnBlob);
                };

                function generarTexto(valores) {
                    var data = valores;
                    var texto = new Array();
                    var csvContent = "Muto?;Tiempo\n";
                    data.forEach(function(infoArray, index){

                            dataString = infoArray.itero + ";";

                            aux = dataString + infoArray.time + "\n";

                            csvContent = csvContent + aux;

                        //   dataString = infoArray.join(";");
                        //   csvContent = csvContent + dataString + "\n";
                        //csvContent += index < data.length ? dataString+ "\n" : dataString;

                    });

                    texto.push(csvContent);

                    //El constructor de Blob requiere un Array en el primer
                    //parámetro así que no es necesario usar toString. El
                    //segundo parámetro es el tipo MIME del archivo
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                };

                descargarArchivo(generarTexto(data.tiempoQueMuta), 'archivoMutacion.csv');

            }



        });

    };

    var iniciar = function() {
        var mapa = json_mapas[$routeParams.id];
        var modelo1 = MapaEditor.desParsear(JSON.stringify(mapa));
        //var modelo1 = MapaEditor.desParsear(mapas["modulo6"])
        $scope.callesV= modelo1.callesHorizontales[0].cuadras.length - 1;
        $scope.callesH= modelo1.callesVerticales[0].cuadras.length - 1;
        $scope.nombre=modelo1.nombre;
        $scope.intervalo = 5; //se puede settear en el reproductor antes de arrancar
        stage = new createjs.Stage("mapa");
        logica = new GrillaController(3,3,30,stage,$scope,$timeout);
        createjs.Ticker.on("tick", stage);
        logica.setModelo(modelo1);
        logica.redibujar();
        var i = 1

        $("#canvas-container").height($("#mapa").height())

        logica.centrales.forEach(function(c) {
            c.forEach(function(d){
                if (d instanceof CnvNodoControl && d.esSemaforo) {
                    d.setNumero(i)
                    i++
                }
            })
        })

        $timeout(function() {
            $scope.$apply();
        });

        ejecutarCargarResultados();
    }

    if(window.json_mapas)
        iniciar();
    else
        updateMapasFirebase(iniciar,sesion);

   //imprimirEnPdf();

    $scope.printPDF = function() {
    window.print();
    }



});