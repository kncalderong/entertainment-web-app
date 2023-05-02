import axios, { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks'
import { isLoadingMotionPictures, isSearchingMotionPictures, updateMotionPictures, updateSearchQuery } from '../features/motionPictures/motionPictureSlice';

interface SearchBarProps {
  category: "TV Series" | 'Movie' | "Bookmarked" | "All"
}

const SearchBar = ({ category = "All" }: SearchBarProps) => {
  const [localSearch, setLocalSearch] = useState<string>('');
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const searchMotionPictures = async (query: string) => {
    if (query.length < 1) {
      dispatch(isSearchingMotionPictures({
        isSearching: false
      }))
    }
    if (query.length > 0) {
      let urlSearch = `/api/v1/motion-picture?search=${query}`
      if (category === "TV Series" || category === "Movie") {
        urlSearch = urlSearch.concat(`&category=${category}`)
      }
      if (category === "Bookmarked") {
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
        console.log("res from search movies: ", res);
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
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <section>
      <input type="search" value={localSearch} onChange={optimizedDebounce} />
    </section>
  )
}

export default SearchBar
