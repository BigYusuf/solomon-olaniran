import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GetAllactiveSkills } from './Firebase'


const Skill = ({name, x, y}) => {
 
  return (
    <motion.div className='cursor-pointer flex items-center justify-center rounded-full font-semibold bg-dark text-light dark:text-dark dark:bg-light py-3 px-6 absolute shadow-dark
    lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold'
        whileHover ={{scale: 1.05,}}
        initial={{x:0, y:0}}
        whileInView={{x: x, y: y, transition: {duration: 1.5}}}
        
        viewport={{once: true}}>
            {name}
    </motion.div>
  )
}

const Skills = () => {
  const [allSkills, setAllSkills] = useState([])
  const ListSkills = async () => {
    const data = await GetAllactiveSkills();
    setAllSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
 
  useEffect(() => {
        ListSkills();
  }, [])
  return (
    <>
    <h2 className='mt-64 text-8xl font-bold w-full text-center md:text-6xl md:mt-32'>Skills</h2>
        <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] 
        lg:bg-circularLightLg lg:dark:bg-circularDarkLg
        md:bg-circularLightMd md:dark:bg-circularDarkMd
        sm:bg-circularLightSm sm:dark:bg-circularDarkSm
        '>
            <motion.div className='cursor-pointer flex items-center justify-center rounded-full font-semibold bg-dark text-light dark:bg-light dark:text-dark p-8 shadow-dark
            lg:p-6 md:p-4 xs:p-2 xs text-xs'
              whileHover ={{
                scale: 1.05,
              }}>Top Notch
            </motion.div>
            {allSkills.map((item)=>(
              <Skill key={item.id} name={item.skill_name} x={`${item.x_position}vw`} y={`${item.y_position}vw`} />
            ))
            }
        </div>
    </>
  )
}

export default Skills