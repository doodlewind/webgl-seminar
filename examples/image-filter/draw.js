import { create, translate, rotate, perspective } from '../../libs/math.js'

const computeKernelWeight = kernel => {
  const weight = kernel.reduce((prev, curr) => prev + curr)
  return weight <= 0 ? 1 : weight
}

// Try this kernel
/*
const kernel = [
  -1, -2, 1,
  0, 0, 0,
  1, 2, 1
]
*/

const kernel = [
  0, 1, 0,
  1, -4, 1,
  0, 1, 0
]

export const draw = (gl, programInfo, buffers, texture, image) => {
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fov = Math.PI / 6
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

  const projectionMat = create()
  perspective(projectionMat, fov, aspect, 0.1, 100.0)

  const modelViewMat = create()
  translate(modelViewMat, modelViewMat, [-0.0, 0.0, -8.0])

  const delta = Math.PI / 4
  rotate(modelViewMat, modelViewMat, delta, [1, 1, 0])

  const { pos } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(pos)

  const { texCoord } = programInfo.attribLocations
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord)
  gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(texCoord)

  gl.useProgram(programInfo.program)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)

  const { uniformLocations } = programInfo
  const { naturalWidth, naturalHeight } = image
  gl.uniformMatrix4fv(uniformLocations.projectionMat, false, projectionMat)
  gl.uniformMatrix4fv(uniformLocations.modelViewMat, false, modelViewMat)
  gl.uniform1i(uniformLocations.sampler, 0)
  gl.uniform2fv(uniformLocations.textureSize, [naturalWidth, naturalHeight])
  gl.uniform1fv(uniformLocations.kernel, kernel)
  gl.uniform1f(uniformLocations.kernelWeight, computeKernelWeight(kernel))

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}
