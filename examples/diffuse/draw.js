import {
  create, translate, rotate, perspective, invert, transpose
} from '../../libs/math.js'

let delta = 0
const getDelta = () => { delta += 1; return delta / 60 }

export const draw = (gl, programInfo, buffers) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fov = Math.PI / 6
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

  const projectionMat = create()
  perspective(projectionMat, fov, aspect, 0.1, 100.0)

  const modelViewMat = create()
  translate(modelViewMat, modelViewMat, [-0.0, 0.0, -20.0])

  const delta = getDelta()
  rotate(modelViewMat, modelViewMat, delta, [1, 1, 0])

  const normalMat = create()
  invert(normalMat, modelViewMat)
  transpose(normalMat, normalMat)

  const { pos } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(pos)

  const { vertexNormal } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal)
  gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(vertexNormal)

  const { color } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
  gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(color)

  gl.useProgram(programInfo.program)

  const { uniformLocations } = programInfo
  gl.uniformMatrix4fv(uniformLocations.projectionMat, false, projectionMat)
  gl.uniformMatrix4fv(uniformLocations.modelViewMat, false, modelViewMat)
  gl.uniformMatrix4fv(uniformLocations.normalMat, false, normalMat)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}
