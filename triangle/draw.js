export const draw = (gl, programInfo, buffer) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  const { pos } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(pos)

  gl.useProgram(programInfo.program)

  // 3 points
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)
}
