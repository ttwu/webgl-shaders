//init fur shader --------------------------------------------
function furShader(){
	clearAddedMeshes();
	lightMove = false; //stop moving light - fur shader doesn't use it
	
	curShader = "FurShader";
	var numShells = 80;
	var furDensity = 8000;

	//generate random map for fur
	var furMap = new THREE.Texture(generateRandomTexture(furDensity));
	furMap.wrapS = furMap.wrapT = THREE.RepeatWrapping;
	furMap.needsUpdate = true;
	furMap.repeat.set(10,10);	
	//document.body.appendChild(furMap);
	
	//create each shell that will make up the fur
	for (var i=0; i<numShells; i++){
		var layer = i/numShells;
		var tmpUniforms = {
			furLength: {type: "f", value: 0.6},
			furLayer: {type: "f", value: layer},
			furMap: {type: "t", value: furMap},
			gravity: {type: "v3", value: new THREE.Vector3(0.0, -1.0, 0.0)},
			forceDirection: {type: "v3", value: new THREE.Vector3(0.0, 0.0, 0.0)},
			displacementControl: {type: "f", value: 1.0},
			time: {type: "f", value: 0.0 },
			furBaseColor: {type: "c", value: new THREE.Color(0.0, 0.8, 0.8)}
		};
		FurShader.uniforms = tmpUniforms;
		var material = new THREE.ShaderMaterial(FurShader);
		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		meshList[i] = mesh;
	}

}

//creates a 256x256 canvas element with 2000 randomized elements
//create 2000 2x2 rectangles at a random location
//with color (255, hair length, darkness, 1)
//if r is 255, there is a hair, if it's 0 there is no hair there
//borrowed from
//http://oos.moxiecode.com/js_webgl/fur/
function generateRandomTexture(density) {
	var canvasElem = document.createElement( 'canvas' );
	canvasElem.width = canvasElem.height = 256;
	var context = canvasElem.getContext( '2d' );

	for ( var i = 0; i < density; i++ ) {
		context.fillStyle = "rgba(255," + Math.floor( Math.random() * 255 ) + ","+ Math.floor( Math.random() * 255 ) +",1)";
		context.fillRect( ( Math.random() * canvasElem.width ), 
						  ( Math.random() * canvasElem.height ), 
						  1, 1 );
	}
	return canvasElem;
}



//init fresnel shader -----------------------------------
function fresnelShader(){
	clearAddedMeshes();
	curShader = "FresnelShader";
	//initialize uniform variables for fresnel shader
	FresnelShader.uniforms.lightColor.value = light1.color;
	FresnelShader.uniforms.ambientColor.value = new THREE.Color(0.1, 0.5, 0.5);
	FresnelShader.uniforms.diffuseColor.value = new THREE.Color(0.3, 0.1, 0.1);
	FresnelShader.uniforms.specularColor.value = new THREE.Color(0.8, 0.8, 0.8);
	FresnelShader.uniforms.camPos.value = new THREE.Vector3(0.0, 0.0, 4.0);
	FresnelShader.uniforms.lightPos.value = light1.position;
	FresnelShader.uniforms.shininess.value = 5.0;
	//see more values to use to calculate F0 here:
	//https://www.terathon.com/wiki/index.php/Building_a_Fresnel_shader
	FresnelShader.uniforms.F0.value = (1.000 - 1.333)/(1.000+1.333);  //air to glass ~ -0.143
	FresnelShader.uniforms.fresnelPower.value = 2.0;
	var material = new THREE.ShaderMaterial(FresnelShader);
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	meshList[0] = mesh;
}

//init ToonOutlineShader ---------------------------------
function toonOutlineShader(){
	clearAddedMeshes();
	lightMove = false;  //stop moving light - outline shader doesn't use it
	curShader = "ToonOutlineShader";
	
	ToonOutlineShader.uniforms.distanceToZero.value = 0.25; //increase for wider outline
	ToonOutlineShader.uniforms.baseColor.value = new THREE.Color(0.7, 0.7, 0.7);
	ToonOutlineShader.uniforms.outlineColor.value = new THREE.Color(1.0, 0.3, 0.3);
	ToonOutlineShader.uniforms.camPos.value = camera.position;
	var material = new THREE.ShaderMaterial(ToonOutlineShader);
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	meshList[0] = mesh;
}

//init HomemadePhongShader --------------------------------
function homemadePhongShader(){
	clearAddedMeshes();
	curShader = "HomemadePhongShader";
	
	HomemadePhongShader.uniforms.lightColor.value = new THREE.Color(0.3, 0.3, 0.1); //not using light1's color
	HomemadePhongShader.uniforms.ambientColor.value = new THREE.Color(0.1, 0.5, 0.5); //(0.0, 0.0, 0.0); //
	HomemadePhongShader.uniforms.diffuseColor.value = new THREE.Color(1.0, 0.8, 0.6);
	HomemadePhongShader.uniforms.specularColor.value = new THREE.Color(1.0, 1.0, 1.0);
	HomemadePhongShader.uniforms.shininess.value = 10.0;
	var material = new THREE.ShaderMaterial(HomemadePhongShader);
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	meshList[0] = mesh;
}

