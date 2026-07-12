import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export interface GalaxyNode {
  id: string
  label: string
  color: string
  /** relative size, e.g. project count */
  weight: number
  category: string
  /** included even with zero public projects (client-work-only skills) */
  alwaysShow?: boolean
}

interface GalaxySceneOptions {
  canvas: HTMLCanvasElement
  /** absolutely-positioned overlay that receives the HTML labels */
  labelLayer: HTMLDivElement
  nodes: GalaxyNode[]
  isMobile: boolean
  reducedMotion: boolean
  onSelect: (id: string) => void
}

// Spiral galaxy shape parameters
const ARMS = 2
const INNER_RADIUS = 3.2
const OUTER_RADIUS = 13
const WINDING = Math.PI * 2.1 // how far each arm wraps around the core
const DISC_TILT_X = 0.5
const DISC_TILT_Z = -0.1
/** camera orbit radius that frames the disc nicely on wide canvases */
const BASE_CAMERA_DISTANCE = Math.hypot(0, 11, 26)

/**
 * Pure three.js spiral-galaxy scene (no React): tech nodes sit along two
 * logarithmic arms of a tilted disc built from additive dust particles with
 * a glowing core. Labels are plain DOM nodes projected to screen space.
 */
export class GalaxyScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private nodeSprites: THREE.Sprite[] = []
  private nodeGroup = new THREE.Group()
  private starTexture: THREE.Texture
  private dust: THREE.Points
  private bulge: THREE.Points
  private stars: THREE.Points
  private core: THREE.Sprite
  private group = new THREE.Group()
  private labelEls: HTMLButtonElement[] = []
  private positions: THREE.Vector3[] = []
  private baseScales: number[] = []
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private rafId: number | null = null
  private running = false
  private selectedIndex: number | null = null
  private hoveredIndex: number | null = null
  private nodes: GalaxyNode[]
  private canvas: HTMLCanvasElement
  private labelLayer: HTMLDivElement
  private reducedMotion: boolean
  private onSelect: (id: string) => void
  private renderRequested = false
  private downPos: { x: number; y: number } | null = null
  private disposed = false
  private coreTexture: THREE.Texture

  constructor(opts: GalaxySceneOptions) {
    const { canvas, labelLayer, nodes, isMobile, reducedMotion, onSelect } = opts
    this.canvas = canvas
    this.labelLayer = labelLayer
    // biggest stars gravitate toward the galactic core
    this.nodes = [...nodes].sort((a, b) => b.weight - a.weight)
    this.reducedMotion = reducedMotion
    this.onSelect = onSelect

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 220)
    this.camera.position.set(0, 11, 26)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableZoom = false // never hijack page scroll
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.06
    this.controls.autoRotate = !reducedMotion
    this.controls.autoRotateSpeed = 0.55
    this.controls.minPolarAngle = 0.5
    this.controls.maxPolarAngle = 2.3
    if (reducedMotion) {
      this.controls.addEventListener("change", this.requestRender)
    }

    // ---- Node positions along the spiral arms ----
    const n = this.nodes.length
    this.nodes.forEach((_, i) => {
      const t = n === 1 ? 0 : i / (n - 1)
      const arm = i % ARMS
      const radius = INNER_RADIUS + t * (OUTER_RADIUS - INNER_RADIUS)
      const angle = t * WINDING + (arm * Math.PI * 2) / ARMS + Math.sin(i * 12.9898) * 0.22
      this.positions.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(i * 78.233) * 0.7, // thin disc jitter
          Math.sin(angle) * radius,
        ),
      )
    })

    // Tech stars: tinted glow sprites (bright core, halo, diffraction spikes)
    const maxWeight = Math.max(...this.nodes.map((node) => node.weight), 1)
    this.starTexture = GalaxyScene.makeStarTexture()
    this.nodes.forEach((node, i) => {
      const scale = 1.6 + (node.weight / maxWeight) * 2.4
      this.baseScales.push(scale)
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: this.starTexture,
          color: node.color,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      sprite.position.copy(this.positions[i])
      sprite.scale.setScalar(scale)
      sprite.userData.index = i
      this.nodeGroup.add(sprite)
      this.nodeSprites.push(sprite)
    })
    this.group.add(this.nodeGroup)

    // ---- Spiral dust (the galaxy body) ----
    const dustCount = isMobile ? 1400 : 3200
    const dustPositions = new Float32Array(dustCount * 3)
    const dustColors = new Float32Array(dustCount * 3)
    const inner = new THREE.Color("#9db9ff")
    const mid = new THREE.Color("#4763eb")
    const outer = new THREE.Color("#1ac4e6")
    const violet = new THREE.Color("#a855f7")
    for (let i = 0; i < dustCount; i++) {
      const t = Math.random()
      const arm = i % ARMS
      const radius = INNER_RADIUS * 0.5 + t * (OUTER_RADIUS + 1.5 - INNER_RADIUS * 0.5)
      // gaussian-ish spread that widens with radius
      const spread = (Math.random() + Math.random() + Math.random() - 1.5) * (0.4 + t * 1.5)
      const angle = t * WINDING + (arm * Math.PI * 2) / ARMS + spread * 0.25
      dustPositions[i * 3] = Math.cos(angle) * radius + spread * 0.9
      dustPositions[i * 3 + 1] = (Math.random() + Math.random() - 1) * (0.5 + t * 0.5)
      dustPositions[i * 3 + 2] = Math.sin(angle) * radius + spread * 0.9
      const c =
        Math.random() < 0.08 ? violet : t < 0.35 ? inner.clone().lerp(mid, t / 0.35) : mid.clone().lerp(outer, (t - 0.35) / 0.65)
      dustColors[i * 3] = c.r
      dustColors[i * 3 + 1] = c.g
      dustColors[i * 3 + 2] = c.b
    }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3))
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3))
    this.dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.group.add(this.dust)

    // ---- Central bulge ----
    const bulgeCount = isMobile ? 260 : 500
    const bulgePositions = new Float32Array(bulgeCount * 3)
    for (let i = 0; i < bulgeCount; i++) {
      const r = Math.pow(Math.random(), 2) * 2.6
      const phi = Math.random() * Math.PI * 2
      const cosT = Math.random() * 2 - 1
      const sinT = Math.sqrt(1 - cosT * cosT)
      bulgePositions[i * 3] = r * sinT * Math.cos(phi)
      bulgePositions[i * 3 + 1] = r * cosT * 0.55
      bulgePositions[i * 3 + 2] = r * sinT * Math.sin(phi)
    }
    const bulgeGeometry = new THREE.BufferGeometry()
    bulgeGeometry.setAttribute("position", new THREE.BufferAttribute(bulgePositions, 3))
    this.bulge = new THREE.Points(
      bulgeGeometry,
      new THREE.PointsMaterial({
        color: 0xcfe0ff,
        size: 0.08,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.group.add(this.bulge)

    // ---- Core glow sprite ----
    this.coreTexture = GalaxyScene.makeGlowTexture()
    this.core = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.coreTexture,
        color: 0xbcd4ff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.core.scale.setScalar(7)
    this.group.add(this.core)

    // ---- Distant stars ----
    const starCount = isMobile ? 150 : 320
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 55
      const phi = Math.random() * Math.PI * 2
      const cosTheta = Math.random() * 2 - 1
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta)
      starPositions[i * 3] = r * sinTheta * Math.cos(phi)
      starPositions[i * 3 + 1] = r * cosTheta
      starPositions[i * 3 + 2] = r * sinTheta * Math.sin(phi)
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    this.stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0x8fb8d9, size: 0.14, transparent: true, opacity: 0.55 }),
    )
    this.scene.add(this.stars)

    // cinematic tilt of the whole disc
    this.group.rotation.x = DISC_TILT_X
    this.group.rotation.z = DISC_TILT_Z
    this.scene.add(this.group)

    // ---- HTML labels (buttons for keyboard access) ----
    // On small canvases 20+ pills overlap into noise: label only the biggest
    // stars (nodes are weight-sorted). Unlabelled stars remain tappable.
    const labelCount = isMobile ? 10 : this.nodes.length
    this.nodes.forEach((node, i) => {
      const el = document.createElement("button")
      el.type = "button"
      el.textContent = node.label
      el.setAttribute("aria-label", `Filter projects by ${node.label}`)
      el.className = "galaxy-label"
      el.style.setProperty("--node-color", node.color)
      el.addEventListener("click", () => this.onSelect(node.id))
      if (i >= labelCount) el.style.display = "none"
      labelLayer.appendChild(el)
      this.labelEls.push(el)
    })

    canvas.addEventListener("pointerdown", this.handlePointerDown)
    canvas.addEventListener("pointerup", this.handlePointerUp)
    canvas.addEventListener("pointermove", this.handlePointerMove)
  }

  /** Star texture: hot white core, colored halo (via material tint), 4-point diffraction spikes */
  private static makeStarTexture(): THREE.Texture {
    const size = 128
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")!
    const c = size / 2

    // halo
    const halo = ctx.createRadialGradient(c, c, 0, c, c, c)
    halo.addColorStop(0, "rgba(255,255,255,1)")
    halo.addColorStop(0.12, "rgba(255,255,255,0.9)")
    halo.addColorStop(0.3, "rgba(255,255,255,0.35)")
    halo.addColorStop(0.65, "rgba(255,255,255,0.08)")
    halo.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = halo
    ctx.fillRect(0, 0, size, size)

    // diffraction spikes
    const spike = (angle: number, length: number) => {
      ctx.save()
      ctx.translate(c, c)
      ctx.rotate(angle)
      const gradient = ctx.createLinearGradient(0, -length, 0, length)
      gradient.addColorStop(0, "rgba(255,255,255,0)")
      gradient.addColorStop(0.5, "rgba(255,255,255,0.85)")
      gradient.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = gradient
      ctx.fillRect(-1.2, -length, 2.4, length * 2)
      ctx.restore()
    }
    spike(0, c * 0.95)
    spike(Math.PI / 2, c * 0.95)
    spike(Math.PI / 4, c * 0.45)
    spike(-Math.PI / 4, c * 0.45)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  private static makeGlowTexture(): THREE.Texture {
    const size = 128
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, "rgba(255,255,255,1)")
    gradient.addColorStop(0.25, "rgba(190,214,255,0.55)")
    gradient.addColorStop(0.6, "rgba(101,125,255,0.16)")
    gradient.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  setSize(width: number, height: number) {
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    // On narrow (portrait) canvases the fixed orbit radius crops the disc's
    // arms — pull the camera back until the full disc fits horizontally.
    const tanHalfV = Math.tan((this.camera.fov * Math.PI) / 360)
    const halfWidthNeeded = (OUTER_RADIUS + 2) * 1.12 // disc + dust spread + margin
    const distanceToFitWidth = halfWidthNeeded / (tanHalfV * this.camera.aspect)
    this.camera.position.setLength(Math.max(BASE_CAMERA_DISTANCE, distanceToFitWidth))
    this.requestRender()
  }

  start() {
    if (this.running || this.disposed) return
    this.running = true
    if (this.reducedMotion) {
      // render on demand only
      this.renderFrame()
      return
    }
    const loop = () => {
      if (!this.running) return
      this.renderFrame()
      this.rafId = requestAnimationFrame(loop)
    }
    this.rafId = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  highlight(id: string | null) {
    this.selectedIndex = id ? this.nodes.findIndex((n) => n.id === id) : null
    this.applyInstanceStates()
    this.requestRender()
  }

  private requestRender = () => {
    if (!this.reducedMotion) return
    if (this.renderRequested || this.disposed) return
    this.renderRequested = true
    requestAnimationFrame(() => {
      this.renderRequested = false
      if (!this.disposed) this.renderFrame()
    })
  }

  private applyInstanceStates() {
    this.nodes.forEach((node, i) => {
      const active = this.selectedIndex === null || this.selectedIndex === i
      const hovered = this.hoveredIndex === i
      const sprite = this.nodeSprites[i]
      const material = sprite.material as THREE.SpriteMaterial
      material.color.set(node.color)
      if (active) material.color.lerp(new THREE.Color("#ffffff"), 0.25) // hot star tint
      material.opacity = active ? 1 : 0.18
      sprite.scale.setScalar(this.baseScales[i] * (hovered || this.selectedIndex === i ? 1.35 : 1))
    })
  }

  private renderFrame() {
    this.controls.update()
    if (!this.reducedMotion) {
      // the disc itself slowly revolves, like a real galaxy
      this.group.rotation.y += 0.0009
    }
    this.renderer.render(this.scene, this.camera)
    this.updateLabels()
  }

  private updateLabels() {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const v = new THREE.Vector3()
    this.group.updateMatrixWorld()
    this.nodes.forEach((node, i) => {
      const el = this.labelEls[i]
      v.copy(this.positions[i]).applyMatrix4(this.group.matrixWorld).project(this.camera)
      const behind = v.z > 1
      const x = (v.x * 0.5 + 0.5) * width
      const y = (-v.y * 0.5 + 0.5) * height
      // names stay readable at any depth — only slight scale/opacity falloff
      const depthFade = THREE.MathUtils.clamp(1 - (v.z - 0.965) * 14, 0.7, 1)
      const dimmed = this.selectedIndex !== null && this.selectedIndex !== i
      el.style.transform = `translate(-50%, 10px) translate(${x}px, ${y}px) scale(${0.82 + depthFade * 0.18})`
      el.style.opacity = behind ? "0" : String(depthFade * (dimmed ? 0.4 : 1))
      el.style.pointerEvents = behind ? "none" : "auto"
      void node
    })
  }

  private setPointer(event: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  private pick(): number | null {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(this.nodeSprites, false)
    if (hits.length === 0) return null
    const index = hits[0].object.userData.index
    return typeof index === "number" ? index : null
  }

  private handlePointerDown = (event: PointerEvent) => {
    this.downPos = { x: event.clientX, y: event.clientY }
  }

  private handlePointerMove = (event: PointerEvent) => {
    this.setPointer(event)
    const hit = this.pick()
    if (hit !== this.hoveredIndex) {
      this.hoveredIndex = hit
      this.canvas.style.cursor = hit !== null ? "pointer" : "grab"
      this.applyInstanceStates()
      this.requestRender()
    }
  }

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.downPos) return
    const moved = Math.hypot(event.clientX - this.downPos.x, event.clientY - this.downPos.y)
    this.downPos = null
    if (moved > 5) return // it was a drag, not a click
    this.setPointer(event)
    const hit = this.pick()
    if (hit !== null) {
      this.onSelect(this.nodes[hit].id)
    }
  }

  dispose() {
    this.disposed = true
    this.stop()
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown)
    this.canvas.removeEventListener("pointerup", this.handlePointerUp)
    this.canvas.removeEventListener("pointermove", this.handlePointerMove)
    this.labelEls.forEach((el) => el.remove())
    this.labelEls = []
    this.controls.dispose()
    this.nodeSprites.forEach((sprite) => (sprite.material as THREE.Material).dispose())
    this.starTexture.dispose()
    this.dust.geometry.dispose()
    ;(this.dust.material as THREE.Material).dispose()
    this.bulge.geometry.dispose()
    ;(this.bulge.material as THREE.Material).dispose()
    this.stars.geometry.dispose()
    ;(this.stars.material as THREE.Material).dispose()
    ;(this.core.material as THREE.SpriteMaterial).dispose()
    this.coreTexture.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }
}
