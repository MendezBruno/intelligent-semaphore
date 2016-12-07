/**
 * Created by Ezequiel on 14/08/2016.
 */

function CnvManzana(posX, posY) {
    this.Container_constructor();
    this.posX=posX;
    this.posY=posY;
    this.textInferior = new createjs.Text("", "20px Arial", "#000000");
    this.textInferior.x = this.posX + CnvManzana.largo/2 - this.textInferior.getMeasuredWidth() - 30;
    this.textInferior.y = this.posY + CnvManzana.largo - CnvManzana.margenInferior;
    this.textInferior.textBaseline = "alphabetic";
    this.textDerecho = new createjs.Text("", "20px Arial", "#000000");
    this.textDerecho.x = this.posX + CnvManzana.largo - CnvManzana.margenDerecho;
    this.textDerecho.y = this.posY + CnvManzana.largo/2 ;
    this.textDerecho.textBaseline = "alphabetic";
    this.setup();
    this.addChild(this.textInferior);
    this.addChild(this.textDerecho);

};

createjs.extend(CnvManzana, createjs.Container);

CnvManzana.largo = 300;
CnvManzana.radioEsquina = 40;
CnvManzana.margenInferior = 10;
CnvManzana.margenDerecho = 130;

CnvManzana.prototype.setup = function () {
    //this.background = new createjs.Shape();
    //this.background.graphics
    //    .beginFill(ColoresRGB.getGRAY().toHexa())
    //    .drawRect(this.posX,this.posY,
    //        CnvManzana.largo,CnvManzana.largo);
    var cordon = new createjs.Shape();
    cordon.graphics
        .beginFill("#999999")
        .drawRoundRect(this.posX, this.posY,
            CnvManzana.largo,CnvManzana.largo,
            CnvManzana.radioEsquina);
    //this.addChild(this.background);
    this.addChild(cordon);
};

CnvManzana.prototype.escribirInformacionAbajo = function (id,datos){
   this.textInferior.text=datos.stock+" "+id;

}

CnvManzana.prototype.escribirInformacionDerecha = function (id,datos){
   this.textDerecho.text= id +"  "+ datos.stock ;

}

window.CnvManzana = createjs.promote(CnvManzana, "Container");