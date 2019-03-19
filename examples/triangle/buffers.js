export const initBuffers = gl => {
  const positions = [
    0.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ]
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return { position: positionBuffer }
}
