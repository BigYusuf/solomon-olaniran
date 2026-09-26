import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ProfilePic from '../../assets/images/profile/oldman_edited.png'
import { GetFolioAbout, SetFolioAbout, UpdateFolioAbout } from '../../components/Firebase'
import { handleUpload } from '../../components/UploadImg'
import { serverTimestamp } from "firebase/firestore"

const EducationAdmin = () => {
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)
    const [bio, setBio]= useState('');
    const [highlight, setHighlight]= useState('');
    const [img, setImg]= useState('');
    const [totalClient, setTotalClient]= useState('');
    const [exp, setExp]= useState('');
    const [totalPrj, setTotalPrj]= useState('');
    const router = useRouter()

    function handleSubmit(event) {
        event.preventDefault()
            updateHandler()
    }
    const updateHandler = async() => {
        const docSnap = await GetFolioAbout();
        const payload= {bio, highlight, img, exp, totalClient, totalPrj, createdAt: serverTimestamp()}
       if(docSnap.data()){
            UpdateFolioAbout(payload).then(() => {
              //toast.success("Details Updated");
              console.log("it worked")
              }, (err) => {
                  console.log(err);
                //  toast.error("Error!!!, About not Updated");
              });
            }else{
                SetFolioAbout(payload).then(() => {
                  console.log("it worked")
                  }, (err) => {
                      console.log(err);
                    //  toast.error("Error!!!, About not Updated");
                  });
            }
        /*--------------------------send to firestore database----------------------------*/
     }
     const handleUploadImg = (e)=>{
        e.preventDefault()
        handleUpload(setImg, image)
        setImage('')
        console.log(img)
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
        const editAbout = async () => {
            try {
            const docSnap = await GetFolioAbout();
            if(docSnap){
                setBio(docSnap.data().bio);
                setImg(docSnap.data().img);
                setExp(docSnap.data().exp);
                setTotalClient(docSnap.data().totalClient);
                setTotalPrj(docSnap.data().totalPrj);
                setHighlight(docSnap.data().highlight);
            }
           } catch (err) {
               console.log(err)
           }
       };
           editAbout();
   }, [])


  return (
    <>
        <main className='grid w-full grid-cols-6 gap-16 sm:gap-8'>
            <div className='col-span-3 h-[78vh]  lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
                {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label htmlFor='' className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Picture</label>
                    <label htmlFor='image'className='relative' onChange={(e) => setImage(e.target.files[0])}>
                        {img ?
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
                                image ?
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
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Years of Exp</label>
                    <input type="number" name='exp' value={exp} onChange={(e)=> setExp(e.target.value)} placeholder='Years of Experience' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Total Clients</label>
                    <input type="number" name='totalClient' value={totalClient} onChange={(e)=> setTotalClient(e.target.value)} placeholder='Satisfied clients' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Total Projects</label>
                    <input type="number" name='totalPrj' value={totalPrj} onChange={(e)=> setTotalPrj(e.target.value)} placeholder='Total completed project' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Highlight</label>
                    <input type="text" name='highlight' value={highlight} onChange={(e)=> setHighlight(e.target.value)} placeholder='HighLight' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark' />
                </div>
               {/* <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Description</label>
                    <textarea type="text" rows="5"col="20" name='desc' value={desc} onChange={(e)=> setDesc(e.target.value)} placeholder='Description' 
                    className='outline-none text-base duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'></textarea>
                    </div>*/}
                <div className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>Biography</label>
                    <textarea type="text" rows="7"col="20" name='bio' value={bio} onChange={(e)=> setBio(e.target.value)} placeholder='Biography' 
                    className='outline-none text-base duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'></textarea>
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
                            Save
                        </button>
                        <button onClick={() => router.push('/dashboard/skilladmin')}
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