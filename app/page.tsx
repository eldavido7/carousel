'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => prev - 0.8) // Adjustable speed that works well
    }, 16) // 60fps smooth animation

    return () => clearInterval(interval)
  }, [])

  const images = [
    "https://res.cloudinary.com/deenuejys/image/upload/v1756061857/1_ool2cy.jpg?w=400&h=600&fit=crop",
    "https://res.cloudinary.com/deenuejys/image/upload/v1756061968/2_e911aa.jpg?w=400&h=600&fit=crop",
    "https://res.cloudinary.com/deenuejys/image/upload/v1756061859/3_vxjqtw.jpg?w=400&h=600&fit=crop",
    "https://res.cloudinary.com/deenuejys/image/upload/v1756061856/4_nulpj0.jpg?w=400&h=600&fit=crop",
    "https://res.cloudinary.com/deenuejys/image/upload/v1756061859/5_ajk5ar.jpg?w=400&h=600&fit=crop"
  ]

  // Create enough images to always have content visible
  const totalImages = 20

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-[#fffbf2] rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="text-[#000000] font-bold text-xl tracking-wider">LIAMZ STUDIO</div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#4b4b4b] hover:text-[#000000] transition-colors">
              Home
            </a>
            <a href="#" className="text-[#4b4b4b] hover:text-[#000000] transition-colors">
              Album
            </a>
            <a href="#" className="text-[#4b4b4b] hover:text-[#000000] transition-colors">
              Contact
            </a>
          </nav>

          <button className="bg-[#090909] text-[#ffffff] px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-[#000000] transition-colors">
            <span>Send us a message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        {/* Hero Section */}
        <main className="text-center">
          <div className="px-8 py-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] leading-tight mb-6 tracking-wide">
              CAPTURING THE VIBE,
              <br />
              FREEZING THE MOMENT
            </h1>

            <p className="text-[#4b4b4b] text-lg mb-8 max-w-2xl mx-auto">
              Specialize in the capturing amazing pictures and moments you would always remember
            </p>

            <button className="bg-[#090909] text-[#ffffff] px-8 py-4 rounded-full flex items-center space-x-2 mx-auto hover:bg-[#000000] transition-colors mb-12">
              <span>Reach us now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Portfolio Grid */}
          <div className="relative w-full h-[500px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative flex items-center justify-center"
                style={{
                  perspective: "1200px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Create multiple cycles of the same 5 images */}
                {Array.from({ length: 25 }, (_, i) => {
                  const imageIndex = i % images.length
                  const image = images[imageIndex]

                  // Calculate position in the original curved formation
                  const totalImages = 5
                  const center = (totalImages - 1) / 2
                  const cycleOffset = Math.floor(i / totalImages) - 2 // -2 to 2 for 5 cycles
                  const positionInCycle = i % totalImages
                  const offset = positionInCycle - center

                  // Apply the sliding offset to move the entire formation smoothly
                  const rawSlide = translateX * -0.02
                  const slideOffset = rawSlide % 5
                  const adjustedOffset = offset - slideOffset + (cycleOffset * 5)

                  // Render all images to avoid pop-in/pop-out effects
                  const absOffset = Math.abs(adjustedOffset)
                  const spacingMultiplier = 230 // Fixed to constant to avoid jumps

                  const translateXPos = adjustedOffset * spacingMultiplier

                  const rotateY = adjustedOffset * -25
                  const normalizedOffset = adjustedOffset / center
                  const translateZ = -200 + Math.abs(normalizedOffset * normalizedOffset * 200)

                  // Smooth opacity fade for images far from center
                  const opacity = Math.abs(adjustedOffset) > 4 ? 0 : 1
                  const transition = Math.abs(adjustedOffset) > 3 ? 'opacity 0.5s ease-out' : 'none'

                  return (
                    <div
                      key={`${image}-${i}`}
                      className="absolute w-[280px] h-[420px]"
                      style={{
                        transform: `
                          translateX(${translateXPos}px)
                          translateZ(${translateZ}px)
                          rotateY(${rotateY}deg)
                          scale(1)
                        `,
                        opacity: opacity,
                        transition: transition,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${imageIndex + 1}`}
                        className="w-full h-full object-cover shadow-lg"
                        loading="eager"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://res.cloudinary.com/deenuejys/image/upload/v1756061856/4_nulpj0.jpg?w=400&h=600&fit=crop"
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}