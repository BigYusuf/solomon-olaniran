import Image from 'next/image'
import React from 'react'

const ImageButton = ({src, onClick, text}) => {
    if(!text){
        return (
          <Image src={src} priority alt="default image" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
             width={200} height={100} />
        )

    }
  return (
    <>
    <Image src={src} priority alt="img URL" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
        width={200} height={100} />
        <button onClick={onClick}
            className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
            font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
            dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
            {text}
        </button>
        </>
  )
}

export default ImageButton