import { initShader } from '../../libs/shader.js'

const vertexShader = `
attribute vec4 pos;
void main() {
  gl_Position = pos;
}
`

const fragmentShader = `
void main() {
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`

export const initProgramInfo = gl => {
  const program = initShader(gl, vertexShader, fragmentShader)
  return {
    program,
    attribLocations: {
      pos: gl.getAttribLocation(program, 'pos')
    }
  }
}
