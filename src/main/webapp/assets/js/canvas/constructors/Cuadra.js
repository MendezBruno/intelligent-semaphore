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


    p.setup = function() {
        var width = 20;     //viene predefinido
        //var height =10;
        container = new createjs.Container();
        //container.addChild(circle, btn1);
        //container.x = 100;

        var background = new createjs.Shape();
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
    } ;
    p.handleRollOver = function(event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    window.Cuadra = createjs.promote(Cuadra, "Container");
}());
