import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import links, { NavLinkType } from '../utils/links'
import LogoMovie from '../assets/logo.svg'
import AvatarImg from '../assets/image-avatar.png'



const Navbar = () => {
  const navigate = useNavigate()
  return (
    <section className='flex justify-between w-full px-4 py-[18px] bg-semi-dark-blue'>
      <div className='block w-[25px] h-[20px]' onClick={() => navigate('/')} >
        <img src={LogoMovie} alt="logo-movies" className='w-full block' />
      </div>
      <div className='flex gap-6 items-center'>
        {links.map((link: NavLinkType) => {
          const { text, path, id, icon, iconActive } = link;
          return (
            <NavLink to={path} key={id} >
              {(isActive) => {
                return (<div className='block w-[16px] h-[16px] cursor-pointer'>
                  <img src={isActive.isActive ? iconActive : icon} alt={text} className='w-full block' />
                </div>)
              }}
            </NavLink>
          )
        })}
      </div>
      <div className='block w-[24px] h-[24px] border-[1px] border-white rounded-full' >
        <img src={AvatarImg} alt="logo-avatar" className='w-full block' />
      </div>
    </section>
  )
}

export default Navbar
