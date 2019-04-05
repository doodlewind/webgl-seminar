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
precision highp float;

uniform sampler2D sampler;
uniform vec2 textureSize;
uniform float kernel[9];
uniform float kernelWeight;

varying highp vec2 vTexCoord;

void main() {
  vec2 onePixel = vec2(1.0, 1.0) / textureSize;
  vec4 colorSum = (
    texture2D(sampler, vTexCoord + onePixel * vec2(-1, -1)) * kernel[0] +
    texture2D(sampler, vTexCoord + onePixel * vec2(0, -1)) * kernel[1] +
    texture2D(sampler, vTexCoord + onePixel * vec2(1, -1)) * kernel[2] +
    texture2D(sampler, vTexCoord + onePixel * vec2(-1, 0)) * kernel[3] +
    texture2D(sampler, vTexCoord + onePixel * vec2(0, 0)) * kernel[4] +
    texture2D(sampler, vTexCoord + onePixel * vec2(1, 0)) * kernel[5] +
    texture2D(sampler, vTexCoord + onePixel * vec2(-1, 1)) * kernel[6] +
    texture2D(sampler, vTexCoord + onePixel * vec2(0, 1)) * kernel[7] +
    texture2D(sampler, vTexCoord + onePixel * vec2(1, 1)) * kernel[8]
  );

  gl_FragColor = vec4(
    (colorSum / kernelWeight).rgb, texture2D(sampler, vTexCoord).a
  );

  // gl_FragColor = texture2D(sampler, vTexCoord);
  // gl_FragColor = vec4(texture2D(sampler, vTexCoord).rrr, 1);
  // gl_FragColor = vec4(texture2D(sampler, vTexCoord).bgr, 1);
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
      textureSize: gl.getUniformLocation(program, 'textureSize'),
      kernel: gl.getUniformLocation(program, 'kernel'),
      kernelWeight: gl.getUniformLocation(program, 'kernelWeight'),
      projectionMat: gl.getUniformLocation(program, 'projectionMat'),
      modelViewMat: gl.getUniformLocation(program, 'modelViewMat')
    }
  }
}
