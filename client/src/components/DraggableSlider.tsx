import React, {useRef, useEffect} from 'react'
import MotionPictureSlide from './MotionPictureSlide'
import { MotionPictureType } from '../features/motionPictures/motionPictureSlice'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { updateBookmarksSlice } from '../features/user/userSlice'
import updateBookmarks from '../utils/updateBookmarks'

interface DraggableSliderProps {
  motionPictures: MotionPictureType[]
}

const DraggableSlider = ({ motionPictures }: DraggableSliderProps) => {
  
  const sliderRef = useRef<HTMLInputElement>(null)
  const innerSliderRef = useRef<HTMLInputElement>(null)
  let pressed:boolean = false
  let x:number
  let startX: number

  const dispatch = useAppDispatch()
  const bookmarkedMotionPictures: string[] = useAppSelector((state) => state.user.bookmarks)
  
  const updateBookmarksHandler = async (motionPictureId: string) => {
    const newMotionPictures = await updateBookmarks(motionPictureId, bookmarkedMotionPictures)
    if (newMotionPictures) {
      dispatch(updateBookmarksSlice({
        bookmarks: newMotionPictures
      }))
    }
  }
  
  const mouseDown = (event:React.MouseEvent<HTMLDivElement, globalThis.MouseEvent> ) => {
    event.preventDefault();
    pressed = true 
    sliderRef.current!.style.cursor = 'grabbing'
    startX = (event.nativeEvent.pageX - 162) - innerSliderRef.current!.offsetLeft 
  }
  
  const mouseUp = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    pressed = false
    sliderRef.current!.style.cursor = 'grab'
  }
  
  const mouseOut = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    pressed = false
    sliderRef.current!.style.cursor = 'grab'
  }
  
  const mouseMove = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!pressed) return;
    event.preventDefault();
    x = event.nativeEvent.pageX - 162
    innerSliderRef.current!.style.left = `${checkBoundaries(x , startX)}px`
  }
  
  const checkBoundaries = (posFinal:number, posInitial:number) => {
    if (posFinal - posInitial >= 0) return
    if ((sliderRef.current!.offsetWidth + Math.abs(posFinal - posInitial)) >= innerSliderRef.current!.offsetWidth) return
    return posFinal - posInitial
  }
  
  return (
    <div className='hidden lg:block h-[230px] overflow-hidden w-full relative cursor-grab mb-10' ref={sliderRef} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseLeave={mouseOut}>
      <div className='flex gap-10 h-full absolute top-0 left-0' ref={innerSliderRef}>
        {motionPictures.map((motionPicture: MotionPictureType) => {
          return (
            <MotionPictureSlide isBookMarked={bookmarkedMotionPictures.includes(motionPicture._id)} key={motionPicture._id} motionPicture={motionPicture} bookmarkHandler={updateBookmarksHandler} />
          )
        })}
      </div>
    </div>
  )
}

export default DraggableSlider
