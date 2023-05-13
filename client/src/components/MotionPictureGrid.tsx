import React, { useState } from 'react'
import { MotionPictureType } from '../features/motionPictures/motionPictureSlice'
import bookmarkedEmptyIcon from "../assets/icon-bookmark-empty.svg"
import bookmarkedFullIcon from "../assets/icon-bookmark-full.svg"
import bookmarkedEmptyIconBlack from "../assets/icon-bookmark-empty-black.svg"
import movieMiniIcon from "../assets/icon-category-movie.svg"
import tvSerieMiniIcon from "../assets/icon-category-tv.svg"
import { useMediaQuery } from '../hooks/useMediaQuery'
import IconPlay from '../assets/icon-play.svg'

interface MotionPictureGridProps {
  motionPicture: MotionPictureType
  isBookMarked: boolean
  bookmarkHandler: (motionPictureId: string) => void
}


const MotionPictureGrid = ({ motionPicture, isBookMarked, bookmarkHandler }: MotionPictureGridProps) => {

  const [isHover, setIsHover] = useState<boolean>(false)
  const [isHoverBookmark, setIsHoverBookmark] = useState<boolean>(false)
  const isTablet = useMediaQuery('(min-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const style = {
    backgroundImage: `url(${isDesktop ? motionPicture.thumbnail.regular.large : isTablet ? motionPicture.thumbnail.regular.medium : motionPicture.thumbnail.regular.small})`
  }

  return (
    <article className={`w-[calc(50%-8px)] cursor-pointer text-white relative md:w-[calc(((1/3)*100%)-20px)] lg:w-[calc(((1/4)*100%)-30px)]`} >
      <div className='w-100 rounded-lg mb-2 h-[110px] bg-cover md:h-[140px] lg:h-[174px]' style={style} onMouseOver={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
        {/*Overlay*/}
        {(isHover && isDesktop) ? (
          <div className="w-full h-full flex  justify-center items-center" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(16, 20, 30, 0.2), rgba(16, 20, 30, 0.2))'
          }} >
            <div className='flex gap-[20px] p-[9px] rounded-[29px] h-12 items-center w-[117px] justify-start' style={{
            backgroundImage: 'linear-gradient(0deg, rgba(190, 194, 204, 0.3), rgba(190, 194, 204, 0.3))'
          }}>
              <div className='block w-[30px] h-[30px]'>
                <img src={IconPlay} alt="iconPlay" className='w-full' />
              </div>
              <p>Play</p>
            </div>
          </div>
        ) : (!isDesktop) ? (
          <div className="w-full h-full flex  justify-center items-center" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(16, 20, 30, 0.2), rgba(16, 20, 30, 0.2))'
          }} ></div>
        ) : null}
      </div>
      
      {/*BookmarkIcon*/}
      <div className={`absolute top-[8px] right-[8px] ${(isHoverBookmark && !isBookMarked) ? 'bg-white' : 'bg-greyish-blue-opacity-50'} p-[9px] rounded-full opacity-50 w-[32px] h-[32px] flex justify-center items-center cursor-pointer`} onClick={()=>bookmarkHandler(motionPicture._id)} onMouseOver={() => { setIsHoverBookmark(true) }} onMouseLeave={() => { setIsHoverBookmark(false) }}>
        <img src={isBookMarked ? bookmarkedFullIcon : isHoverBookmark ? bookmarkedEmptyIconBlack : bookmarkedEmptyIcon} alt="bookmarkIcon" className='w-100' />
      </div>
      
      {/*RegularContent*/}
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
