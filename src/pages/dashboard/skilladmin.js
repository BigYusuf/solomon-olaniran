import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DeleteIcon, EditIcon } from '../../components/Icons'
import { AddSkill, DeleteSkill, GetAllSkills, GetSkills, UpdateSkills } from '../../components/Firebase'
import { useAuth } from '../../context/AuthContext'

const initialValues =
{
    skill_name: "", 
    skill_level: "", 
    x_position: 0,
    y_position: 0,
    status: "", 
}

const SkillAdmin = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const [allSkills, setAllSkills] = useState([])
    const [formData, setFormData] = useState(initialValues)
    const [dataId, setDataId] = useState("");
    const router = useRouter()
    const { currentUser } = useAuth()
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    const ListSkills = async () => {
        const data = await GetAllSkills();
        setAllSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    useEffect(() => {
          ListSkills();
    }, [])
    
    
    function handleSubmit(event) {
        event.preventDefault()
        if(!formData.skill_name){
            setError('Input name first')
        }else if(!formData.status){
            setError('Select a status')
        }else{
           if(dataId){
            
               UpdateSkills(dataId, formData).then(() => {
                   setNotify("Details Updated Successfully")
                   console.log("Details Updated Successfully")
                   ListSkills()
                   setFormData(initialValues)
               }, (err) => {
                   console.log(err);
                   setError("Error occured")
               });
           }else{
                AddSkill(formData).then(() => {
                    setNotify("Details added Successfully")
                    console.log("Details added Successfully")
                    ListSkills()
                    setFormData(initialValues)
                }, (err) => {
                    console.log(err);
                    setError("Error occured")
                });
            }
        }
    }
    
    useEffect(() => {
        if(error){
            setTimeout(()=>{
                setError("")
            }, 3000)
        }
        if(notify){
            setTimeout(()=>{
                setNotify("")
            }, 3000)
        }
    }, [error, notify])
    useEffect(() => {
       
        const editProject = async () => {
            try {
            const docSnap = await GetSkills(dataId);
            setFormData(docSnap.data())
            } catch (error) {}
        };
        if (dataId !== undefined && dataId !== "") {
            editProject();
          }
       }, [dataId])
       
    const deleteHandler = async (id) => {
        await DeleteSkill(id);
        setNotify("Project successfully deleted");
        ListSkills();
     }
     const editHandler = (id) => {
        setDataId(id);
     }
  return (
    <>
        <main className='flex w-full flex-wrap gap-8 sm:gap-4'>
            
            
            <div className='col-span-3 lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>All Skills</h1>
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                <div className="w-full">
                    <div className="p-[30px] sm:p-1 m-6 sm:m-1 rounded-xl ">
                        <div className="overflow-y-auto">
                        <table className="w-full min-w-[400px] border-spacing-0 xs:text-sm">
                            <thead className="bg-light dark:bg-dark">
                                <tr className="text-left capitalize">
                                    <th className='pl-4 text-sm capitalize font-semibold'>Id</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>Name</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>Status</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    
                                {allSkills.map((item, i)=>(
                                    <tr className="hover:bg-primary hover:dark:bg-primaryDark cursor-pointer"key={i}>
                                        <td className='px-4 py-3 capitalize'>{i+1}</td>
                                        <td className='px-4 py-3 capitalize'>{item.skill_name}</td>
                                        <td className='px-4 py-3 capitalize'>{item.status}</td>
                                        {(currentUser && currentUser.email === process.env.NEXT_PUBLIC_GUEST_EMAIL) ? (
                                            <td className='px-4 py-3 capitalize min-w-[2rem] flex justify-evenly items-center'>
                                                <EditIcon onClick={() => setError(`Error!, You are not Authorized`)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
                                                <DeleteIcon onClick={() => setError(`Error!, You are not Authorized`)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
                                            </td>
                                        ) : (
                                            <td className='px-4 py-3 capitalize min-w-[2rem] flex justify-evenly items-center'>
                                                <EditIcon onClick={() => editHandler(item.id)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
                                                <DeleteIcon onClick={() => deleteHandler(item.id)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        </div>
                    </div>
                </div>
              
            </div>
            <div className='col-span-3 lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>{dataId?`Edit ${formData.skill_name} `:"Add New Skill"}</h1>
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Skill Name</label>
                    <input type="text" name='skill_name' value={formData.skill_name} onChange={handleChange} placeholder="Skill Name" 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Skill Level</label>
                    <select type="text" name='skill_level' value={formData.skill_level} onChange={handleChange} placeholder='Skill Name' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                        <option value={""}></option>
                        <option value={"expert"}>Expert</option>
                        <option value={"intermediate"}>Intermediate</option>
                        <option value={"beginner"}>Beginner</option>
                    </select>
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>X-Position</label>
                    <input type="number" name='x_position' value={formData.x_position} onChange={handleChange} placeholder="Enter the horizontal postion" 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Y-Position</label>
                    <input type="number" name='y_position' value={formData.y_position} onChange={handleChange} placeholder='Enter Vertical Position' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Status</label>
                    <select type="text" name='status' value={formData.status} onChange={handleChange} placeholder='Show or hide skill' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                        <option value={""}></option>
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>InActive</option>
                    </select>
                </div>
                
                <div className='flex justify-between items-center'>
                    <button onClick={() => router.push('/dashboard')}
                    className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Back
                    </button>
                    <div className='flex'>
                       
                        <button onClick={handleSubmit}
                        className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                        font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                            {dataId ? "Update":"Save"}
                        </button>
                        <button onClick={() => router.push('/dashboard/educationadmin')}
                        className='max-w-[10ch] flex items-center bg-dark ml-3 text-light p-2.5 px-6 rounded-lg text-lg 
                        font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                            Next
                        </button>
                    
                    </div>
                </div>

            </div>
           
        </main>
    </>
  )
}

export default SkillAdmin