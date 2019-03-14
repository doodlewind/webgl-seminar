export const draw = (gl, programInfo, buffers) => {
  const { pos } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(pos)

  gl.useProgram(programInfo.program)

  // 3 points
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)
}
