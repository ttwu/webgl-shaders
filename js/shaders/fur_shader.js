/**
 * fur shader - uses shell rendering method
 * references:
 * http://www.catalinzima.com/xna/tutorials/fur-rendering/
 * http://www.xbdev.net/directx3dx/specialX/Fur/
 * http://oos.moxiecode.com/js_webgl/fur/
 *
 * generateRandomTexture function from oos.moxiecode.com
 **/
 
FurShader = {

	uniforms: {
		"furLayer": {type: "f", value: 0.0},
		"furLength": {type: "f", value: 0.6},
		"furMap": {type: "t", value: null},
		"gravity": {type: "v3", value: new THREE.Vector3(0.0, -1.0, 0.0)},
		"forceDirection": {type: "v3", value: new THREE.Vector3(0.0, 0.0, 0.0)},
		"time": {type: "f", value: 0.0 },
		"furBaseColor": {type: "c", value: new THREE.Color(0.0, 0.8, 0.8)}
	},
	transparent: true, 
	vertexShader: [
		"uniform float furLength;",
		"uniform float furLayer;",
		"varying vec2 vUv;",
		"varying vec3 newPosition;",
		"uniform sampler2D furMap;",

		//dynamics variables
		"uniform vec3 gravity;",
		"uniform vec3 forceDirection;",
		"varying vec3 displacement;",
		"uniform float time;",

		"void main() {",
			//calculate vertex position on this shell and then in worldspace
		"	newPosition = position + furLayer*furLength*normal;	",
		"	vec4 newPositionVec4 = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);",

			//add forces on this point
		"	float displacementFactor = pow(furLayer, 3.0);",
		"	displacement = gravity + forceDirection;",
		"	vec3 tmpD = displacementFactor * displacement;",
		"	newPositionVec4 += vec4(tmpD, 0.0);",
	
			//update newPosition - to pass to fragment shader
		"	newPosition.x = newPositionVec4.x;",
		"	newPosition.y = newPositionVec4.y;",
		"	newPosition.z = newPositionVec4.z;",
	
		"	vUv = uv;",
		"	gl_Position = newPositionVec4;",
		"}"
	].join("\n"),

	fragmentShader: [
		"varying vec2 vUv;",
		"uniform sampler2D furMap;",
		"uniform float furLayer;",
		"uniform float furLength;",
		"uniform vec3 furBaseColor;",
		"varying vec3 newPosition;",

		"void main() {",
			//lookup hair information from furMap
		"	vec4 hairColor = texture2D(furMap, vec2(vUv.x, vUv.y));",
	
			//if furMap said there's no hair, discard
		"	if (hairColor.g < furLayer){",
		"		discard;",
		"	}",
		
			//shadow hair - darker roots
		"	float shadowFactor = mix(0.4, 1.0, furLayer);",
		"	gl_FragColor = shadowFactor * vec4(furBaseColor, 1.0);",
		"}"
	].join("\n")
};
