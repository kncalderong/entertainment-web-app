import React from 'react'
import { MotionPictureType } from '../features/motionPictures/motionPictureSlice'
import bookmarkedEmptyIcon from "../assets/icon-bookmark-empty.svg"
import bookmarkedFullIcon from "../assets/icon-bookmark-full.svg"
import movieMiniIcon from "../assets/icon-category-movie.svg"
import tvSerieMiniIcon from "../assets/icon-category-tv.svg"
import { useMediaQuery } from '../hooks/useMediaQuery'

interface MotionPictureSlideProps {
  motionPicture: MotionPictureType
  isBookMarked: boolean
  bookmarkHandler: (motionPictureId: string) => void
}
const MotionPictureSlide = ({ motionPicture, isBookMarked, bookmarkHandler }: MotionPictureSlideProps) => {
  
  const isTablet = useMediaQuery('(min-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const style = {
    backgroundImage: `linear-gradient(0deg, rgba(16, 20, 30, 0.2), rgba(16, 20, 30, 0.2)), url(${isDesktop ? motionPicture.thumbnail.regular.large : isTablet ? motionPicture.thumbnail.regular.medium : motionPicture.thumbnail.regular.small })`
  }

  return (
    <article className={`text-white relative min-w-[calc(100%-120px)] h-[140px] rounded-lg bg-cover flex flex-col justify-end p-4 md:min-w-[calc(100%-250px)] md:h-[230px]` } style={style}>
      <div className='absolute top-[8px] right-[8px] bg-greyish-blue-opacity-50 p-[9px] rounded-full opacity-50 w-[32px] h-[32px] flex justify-center items-center' onClick={()=>bookmarkHandler(motionPicture._id)}>
        <img src={isBookMarked ? bookmarkedFullIcon : bookmarkedEmptyIcon} alt="bookmarkIcon" className='w-100' />
      </div>
      <div className='flex gap-[6px] items-center mb-1 text-grey '>
        <span className='text-[11px] md:text-[15px]'>{motionPicture.year}</span>
        <span className='w-[2px] h-[2px] rounded-full bg-white inline-block md:w-[3px] md:h-[3px]'></span>
        <div className='flex justify-center items-center gap-1 md:gap-[6px]'>
          <div className="block w-[10px] md:text-[15px] md:w-[12px]">
            <img src={motionPicture.category === "TV Series" ? tvSerieMiniIcon : movieMiniIcon} alt={motionPicture.category} className='w-full' />
          </div>
          <span className='text-[11px] md:text-[15px]'>{motionPicture.category}</span>
        </div>
        <span className='w-[2px] h-[2px] rounded-full bg-white inline-block md:w-[3px] md:h-[3px]'></span>
        <span className='text-[11px] md:text-[15px]'>{motionPicture.rating}</span>
      </div>
      <div className='md:text-2xl'>{motionPicture.title}</div>
    </article>
  )
}

export default MotionPictureSlide
