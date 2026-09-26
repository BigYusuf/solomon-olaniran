import React, { useState } from 'react'
//import { useRouter } from 'next/router'
import { CloseIcon } from './Icons'
//import VideoPlayer from 'react-video-js-player'
import ReactPlayer from 'react-player'


const VideoModal = ({setOpenModal, videoSrc, poster}) => {
   /* const router = useRouter()
    const dispatch = useDispatch()
    const [selectType, setSelectType] = useState({ pdf: false, webArticles: false })
    */
    const handleSubmit = async () => {
       setOpenModal(false);
      /*
       if(selectType.pdf){
            if(frmURL ){
                const update = {frmURL};
                try {
                    let newcol = await axios.post("/api/upload", update,{
                        withCredentials: true,
                    credentials: 'include'
                    })
                    dispatch(SET_FILE(newcol.data.pdfText))
                    router.push("/chats")
                } catch (error) {
                 console.log("err",error);
                }
            }
        }
        else if(selectType.webArticles){
            console.log(frmURL)
            console.log("key ", process.env.NEXT_PUBLIC_INFATICA_APIKEY)
            if(frmURL ){
              // const URL = {frmURL}
            const options1 = {
                method: 'POST',
                responseType: 'json',
                data: {
                api_key: process.env.NEXT_PUBLIC_INFATICA_APIKEY,
                },
             url: frmURL
             }
              /*  try {
                    // do something
                   /* let newData = await axios.post("", URL,{
                        withCredentials: true,
                        credentials: "include",
                        url: 'TARGET_URL',
                        api_key: process.env.NEXT_PUBLIC_INFATICA_APIKEY,
                    })
                    let newData = await axios(options)
                    dispatch(SET_FILE("do something"))
                        console.log(newData)                    
                    
                    router.push("/chats")
                } catch (error) {
                 console.log("err",error);
                }
                
                const options = {
                    method: 'POST',
                    responseType: 'json',
                    data: {
                        api_key: process.env.NEXT_PUBLIC_INFATICA_APIKEY,
                        url: 'http://localhost:3000/',
                        mobile: true,            //mobile parameter is optional
                        country_code: 'gb'       //country_code parameter is optional
                    },
                    url: 'https://www.codevertiser.com/how-to-create-custom-radio-button-in-reactjs/'
                }
                
                axios(options)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                  
            }
        }else{
            console.log("Select either Pdf or Articles button")
        }
*/
    }

  const handleChange = (e) => {
    /*
    const { name } = e.target
   // console.log('clicked', name)
    if (name === 'webArticles') {
      setSelectType({ pdf: false, webArticles: true })
    }
    if (name === 'pdf') {
      setSelectType({ pdf: true, webArticles: false })
    }
    */
  }
  
  return (
    <div className='absolute left-0 top-0 bottom-0 right-0 flex justify-center items-center'>
        <div className='w-[445px] h-[265px] rounded-xl bg-light dark:bg-dark text-dark dark:text-light flex flex-col p-6' onClick={e => e.stopPropagation()}>
            <div className='flex justify-end'>
                <div className='bg-transparent' onClick={()=>setOpenModal(false)}>
                   <CloseIcon className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-red-400"}/>
                </div>
            </div>
            <div className='mt-3 inline-block text-center'>
                <h1>Video Player</h1>
            </div>
            <div className='flex flex-[50%] justify-center items-center flex-col text-xl text-center'>
                <ReactPlayer
                className='react-player'
                url={videoSrc}
                width='100%'
                height='100%'
                controls
                />
             {/*  <VideoPlayer src={videoSrc} poster={poster} width='100%' height='100%' />
           */} </div>
            <div className='flex flex-[20%] justify-center items-center'>
                <button onClick={()=>setOpenModal(false)}id="cancelBtn"
                    className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                    Cancel
                </button>
                <button onClick={handleSubmit}
                    className='absolute right-4 top-4 max-w-[10ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                    Upload
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default VideoModal