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
