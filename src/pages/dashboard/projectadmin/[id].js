import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProfilePic from '../../../assets/images/profile/oldman_edited.png'
//import SampleVideo from '../../../assets/video/testvideo.mp4'
import VideoModal from '../../../components/Modal'
import { GetProject, UpdateProject } from '../../../components/Firebase'
import { handleUpload } from '../../../components/UploadImg'
import ImageButton from '../../../components/ImageButton'
//import VideoPlayer from 'react-video-js-player'

const initialValues =
{
    name: "",
    videoUrl: "",
    img: "",
    image: "",
    desc: "", 
    duration: "",
    video: "",
    category: "", 
    link: "",
    dribbble: "",
    source: "",
    client: "", 
    status: "", 
}
const EditProject = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const [img, setImg] = useState("")
    const [formData, setFormData] = useState(initialValues)
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()


   useEffect(() => {
      const editProject = async () => {
            try {
            const docSnap = await GetProject(router.query.id);
            setFormData(docSnap.data())
            } catch (error) {}
        };
        if (router.query.id !== undefined && router.query.id !== "") {
            editProject();
          }
       }, [router.query.id])
       
   
    function handleChange(event) {
        const {name, value, type, files} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : type== 'file'? files[0]:value
            }
        })
    }
    
    const EditProjectData = [
        {id: 0, label: "Picture", value: formData.image, name: "image", placeholder:"Picture", type:"file", filetype:"image", input:true},
        {id: 1, label: "Project Name", value: formData.name, name: "name", placeholder:"Project Name", filetype:"text",  type:"text", input:true},
        {id: 2, label: "Client", value: formData.client, name: "client", placeholder:"Client", filetype:"text",  type:"text", input:true},
        {id: 3, label: "Project Duration", value: formData.duration, name: "duration", placeholder:"Project Timeframe", filetype:"text",  type:"text", input:true},
        {id: 4, label: "Video Upload", value: formData.video, name: "video", placeholder:"Video", type:"file", filetype:"video", input:true},
        {id: 5, label: "Link", value: formData.link, name: "link", placeholder:"Website Link", filetype:"text",  type:"text", input:true},
        {id: 6, label: "Category", value: formData.category, name: "category", placeholder:"Project Category", filetype:"text",  type:"text", input: true, select: true},
        {id: 7, label: "Source", value: formData.source, name: "source", placeholder:"Where did you get the Project", filetype:"text",  type:"text", input:true},
        {id: 8, label: "Project Status", value: formData.status, name: "status", placeholder:"Project Status", filetype:"text",  type:"text", input:true, select: true},
        {id: 9, label: "Description", value: formData.desc, name: "desc", placeholder:"Description of Job", filetype:"text",  type:"text", input:false},
        {id: 10, label: "Dribbble Link", value: formData.dribbble, name: "dribbble", placeholder:"Dribbble Address", filetype:"text",  type:"text", input:true},
    ];
    

    function handleSubmit(event) {
        event.preventDefault()
        delete formData['image'];
        if(img) {formData['img']=img;}
        
        UpdateProject(router.query.id, formData).then(() => {
            setNotify("Details updated Successfully")
        }, (err) => {
            console.log(err);
            setError("Error occured")
        });
    }

    const UploadPic =() => {
        handleUpload(setImg, formData.image)
        setNotify("Image Uploaded")
    }
    const changePic = ()=> {
        setImg("")
        formData["img"]=""
        formData["image"]=""
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
  
    const CloseModal = () => {
        if(modalOpen){
            setModalOpen(false)
        }
    }
  return (
    <>
        <main className='flex w-full flex-wrap gap-8 sm:gap-4' onClick={CloseModal}>
            
            <div className='col-span-3 h-full  lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>{`Edit ${formData.name} `}</h1>
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
               {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
              {EditProjectData.map((item) =>(
                <div key={item.id} className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>{item.label}</label>
                    {item.name== "status" ?
                     <select type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder='Project Status' 
                     className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                         <option value={""}></option>
                         <option value={"completed"}>Completed</option>
                         <option value={"pending"}>Pending</option>
                     </select>
                    : item.name=="category" ?
                     <select type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder='Project Status' 
                     className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                         <option value={""}></option>
                         <option value={"Featured Project"}>Featured Project</option>
                         <option value={"Project"}>Project</option>
                     </select>
                     : item.filetype== "image"?
                    <>
                    <label htmlFor='image'className='relative'onChange={handleChange}>
                        {img ?                           
                            <ImageButton src={img} onClick={changePic} text={"Change"} />
                            :
                            formData.img ?
                            <ImageButton src={formData.img} onClick={changePic} text={"Upload"} />
                            :
                            formData.image ?
                            <ImageButton src={URL.createObjectURL(formData.image)} onClick={UploadPic} text={"Upload"} />
                            :
                            <ImageButton src={ProfilePic} />
                        }
                        
                    </label>
                    
                    <input type="file" accept="image/*" style={{display:'none'}} name='image' id='image'
                     onChange={handleChange} placeholder='Picture' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                    </>

                    :item.filetype== "video" ?
                    <i className='text-red-400'>Video coming soon
                    {/*
                        <>
                    <label htmlFor='video'className=''onChange={handleChange}>
                    {formData.videoUrl?
                        <VideoModal videoSrc={formData.videoUrl} poster={ProfilePic} setOpenModal={setModalOpen}/>
                       
                            :
                            formData.video?
                            <>
                            <button 
                                className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                                font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                Change
                            </button>
                            <button onClick={()=> setModalOpen(true)}
                                className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                                font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                Upload
                            </button>
                                {/* 
                                    <VideoPlayer src={vid} poster={ProfilePic} width='200px' height='200px' />
                
                                
                           </>
                            :
                            <Image src={ProfilePic} priority alt="default video" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                            width={200} height={100} />
                    }
                    
                </label>
                
                    <input type={item.type} name={item.name} accept="video/mp4,video/x-m4v,video/*" onChange={handleChange} placeholder={item.placeholder} 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                    </>*/}
                    </i>
                    :item.input ==true ?
                    <input type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder={item.placeholder} 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                    : 
                    <textarea type={item.type} rows="5"col="20" name={item.name} value={item.value} onChange={handleChange} placeholder={item.placeholder}  
                      className='outline-none text-base duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'></textarea>
                    }
                </div>))}
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
               {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
             
                <div className='flex justify-between items-center'>
                    <button onClick={() => router.push('/dashboard/projectadmin')}
                    className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Back
                    </button>
                    <button onClick={handleSubmit}
                    className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Update
                    </button>
                </div>
            </div>
           
        </main>
    </>
  )
}

export default EditProject