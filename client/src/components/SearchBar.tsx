import axios, { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks'
import { isLoadingMotionPictures, isSearchingMotionPictures, updateMotionPictures, updateSearchQuery } from '../features/motionPictures/motionPictureSlice';
import SearchIcon from "../assets/icon-search.svg"

const SearchBar = () => {
  const [localSearch, setLocalSearch] = useState<string>('');
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentPath = useLocation()
  const placeholderByURl = currentPath.pathname.slice(1) === "series" ? 'Search for TV series' : currentPath.pathname.slice(1) === "movies" ? "Search for movies" : currentPath.pathname.slice(1) === "bookmarked" ? "Search for bookmarked shows" : "Search for movies or TV series"
  
  const searchMotionPictures = async (query: string) => {
    if (query.length < 1) {
      dispatch(isSearchingMotionPictures({
        isSearching: false
      }))
    }
    if (query.length > 0) {
      let urlSearch = `/api/v1/motion-picture?search=${query}`
      if (currentPath.pathname.slice(1) === "series") {
        urlSearch = urlSearch.concat(`&category=TV Series`)
      }
      if (currentPath.pathname.slice(1) === "movies") {
        urlSearch = urlSearch.concat(`&category=Movie`)
      }
      if (currentPath.pathname.slice(1) === "bookmarked") {
        urlSearch = urlSearch.concat(`&bookmarks=true`)
      }
      dispatch(isSearchingMotionPictures({
        isSearching: true
      }))
      dispatch(updateSearchQuery({
        searchQuery: query
      }))
      dispatch(isLoadingMotionPictures({
        isLoading: true
      }))
      try {
        const res = await axios.get(urlSearch)
        dispatch(updateMotionPictures({
          motionPictures: res.data.motionPictures,
          numOfPages: res.data.numOfPages,
          totalMotionPictures: res.data.totalMotionPictures
        }))
        dispatch(isLoadingMotionPictures({
          isLoading: false
        }))
      } catch (error) {
        const err = error as AxiosError
        console.log("error from search movies: ", err);
        dispatch(isLoadingMotionPictures({
          isLoading: false
        }))
        if (err.response?.status === 401) {
          navigate('/sign-in')
        }
      }
    }
  }

  const debounce = () => {
    let timeoutId: any
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchMotionPictures(e.target.value)
      }, 500)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [currentPath]);
  return (
    <section className='w-full px-4 mt-6 md:px-0 md:mt-8'>
      <div className='w-full flex items-center justify-center gap-4 md:gap-6'>
        <div className='block w-6 h-6 md:w-8 md:h-8'>
          <img src={SearchIcon} alt="searchIcon" className='w-full'/>
        </div>
        <input type="search" value={localSearch} onChange={optimizedDebounce} className='min-h-[24px] bg-dark-blue text-white flex-grow focus-visible:bg-dark-blue focus-visible:border-b-[1px] focus-visible:border-b-greyish-blue caret-red focus-visible:outline-none cursor-pointer text-base md:text-2xl' placeholder={placeholderByURl} />
      </div>
    </section>
  )
}

export default SearchBar
