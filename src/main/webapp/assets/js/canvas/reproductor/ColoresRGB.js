/**
 * Created by Ezequiel on 14/08/2016.
 */

/**
 * Representa el conjunto rgb con metodos utiles para easeljs
 * @param r Entero entre 0 y 255.
 * @param g Entero entre 0 y 255.
 * @param b Entero entre 0 y 255.
 * @constructor
 */
function ColoresRGB(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

/**
 * @returns {String} Equivalente hexa de los colores rgb
 */
ColoresRGB.prototype.toHexa = function() {
    return "#" +
    ("0" + parseInt(this.r,10).toString(16)).slice(-2) +
    ("0" + parseInt(this.g,10).toString(16)).slice(-2) +
    ("0" + parseInt(this.b,10).toString(16)).slice(-2);
};

/**
 * @returns {String} Equivalente rgba del objeto.
 */
ColoresRGB.prototype.toRGBA = function () {
    return createjs.Graphics.getRGB(
        parseInt(this.r),parseInt(this.g),parseInt(this.b),1);
}

/**
 * @returns {string} Un string apropiado para la propiedad _fill.style
 *  de los graphics de un shape de easeljs. Su formato es "rgba({r},{g},{b},1)"
 */
ColoresRGB.prototype.toString = function() {
    return "rgba("+parseInt(this.r)+","+parseInt(this.g)+","+parseInt(this.b)+",1)";
};

/**
 * @returns {ColoresRGB} Nueva instancia de un color gris claro
 */
ColoresRGB.getGRAY = function() {
    return new ColoresRGB(179,179,179);
}

/**
 * @returns {ColoresRGB} Nueva instancia de un color rojiso
 */
ColoresRGB.getRED = function() {
    return new ColoresRGB(255,0,0);
}

/**
 * @returns {ColoresRGB} Nueva instancia de un color celeste
 */
ColoresRGB.getSKYBLUE = function () {
    return new ColoresRGB(0,198,255);
}

/**
 * @returns {ColoresRGB} Nueva instancia de un color amarillo
 */
ColoresRGB.getYELLOW = function () {
    return new ColoresRGB(254,255,148);
}

ColoresRGB.getPANEL_GRAY = function () {
    return new ColoresRGB(227,227,227);
}