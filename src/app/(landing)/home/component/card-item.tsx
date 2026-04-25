'use client'

import React, { memo, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Construction } from '@/interface/construction'
import Image from 'next/image'

interface Props {
  construction: Construction
}

const PLACEHOLDER = 'https://placehold.co/600x400/1a1a1a/ffba00?text=NewHouse'

// ===== Detail Modal — render qua Portal tại document.body =====
const DetailModal = memo(({ construction, onClose }: { construction: Construction; onClose: () => void }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = construction.images.length > 0 ? construction.images : [PLACEHOLDER]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length])

  const modal = (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 md:p-8' onClick={onClose}>
      <div
        style={{ width: '50vw', height: '88vh' }}
        className='relative bg-white rounded-2xl overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10 flex-shrink-0'>
          <h2 className='text-lg font-bold text-gray-900 pr-4 line-clamp-1'>{construction.name}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-3xl leading-none flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Đóng'
          >
            ×
          </button>
        </div>

        {/* Text info */}
        <div className='space-y-2'>
          <p className='text-[#FFBA00] font-semibold text-sm'>{construction.introduction}</p>
          <p className='text-gray-600 text-sm leading-relaxed'>{construction.description}</p>
        </div>

        <div className='p-6 space-y-5'>
          {/* Main image */}
          <div className='relative w-full rounded-xl overflow-hidden bg-gray-100' style={{ height: '55vh' }}>
            <Image
              src={images[activeIndex]}
              alt={`${construction.name} - ảnh ${activeIndex + 1}`}
              fill
              className='object-cover'
              sizes='80vw'
            />

            {/* Arrow buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className='absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors'
                  aria-label='Ảnh trước'
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className='absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors'
                  aria-label='Ảnh tiếp'
                >
                  ›
                </button>
                <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full'>
                  {activeIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail strip — phía dưới cùng */}
          {images.length > 1 && (
            <div className='flex gap-2 overflow-x-auto pb-1 pt-2 border-t border-gray-100'>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeIndex
                      ? 'border-[#FFBA00] scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Xem ảnh ${idx + 1}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className='object-cover' sizes='64px' />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
})
DetailModal.displayName = 'DetailModal'

// ===== Card Item =====
const CardItem = memo(({ construction }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const imageUrl = construction.images[0] || PLACEHOLDER

  const openModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => setShowModal(false), [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setShowModal(true)
    }
  }

  return (
    <>
      <article
        className='group min-w-[30%] cursor-pointer bg-white hover:shadow-lg transition-all duration-300'
        role='article'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Dự án ${construction.name}`}
      >
        <div className='flex justify-center items-center w-full relative h-[320px] overflow-hidden'>
          <Image
            src={imageUrl}
            alt={`Hình ảnh dự án ${construction.name}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              isLoading ? 'blur-sm' : ''
            }`}
            priority
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
              <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ffba00]' />
            </div>
          )}
          {construction.images.length > 1 && (
            <div className='absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full'>
              📷 {construction.images.length}
            </div>
          )}
        </div>

        <div className='lg:py-4 md:px-4 md:py-2 max-md:px-2 max-md:py-2 overflow-hidden'>
          <div className='flex flex-col gap-4'>
            <h3 className='font-normal leading-7 text-black lg:text-[18px] md:text-[16px] max-md:text-[12px] whitespace-nowrap break-words truncate'>
              {construction.name}
            </h3>
            <p className='text-[12px] font-light h-[36px] line-clamp-2'>{construction.introduction}</p>
            <div>
              <button
                onClick={openModal}
                className='py-[5px] px-[10px] bg-[#ffba00] inline-flex items-center justify-center gap-3 text-white hover:bg-[#e5a700] transition-colors duration-300'
                aria-label={`Xem thêm về dự án ${construction.name}`}
              >
                <span className='text-[14px] font-light'>Xem thêm</span>
                <i className='fa-solid fa-arrow-up-right-from-square text-[12px]' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Modal render tại document.body qua Portal */}
      {showModal && <DetailModal construction={construction} onClose={closeModal} />}
    </>
  )
})

CardItem.displayName = 'CardItem'

export default CardItem
