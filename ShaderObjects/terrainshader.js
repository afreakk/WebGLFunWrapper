
function TerrainShader(vertex_shader, fragment_shader)
{
    this.program = createProgram( vertex_shader, fragment_shader );
    this.vertexBase_position    = null;
    this.vertexHeight_position  = null;

    this.resolution = null;
    this.time       = null;
    this.perspective= null;
    this.init=function(projectionMatrix)
    {
        this.vertexBase_position    = gl.getAttribLocation( this.program, "grid" );   
        this.vertexHeight_position  = gl.getAttribLocation( this.program, "yPoint" );   

        this.resolution = gl.getUniformLocation( this.program, 'resolution' );
        this.time       = gl.getUniformLocation( this.program, 'time' );
        this.perspective= gl.getUniformLocation( this.program, 'perspective' );
    }
    this.setResolution=function(width, height)
    {
        gl.useProgram( this.program );
        gl.uniform2f( this.resolution, width, height );
    }
    this.setTime=function(time)
    {
        gl.useProgram( this.program );
        gl.uniform1f( this.time, time );
    }
    this.setPerspective=function(matrix)
    {
        gl.useProgram( this.program );
        gl.uniformMatrix4fv( this.perspective, false, matrix ); 
    }
    this.drawGrid=function(baseBuffer, yBuffer, indexBuffer, stripGrid, time)
    {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, baseBuffer );
        gl.vertexAttribPointer( terrainShader.vertexBase_position, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, yBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( stripGrid.getVerticesY(time/1000.0) ), gl.STREAM_DRAW );
        gl.vertexAttribPointer( terrainShader.vertexHeight_position, 1, gl.FLOAT, false, 0, 0 );

        gl.enableVertexAttribArray( terrainShader.vertexBase_position );
        gl.enableVertexAttribArray( terrainShader.vertexHeight_position );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements( gl.TRIANGLE_STRIP, stripGrid.getIndicesCount(), gl.UNSIGNED_SHORT, 0 );

        gl.disableVertexAttribArray( terrainShader.vertexBase_position );
        gl.disableVertexAttribArray( terrainShader.vertexHeight_position );
    }
}

