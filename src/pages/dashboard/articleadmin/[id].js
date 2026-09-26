import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProfilePic from '../../../assets/images/profile/oldman_edited.png'
import { GetArticle, UpdateArticle } from '../../../components/Firebase'
import { handleUpload } from '../../../components/UploadImg'
import ImageButton from '../../../components/ImageButton'

const initialValues =
{
    title: "",
    img: "",
    image: "",
    desc: "", 
    category: "", 
    type: "", 
    link: "",
    source: "",
    read_time: "",
}
const EditArticle = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const [img, setImg] = useState("")
    const [formData, setFormData] = useState(initialValues)
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()


   useEffect(() => {
      const editArticle = async () => {
            try {
            const docSnap = await GetArticle(router.query.id);
            setFormData(docSnap.data())
            } catch (error) {}
        };
        if (router.query.id !== undefined && router.query.id !== "") {
            editArticle();
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
    
    const EditArticleData = [
        {id: 0, label: "Picture", value: formData.image, name: "image", placeholder:"Picture", type:"file", filetype:"image", input:true},
        {id: 1, label: "Article Name", value: formData.title, name: "title", placeholder:"Article Name", filetype:"text",  type:"text", input:true},
        {id: 2, label: "Article Type", value: formData.type, name: "type", placeholder:"type", filetype:"text",  type:"text", input:true},
        {id: 3, label: "Link", value: formData.link, name: "link", placeholder:"Website Link", filetype:"text",  type:"text", input:true},
        {id: 4, label: "Category", value: formData.category, name: "category", placeholder:"Article Category", filetype:"text",  type:"text", input: true, select: true},
        {id: 5, label: "Source", value: formData.source, name: "source", placeholder:"Where can we find your article", filetype:"text",  type:"text", input:true},
        {id: 6, label: "Read Time", value: formData.read_time, name: "read_time", placeholder:"How long will it take to read", filetype:"text",  type:"text", input:true},
        {id: 7, label: "Description", value: formData.desc, name: "desc", placeholder:"Description of Job", filetype:"text",  type:"text", input:false},
        ];
    

    function handleSubmit(event) {
        event.preventDefault()
        delete formData['image'];
        if(img) {formData['img']=img;}
        UpdateArticle(router.query.id, formData).then(() => {
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
              {EditArticleData.map((item) =>(
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
                        Update
                    </button>
                </div>
            </div>
           
        </main>
    </>
  )
}

export default EditArticle