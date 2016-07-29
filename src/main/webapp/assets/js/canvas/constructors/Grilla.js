(function() {

    function Grilla(fila, columna, largo) {
        this.Container_constructor();

        this.fila = fila;
        this.columna = columna;
        this.largo = largo;

        this.setup();
    }
    var p = createjs.extend(Grilla, createjs.Container);


    p.setup = function() {

        var i;
        var pos=0;
        for (i = 0; i < this.fila; i++) {
            this.addChild(new Cuadra(i,pos,0,this.largo,true))
            pos = pos+10;

        };

        this.addChild(background);
        this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random()*10;
        this.count = 0;
    } ;

    p.handleClick = function (event) {
        alert("You clicked on a button: "+this.label);
    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    window.Grilla = createjs.promote(Grilla, "Container");
}());
/**
 * Created by bruno on 28/07/16.
 */
