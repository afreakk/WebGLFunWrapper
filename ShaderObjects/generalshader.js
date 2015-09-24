

function GeneralShader(vertex_shader, fragment_shader)
{
    this.program = createProgram( vertex_shader, fragment_shader );
    this.vertex_position = null;

    this.resolution = null;
    this.time       = null;
    this.perspective= null;
    this.init=function(projectionMatrix)
    {
        this.vertex_position  = gl.getAttribLocation( this.program, "vertexPos" );   

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
    this.drawLine=function(vertexArray, vertexBuffer)
    {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexArray ), gl.STREAM_DRAW );
        gl.vertexAttribPointer( terrainShader.vertex_position, 3, gl.FLOAT, false, 0, 0 );


        gl.enableVertexAttribArray( this.vertex_position );

        gl.drawArrays( gl.LINE_STRIP,0,vertexArray.length/3 );

        gl.disableVertexAttribArray( this.vertex_position );
    }
}

