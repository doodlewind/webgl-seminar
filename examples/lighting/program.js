import { initShader } from '../../libs/shader.js'

const vertexShader = `
precision highp float;
attribute vec4 pos;
attribute vec4 color;
attribute vec3 vertexNormal;

uniform mat4 normalMat;
uniform mat4 modelViewMat;
uniform mat4 projectionMat;

varying vec4 vColor;
varying vec3 vLighting;

void main() {
  vec3 ambientLight = vec3(0.3, 0.3, 0.3);
  vec3 directionalLightColor = vec3(1, 1, 1);
  vec3 directionalVector = normalize(vec3(1, 0, 0.75));

  vec4 transformedNormal = normalMat * vec4(vertexNormal, 1.0);

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vColor = color;
  vLighting = ambientLight + (directionalLightColor * directional);
  gl_Position = projectionMat * modelViewMat * pos;
}
`

const fragmentShader = `
precision highp float;
varying vec4 vColor;
varying vec3 vLighting;

void main() {
  gl_FragColor = vec4(vColor.rgb * vLighting, 1.0);
}
`

export const initProgramInfo = gl => {
  const program = initShader(gl, vertexShader, fragmentShader)
  return {
    program,
    attribLocations: {
      pos: gl.getAttribLocation(program, 'pos'),
      color: gl.getAttribLocation(program, 'color'),
      vertexNormal: gl.getAttribLocation(program, 'vertexNormal')
    },
    uniformLocations: {
      normalMat: gl.getUniformLocation(program, 'normalMat'),
      projectionMat: gl.getUniformLocation(program, 'projectionMat'),
      modelViewMat: gl.getUniformLocation(program, 'modelViewMat')
    }
  }
}
