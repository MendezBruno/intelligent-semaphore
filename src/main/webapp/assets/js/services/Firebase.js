/**
 * Created by maria on 25/9/2016.
 */

function Firebase () {
    var config = {
        apiKey: "AIzaSyCmWi3yQ4tnJ_ReiqQLOy1WnSLVcQTVGsY",
        authDomain: "mi-proyecto-c72af.firebaseapp.com",
        databaseURL: "https://mi-proyecto-c72af.firebaseio.com",
        storageBucket: "mi-proyecto-c72af.appspot.com",
        messagingSenderId: "150312729443"
    };
        console.log('firebase:' + firebase.initializeApp(config));
        //firebase.initializeApp(config);
        var database = firebase.database();
};

updateMapasFirebase = function (callback) {
    firebase.database().ref('/' + 'pepe/mapas' ).once('value', function(snapshot) {
        json_mapas = snapshot.val();
        for (var claveBD in json_mapas) {
            json_mapas[claveBD] = MapaEditor.desParsear(JSON.stringify(json_mapas[claveBD]))
        }
        for (var nombreMapa in mapas) { json_mapas[nombreMapa] = MapaEditor.desParsear(mapas[nombreMapa]) }
        if (callback) callback();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
