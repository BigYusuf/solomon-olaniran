import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ProfilePic from '../../../assets/images/profile/oldman_edited.png'
import { AddArticle } from '../../../components/Firebase'
import { handleUpload } from '../../../components/UploadImg'
import { serverTimestamp } from 'firebase/firestore'

const initialValues =
{
    title: "",
    image: "",
    desc: "", 
    category: "", 
    type: "", 
    link: "",
    source: "",
    read_time: "",
}
const NewArticle = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const [img, setImg] = useState("")
    const [formData, setFormData] = useState(initialValues)
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
    
    const newArticleData = [
    {id: 0, label: "Picture", value: formData.image, name: "image", placeholder:"Picture", type:"file", filetype:"image", input:true},
    {id: 1, label: "Article Name", value: formData.title, name: "title", placeholder:"Article Name", filetype:"text",  type:"text", input:true},
    {id: 2, label: "Article Type", value: formData.type, name: "type", placeholder:"type", filetype:"text",  type:"text", input:true},
    {id: 3, label: "Link", value: formData.link, name: "link", placeholder:"Article Link", filetype:"text",  type:"text", input:true},
    {id: 4, label: "Category", value: formData.category, name: "category", placeholder:"Article Category", filetype:"text",  type:"text", input: true, select: true},
    {id: 5, label: "Source", value: formData.source, name: "source", placeholder:"Where can we find your article", filetype:"text",  type:"text", input:true},
    {id: 6, label: "Read Time", value: formData.read_time, name: "read_time", placeholder:"How long will it take to read", filetype:"text",  type:"text", input:true},
    {id: 7, label: "Description", value: formData.desc, name: "desc", placeholder:"Description of Job", filetype:"text",  type:"text", input:false},
    ];
    

    function handleSubmit(event) {
        event.preventDefault()
        if(!formData.type){
            setError('Select a type')
        }else if(!formData.title){
            setError('Give the article a title')
        }else{
            delete formData['image'];
             formData['img']= img
             formData['date']= serverTimestamp()
            AddArticle(formData).then(() => {
                setNotify("Details added Successfully")
                console.log("Details added Successfully")
                setFormData(initialValues)
                setImg("")
            }, (err) => {
                console.log(err);
                setError("Error occured")
            });
        }
    }
    const UploadPic =() => {
        handleUpload(setImg, formData.image, setError)
        setNotify("Image Uploaded")
    }
    const changePic = ()=> {
        setImg("")
        formData["image"]=null
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
  
    
  return (
    <>
        <main className='flex w-full flex-wrap gap-8 sm:gap-4'>
            
            <div className='col-span-3 h-full  lg:h-full flex flex-wrap flex-col dark:text-light flex-1 xs:p-2 p-20 text-xs sm:text-sm justify-start items-left gap-[20px] sm:gap-6 xs:mx-6'>
            <h1 className='text-xl font-bold'>Add New Article</h1>
                {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
               {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
              {newArticleData.map((item) =>(
                <div key={item.id} className='flex flex-col w-[18rem] xs:w-[16rem]'>
                    <label className='h-6 min-w-[8rem] text-sm capitalize font-semibold'>{item.label}</label>
                    { item.name=="type" ?
                     <select type={item.type} name={item.name} value={item.value} onChange={handleChange} placeholder='Article Status' 
                     className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full dark:focus:border-primary focus:border-primaryDark'>
                         <option value={""}></option>
                         <option value={"Featured Article"}>Featured Article</option>
                         <option value={"Article"}>Article</option>
                     </select>
                     : item.filetype== "image"?
                    <>
                    <label htmlFor='image'className='relative'onChange={handleChange}>
                        {img?
                            <>
                            <Image src={img} priority alt="img URL" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                                width={200} height={100} />
                                <button onClick={changePic}
                                    className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                                    Change
                                </button>
                                </>
                                :
                                formData.image ?
                            <>
                                <Image src={URL.createObjectURL(formData.image)} priority alt="image" className='cursor-pointer h-[150px] w-[150px] rounded-2xl'
                                width={200} height={100} />
                                <button onClick={UploadPic}
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
                     onChange={handleChange} placeholder='Picture' 
                    className='outline-none text-base h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 dark:focus:border-primary focus:border-primaryDark' />
                    </>

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
                    <button onClick={() => router.push('/dashboard/articleadmin')}
                    className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Back
                    </button>
                    <button onClick={handleSubmit}
                    className='max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                        Save
                    </button>
                </div>
            </div>
           
        </main>
    </>
  )
}

export default NewArticle