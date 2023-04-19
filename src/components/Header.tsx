import Link from 'next/link'
import React from 'react'
import {logo}  from '../../public/images/'
import Image from 'next/image'


const Header = () => {
  return (
    <header
    className="w-full flex justify-between bg-white items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
  >
    <Link href='/'>
      <Image
        className="w-28 object-contain"
        src={logo}
        alt="logo" />
    </Link>
    <Link
      href='/createPost'
      className='font-inter fornt-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
    >
      Create
    </Link>
  </header>
  )
}

export default Header