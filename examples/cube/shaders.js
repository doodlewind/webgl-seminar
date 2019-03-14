export const vertexShader = `
attribute vec4 vertexPos;
attribute vec4 vertexColor;

uniform mat4 modelViewMat;
uniform mat4 projectionMat;

varying lowp vec4 vColor;

void main(void) {
  gl_Position = projectionMat * modelViewMat * vertexPos;
  vColor = vertexColor;
}
`

export const fragmentShader = `
varying lowp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`
