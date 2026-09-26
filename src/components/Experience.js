import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'
import { GetAllactiveExperiences } from './Firebase';

const Details = ({position, company, companyLink, time, address, work}) => {
    const ref = useRef(null);
   return (
    <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-center md:w-[80%]'>
        <LiIcon reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration: 0.5, type: "spring"}}>
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{position}&nbsp;
                <a href={companyLink} target='_blank' rel="noreferrer" className='text-primary dark:text-primaryDark capitalize'>@{company}</a> 
            </h3>
            <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
                {time} | {address}
            </span>
            <p className='w-full font-medium md:text-sm'>
                {work}
            </p>
        </motion.div>
    </li>
  )
}
const Experience = () => {
    const ref = useRef(null)
    const [allExp, setAllExp] = useState([])

    const ListEdu = async () => {
        const data = await GetAllactiveExperiences();
        setAllExp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
          ListEdu();
    }, [])
    const {scrollYprogress} = useScroll({
        target: ref,
        offset:["start end", "center start"]
    })

    return (
        <div className='my-64'>
            <h2 className='mb-32 font-bold text-8xl w-full text-center md:text-center md:text-6xl xs:text-4xl md:mb-16'>
                Experience
            </h2>
            <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            
                <motion.div style={{scaleY: scrollYprogress}} 
                className='w-[4px] left-9 absolute top-0 h-full bg-dark dark:bg-light origin-top 
                md:w-[2px] md:left-[30px] xs:left-[20px]'/>
                
                <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2 '>
                {allExp.map((item) =>(
                    <Details
                        key={item.id}
                        position={item.role}
                        company={item.company}
                        companyLink={item.website}
                        time={`${item.yearStart}-${item.yearEnd}`}
                        address={item.address}
                        work={item.desc}
                    />
                    ))}
                                       
                </ul>
            </div>
        </div>
  )
}

export default Experience