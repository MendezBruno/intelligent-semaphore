LocalDao = function() {
    this.i = 0
    dao = this
}

LocalDao.prototype.obtenerMapas = function(uid, callback) {
    json_mapas = {}
    for (var string in mapas) {
        json_mapas[string] = MapaEditor.desParsear(mapas[string])
    }
    if (callback) callback()
}

LocalDao.prototype.agregarMapa = function(uid, mapa, callback) {
    var key = mapa.id

    if(!key) {
        key = "modulo-x"+dao.i
        mapa.id = key
    }

    window.json_mapas[key] = mapa
    mapa.date = new Date()
    if (callback) callback()
}

LocalDao.prototype.eliminarMapa = function(uid, idMapa, callback) {
    delete json_mapas[idMapa]
    if (callback) callback()
}

FirebaseDao = function() {
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
    dao = this
}

FirebaseDao.prototype.obtenerMapas = function(uid, callback) {
    firebase.database().ref('/' + uid +'/mapas' ).once('value', function(snapshot) {
        var mapas = snapshot.val();
        if (mapas) {
            json_mapas = mapas
            for (var claveBD in json_mapas) {
                json_mapas[claveBD] = MapaEditor.desParsear(JSON.stringify(json_mapas[claveBD]))
                json_mapas[claveBD].id = claveBD
            }
        } else {
            json_mapas = {}
        }
        if (callback) callback()
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

FirebaseDao.prototype.agregarMapa = function(uid, mapa, callback) {
    var key = mapa.id

    if(!key) {
        key = firebase.database().ref().child('/'+uid+'/mapas').push().key;
        mapa.id = key
    }

    var updates = {}
    updates['/' + uid + '/mapas/' + key] = mapa
    window.json_mapas[key] = mapa
    mapa.date = new Date()
    firebase.database().ref().update(updates, function(){
        if (callback) callback()
    })
}

FirebaseDao.prototype.eliminarMapa = function(uid, idMapa, callback) {
    firebase.database().ref().child('/'+uid+'/mapas/'+idMapa)
        .remove(function(error) {
            if (error) {
                console.log(error);
            } else {
                if (callback) callback()
            }
        })
}