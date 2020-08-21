varying vec2 vUv;
void main() 
{ 
    vUv = position.xy * 0.05 + vec2(1,1);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}