"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return

    let cleanup: (() => void) | undefined

    const initThree = async () => {
      try {
        const THREE = await import("three")

        // Scene setup (only if not already created)
        if (!sceneRef.current) {
          sceneRef.current = new THREE.Scene()
        }

        // Camera setup (only if not already created)
        if (!cameraRef.current) {
          cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
          cameraRef.current.position.z = 5
        }

        // Renderer setup with error handling
        if (!rendererRef.current) {
          try {
            rendererRef.current = new THREE.WebGLRenderer({
              alpha: true,
              antialias: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: true,
            })
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
            rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            if (mountRef.current) {
              // Clear any existing canvas first
              while (mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild)
              }
              mountRef.current.appendChild(rendererRef.current.domElement)
            } else {
              throw new Error("Mount ref is not available")
            }
          } catch (err) {
            console.error("Failed to initialize WebGL renderer:", err)
            setError("WebGL rendering not supported on your device")
            setIsLoading(false)
            return
          }
        }

        // Clear existing objects from the scene
        while (sceneRef.current.children.length > 0) {
          const object = sceneRef.current.children[0]
          sceneRef.current.remove(object)
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2)
        sceneRef.current.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
        directionalLight.position.set(1, 1, 1)
        sceneRef.current.add(directionalLight)

        // Create particles with reduced count for better performance
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = Math.min(1000, window.innerWidth < 768 ? 500 : 1000) // Reduce particles on mobile

        const posArray = new Float32Array(particlesCount * 3)
        const colorsArray = new Float32Array(particlesCount * 3)

        let isLoadingInternal = true

        // Colors variables based on theme
        const isDark = resolvedTheme === "dark" || !resolvedTheme
        const primaryColor = isDark ? 0.2 : 0.6 // Adjust for light/dark

        for (let i = 0; i < particlesCount * 3; i++) {
          // Position
          posArray[i] = (Math.random() - 0.5) * 10

          // Colors - theme aware
          if (i % 3 === 0) {
            colorsArray[i] = isDark ? Math.random() * 0.2 + 0.1 : Math.random() * 0.3; // R
          } else if (i % 3 === 1) {
            colorsArray[i] = Math.random() * 0.5 + primaryColor; // G
          } else {
            colorsArray[i] = Math.random() * 0.5 + primaryColor; // B
          }
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        sceneRef.current.add(particlesMesh)

        // Create a wireframe sphere with reduced complexity for better performance
        const sphereGeometry = new THREE.IcosahedronGeometry(2, window.innerWidth < 768 ? 0 : 1)
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x0088ff,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sceneRef.current.add(sphere)

        // Animation with performance monitoring
        let frameCount = 0
        let lastTime = performance.now()
        let fps = 0

        // Cancel any existing animation frame
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
        }

        const animate = () => {
          animationRef.current = requestAnimationFrame(animate)

          // Simple FPS counter
          frameCount++
          const currentTime = performance.now()
          if (currentTime - lastTime >= 1000) {
            fps = frameCount
            frameCount = 0
            lastTime = currentTime

            // If FPS is too low, reduce animation complexity
            if (fps < 30 && particlesMesh.rotation.x !== 0) {
              particlesMesh.rotation.x = 0
              particlesMesh.rotation.y = 0
              sphere.rotation.y = 0
              sphere.rotation.x = 0
            }
          }

          // Only animate if performance is good
          if (fps === 0 || fps >= 30) {
            particlesMesh.rotation.x += 0.0005
            particlesMesh.rotation.y += 0.0005
            sphere.rotation.y += 0.001
            sphere.rotation.x += 0.0005
          }

          // Simple camera rotation instead of OrbitControls
          cameraRef.current.position.x = Math.sin(Date.now() * 0.0001) * 0.5
          cameraRef.current.position.y = Math.cos(Date.now() * 0.0001) * 0.5
          cameraRef.current.lookAt(sceneRef.current.position)

          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }

        animate()
        setIsLoading(false)

        // Handle resize
        const handleResize = () => {
          if (cameraRef.current && rendererRef.current) {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight
            cameraRef.current.updateProjectionMatrix()
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
          }
        }

        window.addEventListener("resize", handleResize)

        // Mouse movement effect with throttling for performance
        let lastMoveTime = 0
        const moveThrottle = 50 // ms

        const handleMouseMove = (event: MouseEvent) => {
          const now = performance.now()
          if (now - lastMoveTime < moveThrottle) return
          lastMoveTime = now

          const mouseX = (event.clientX / window.innerWidth) * 2 - 1
          const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

          particlesMesh.rotation.x += mouseY * 0.0005
          particlesMesh.rotation.y += mouseX * 0.0005

          sphere.rotation.x += mouseY * 0.0002
          sphere.rotation.y += mouseX * 0.0002
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Cleanup
        cleanup = () => {
          window.removeEventListener("resize", handleResize)
          window.removeEventListener("mousemove", handleMouseMove)
          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }

          // Dispose of geometries and materials to prevent memory leaks
          particlesGeometry.dispose()
          particlesMaterial.dispose()
          sphereGeometry.dispose()
          sphereMaterial.dispose()
        }
      } catch (err) {
        console.error("Failed to initialize Three.js:", err)
        setError("Failed to load 3D background. Please try refreshing the page.")
        setIsLoading(false)
      }
    }

    initThree()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  // Handle theme changes without full remount
  useEffect(() => {
    // Just update the renderer if needed, don't recreate the entire scene
    if (rendererRef.current && mountRef.current) {
      try {
        // Ensure the canvas is still in the DOM
        if (!mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.appendChild(rendererRef.current.domElement)
        }

        // Force a render to update with new theme
        if (sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
      } catch (err) {
        console.error("Error updating Three.js on theme change:", err)
      }
    }
  }, [resolvedTheme])

  return (
    <>
      <div ref={mountRef} className="three-canvas" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-background/50 z-10">
          {error}
        </div>
      )}
    </>
  )
}

export default ThreeBackground

