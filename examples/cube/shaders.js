export const vertexShader = `
attribute vec4 pos;
attribute vec4 color;

uniform mat4 modelView;
uniform mat4 projection;

varying lowp vec4 vColor;

void main() {
  gl_Position = projection * modelView * pos;
  vColor = color;
}
`

export const fragmentShader = `
varying lowp vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
`
