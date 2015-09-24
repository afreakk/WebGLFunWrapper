function Scene()
{
    var terrain = null;
    //var player    = null;
    this.init = function()
    {
        terrain = new Terrain();
        terrain.init();

   //     player = new Player();
    }
    this.update = function()
    {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        terrainShader.setTime(time);
        generalShader.setTime(time);
        terrain.draw();
 //       player.draw();
    }
}
