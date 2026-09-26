import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AddEducation, DeleteEducation, GetAllEducations, GetEducation, UpdateEducation } from '../../components/Firebase'
import { DeleteIcon, EditIcon } from '../../components/Icons'
import { useAuth } from '../../context/AuthContext'

const initialValues =
{
    school: "", 
    desc: "",
    yearStart: 0,
    yearEnd: 0,
    degree: "", 
    website: "", 
    course: "", 
}
const EducationAdmin = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const [allEdu, setAllEdu] = useState([])
    const [formData, setFormData] = useState(initialValues)
    const [dataId, setDataId] = useState("");
    const router = useRouter()
    const { currentUser } = useAuth()

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }
    const ListEdu = async () => {
        const data = await GetAllEducations();
        setAllEdu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    useEffect(() => {
          ListEdu();
    }, [])
    
    const educationData1 = [
    {id: 0, label: "School", value: formData.school, name: "school", placeholder:"School Name", type:"text", input:true},
    {id: 1, label: "Course", value: formData.course, name: "course", placeholder:"Course of study", type:"text", input:true},
    {id: 2, label: "Start Year", value: formData.yearStart, name: "yearStart", placeholder:"Input Year Start", type:"number", input:true},
    {id: 3, label: "End Year", value: formData.yearEnd, name: "yearEnd", placeholder:"Input Year End", type:"number", input:true},
    {id: 4, label: "Website", value: formData.website, name: "website", placeholder:"School Website", type:"text", input:true},
    {id: 5, label: "Degree", value: formData.degree, name: "degree", placeholder:"School Degree", type:"text", input:true},
    {id: 6, label: "Description", value: formData.desc, name: "desc", placeholder:"Description of course", type:"text", input:false},
    {id: 7, label: "Status", value: formData.status, name: "status", placeholder:"Show or hide", type:"text", input:false, select:true},
    ];

    
    function handleSubmit(event) {
        event.preventDefault()
        if(!formData.school){
            setError('Input school name first')
        }else if(!formData.course){
            setError('Enter a course')
        }else{
           if(dataId){
            
               UpdateEducation(dataId, formData).then(() => {
                   setNotify("Details Updated Successfully")
                   console.log("Details Updated Successfully")
                   ListEdu()
                   setFormData(initialValues)
               }, (err) => {
                   console.log(err);
                   setError("Error occured")
               });
           }else{
                AddEducation(formData).then(() => {
                    setNotify("Details added Successfully")
                    console.log("Details added Successfully")
                    ListEdu()
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
            const docSnap = await GetEducation(dataId);
            setFormData(docSnap.data())
            } catch (error) {}
        };
        if (dataId !== undefined && dataId !== "") {
            editProject();
          }
       }, [dataId])
       
    const deleteHandler = async (id) => {
        await DeleteEducation(id);
        setNotify("Project successfully deleted");
        ListEdu();
     }
     const editHandler = (id) => {
        setDataId(id);
     }
  
  return (
    <>
        <main className='flex w-full flex-wrap gap-8 sm:gap-4'>
            <div className='col-span-3 lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>All Education</h1>
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                <div className="w-full">
                    <div className="p-[30px] sm:p-1 m-6 sm:m-1 rounded-xl ">
                        <div className="overflow-y-auto">
                        <table className="w-full min-w-[400px] border-spacing-0 xs:text-sm">
                            <thead className="bg-light dark:bg-dark">
                                <tr className="text-left capitalize">
                                    <th className='pl-4 text-sm capitalize font-semibold'>Id</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>School</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>Status</th>
                                    <th className='pl-4 text-sm capitalize font-semibold'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    
                                {allEdu.map((item, i)=>(
                                    <tr className="hover:bg-primary hover:dark:bg-primaryDark cursor-pointer"key={i}>
                                        <td className='px-4 py-3 capitalize'>{i+1}</td>
                                        <td className='px-4 py-3 capitalize'>{item.school}</td>
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
            <div className='col-span-3 h-full  lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>{dataId?`Edit ${formData.course} `:"Add New Education"}</h1>
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                {educationData1.map((item) =>(
                <div key={item.id} className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>{item.label}</label>
                    {item.select==true?
                     <select type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder='Show or hide Education' 
                     className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                         <option value={""}></option>
                         <option value={"active"}>Active</option>
                         <option value={"inactive"}>InActive</option>
                     </select>
                    :item.input ==true ?
                    <input type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder={item.placeholder} 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                    : 
                    <textarea type={item.type} rows="5"col="20" name={item.name} value={item.value} onChange={handleChange} placeholder={item.placeholder}  
                      className='outline-none text-base duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'></textarea>
                    }
                </div>))} 
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
                <div className='flex justify-between items-center'>
                    <button onClick={() => router.push('/dashboard/skilladmin')}
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
                        <button onClick={() => router.push('/dashboard/experienceadmin')}
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

export default EducationAdmin