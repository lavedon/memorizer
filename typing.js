var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.bitmapFont('atari', 'atari-classic.png', 'atari-classic.xml');

}
// @TODO Make a key class with key code and boolean

var bmpText;
var spaceKey;
var spaceKeyIsDown = false;
var aKey;
var aKeyIsDown = false;
var bKey;
var bKeyIsDown = false;
var cKey;
var cKeyIsDown = false;
var dKey;
var dKeyIsDown = false;
var eKey;
var eKeyIsDown = false;
var fKey;
var fKeyIsDown = false;
var gKey;
var gKeyIsDown;
var hKey;
var hKeyIsDown;
var iKey;
var iKeyIsDown;
var jKey;
var jKeyIsDown;
var kKey;
var kKeyIsDown;
var lKey;
var lKeyIsDown;
var mKey;
var mKeyIsDown;
var nKey;
var nKeyIsDown;
var oKey;
var oKeyIsDown;
var pKey;
var pKeyIsDown;
var qKey;
var qKeyIsDown;
var rKey;
var rKeyIsDown;
var sKey;
var sKeyIsDown;
var tKey;
var tKeyIsDown;
var uKey;
var uKeyIsDown;
var vKey;
var vKeyIsDown;
var wKey;
var wKeyIsDown;
var xKey;
var xKeyIsDown;
var yKey;
var yKeyIsDown;
var zKey;
var zKeyIsDown;
var zeroKey;
var zeroKeyIsDown;
var oneKey;
var oneKeyIsDown;
var twoKey;
var twoKeyIsDown;
var threeKey;
var threeKeyIsDown;
var fourKey;
var fourKeyIsDown;
var fiveKey;
var fiveKeyIsDown;
var sixKey;
var sixKeyIsDown;
var sevenKey;
var sevenKeyIsDown;
var eightKey;
var eightKeyIsDown;
var nineKey;
var nineKeyIsDown;

var colonKey;
var colonKeyIsDown;
var equalsKey;
var equalsKeyIsDown;
var underscoreKey;
var underscoreKeyIsDown;
var questionKey;
var questionKeyIsDown;
var tildeKey;
var tildeKeyIsDown;
var openBracketKey;
var openBracketKeyIsDown;
var backwardSlashKey;
var backwardSlashKeyIsDown;
var closedBracketKey;
var closedBracketKeyIsDown;
var quotesKey;
var quotesKeyIsDown;
var plusKey;
var plusKeyIsDown;
var minusKey;
var minusKeyIsDown;



var whichKey;
var letterText = "";
var newText;


function create() {

    game.stage.backgroundColor = '#736357';

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
    hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
    iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
    jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
    kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
    lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
    oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
    pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    tKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
    uKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
    vKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    yKey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    fiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    sixKey = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    sevenKey = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    eightKey = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    nineKey = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    colonKey = game.input.keyboard.addKey(Phaser.Keyboard.COLON);
    equalsKey = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
    underscoreKey = game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);
    questionKey = game.input.keyboard.addKey(Phaser.Keyboard.QUESTION_MARK);
    tildeKey = game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
    openBracketKey = game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET);
    backwardSlashKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKWARD_SLASH);
    closedBracketKey = game.input.keyboard.addKey(Phaser.Keyboard.CLOSED_BRACKET);
    quotesKey = game.input.keyboard.addKey(Phaser.Keyboard.QUOTES);
    plusKey = game.input.keyboard.addKey(Phaser.Keyboard.PLUS);
    minusKey = game.input.keyboard.addKey(Phaser.Keyboard.MINUS);

}
     


