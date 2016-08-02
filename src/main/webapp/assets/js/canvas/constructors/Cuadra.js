(function() {

    function Cuadra(id,posX, posY,largo,color,horizontal) {
        this.Container_constructor();

        this.id= id;
        this.posX = posX;
        this.posY = posY;
        this.largo = largo;
        this.color = color;
        this.horizontal = horizontal;


        this.setup();
    }
    var p = createjs.extend(Cuadra, createjs.Container);

    var background;
    var width = 20;
    var marcado = false;

    p.setup = function() {
            //viene predefinido
        container = new createjs.Container();
        background = new createjs.Shape();
        if (this.horizontal){
        background.graphics.beginFill(this.color).drawRect(this.posX,this.posY,this.largo,width,10);
        }
        else {
        background.graphics.beginFill(this.color).drawRect(this.posX,this.posY,width,this.largo,10);
        }

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
        alert("You clicked on a button:"+this.id);
        if (!marcado) { this.marcar(event.currentTarget.children[0])}
        else {this.desmarcar(event.currentTarget.children[0])}

        console.log(event.currentTarget.children[0]);
    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    p.marcar= function(child){

        if (this.horizontal){
            child.graphics.clear().beginFill(this.color).beginStroke("#000000").setStrokeStyle(1).drawRect(this.posX,this.posY,this.largo,width,10);
        }
        else {
            child.graphics.clear().beginFill(this.color).beginStroke("#000000").setStrokeStyle(1).drawRect(this.posX,this.posY,width,this.largo,10);
        }
        marcado = true;
    };

    p.desmarcar= function(child){
        if (this.horizontal){
            child.graphics.clear().beginFill(this.color).drawRect(this.posX,this.posY,this.largo,width,10);
        }
        else {
            child.graphics.clear().beginFill(this.color).drawRect(this.posX,this.posY,width,this.largo,10);
        }
        marcado= false;
    }

    window.Cuadra = createjs.promote(Cuadra, "Container");
}());
