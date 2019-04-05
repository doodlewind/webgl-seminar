import { create, rotate, perspective, lookAt } from '../../libs/math.js'
import { initProgramInfo } from './program.js'
import { initBuffers, getCubeData, getPlaneData } from './buffers.js'
import { draw } from './draw.js'

const gl = document.querySelector('#gl-canvas').getContext('webgl')

const programInfo = initProgramInfo(gl)
const planeBuffers = initBuffers(gl, getPlaneData)
const cubeBuffers = initBuffers(gl, getCubeData)

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clearDepth(1.0)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

const fov = Math.PI / 6
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
const projectionMat = create()
perspective(projectionMat, fov, aspect, 0.1, 100.0)
const viewMat = create()
lookAt(viewMat, [-10, -10, 10], [0, 0, 0], [0, 1, 0])

{
  const modelMat = create()
  const mats = [modelMat, viewMat, projectionMat]
  draw(gl, mats, programInfo, planeBuffers)
}

{
  const modelMat = create()
  const delta = Math.PI / 4
  rotate(modelMat, modelMat, delta, [1, 0, 0])
  const mats = [modelMat, viewMat, projectionMat]
  draw(gl, mats, programInfo, cubeBuffers)
}
