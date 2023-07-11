import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/logo.svg'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link href="/">
            <Image src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link href="/create-post" className="font-inter font-medium bg-sky-500 text-white px-4 py-2 rounded-md">Create</Link>
  </header>
  )
}

export default Header