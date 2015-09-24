function CanvasManager()
{
    this.init = function()
    {
        canvas = document.querySelector( 'canvas' );
        window.addEventListener( 'resize', this.onWindowResize, false );
    };
    this.onWindowResize = function(event)
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        screenWidth = canvas.width;
        screenHeight = canvas.height;

        gl.viewport( 0, 0, canvas.width, canvas.height );
        //terrainShader.setResolution(parameters.screenWidth,parameters.screenHeight);
        //generalshader.setResolution(parameters.screenWidth,parameters.screenHeight);
        mat4.perspective(perspectiveMatrix, 1.65/2.0,  screenWidth/screenHeight, 0.1, 1000.0)
        generalShader.setPerspective(perspectiveMatrix);
        terrainShader.setPerspective(perspectiveMatrix);
    }

}
function GLManager()
{
    this.init = function()
    {
        gl = canvas.getContext( 'experimental-webgl' );
    };
    this.initShaders = function()
    {
        var terrainVertex_shader    = document.getElementById('Tvs').textContent;
        var terrainFragment_shader  = document.getElementById('Tfs').textContent;

        terrainShader = new TerrainShader(terrainVertex_shader, terrainFragment_shader);
        terrainShader.init();

        var generalVertex_shader    = document.getElementById('Gvs').textContent;
        var generalFragment_shader  = document.getElementById('Gfs').textContent;
        
        generalShader = new GeneralShader(generalVertex_shader, generalFragment_shader);
        generalShader.init();
    };
}
function SceneManager()
{
    var scene = null;
    this.init=function() 
    {
        scene = new Scene();
        scene.init();
    };
    this.update=function() 
    {
        scene.update();
    };
}

function TimeManager()
{
    var start_time = new Date().getTime();
    var lastTime = start_time;
    this.handleTime=function()
    {
        time = new Date().getTime() - start_time;
        dt = time-lastTime;
        lastTime = time;
    };
}
