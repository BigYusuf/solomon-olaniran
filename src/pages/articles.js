import React, { useEffect, useRef, useState } from 'react'
import AnimatedText from '../components/AnimatedText'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue } from 'framer-motion'
import TransitionEffect from '../components/TransitionEffect'
import { GetAllArticles } from '../components/Firebase'

const FramerImage = motion(Image)

const MovingImg = ({link, img, title}) => {
    const imageRef =useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    function handleMouseEnter(e){
        imageRef.current.style.display ="inline-block";
        x.set(e.pageX);
        y.set(-10)
    }
    
    function handleMouseLeave(e){
        imageRef.current.style.display ="none";
        x.set(0);
        y.set(0)
    }

  return (
    <Link href={link} target='_blank' className='' onMouseLeave={handleMouseLeave}
     onMouseMove={handleMouseEnter} >
        <h2 className='capitalize text-xl font-semibold hover:underline underline-offset-2 xs:text-sm '>
            {title}
        </h2>
        <FramerImage ref={imageRef} style={{x:x, y:y}} 
            src={img} alt={title} loading='lazy' width={150} height={150}
            className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden' 
        />
    </Link>
  )
}
const Article = ({link, img, title, date}) => {
  return (
    <motion.li 
    initial={{y: 200}}
    whileInView={{y: 0, transition: {duration:0.5, ease: "easeInOut"}}}
    viewport={{once: true}}
    className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light border text-dark first:mt-0 border-solid border-dark
     dark:bg-dark dark:text-light dark:border-light border-r-4 border-b-4
     sm:flex-col xs:text-sm '>
        <MovingImg 
            link={link}
            img={img}
            title={title}
        />
        <span className='text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm'>{date} </span>
    </motion.li>
  )
}
const FeaturedArticle = ({link, img, title, summary, time}) => {
  return (
    <li className='p-4 col-span-1 w-full bg-light border border-solid border-dark dark:bg-dark dark:border-light rounded-2xl relative'>
        <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light 
        xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]'/>
              
        <Link href={link} target='_blank' className='w-full inline-block cursor-pointer overflow-hidden rounded-lg' >
            <FramerImage src={img} width={150} height={150} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw' priority
             alt={title} className='w-full h-auto' whileHover={{scale: 1.05}} transition={{duration:0.2}} />
        </Link>
        <Link href={link} target='_blank' className='' >
            <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline underline-offset-2 xs:text-lg'>{title}</h2>
        </Link>
        <p className='text-sm mb-2'>{summary}</p>
        <span className='text-primary dark:text-primaryDark font-semibold'>{time}</span>
    </li>
  )
}

const Articles = () => {
    const [articleData, setArticleData] = useState([])
    
    const ListArticles = async () => {
        const data = await GetAllArticles();
        setArticleData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      
    useEffect(() => {
        ListArticles()
    }, [])
    const formatted_date1 = (data) => {
        console.log(data)
        let dateInMillis = data * 1000
        let date = new Date(dateInMillis)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        
        return date.toLocaleDateString(undefined, options);
    }
   
    
  return (
    <>
        <Head>
            <title>Endurance Ogbeide | Articles Page</title>
            <meta name="description" content="View my how I see the world" />
        
        </Head>
        <TransitionEffect />
        <main className='flex flex-col items-center justify-center mb-16 w-full overflow-hidden dark:text-light'>
            <Layout className='pt-16'>
                <AnimatedText className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' text={"Words Can Change The World!"}/>
                <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16'>
                {articleData.filter(value => value.type == "Featured Article").map((item, index) => 
                    <FeaturedArticle
                        summary={item.desc}
                        key={index}
                        title={item.title}
                        date={formatted_date1(item.date)}
                        img={item.img}
                        time={`${item.read_time ? item.read_time: 8 + " min"} read`}
                        link={item.link ? item.link : '/'}
                        />
                    )}
                </ul>
                <h2 className='w-full font-bold text-4xl text-center my-16 mt-32'>All Articles</h2>
                <ul>
                    {articleData.map((item, index) => 
                    <Article
                        key={index}
                        title={item.title}
                        date={formatted_date1(item.date)}
                        img={item.img}
                        link={item.link ? item.link : '/'}
                    />
                    )}
                </ul>
            </Layout>
        </main>
    </>
  )
}

export default Articles