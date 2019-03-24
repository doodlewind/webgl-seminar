import { initShader } from '../../libs/shader.js'

const vertexShader = `
attribute vec4 pos;
attribute vec2 texCoord;

uniform mat4 modelViewMat;
uniform mat4 projectionMat;

varying highp vec2 vTexCoord;

void main() {
  gl_Position = projectionMat * modelViewMat * pos;
  vTexCoord = texCoord;
}
`

const fragmentShader = `
uniform sampler2D sampler;
varying highp vec2 vTexCoord;

void main() {
  gl_FragColor = texture2D(sampler, vTexCoord);
}
`

export const initProgramInfo = gl => {
  const program = initShader(gl, vertexShader, fragmentShader)
  return {
    program,
    attribLocations: {
      pos: gl.getAttribLocation(program, 'pos'),
      texCoord: gl.getAttribLocation(program, 'texCoord')
    },
    uniformLocations: {
      sampler: gl.getUniformLocation(program, 'sampler'),
      projectionMat: gl.getUniformLocation(program, 'projectionMat'),
      modelViewMat: gl.getUniformLocation(program, 'modelViewMat')
    }
  }
}
