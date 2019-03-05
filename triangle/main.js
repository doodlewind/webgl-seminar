import { draw } from './draw'
import { initBuffer } from './buffers'
import { vertexShader, fragmentShader } from './shaders'
import { initProgram } from './program'

const gl = document.querySelector('#gl-canvas').getContext('webgl')

const programInfo = initProgram(gl, vertexShader, fragmentShader)

const buffer = initBuffer(gl)

draw(gl, programInfo, buffer)
