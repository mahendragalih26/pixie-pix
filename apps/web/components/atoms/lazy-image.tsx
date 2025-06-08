"use client"

import NextImage from "@/components/atoms/next-image"
import { ImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"

const LazyImage = ({
  src,
  alt,
  className,
  classNameImage,
  ...props
}: {
  src: string
  alt: string
  classNameImage?: string
} & ImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true)
      }
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <NextImage
          alt={alt}
          className={classNameImage}
          priority={false}
          src={src}
          {...props}
        />
      ) : null}
    </div>
  )
}

export default LazyImage
