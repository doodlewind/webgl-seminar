import { draw } from './draw.js'
import { initBuffer } from './buffers.js'
import { vertexShader, fragmentShader } from './shaders.js'
import { initProgram } from '../../libs/program.js'

const gl = document.querySelector('#gl-canvas').getContext('webgl')

const programInfo = initProgram(gl, vertexShader, fragmentShader)

const buffer = initBuffer(gl)

draw(gl, programInfo, buffer)
