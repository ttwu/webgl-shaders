/**
 * classic ambient, diffuse, specular shader
 *
 **/
 
AmbDiffSpecShader = {

	uniforms: {
		"camPos": {type: "v3", value: new THREE.Vector3 },
		"lightPos": {type: "v3", value: new THREE.Vector3 },
		//"spherePos": {type: "v3", value: new THREE.Vector3 },
		"lightColor": {type: "c", value: new THREE.Color},
		"ambientColor": {type: "c", value: new THREE.Color},
		"diffuseColor": {type: "c", value: new THREE.Color},
		"specularColor": {type: "c", value: new THREE.Color},
		"shininess": {type: "f", value: 5.0}
	},
   
	vertexShader: [
		"uniform vec3 camPos;",
		"uniform vec3 lightPos;",
		//"uniform vec3 spherePos;",
        
		"varying float NdotL;",
		"varying float NdotH;",

		"void main() {",
		"	vec3 V = normalize(camPos - position);",
		"	vec3 L = normalize(lightPos - position);",
			//half vector - halfway between view and light vectors
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
            //calculate diffuse contribution
            //proportional to projection of N onto L (cannot be negative)
		"	vec3 diffuse = max(NdotL, 0.0)* vec3(diffuseColor.r*lightColor.r, diffuseColor.g*lightColor.g, diffuseColor.b*lightColor.b);",

            //calculate specular contribution
		"	float facing = 1.0;",
		"	if (NdotL <= 0.0)",
		"		facing = 0.0;",
		"	vec3 specular = pow(max(NdotH, 0.0), shininess)* facing * vec3(specularColor.r*lightColor.r, specularColor.g*lightColor.g, specularColor.b*lightColor.b);",
            //add ambient, diffuse, specular contributions together
		"	gl_FragColor = vec4(ambientColor+diffuse+specular, 1.0);",
		"}"
    ].join("\n")
}