function update() {

    if (aKey.isDown)
    {
        if (!aKeyIsDown)
        {
        whichKey = "A";
        draw_letter(whichKey);
        }

        aKeyIsDown = true;
    }
    if (aKey.isUp)
    {
        aKeyIsDown = false;
    } 

    if (bKey.isDown)
    {
        if (!bKeyIsDown)
        {
        whichKey = "B";
        draw_letter(whichKey);
        }

        bKeyIsDown = true;
    }

    if (bKey.isUp)
    {
        bKeyIsDown = false;
    }

    if (cKey.isDown)
    {
        whichKey = "C";
        draw_letter(whichKey);
    }
    if (dKey.isDown)
    {
        whichKey = "D";
        draw_letter(whichKey);
    }
    if (eKey.isDown)
    {
        whichKey = "E";
        draw_letter(whichKey);
    }
    if (fKey.isDown)
    {
        whichKey = "F";
        draw_letter(whichKey);
    }
    if (gKey.isDown)
    {
        whichKey = "G";
        draw_letter(whichKey);
    }
    if (hKey.isDown)
    {
        whichKey = "H";
        draw_letter(whichKey);
    }
    if (iKey.isDown)
    {
        whichKey = "I";
        draw_letter(whichKey);
    }
    if (jKey.isDown)
    {
        whichKey = "J";
        draw_letter(whichKey);
    }
    if (kKey.isDown)
    {
        whichKey = "K";
        draw_letter(whichKey);
    }
    if (lKey.isDown)
    {
        whichKey = "L";
        draw_letter(whichKey);
    }
    if (mKey.isDown)
    {
        whichKey = "M";
        draw_letter(whichKey);
    }
    if (nKey.isDown)
    {
        whichKey = "N";
        draw_letter(whichKey);
    }
    if (oKey.isDown)
    {
        whichKey = "O";
        draw_letter(whichKey);
    }
    if (pKey.isDown)
    {
        whichKey = "P";
        draw_letter(whichKey);
    }
    if (qKey.isDown)
    {
        whichKey = "Q";
        draw_letter(whichKey);
    }
    if (rKey.isDown)
    {
        whichKey = "R";
        draw_letter(whichKey);
    }
    if (sKey.isDown)
    {
        whichKey = "S";
        draw_letter(whichKey);
    }
    if (tKey.isDown)
    {
        whichKey = "T";
        draw_letter(whichKey);
    }
    if (uKey.isDown)
    {
        whichKey = "U";
        draw_letter(whichKey);
    }
    if (vKey.isDown)
    {
        whichKey = "V";
        draw_letter(whichKey);
    }
    if (wKey.isDown)
    {
        whichKey = "W";
        draw_letter(whichKey);
    }
    if (xKey.isDown)
    {
        whichKey = "X";
        draw_letter(whichKey);
    }
    if (yKey.isDown)
    {
        whichKey = "Y";
        draw_letter(whichKey);
    }
    if (zKey.isDown)
    {
        whichKey = "Z";
        draw_letter(whichKey);
    }
    if (zeroKey.isDown)
    {
        whichKey = "0";
        draw_letter(whichKey);
    }
    if (oneKey.isDown)
    {
        whichKey = "1";
        draw_letter(whichKey);
    }
    if (twoKey.isDown)
    {
        whichKey = "2";
        draw_letter(whichKey);
    }
    if (threeKey.isDown)
    {
        whichKey = "3";
        draw_letter(whichKey);
    }
    if (fourKey.isDown)
    {
        whichKey = "4";
        draw_letter(whichKey);
    }
    if (fiveKey.isDown)
    {
        whichKey = "5";
        draw_letter(whichKey);
    }
    if (sixKey.isDown)
    {
        whichKey = "6";
        draw_letter(whichKey);
    }
    if (sevenKey.isDown)
    {
        whichKey = "7";
        draw_letter(whichKey);
    }
    if (eightKey.isDown)
    {
        whichKey = "8";
        draw_letter(whichKey);
    }
    if (nineKey.isDown)
    {
        whichKey = "9";
        draw_letter(whichKey);
    }
    if (colonKey.isDown)
    {
        whichKey = ";";
        draw_letter(whichKey);
    }
    if (equalsKey.isDown)
    {
        whichKey = "=";
        draw_letter(whichKey);
    }
    if (underscoreKey.isDown)
    {
        whichKey = "_";
        draw_letter(whichKey);
    }
    if (questionKey.isDown)
    {
        whichKey = "?";
        draw_letter(whichKey);
    }
    if (tildeKey.isDown)
    {
        whichKey = "~";
        draw_letter(whichKey);
    }
    if (openBracketKey.isDown)
    {
        whichKey = "{";
        draw_letter(whichKey);
    }
    if (backwardSlashKey.isDown)
    {
        whichKey = "\\";
        draw_letter(whichKey);
    }
    if (closedBracketKey.isDown)
    {
        whichKey = "{";
        draw_letter(whichKey);
    }
    if (quotesKey.isDown)
    {
        whichKey = "\"";
        draw_letter(whichKey);
    }
    if (plusKey.isDown)
    {
        whichKey = "+";
        draw_letter(whichKey);
    }
    if (minusKey.isDown)
    {
        whichKey = "-";
        draw_letter(whichKey);
    }

    // Draw our text
    bmpText = game.add.bitmapText(10, 10, 'atari', letterText, 32);
    bmpText.maxWidth = 400;


}

function draw_letter(whichKey) {
    newText = letterText + whichKey;
    bmpText.text = newText;
}
