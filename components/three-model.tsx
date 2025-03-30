"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const ThreeModel = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const initThree = async () => {
      try {
        const THREE = await import("three")

        // Scene setup
        const scene = new THREE.Scene()

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.set(0, 0, 5)

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        })
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(2, 2, 5)
        scene.add(directionalLight)

        // Create a simple laptop model
        const createLaptop = () => {
          // Base
          const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2)
          const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 100,
          })
          const base = new THREE.Mesh(baseGeometry, baseMaterial)

          // Screen
          const screenGeometry = new THREE.BoxGeometry(2.9, 0.1, 1.9)
          const screenMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shininess: 100,
          })
          const screen = new THREE.Mesh(screenGeometry, screenMaterial)
          screen.position.y = 0.15

          // Screen display
          const displayGeometry = new THREE.PlaneGeometry(2.7, 1.7)
          const displayMaterial = new THREE.MeshBasicMaterial({
            color: 0x0088ff,
          })
          const display = new THREE.Mesh(displayGeometry, displayMaterial)
          display.position.y = 0.21
          display.position.z = 0.95
          display.rotation.x = Math.PI / 2

          // Code lines on screen
          const createCodeLines = () => {
            const codeGroup = new THREE.Group()

            for (let i = 0; i < 10; i++) {
              const lineGeometry = new THREE.PlaneGeometry(Math.random() * 1.5 + 0.5, 0.05)
              const lineMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.7,
              })
              const line = new THREE.Mesh(lineGeometry, lineMaterial)
              line.position.y = 0.22
              line.position.z = 0.96
              line.position.x = Math.random() * 2 - 1
              line.position.y = 0.8 - i * 0.15
              line.rotation.x = Math.PI / 2

              codeGroup.add(line)
            }

            return codeGroup
          }

          const codeLines = createCodeLines()

          // Laptop group
          const laptop = new THREE.Group()
          laptop.add(base)
          laptop.add(screen)
          laptop.add(display)
          laptop.add(codeLines)

          // Rotate to show screen
          laptop.rotation.x = -Math.PI / 6

          return laptop
        }

        const laptop = createLaptop()
        scene.add(laptop)

        // Create floating tech icons
        const createTechIcons = () => {
          const iconsGroup = new THREE.Group()

          const iconPositions = [
            { x: -2, y: 1.5, z: 0 },
            { x: 2, y: 1.2, z: 0.5 },
            { x: -1.5, y: -1, z: -0.5 },
            { x: 1.8, y: -1.3, z: 0 },
            { x: 0, y: 2, z: -1 },
          ]

          iconPositions.forEach((pos, index) => {
            const size = Math.random() * 0.3 + 0.2
            let geometry

            // Different shapes for different tech
            switch (index % 5) {
              case 0: // React-like
                geometry = new THREE.TorusGeometry(size, size / 10, 16, 100)
                break
              case 1: // Node-like
                geometry = new THREE.OctahedronGeometry(size)
                break
              case 2: // Database-like
                geometry = new THREE.CylinderGeometry(size, size, size * 1.5, 6)
                break
              case 3: // JS-like
                geometry = new THREE.BoxGeometry(size, size, size)
                break
              case 4: // Cloud-like
                geometry = new THREE.SphereGeometry(size, 8, 8)
                break
              default:
                geometry = new THREE.IcosahedronGeometry(size, 0)
            }

            const material = new THREE.MeshPhongMaterial({
              color: 0x0088ff,
              transparent: true,
              opacity: 0.8,
              wireframe: true,
            })

            const icon = new THREE.Mesh(geometry, material)
            icon.position.set(pos.x, pos.y, pos.z)

            // Store original position for animation
            icon.userData = {
              originalY: pos.y,
              speed: Math.random() * 0.01 + 0.005,
              rotationSpeed: Math.random() * 0.01 + 0.005,
            }

            iconsGroup.add(icon)
          })

          return iconsGroup
        }

        const techIcons = createTechIcons()
        scene.add(techIcons)

        // Animation
        const clock = new THREE.Clock()

        const animate = () => {
          requestAnimationFrame(animate)

          const elapsedTime = clock.getElapsedTime()

          // Animate tech icons
          techIcons.children.forEach((icon: THREE.Object3D) => {
            if (icon.userData) {
              icon.position.y = icon.userData.originalY + Math.sin(elapsedTime * icon.userData.speed * 5) * 0.3
              icon.rotation.x += icon.userData.rotationSpeed
              icon.rotation.y += icon.userData.rotationSpeed * 1.5
            }
          })

          // Subtle laptop movement
          laptop.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05

          // Simple camera rotation
          camera.position.x = Math.sin(elapsedTime * 0.5) * 0.5
          camera.position.y = Math.cos(elapsedTime * 0.3) * 0.3
          camera.lookAt(scene.position)

          renderer.render(scene, camera)
        }

        animate()
        setLoading(false)

        // Handle resize
        const handleResize = () => {
          if (!mountRef.current) return

          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        }

        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize)
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement)
          }
        }
      } catch (err) {
        console.error("Failed to initialize Three.js:", err)
        setLoading(false)
        setError("Failed to load 3D model. Please try refreshing the page.")
      }
    }

    initThree()
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-background/50">{error}</div>
      )}
    </div>
  )
}

// Use dynamic import with SSR disabled
export default dynamic(() => Promise.resolve(ThreeModel), {
  ssr: false,
})

