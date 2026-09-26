import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import AnimatedText from '../components/AnimatedText'
import Link from 'next/link'
import Image from 'next/image'
import { DribbbleIcon } from '../components/Icons'
import { motion } from 'framer-motion'
import TransitionEffect from '../components/TransitionEffect'
import { GetAllProjects } from '../components/Firebase'

const FramerImage = motion(Image)


const FeaturedProject = ({id, type, title, summary, img, link, dribbble}) => {
  return (
      <article className='flex w-full items-center justify-between rounded-3xl border border-solid border-dark bg-light dark:bg-dark dark:border-light 
      shadow-2xl p-12 relative rounded-br-2xl lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
          <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl
          xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]'/>
                    
          <Link href={link ? link : "/projects"} target='_blank' className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full' >
              <FramerImage src={img}  width={150} height={150} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw' priority
              alt={title+id} className='w-full h-auto' whileHover={{scale: 1.05}} transition={{duration:0.2}} />
          </Link>
          <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
              <span className='text-xl text-primary dark:text-primaryDark font-medium xs:text-base'>{type}</span>
              <Link href={link ? link : "/projects"} target='_blank' className='hover:underline underline-offset-2' >
                  <h2 className='my-2 w-full text-left text-4xl font-bold sm:text-sm'>{title}</h2>
              </Link>
              <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>{summary}</p>
              <div className='mt-2 flex items-center' >
                  <Link href={dribbble ? dribbble : "/projects"} target='_blank' className='w-10' ><DribbbleIcon /></Link>
                  <Link href={link ? link : "/projects"} target='_blank' 
                    className='p-2 px-6 text-lg ml-4 rounded-lg bg-dark text-light dark:bg-light dark:text-dark font-semibold sm:px-4 sm:text-base' >
                    Visit Project
                    </Link>
              </div>
          </div>
      </article>
  )
}
const Project = ({id, type, title, img, link, dribbble}) => {
  return (
      <article className='flex flex-col w-full items-center justify-between rounded-2xl border border-solid border-dark bg-light dark:bg-dark dark:border-light shadow-2xl p-6 relative xs:p-4'>
          <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light 
          xs:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]'/>
                    
          <Link href={link ? link : "/projects"} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg' >
              <FramerImage src={img} alt={title+id} width={150} height={150} loading='lazy' className='w-full h-auto' whileHover={{scale: 1.05}} transition={{duration:0.2}} />
          </Link>
          <div className='w-full flex flex-col items-start justify-between mt-4'>
              <span className='text-xl text-primary dark:text-primaryDark font-medium lg:text-lg md:text-base'>{type}</span>
              <Link href={link ? link : "/projects"} target='_blank' className='hover:underline underline-offset-2' >
                  <h2 className='my-2 w-full text-left text-4xl font-bold lg:text-2xl'>{title}</h2>
              </Link>
              <div className='w-full mt-2 flex items-center justify-between' >
                  <Link href={link ? link : "/projects"} target='_blank' className='text-lg font-semibold underline md:text-base' >Visit</Link>
                  <Link href={ dribbble ? dribbble : "/projects"} target='_blank' className='w-8 md:w-6' >
                      {" "}<DribbbleIcon />{" "}
                  </Link>
              </div>
          </div>
      </article>
  )
}

const Projects = () => {
  const [projectData, setprojectData] = useState([])

  const ListProjects = async () => {
    const data = await GetAllProjects();
    setprojectData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  let filteredArray = projectData.filter(value => value.type == "Featured Project");
  let filteredArray2 = new Array(projectData.length);
  let j = 0;
  for(let i = 0, n = 0; i < projectData.length; i++){
    if(projectData[i].type === "Featured Project"){
      continue;
    }
    if(j % 3 === 2 && n < filteredArray.length){
      filteredArray2[j++] = filteredArray[n++];
    }
    filteredArray2[j++] = projectData[i];
  }
  
  useEffect(() => {
        ListProjects();
  }, [])
  


  return (
    <>
    <Head>
        <title>Endurance Ogbeide | Project Page</title>
        <meta name="description" content="View my cool projects" />
       
    </Head>
      <TransitionEffect />
    <main className='flex flex-col items-center justify-center mb-16 w-full dark:text-light'>
        <Layout className='pt-16'>
        <AnimatedText className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' text={"Imagination Trumps Knowledge!"}/>
            <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
              {filteredArray2.map((item, index)=>
              <div className={item.type==="Featured Project" ?'col-span-12' : 'col-span-6 sm:col-span-12'} key={index}>
               {item.type==="Featured Project" ?
                  <FeaturedProject
                    key={index}
                    title= {item.name}
                    summary={item.desc} 
                    dribbble={item.dribbble}
                    link={item.link}
                    type={item.type}
                    img={item.img}
                  />
                :
                  <Project
                    key={index}
                    title= {item.name}
                    summary={item.desc} 
                    dribbble={item.dribbble}
                    link={item.link}
                    type={item.type}
                    img={item.img}
                  />
              }
              </div>
              )}
            </div>
        </Layout>
    </main>
    </>
  )
}

export default Projects