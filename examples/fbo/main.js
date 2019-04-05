import { initProgramInfo } from './program.js'
import { initBuffers } from './buffers.js'
import { initFramebufferObject } from './fbo.js'
import { initTexture } from './texture.js'
import { draw } from './draw.js'

const gl = document.querySelector('#gl-canvas').getContext('webgl')

const programInfo = initProgramInfo(gl)
const buffers = initBuffers(gl)
const fboData = initFramebufferObject(gl)

initTexture(gl, './demo.jpg').then(texture => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // FBO pass begins
  gl.activeTexture(gl.TEXTURE0)
  // Write render result to this texture
  gl.bindTexture(gl.TEXTURE_2D, fboData.texture)
  gl.clearColor(1, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)

  gl.bindFramebuffer(gl.FRAMEBUFFER, fboData.framebuffer)
  gl.viewport(0, 0, 1024, 1024)

  draw(gl, programInfo, buffers, texture)

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  const { clientWidth, clientHeight } = gl.canvas
  gl.viewport(0, 0, clientWidth, clientHeight)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  // FBO pass ends

  // Use rendered texture to render the cube again
  draw(gl, programInfo, buffers, fboData.texture)
})
