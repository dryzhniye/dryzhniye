'use client'

import { useState } from 'react'
import Image from 'next/image'
import s from './ImageSlider.module.scss'

type ImageSliderProps = {
  images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) return <p>No images available</p>

  return (
    <div className={s.slider}>
      {images.length > 1 && (
        <>
          <button onClick={handlePrevImage} className={`${s.sliderButton} ${s.prevButton}`}>
            <Image src="/left-arrow.svg" alt="Previous" width={20} height={20} />
          </button>
          <button onClick={handleNextImage} className={`${s.sliderButton} ${s.nextButton}`}>
            <Image src="/right-arrow.svg" alt="Next" width={20} height={20} />
          </button>
        </>
      )}
      <Image
        src={images[currentImageIndex]}
        alt={`Post image ${currentImageIndex + 1}`}
        width={720}
        height={720}
        className={s.image}
      />
      {images.length > 1 && (
        <div className={s.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${s.dot} ${index === currentImageIndex ? s.activeDot : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageSlider
