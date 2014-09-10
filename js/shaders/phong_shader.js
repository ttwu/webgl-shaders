/**
 * homemade phong shader - nothing fancy
 * three.js already provides a handy phong shader, but since I'm very
 * comfortable with the math behind it, it was a good starter shader 
 * to do to get acclimated to webgl and three.js.
 **/
 
HomemadePhongShader = {

	uniforms: {
		"camPos": {type: "v3", value: new THREE.Vector3(0.0, 0.0, 4.0) },
		"lightPos": {type: "v3", value: new THREE.Vector3(5.0, 5.0, 20.0) },
		"lightColor": {type: "c", value: new THREE.Color(.8, .8, .8)},
		"R0": {type: "f", value: 0.3},
		"ambientColor": {type: "c", value: new THREE.Color(0.1, 0.5, 0.5)},
		"diffuseColor": {type: "c", value: new THREE.Color(.3, 0.1, 0.1)},
		"specularColor": {type: "c", value: new THREE.Color(.8, .8, .8)},
		"shininess": {type: "f", value: 5}
	},

	vertexShader: [
		"uniform vec3 camPos;",
		"uniform vec3 lightPos;",
		"varying float specVal;",
		"varying float NdotL;",
		"varying float NdotH;",

		"void main() {",
		"	vec3 V = normalize(camPos - position);",
		"	vec3 L = normalize(lightPos - position);",
		"	vec3 H = normalize(V+L);",
		"	NdotH = dot(normal, H);",
		"	NdotL = dot(normal, L);	",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	
	fragmentShader: [	
		"uniform vec3 lightColor;",
		"uniform vec3 ambientColor;",
		"uniform vec3 diffuseColor;",
		"uniform vec3 specularColor;",
		"uniform float shininess;",
		"varying float NdotL;",
		"varying float NdotH;",

		"void main() {",
		"	vec3 diffuse = max(NdotL, 0.0)* vec3(diffuseColor.r*lightColor.r, diffuseColor.g*lightColor.g, diffuseColor.b*lightColor.b);",
		"	float facing = 1.0;",
		"	if (NdotL <= 0.0)",
		"		facing = 0.0;",
		"	vec3 specular = pow(max(NdotH, 0.0), shininess)* facing * vec3(specularColor.r*lightColor.r, specularColor.g*lightColor.g, specularColor.b*lightColor.b);",
		"	gl_FragColor = vec4(ambientColor+diffuse+specular, 1.0);",
		"}"
	].join("\n")
};

