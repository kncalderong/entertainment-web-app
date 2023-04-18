import homeIconNav from "../assets/icon-nav-home.svg"
import moviesIconNav from "../assets/icon-nav-movies.svg"
import seriesIconNav from "../assets/icon-nav-tv-series.svg"
import bookmarkedIconNav from "../assets/icon-nav-bookmark.svg"
import homeIconNavActive from "../assets/icon-nav-home-active.svg"
import moviesIconNavActive from "../assets/icon-nav-movies-active.svg"
import seriesIconNavActive from "../assets/icon-nav-tv-series-active.svg"
import bookmarkedIconNavActive from "../assets/icon-nav-bookmark-active.svg"


export type NavLinkType = {
  id: number,
  text: string,
  path: string
  icon: string
  iconActive: string
}

const links: NavLinkType[] = [
  { id: 1, text: 'home', path: '/', icon: homeIconNav, iconActive: homeIconNavActive },
  { id: 2, text: 'movies', path: 'movies', icon: moviesIconNav, iconActive: moviesIconNavActive },
  { id: 3, text: 'series', path: 'series', icon: seriesIconNav, iconActive: seriesIconNavActive },
  { id: 4, text: 'bookmarked', path: 'bookmarked', icon: bookmarkedIconNav, iconActive: bookmarkedIconNavActive },
]

export default links