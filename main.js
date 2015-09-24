//------->  animation support
window.requestAnimationFrame = window.requestAnimationFrame || ( function() {

    return  window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(  callback, element ) {
                window.setTimeout( callback, 1000 / 60 );
            };

})();
//<--- ndZ
// Global variables, for easy access -->
var canvas;
var gl;
var terrainshader;
var generalShader;
var time = 0;
var screenWidth = 0;
var screenHeight = 0;
var dt = 0;
var perspectiveMatrix = mat4.create();
// <-- end Global variables

// Managers -->
var canvasMgr = null;
var glMgr = null;
var timeMgr = null;
var sceneMgr = null;
// <-- End managers 

init(); //<-- entry point
function init()
{
    canvasMgr = new CanvasManager();
    canvasMgr.init();

    glMgr = new GLManager();
    glMgr.init();
    glMgr.initShaders();

    timeMgr = new TimeManager();

    sceneMgr = new SceneManager();
    sceneMgr.init();

    key = new KeyManager();
    key.init();

    canvasMgr.onWindowResize();

    update(); //<- begin loop
}

function update()
{
    requestAnimationFrame( this.update);
    timeMgr.handleTime();
    sceneMgr.update();
}
