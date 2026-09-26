import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'
import { GetAllactiveEducations } from './Firebase';

const Details = ({type, time, info, place}) => {
    const ref = useRef(null);
   return (
    <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-center md:w-[80%]'>
        <LiIcon reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration: 0.5, type: "spring"}}>
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{type}
               </h3>
            <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
                {time} | {place}
            </span>
            <p className='w-full font-medium md:text-sm'>
                {info}
            </p>
        </motion.div>
    </li>
  )
}
const Education = () => {
    const ref = useRef(null)
    const [allEdu, setAllEdu] = useState([])
    
    const ListEdu = async () => {
        const data = await GetAllactiveEducations();
        setAllEdu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                Education
            </h2>
            <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            
                <motion.div style={{scaleY: scrollYprogress}} 
                className='w-[4px] left-9 absolute top-0 h-full bg-dark dark:bg-light origin-top
                md:w-[2px] md:left-[30px] xs:left-[20px]'/>
                
                <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2 '>
                    {allEdu.map((item) =>(
                        <Details
                            key={item.id}
                            type={item.degree}
                            time={`${item.yearStart}-${item.yearEnd}`}
                            place={item.school}
                            info={item.desc}
                        />

                    ))}
                   
                   
                </ul>
            </div>
        </div>
  )
}

export default Education