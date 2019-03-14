import { create, translate, rotate, perspective } from '../../libs/math.js'

export const draw = (gl, programInfo, buffers) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fov = Math.PI / 6
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

  const projection = create()
  perspective(projection, fov, aspect, 0.1, 100.0)

  const modelView = create()
  translate(modelView, modelView, [-0.0, 0.0, -20.0])

  const delta = Math.PI / 4
  rotate(modelView, modelView, delta, [1, 1, 0])

  const { pos } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(pos)

  const { color } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
  gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(color)

  gl.useProgram(programInfo.program)

  const { uniformLocations } = programInfo
  gl.uniformMatrix4fv(uniformLocations.projection, false, projection)
  gl.uniformMatrix4fv(uniformLocations.modelView, false, modelView)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}
