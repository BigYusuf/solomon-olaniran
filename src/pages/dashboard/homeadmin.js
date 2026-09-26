import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ProfilePic from '../../assets/images/profile/oldman_edited.png'
import { GetFolioHome, SetFolioHome, UpdateFolioHome } from '../../components/Firebase'
import { handleUpload } from '../../components/UploadImg'
import { serverTimestamp } from 'firebase/firestore'

const HomeAdmin = () => {
    const [error, setError] = useState(null)
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [resume, setResume] = useState("")
    const [resumeUrl, setResumeUrl] = useState("")
    const [link, setLink] = useState("")
    const [twitter, setTwitter] = useState("")
    const [dribbble, setDribbble] = useState("")
    const [linkedIn, setLinkedin] = useState("")
    const [pinterest, setPinterest] = useState("")
    const [instagram, setInstagram] = useState("")
    const [highlight, setHighlight] = useState("")
    
    const router = useRouter()

    function handleChange(event) {
        const {name, value, type, files} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : type== 'file'? files[0]:value
            }
        })
    }
    
    
    function handleSubmit(event) {
        event.preventDefault()
            updateHandler()
    }
    const updateHandler = async() => {
        const docSnap = await GetFolioHome();
        const payload= {email, highlight, img, link, resumeUrl, desc, dribbble, linkedIn, pinterest, instagram, createdAt: serverTimestamp()}
       if(docSnap.data()){
            UpdateFolioHome(payload).then(() => {
              //toast.success("Details Updated");
              console.log("it worked")
              }, (err) => {
                  console.log(err);
                //  toast.error("Error!!!, Home not Updated");
              });
            }else{
                SetFolioHome(payload).then(() => {
                  console.log("it worked")
                  }, (err) => {
                      console.log(err);
                    //  toast.error("Error!!!, Home not Updated");
                  });
            }
        /*--------------------------send to firestore database----------------------------*/
     }
     const handleUploadImg = (e) =>{
        e.preventDefault()
        handleUpload(setImg, image)
        setImage('')
        console.log(img)
     }
     const handleUploadResume = (e) =>{
        e.preventDefault()
        handleUpload(setResumeUrl, resume)
        setResume('')
        console.log(resumeUrl)
     }
     const handleChangeImage = (e) => {
       // e.preventDefault()
        setImg('')
        setImage(e.target.files[0])
     }
    
    useEffect(() => {
        if(error){
            setTimeout(()=>{
                setError("")
            }, 3000)
        }
    }, [error])

    useEffect(() => {
        const editHome = async () => {
            try {
            const docSnap = await GetFolioHome();
            if(!docSnap || docSnap== undefined){
                console.log("No data yet")
            }else{
                setEmail(docSnap.data().email);
                setImg(docSnap.data().img);
                setDesc(docSnap.data().desc);
                setResumeUrl(docSnap.data().resumeUrl);
                setLink(docSnap.data().link);
                setTwitter(docSnap.data().twitter);
                setHighlight(docSnap.data().highlight);
                setInstagram(docSnap.data().instagram);
                setDribbble(docSnap.data().dribbble);
                setLinkedin(docSnap.data().linkedIn);
                setPinterest(docSnap.data().pinterest);
            }
           } catch (err) {
               console.log(err)
           }
       };
           editHome();
   }, [])

  
  return (
    <>
        <main className='grid w-full grid-cols-6 gap-16 sm:gap-8'>
            
            <div className='col-span-3 h-[78vh]  lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label htmlFor='' className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Picture</label>
                    <label htmlFor='image'className='relative'onChange={(e)=> setImage(e.target.files[0])}>
                        {img?
                        <>
                             <Image src={img} priority alt="img URL" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                             width={200} height={100} />
                             <button onClick={handleUploadImg}
                                 className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                                 font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                                 dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                     Upload
                             </button>
                         </>:
                                image?
                                <>
                                    <Image src={URL.createObjectURL(image)} priority alt="image" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                                    width={200} height={100} />
                                    <button onClick={handleUploadImg}
                                    className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                        Upload
                                    </button>                  
                                </>
                                :
                                <Image src={ProfilePic} priority alt="default image" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                                width={200} height={100} />
                        }
                        
                    </label>
                    
                    <input type="file" accept="image/*" style={{display:'none'}} name='image' id='image'
                     onChange={(e) => setImage(e.target.files[0])} placeholder='Picture' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Email</label>
                    <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email Address' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Highlight</label>
                    <input type="text" name='highlight' value={highlight} onChange={(e)=> setHighlight(e.target.value)} placeholder='HighLight' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Job Link</label>
                    <input type="text" name='link' value={link} onChange={(e)=> setLink(e.target.value)} placeholder='Job Link' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Pinterest Link</label>
                    <input type="text" name='pinterest' value={pinterest} onChange={(e)=> setPinterest(e.target.value)} placeholder='Pinterest' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>LinkedIn</label>
                    <input type="text" name='linkedin' value={linkedIn} onChange={(e)=> setLinkedin(e.target.value)} placeholder='LinkedIn page' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Twitter</label>
                    <input type="text" name='twitter' value={twitter} onChange={(e)=> setTwitter(e.target.value)} placeholder='Twitter address' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Dribbble</label>
                    <input type="text" name='dribbble' value={dribbble} onChange={(e)=> setDribbble(e.target.value)} placeholder='Dribbble link' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Instagram</label>
                    <input type="text" name='instagram' value={instagram} onChange={(e)=> setInstagram(e.target.value)} placeholder='Instagram address' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem] relative'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Resume</label>
                    <div className='flex flex-col' >
                        
                        <input type="file" name='resume' id='resume' onChange={(e)=> setResume(e.target.files[0])} placeholder='Resume' 
                        className='outline-none text-base h-12 duration-300 p-2 w-full  dark:focus:border-primary focus:border-primaryDark rounded-[1rem] xs:rounded-[0.5rem]' />
                        {resume && <button onClick={handleUploadResume}
                            className=' max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                            font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                            dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                Upload
                        </button>}
                    </div>
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Description</label>
                    <textarea type="text" rows="5"col="20" name='desc' value={desc} onChange={(e)=> setDesc(e.target.value)} placeholder='Description' 
                    className='outline-none text-base duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'></textarea>
                </div>
                
                <div className='flex justify-between items-center'>
                    <button onClick={() => router.push('/dashboard')}
                    className=' flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Back
                    </button>
                    <div className='flex'>
                        <button onClick={handleSubmit}
                        className=' flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                        font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                            Save
                        </button>
                        <button onClick={() => router.push('/dashboard/aboutadmin')}
                        className='flex items-center bg-dark ml-3 text-light p-2.5 px-6 rounded-lg text-lg 
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

export default HomeAdmin