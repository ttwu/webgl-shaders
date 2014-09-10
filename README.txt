Ting Ting Wu's Webgl shaders
-------------------------------
The shader app is also available here:
http://www.tingting-wu.com/webgl_projects/ttwu_shaders.html

Files/Directories
----------------
- ttwu_shaders.html - is main app page
- lib/ - contains tree.js and tree.min.js
- js/shaders/ - contains all shader code
	- the 4 shaders are each in their own files
		fur_shader.js
		fresnel_shader.js
		toon_outline_shader.js
		phong_shader.js
	- the functions to initialize them are all in init_shaders.js
- js/geometry_switch.js - js to toggle geometry types in app
- style/ - contains main.css

Usage
----------------
When ttwu_shader.html first loads, no geometry renders.

Click on one of the shaders in the "Pick a shader" section to start
seeing geometry rendered using the shaders.

Click on the geometry options to change the geometry.

Click "Toggle light rotation" to start light rotation around the geometry.
Light is only used for Fresnel and Phong shaders.  Choosing the Toon 
Outliner and the Fur shaders will toggle off the light movement.

Further Notes
----------------
All the initialization functions for the shaders are in js/shaders/init_shaders.js
Most parameters are exposed and can be tweaked there.
For example, you can go into the furShader function and change 
the furDensity variable, or the furBaseColor in the uniforms.

