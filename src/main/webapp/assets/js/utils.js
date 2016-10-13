var authTemplates = [
    { name: 'login', url: 'views/templates/login.html'},
    { name: 'loggedInUser', url: 'views/templates/loggedInUser.html'}
];

claveSesionUsuario = "sesionUsuario"

pathFlechas = [
    {'Este-Oeste': '/assets/img/flechaDerecha.jpeg',
     'Sur-Norte': '/assets/img/flechaArriba.jpeg',
     'Norte-Sur': '/assets/img/flechaAbajo.jpeg',
     'Oeste-Este': '/assets/img/flechaIzquierda.jpeg'}
];

Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};


Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};
