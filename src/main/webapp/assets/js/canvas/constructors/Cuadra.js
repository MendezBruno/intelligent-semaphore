(function() {

    function Cuadra(label,posX, posY,largo,color,horizontal) {
        this.Container_constructor();

        this.label= label;
        this.posX = posX;
        this.posY = posY;
        this.largo = largo;
        this.color = color;
        this.horizontal = horizontal;

        this.setup();
    }
    var p = createjs.extend(Cuadra, createjs.Container);


    p.setup = function() {
        var text = new createjs.Text(this.label, "20px Arial", "#000");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth()+this.largo;
        var height = text.getMeasuredHeight()+20;

        text.x = width/2;
        text.y = 10;

        var background = new createjs.Shape();
        if (this.horizontal){
        background.graphics.beginFill(this.color).drawRoundRect(this.posX,this.posY,this.largo,height,10);}
        else {background.graphics.beginFill(this.color).drawRoundRect(this.posX,this.posY,width,this.largo,10);}

        this.addChild(background, text);
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

    window.Cuadra = createjs.promote(Cuadra, "Container");
}());
