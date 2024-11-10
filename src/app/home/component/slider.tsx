'use client'
import SliderItem from './slider-item'
import { Construction } from '../../../interface/construction'

const constructions = [
  {
    id: '1',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '2',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '3',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '4',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '5',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '6',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '7',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '8',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '9',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
  {
    id: '10',
    name: 'UI/UX Review Check',
    introduction: 'UI/UX Review Check',
    description: 'UI/UX Review Check',
    imageUrl: 'https://sbshouse.vn/wp-content/uploads/2024/11/179HDTK2024-31.webp',
  },
]

const Slider = () => {
  return (
    <div className='grid grid-cols-3 max-md:grid-cols-2 lg:gap-12 md:gap-6 max-md:gap-2 mx-auto xl:px-36 lg:px-20 md:px-14 max-md:px-5'>
      {constructions.map((construction: Construction) => (
        <SliderItem construction={construction} key={construction.id} />
      ))}
    </div>
  )
}

export default Slider
