import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Logo from './Logo'
import { TwitterIcon, DribbbleIcon, LinkedInIcon, PinterestIcon, SunIcon, MoonIcon, InstagramIcon } from './Icons'
import { motion } from 'framer-motion'
import useThemeSwitcher from '../hooks/useThemeSwitcher'
import { GetFolioHome } from './Firebase'


const CustomLink = ({href, title, className=""}) => {
    const router = useRouter()
    return (
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
             ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-light`}>
                &nbsp;
            </span>
        </Link>

    )
}
const CustomMobileLink = ({href, title, className="", toggle}) => {
    const router = useRouter()
    const handleUrl = () => {
        toggle();
        router.push(href)
    }
    return (
        <button href={href} onClick={handleUrl} className={`${className} relative group text-light dark:text-dark my-2`}>
            {title}
            <span className={`h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
             ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-dark`}>
                &nbsp;
            </span>
        </button>

    )
}

const Navbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    const [isOpen, setIsOpen] = useState(false);
    const [twitter, setTwitter] = useState("")
    const [dribbble, setDribbble] = useState("")
    const [linkedIn, setLinkedin] = useState("")
    const [pinterest, setPinterest] = useState("")
    const [instagram, setInstagram] = useState("")

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const editNavbar = async () => {
            try {
            const docSnap = await GetFolioHome();
            if(!docSnap || docSnap== undefined){
                console.log("No data yet")
            }else{
                setTwitter(docSnap.data().twitter);
                setInstagram(docSnap.data().instagram);
                setDribbble(docSnap.data().dribbble);
                setLinkedin(docSnap.data().linkedIn);
                setPinterest(docSnap.data().pinterest);
            }
           } catch (err) {
              // console.log(err)
           }
       };
           editNavbar();
    }, [])

  return (
    <header className='w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative
    z-10 lg:px-16 md:px-12 sm:px-8'>
        {/*hamburger button*/}
        <button className='flex-col justify-center items-center hidden lg:flex' onClick={handleClick}>
            <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1': '-translate-y-0.5'}`}></span>
            <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0': 'opacity-1'}`}></span>
            <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1': 'translate-y-0.5'}`}></span>
        </button>
        {/*desktop menu */}
        <div className='flex items-center justify-between w-full lg:hidden'>
            <nav>
                <CustomLink href="/" title="Home" className='mr-4' />
                <CustomLink href="/about" title="About" className='mx-4'/>
                <CustomLink href="/projects" title="Projects" className='mx-4' />
                <CustomLink href="/articles" title="Articles" className='ml-4' />
            </nav>
            <nav className='flex items-center justify-center flex-wrap'>
                <motion.a href={twitter ? twitter : "https://twitter.com"} target={'_blank'} rel="noreferrer"
                    whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><TwitterIcon/></motion.a>
                <motion.a href={instagram ? instagram : "https://instagram.com"} target={'_blank'} rel="noreferrer"
                    whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><InstagramIcon/>
                </motion.a>
                <motion.a href={pinterest ? pinterest : "https://pinterest.com"} target={'_blank'} rel="noreferrer"
                    whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><PinterestIcon />
                </motion.a>
                <motion.a href={dribbble ? dribbble : "https://dribbble.com"} target={'_blank'} rel="noreferrer"
                    whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><DribbbleIcon/>
                </motion.a>
                <motion.a href={linkedIn ? linkedIn : "https://linkedin.com"} target={'_blank'} rel="noreferrer"
                    whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><LinkedInIcon/>
                </motion.a>
                <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
                className={`ml-3 flex items-center justify-center rounded-full p-1 
                ${mode === "light" ? "bg-dark text-light": "bg-light text-dark"}`}>
                    {mode==="dark" ? 
                    <SunIcon className={"fill-dark"} /> 
                    : 
                    <MoonIcon className={"fill-dark"} /> 
                    }
                </button>
            </nav>    
        </div>
        {/*mobile menu */}
        { isOpen &&
            <motion.div 
            initial={{scale:0, opacity:0, x: "-50%", y: "-50%"}}
            animate={{scale:1, opacity:1}}
            className='flex flex-col items-center justify-between min-w-[70vw] z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-dark/75 dark:bg-light/75 rounded-lg backdrop-blur-md py-32'>
                <nav className='flex flex-col items-center justify-center'>
                    <CustomMobileLink href="/" title="Home" className='' toggle={handleClick} />
                    <CustomMobileLink href="/about" title="About" className='' toggle={handleClick}/>
                    <CustomMobileLink href="/projects" title="Projects" className='' toggle={handleClick} />
                    <CustomMobileLink href="/articles" title="Articles" className='' toggle={handleClick} />
                </nav>
                <nav className='flex items-center justify-center flex-wrap mt-2'>
                    <motion.a href={twitter ? twitter : "https://twitter.com"} target={'_blank'} rel="noreferrer"
                        whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3 sm:mx-1' ><TwitterIcon/></motion.a>
                    <motion.a href={instagram ? instagram : "https://instagram.com"} target={'_blank'} rel="noreferrer"
                        whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3 bg-light dark:bg-dark rounded-full sm:mx-1' ><InstagramIcon/>
                    </motion.a>
                    <motion.a href={pinterest ? pinterest : "https://pinterest.com"}target={'_blank'} rel="noreferrer"
                        whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3 bg-light rounded-full sm:mx-1' ><PinterestIcon />
                    </motion.a>dribbble
                    <motion.a href={dribbble ? instagram : "https://dribbble.com"} target={'_blank'} rel="noreferrer"
                        whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3 sm:mx-1' ><DribbbleIcon/>
                    </motion.a>
                    <motion.a href={linkedIn ? linkedIn : "https://linkedin.com"} target={'_blank'} rel="noreferrer"
                        whileHover={{y:-2}} whileTap={{scale:0.9}} className='w-6 mr-3' ><LinkedInIcon/>
                    </motion.a>
                    <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    className={`ml-3 flex items-center justify-center rounded-full p-1 sm:mx-1
                    ${mode === "light" ? "bg-dark text-light": "bg-light text-dark"}`}>
                        {mode==="dark" ? 
                        <SunIcon className={"fill-dark"} /> 
                        : 
                        <MoonIcon className={"fill-dark"} /> 
                        }
                    </button>
                </nav>    
            </motion.div>
        }
        <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
            <Logo/>
        </div>
    </header>
  )
}

export default Navbar