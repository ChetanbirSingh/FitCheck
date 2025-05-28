'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Review', href: '/review' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className='w-full flex justify-center mt-6 mb-20 z-50 pb-1'>
      <nav
        className={`fixed max-w-4xl md:w-[80%] w-[90%] bg-accent-lime
       text-black px-6 py-5
       md:rounded-full shadow-lg 
       backdrop-blur-xl 
       flex flex-col
       md:flex-row md:items-center 
       justify-between z-50 ${open ? 'rounded-2xl' : 'rounded-full'}
       `}
      >
        <div className='flex justify-between items-center w-full md:w-auto'>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Link href='/' className='text-xl font-bold tracking-wide'>
              FitCheck
            </Link>
          </motion.div>
          <button onClick={() => setOpen(!open)} className='md:hidden' aria-label='Toggle Menu'>
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        <ul
          className={`flex flex-col md:flex-row md:items-center gap-6 mt-4 md:mt-0  ${
            open ? 'flex' : 'hidden md:flex'
          }`}
        >
          {links.map(({ name, href }, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.1,
                ease: 'easeOut',
              }}
            >
              <Link href={href} onClick={() => setOpen(false)}>
                {name}
              </Link>
            </motion.li>
          ))}
          <motion.button
            type='button'
            aria-label='Toggle Menu'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com/ChetanbirSingh/FitCheck')}
            className='px-4 py-2 bg-black text-white rounded-2xl cursor-pointer'
          >
            GitHub
          </motion.button>
        </ul>
      </nav>
    </header>
  );
}
