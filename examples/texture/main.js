import { initProgramInfo } from './program.js'
import { initBuffers } from './buffers.js'
import { initTexture } from './texture.js'
import { draw } from './draw.js'

const gl = document.querySelector('#gl-canvas').getContext('webgl')

const programInfo = initProgramInfo(gl)
const buffers = initBuffers(gl)
initTexture(gl, './demo.jpg')
  .then(texture => draw(gl, programInfo, buffers, texture))
