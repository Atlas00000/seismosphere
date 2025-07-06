"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Globe from "react-globe.gl"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Info, Settings, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface Earthquake {
  id: string
  magnitude: number
  place: string
  time: number
  coordinates: [number, number, number] // [lng, lat, depth]
  depth: number
  url: string
}

interface EarthquakeMarker {
  lat: number
  lng: number
  magnitude: number
  depth: number
  place: string
  time: number
  color: string
  size: number
  id: string
}

interface TectonicPlate {
  coordinates: number[][]
  name: string
}

const USGS_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Simplified tectonic plate boundaries (major plates)
const TECTONIC_PLATES: TectonicPlate[] = [
  {
    name: "Pacific Ring of Fire",
    coordinates: [
      [-180, 60],
      [-150, 65],
      [-130, 55],
      [-120, 50],
      [-110, 25],
      [-105, 15],
      [-90, 10],
      [-80, -10],
      [-70, -20],
      [-60, -40],
      [-50, -55],
      [150, -50],
      [160, -40],
      [170, -20],
      [180, 10],
      [170, 30],
      [150, 45],
      [130, 50],
      [120, 60],
      [-180, 60],
    ],
  },
]

export default function SeismoSphere() {
  const [earthquakes, setEarthquakes] = useState<EarthquakeMarker[]>([])
  const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeMarker | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showPlates, setShowPlates] = useState(true)
  const [minMagnitude, setMinMagnitude] = useState([2.5])
  const [globeSize, setGlobeSize] = useState([300])
  const globeRef = useRef<any>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getDepthColor = (depth: number): string => {
    if (depth < 70) return "#ef4444" // Red for shallow
    if (depth < 300) return "#f59e0b" // Amber for mid-depth
    return "#3b82f6" // Blue for deep
  }

  const getMagnitudeSize = (magnitude: number): number => {
    return Math.max(0.1, Math.min(2, magnitude * 0.3))
  }

  const fetchEarthquakeData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(USGS_API_URL)
      const data = await response.json()

      const processedEarthquakes: EarthquakeMarker[] = data.features
        .filter((feature: any) => feature.properties.mag >= minMagnitude[0])
        .map((feature: any) => ({
          id: feature.id,
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          magnitude: feature.properties.mag,
          depth: feature.geometry.coordinates[2],
          place: feature.properties.place,
          time: feature.properties.time,
          color: getDepthColor(feature.geometry.coordinates[2]),
          size: getMagnitudeSize(feature.properties.mag),
        }))

      setEarthquakes(processedEarthquakes)
    } catch (error) {
      console.error("Failed to fetch earthquake data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [minMagnitude])

  useEffect(() => {
    fetchEarthquakeData()

    if (isPlaying) {
      const interval = setInterval(fetchEarthquakeData, 300000) // Update every 5 minutes
      return () => clearInterval(interval)
    }
  }, [fetchEarthquakeData, isPlaying])

  // Seismic wave animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const waves: Array<{ x: number; y: number; radius: number; opacity: number; maxRadius: number }> = []

    const addWave = (x: number, y: number, magnitude: number) => {
      waves.push({
        x,
        y,
        radius: 0,
        opacity: 1,
        maxRadius: magnitude * 50,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i]
        wave.radius += 2
        wave.opacity -= 0.01

        if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
          waves.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(239, 68, 68, ${wave.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Add random waves for demonstration
    const waveInterval = setInterval(() => {
      if (earthquakes.length > 0 && isPlaying) {
        const randomEq = earthquakes[Math.floor(Math.random() * earthquakes.length)]
        addWave(Math.random() * canvas.width, Math.random() * canvas.height, randomEq.magnitude)
      }
    }, 2000)

    return () => clearInterval(waveInterval)
  }, [earthquakes, isPlaying])

  // Solar wind particle system
  useEffect(() => {
    const solarCanvas = document.createElement("canvas")
    solarCanvas.className = "absolute inset-0 pointer-events-none z-5"
    solarCanvas.style.mixBlendMode = "screen"

    const container = document.querySelector(".min-h-screen")
    if (container) {
      container.appendChild(solarCanvas)
    }

    const ctx = solarCanvas.getContext("2d")
    if (!ctx) return

    solarCanvas.width = window.innerWidth
    solarCanvas.height = window.innerHeight

    interface SolarParticle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      life: number
      maxLife: number
      trail: Array<{ x: number; y: number; opacity: number }>
    }

    const particles: SolarParticle[] = []
    const maxParticles = 150

    const colors = [
      "rgba(59, 130, 246, ", // Blue
      "rgba(16, 185, 129, ", // Emerald
      "rgba(139, 92, 246, ", // Purple
      "rgba(236, 72, 153, ", // Pink
      "rgba(245, 158, 11, ", // Amber
    ]

    const createParticle = (): SolarParticle => {
      const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
      let x, y, vx, vy

      const centerX = solarCanvas.width / 2
      const centerY = solarCanvas.height / 2
      const speed = 0.5 + Math.random() * 1.5

      switch (side) {
        case 0: // Top edge
          x = Math.random() * solarCanvas.width
          y = -10
          vx = (centerX - x) * 0.001 + (Math.random() - 0.5) * 0.5
          vy = speed
          break
        case 1: // Right edge
          x = solarCanvas.width + 10
          y = Math.random() * solarCanvas.height
          vx = -speed
          vy = (centerY - y) * 0.001 + (Math.random() - 0.5) * 0.5
          break
        case 2: // Bottom edge
          x = Math.random() * solarCanvas.width
          y = solarCanvas.height + 10
          vx = (centerX - x) * 0.001 + (Math.random() - 0.5) * 0.5
          vy = -speed
          break
        default: // Left edge
          x = -10
          y = Math.random() * solarCanvas.height
          vx = speed
          vy = (centerY - y) * 0.001 + (Math.random() - 0.5) * 0.5
          break
      }

      return {
        x,
        y,
        vx,
        vy,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 200 + Math.random() * 300,
        trail: [],
      }
    }

    const updateParticles = () => {
      // Add new particles
      while (particles.length < maxParticles) {
        particles.push(createParticle())
      }

      // Update existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add gravitational pull toward center (magnetosphere effect)
        const centerX = solarCanvas.width / 2
        const centerY = solarCanvas.height / 2
        const dx = centerX - particle.x
        const dy = centerY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 100) {
          const force = 0.0001
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        // Add to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity,
        })

        // Limit trail length
        if (particle.trail.length > 8) {
          particle.trail.shift()
        }

        // Update life
        particle.life++
        particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife)

        // Remove dead particles or those that went off screen
        if (
          particle.life >= particle.maxLife ||
          particle.x < -50 ||
          particle.x > solarCanvas.width + 50 ||
          particle.y < -50 ||
          particle.y > solarCanvas.height + 50
        ) {
          particles.splice(i, 1)
        }
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, solarCanvas.width, solarCanvas.height)

      particles.forEach((particle) => {
        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.opacity * 0.3
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + trailOpacity + ")"
          ctx.fill()
        })

        // Draw main particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Create glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, particle.color + particle.opacity + ")")
        gradient.addColorStop(0.5, particle.color + particle.opacity * 0.3 + ")")
        gradient.addColorStop(1, particle.color + "0)")

        ctx.fillStyle = gradient
        ctx.fill()

        // Add bright core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.min(1, particle.opacity * 1.5) + ")"
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup function
    return () => {
      if (container && solarCanvas.parentNode) {
        container.removeChild(solarCanvas)
      }
    }
  }, [isPlaying])

  // Solar wind intensity based on earthquake activity
  useEffect(() => {
    if (earthquakes.length === 0) return

    const highMagnitudeQuakes = earthquakes.filter((eq) => eq.magnitude > 5).length
    const intensity = Math.min(1, highMagnitudeQuakes / 10)

    // Adjust particle generation rate based on seismic activity
    const style = document.createElement("style")
    style.textContent = `
    .aurora-primary { 
      opacity: ${0.6 + intensity * 0.4} !important; 
      filter: brightness(${1 + intensity * 0.5});
    }
    .aurora-secondary { 
      opacity: ${0.5 + intensity * 0.3} !important; 
    }
    .aurora-tertiary { 
      opacity: ${0.4 + intensity * 0.2} !important; 
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [earthquakes])

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Larger twinkling stars */}
        <div className="stars-large absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-100 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 2}px`,
                height: `${Math.random() * 2 + 2}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Aurora Nebulae Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Aurora Layer - Green/Blue */}
          <div className="absolute inset-0 aurora-primary">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-transparent aurora-wave-1"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-blue-500/15 via-teal-400/20 to-transparent aurora-wave-2"></div>
          </div>

          {/* Secondary Aurora Layer - Purple/Pink */}
          <div className="absolute inset-0 aurora-secondary">
            <div className="absolute top-1/4 right-0 w-1/2 h-2/3 bg-gradient-to-bl from-purple-500/25 via-pink-500/15 to-transparent aurora-wave-3"></div>
            <div className="absolute bottom-1/4 left-0 w-3/4 h-1/3 bg-gradient-to-tr from-violet-600/20 via-fuchsia-500/10 to-transparent aurora-wave-4"></div>
          </div>

          {/* Tertiary Aurora Layer - Orange/Red */}
          <div className="absolute inset-0 aurora-tertiary">
            <div className="absolute top-1/3 left-1/4 w-1/3 h-1/2 bg-gradient-to-r from-orange-500/15 via-red-400/10 to-transparent aurora-wave-5"></div>
            <div className="absolute bottom-1/3 right-1/3 w-1/2 h-1/4 bg-gradient-to-l from-amber-400/20 via-rose-500/15 to-transparent aurora-wave-6"></div>
          </div>

          {/* Flowing Aurora Streams */}
          <div className="absolute inset-0">
            <div className="aurora-stream-1 absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
            <div className="aurora-stream-2 absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
            <div className="aurora-stream-3 absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
          </div>

          {/* Pulsing Aurora Nodes */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute aurora-node rounded-full blur-xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                  width: `${60 + Math.random() * 40}px`,
                  height: `${60 + Math.random() * 40}px`,
                  background: [
                    "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                  ][i % 5],
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Cosmic Dust Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute cosmic-dust rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  background: [
                    "rgba(16, 185, 129, 0.6)",
                    "rgba(139, 92, 246, 0.6)",
                    "rgba(236, 72, 153, 0.6)",
                    "rgba(59, 130, 246, 0.6)",
                    "rgba(245, 158, 11, 0.6)",
                  ][i % 5],
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Magnetosphere Boundary Visualization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="magnetosphere-boundary"></div>

          {/* Solar interaction zones */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="solar-interaction-zone absolute"
              style={{
                left: `${20 + i * 12}%`,
                top: `${15 + i * 15}%`,
                width: `${30 + Math.random() * 20}px`,
                height: `${30 + Math.random() * 20}px`,
                animationDelay: `${i * 0.8}s`,
                background: `radial-gradient(circle, ${
                  ["rgba(59, 130, 246, 0.3)", "rgba(16, 185, 129, 0.3)", "rgba(139, 92, 246, 0.3)"][i % 3]
                } 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Seismic Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-red-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
            SeismoSphere
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 border-white/20 hover:bg-white/20"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            {earthquakes.length} Active Events
          </Badge>
        </div>
      </motion.header>

      {/* Main Globe Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {isLoading ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xl">Loading seismic data...</p>
          </motion.div>
        ) : (
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl={null}
            width={globeSize[0] * 2}
            height={globeSize[0] * 2}
            // Earthquake points
            pointsData={earthquakes}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointRadius="size"
            pointAltitude={0.01}
            // Point interactions
            onPointClick={(point: any) => setSelectedEarthquake(point)}
            pointLabel={(point: any) => `
              <div class="bg-black/80 text-white p-2 rounded text-sm max-w-xs">
                <strong>M${point.magnitude}</strong><br/>
                ${point.place}<br/>
                Depth: ${point.depth}km<br/>
                ${formatTime(point.time)}
              </div>
            `}
            // Tectonic plates
            pathsData={showPlates ? TECTONIC_PLATES : []}
            pathPoints="coordinates"
            pathColor={() => "rgba(255, 255, 255, 0.3)"}
            pathStroke={1}
            pathDashLength={2}
            pathDashGap={1}
            pathDashAnimateTime={4000}
            // Globe settings
            atmosphereColor="rgba(59, 130, 246, 0.3)"
            atmosphereAltitude={0.1}
            enablePointerInteraction={true}
          />
        )}
      </div>

      {/* Control Panel */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
      >
        <Card className="w-80 bg-black/40 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="w-5 h-5" />
              Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">
                Minimum Magnitude: {minMagnitude[0]}
              </label>
              <Slider
                value={minMagnitude}
                onValueChange={setMinMagnitude}
                max={7}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Globe Size: {globeSize[0]}px</label>
              <Slider value={globeSize} onValueChange={setGlobeSize} max={400} min={200} step={10} className="w-full" />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/80">Tectonic Plates</label>
              <Switch checked={showPlates} onCheckedChange={setShowPlates} />
            </div>

            <Button onClick={fetchEarthquakeData} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              Refresh Data
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-6 right-6 z-20"
      >
        <Card className="bg-black/40 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Depth Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span className="text-sm text-white/80">Shallow (&lt;70km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="text-sm text-white/80">Mid-depth (70-300km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              <span className="text-sm text-white/80">Deep (&gt;300km)</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Earthquake Details */}
      <AnimatePresence>
        {selectedEarthquake && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <Card className="w-96 bg-black/80 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Magnitude {selectedEarthquake.magnitude}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEarthquake(null)}
                    className="text-white/60 hover:text-white"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 space-y-2">
                <p>
                  <strong>Location:</strong> {selectedEarthquake.place}
                </p>
                <p>
                  <strong>Depth:</strong> {selectedEarthquake.depth}km
                </p>
                <p>
                  <strong>Time:</strong> {formatTime(selectedEarthquake.time)}
                </p>
                <p>
                  <strong>Coordinates:</strong> {selectedEarthquake.lat.toFixed(3)}°,{" "}
                  {selectedEarthquake.lng.toFixed(3)}°
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Panel */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute right-6 top-32 z-20"
      >
        <Card className="w-72 bg-black/40 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-sm">
              <Info className="w-4 h-4" />
              Live Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-2">
            <div className="flex justify-between">
              <span>Total Events:</span>
              <span className="text-white font-medium">{earthquakes.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Largest Magnitude:</span>
              <span className="text-white font-medium">
                {earthquakes.length > 0 ? Math.max(...earthquakes.map((eq) => eq.magnitude)).toFixed(1) : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shallow Quakes:</span>
              <span className="text-red-400 font-medium">{earthquakes.filter((eq) => eq.depth < 70).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Deep Quakes:</span>
              <span className="text-blue-400 font-medium">{earthquakes.filter((eq) => eq.depth > 300).length}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
