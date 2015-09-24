
function Terrain()
{
    var stripGrid   = new TriangleStripGrid();
    var yBuffer     = gl.createBuffer();
    var baseBuffer  = gl.createBuffer();
    var indexBuffer = gl.createBuffer();
    var xMove = 0;
    var zMove = 0;
    this.init=function()
    {
        gl.bindBuffer( gl.ARRAY_BUFFER, baseBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( stripGrid.getVerticesXZ() ), gl.STATIC_DRAW );

        gl.bindBuffer( gl.ARRAY_BUFFER, yBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( stripGrid.getVerticesY(time/1000.0) ), gl.STREAM_DRAW );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( stripGrid.getIndices() ), gl.STATIC_DRAW );

    }
    this.draw = function()
    {
        if(key.Left)
            xMove += dt/1000;
        if(key.Right)
            xMove -= dt/1000;
        if(key.Up)
            zMove += dt/1000;
        if(key.Down)
            zMove -= dt/1000;
        stripGrid.setX(xMove);
        stripGrid.setZ(zMove);
        terrainShader.drawGrid( baseBuffer, yBuffer, indexBuffer, stripGrid );
    }
}

function Player()
{
    var line            = new Line();
    var vertexBuffer    = gl.createBuffer();
    this.init=function()
    {
        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( line.getVertices() ), gl.STREAM_DRAW );

    }
    this.draw = function()
    {
        generalShader.drawLine( line.getVertices(time/1000.0), vertexBuffer );
    }
}
