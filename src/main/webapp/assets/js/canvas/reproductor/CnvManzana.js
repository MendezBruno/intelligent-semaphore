/**
 * Created by Ezequiel on 14/08/2016.
 */

function CnvManzana(posX, posY) {
    this.Container_constructor();
    this.posX=posX;
    this.posY=posY;
    this.setup();
};

createjs.extend(CnvManzana, createjs.Container);

CnvManzana.largo = 300;
CnvManzana.radioEsquina = 40;

CnvManzana.prototype.setup = function () {
    //this.background = new createjs.Shape();
    //this.background.graphics
    //    .beginFill(ColoresRGB.getGRAY().toHexa())
    //    .drawRect(this.posX,this.posY,
    //        CnvManzana.largo,CnvManzana.largo);
    var cordon = new createjs.Shape();
    cordon.graphics
        .beginFill("#979797")
        .drawRoundRect(this.posX, this.posY,
            CnvManzana.largo,CnvManzana.largo,
            CnvManzana.radioEsquina);
    //this.addChild(this.background);
    this.addChild(cordon);
}

window.CnvManzana = createjs.promote(CnvManzana, "Container");