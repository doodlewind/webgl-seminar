export const vertexShader = `
attribute vec4 pos;
void main() {
  gl_Position = pos;
}
`

export const fragmentShader = `
void main() {
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`
