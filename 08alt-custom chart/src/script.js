import * as THREE from 'three'
import { Group } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const barColor = "#0047FF"
var weeklyUsage = [1, 3, 5, 2, 4, 3, 2]
var weeklyUsageGap = [0, 0, 0, 0, 0, .5, .5]
var weeklyUsage2 = [6, 6, 6, 2, 4, 3, 2]


// console.log(weeklyUsage[2]);
// console.log(Math.max(...weeklyUsage));
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
// group.scale.y = 1
// group.rotation.y = 0.2
group.position.x = - 3.5
group.position.y = - Math.max(...weeklyUsage)/2
scene.add(group)

const platform = [11,.25,2]

const dais = new THREE.Mesh(
    new THREE.BoxGeometry(platform[0], platform[1], platform[2]),
    new THREE.MeshBasicMaterial({ color: 0xBBBBBB, wireframe: false})  
    // wireframe = true;   
)
// dais.position.x = -platform[0]/2
// dais.position.y = -platform[1]/2
// dais.position.z = -platform[2]/2

dais.position.x = 4
dais.position.y = -platform[1]/2
dais.position.z = 0
group.add(dais)

for(let i = 0; i < 7; i++) {
    const day = new THREE.Mesh(
        new THREE.BoxGeometry(1, weeklyUsage[i], 1),
        new THREE.MeshBasicMaterial({ color: barColor, wireframe: false})     
    )
    // day.position.x = i * 1.3

 day.position.x = i * 1.3 + weeklyUsageGap[i]
    day.position.y = weeklyUsage[i] / 2
    group.add(day)
    // console.log(day)
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// console.log('dpr' + window.devicePixelRatio);

window.addEventListener('resize', () => 
{
    // console.log('window has been resized')
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// window.addEventListener('dblclick', () => 
// {
//     // console.log('double click')
//     if(!document.fullscreenElement)
//     {
//         // console.log('go fullscreen')
//         canvas.requestFullscreen()
//     }
//     else
//     {
//         // console.log('leave fullscreen')
//         document.exitFullscreen()
//     }
// })

window.addEventListener('click', () =>
{
    // console.log('click')
    // console.log(weeklyUsage[2])
    // group.position.x = group.position.x - .5
    
    weeklyUsage[3] = weeklyUsage[3] + 1
    // console.log(weeklyUsage[3])
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)
camera.lookAt(group)
// camera.lookAt(group)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()