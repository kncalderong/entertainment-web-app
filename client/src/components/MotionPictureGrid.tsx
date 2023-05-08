import React from 'react'
import { MotionPictureType } from '../features/motionPictures/motionPictureSlice'
import bookmarkedEmptyIcon from "../assets/icon-bookmark-empty.svg"
import bookmarkedFullIcon from "../assets/icon-bookmark-full.svg"
import movieMiniIcon from "../assets/icon-category-movie.svg"
import tvSerieMiniIcon from "../assets/icon-category-tv.svg"

interface MotionPictureGridProps {
  motionPicture: MotionPictureType
  isBookMarked: boolean
  bookmarkHandler: (motionPictureId: string) => void
}

const MotionPictureGrid = ({motionPicture, isBookMarked, bookmarkHandler} : MotionPictureGridProps) => {
  return (
    <article className={`w-[calc(50%-8px)] text-white relative md:w-[calc(((1/3)*100%)-20px)]` } >
      <div className=' '>
        <picture className='block mb-2'>
          <img src={motionPicture.thumbnail.regular.small} alt={motionPicture.title} className='w-100 rounded-lg' />
        </picture>
      </div>
      <div className='absolute top-[8px] right-[8px] bg-greyish-blue-opacity-50 p-[9px] rounded-full opacity-50 w-[32px] h-[32px] flex justify-center items-center' onClick={()=>bookmarkHandler(motionPicture._id)}>
        <img src={isBookMarked ? bookmarkedFullIcon : bookmarkedEmptyIcon} alt="bookmarkIcon" className='w-100' />
      </div>
      <div className='flex gap-[6px] items-center mb-1 text-grey md:gap-[8px]'>
        <span className='text-[11px] md:text-[13px]'>{motionPicture.year}</span>
        <span className='w-[2px] h-[2px] rounded-full bg-white inline-block'></span>
        <div className='flex justify-center items-center gap-1'>
          <div className="block w-[10px] md:w-[12px]">
            <img src={motionPicture.category === "TV Series" ? tvSerieMiniIcon : movieMiniIcon} alt={motionPicture.category} className='w-full' />
          </div>
          <span className='text-[11px] md:text-[13px]'>{motionPicture.category}</span>
        </div>
        <span className='w-[2px] h-[2px] rounded-full bg-white inline-block'></span>
        <span className='text-[11px] md:text-[13px]'>{motionPicture.rating}</span>
      </div>
      <div className='md:text-lg'>{motionPicture.title}</div>
    </article>
  )
}

export default MotionPictureGrid
