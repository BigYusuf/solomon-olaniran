import React, { useEffect, useState } from 'react'
import Table from '../../../components/BigTable'

import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DeleteIcon, EditIcon, PlusIcon2 } from '../../../components/Icons'
import { DeleteArticle, GetAllArticles } from '../../../components/Firebase'



const headerData = [
    'image',
    'title',
    'category',
    'source',
    'type',
    'date',
    'action'
]

const ArticleAdminPage = () => {
    const [articleData, setArticleData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [notify, setNotify] = useState(null)
    
    const ListArticles = async () => {
        setIsLoading(true)
        const data = await GetAllArticles();
        setArticleData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      
    useEffect(() => {
        ListArticles()
        setIsLoading(false);
    }, [])
    
    const router = useRouter()
      
    const deleteHandler = async (id) => {
        await DeleteArticle(id);
        setNotify("Article successfully deleted");
        ListArticles();
        setIsLoading(false);
     }
    
     useEffect(() => {
        
        if(notify){
            setTimeout(()=>{
                setNotify("")
            }, 3000)
        }
    }, [ notify])

      function formatted_date(data)
      {
         var result="";
         var d = new Date(data*1000);
         result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
         return result;
      }
      

    const renderBody = (item) => (
        <tr className='hover:bg-primary hover:dark:bg-primaryDark cursor-pointer' key={item.id}>
            <td className='px-4 py-3 capitalize'> 
                 <Image src={item.img} 
                    alt="prj image"
                    className='p-1'
                    width={80}
                    height={50}
                    priority
                    />
            </td>
            <td className='px-4 py-3 capitalize'>{item.title}</td>
            <td className='px-4 py-3 capitalize'>{item.category}</td>
            <td className='px-4 py-3 capitalize'>{item.source}</td>
            <td className='px-4 py-3 capitalize'>{item.type}</td>
            <td className='px-4 py-3 capitalize'>{formatted_date(item.date)}</td>
            <td className='px-4 py-3 capitalize min-w-[2rem] flex justify-between items-center'>
              <EditIcon onClick={() => router.push(`/dashboard/articleadmin/${item.id}`)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
              <DeleteIcon onClick={() => deleteHandler(item.id)} className={"w-6 ml-1 cursor-pointer dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
            </td>
        </tr>
    )

  return (
    <div className='m-10'>
    <div className='relative'>
      <h2 className="capitalize mb-3 text-4xl ml-20 font-bold dark:text-light xs:text-lg sm:ml-4">
          Articles Manager
      </h2>
         <Link href="/dashboard/articleadmin/newarticle"
                className='absolute top-1 right-1 flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                md:p-2 md:px-4 md:text-base xs:hidden'>
                  New Article <PlusIcon2 className={"w-6 ml-1"}/>
        </Link>
        <Link href="/dashboard/articleadmin/newarticle"
        className='absolute top-1 right-1 xs:block hidden'>
        <PlusIcon2 className={"w-6 ml-1 dark:text-light text-dark hover:text-dark hover:dark:text-light"}/>
        </Link>
      </div>

      <div className="flex py-[15px] sm:p-1 flex-wrap dark:text-light">
      {notify && <div className='w-full max-w-[40ch] border-green-400 border text-center border-solid text-green-400 py-2'>{notify}</div>}
               
          <div className="w-full">
              <div className="p-[30px] sm:p-1 m-6 sm:m-1 rounded-xl  ">
                  <div className="h-full">
                    {isLoading ? <div>please wait a moment</div>
                    :
                       <Table 
                            data={articleData} 
                            renderBody={(item) => renderBody(item)}
                            headerData={headerData} 
                            rowsPerPage={4} 
                        />
                        }
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default ArticleAdminPage