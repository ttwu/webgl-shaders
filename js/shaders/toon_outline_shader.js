/**
 * toon outline shader
 * 
 * dots normals with view vector.  if positive and within 
 * a certain range of zero, it's an outline
 **/
 
ToonOutlineShader = {

	uniforms: {
		"distanceToZero": {type: "f", value: 0.05}, //if NdotV <= this, it's an outline
		"baseColor": {type: "c", value: new THREE.Color(0.4, 0.5, 0.3)}, //what to color inside geometry
		"outlineColor": {type: "c", value: new THREE.Color(0.6, 0.6, 0.6)}, //what to color the outline
		"camPos": {type: "v3", value: new THREE.Vector3(0.0, 0.0, 4.0)}
	},

	vertexShader: [
		"uniform vec3 camPos;",
		"varying float NdotV;",

		"void main() {",
			//figure out V 
		"	vec3 V = normalize(camPos - position);	",
		"	NdotV = dot(normal, V);",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),

	fragmentShader: [
		"uniform float distanceToZero;",
		"uniform vec3 baseColor;",
		"uniform vec3 outlineColor;",
		"varying float NdotV;",

		"void main() {",
			//check if within threshold to classify as outline
		"	if (NdotV <= distanceToZero)",
		"		gl_FragColor = vec4(outlineColor, 1.0);",
		"	else",
		"		gl_FragColor = vec4(baseColor, 1.0);",
		"}"
	].join("\n")
};
