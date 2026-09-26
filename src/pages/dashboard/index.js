import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import TransitionEffect from '../../components/TransitionEffect'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import { box } from '../../assets/data'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

const DashboardPage = () => {
    const router = useRouter()
    const { currentUser } = useAuth()

    useEffect(() => {
    if(!currentUser){
        router.push('/login')
    }
    }, [router, currentUser])
    
    const latestArticles = {
        head: [
            'id',
            'date',
            'title'
        ],
        body: [
            {
                "id": "1",
                "date": "1 Jun 2023",
                "title": "Freelancing as a graphic designer"
            },
            {
                "id": "2",
                "date": "11 Jun 2023",
                "title": "Finding remote jobs as graphic designer"
            },
            {
                "id": "3",
                "date": "13 Jun 2023",
                "title": "Degree vs No degree designer"
            },
            {
                "id": "4",
                "date": "8 Jul 2023",
                "title": "Role of colors in engineering industry"
            }
        ]
      }
      
      const renderCustomerHead = (item, index) => (
        <th  className='pl-4' key={index}>{item}</th>
      )
      
      const renderCustomerBody = (item, index) => (
        <tr className='hover:bg-primary hover:dark:bg-primaryDark cursor-pointer' key={index}>
            <td className='px-4 py-3 capitalize'>{item.id}</td>
            <td className='px-4 py-3 capitalize'>{item.date}</td>
            <td className='px-4 py-3 capitalize'>{item.title}</td>
        </tr>
      )
    
    const latestProjects = {
    head: [
        "project id",
        "name",
        "client",
        "duration",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            name: "Design Ketlog franchise logo",
            client: "Ketlog",
            duration: "2 weeks",
            status: "pending"
        },
        {
            id: "#OD1712",
            name: "Edit wedding video chief Osioma",
            client: "Chief Osioma",
            duration: "1 week",
            status: "completed"
        },
        {
            id: "#OD1713",
            name: "Design New Logo for Hadith App",
            client: "Upwork client",
            duration: "2 days",
            status: "completed"
        },
        {
            id: "#OD1714",
            name: "Create a billboard design",
            client: "Adron real estate",
            duration: "1 week",
            status: "completed"
        },
        {
            id: "#OD1715",
            name: "rebrand drink design",
            client: "Bigi cola",
            duration: "1 month",
            status: "completed"
        }
    ]
    }
  
  const orderStatus = {
    "completed": "bg-blue-400",
    "pending": "bg-red-400",
  }
  
  const renderOrderHead = (item, index) => (
    <th className='pl-5' key={index}>{item}</th>
  )
  
  const renderOrderBody = (item, index) => (
    <tr className='hover:bg-primary hover:dark:bg-primaryDark'key={index}>
        <td className='px-4 py-3 capitalize'>{item.id}</td>
        <td className='px-4 py-3 capitalize'>{item.name}</td>
        <td className='px-4 py-3 capitalize'>{item.client}</td>
        <td className='px-4 py-3 capitalize'>{item.duration}</td>
        <td className='px-4 py-3 capitalize'>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
  )
  
  return (
    <>
        <Head>
            <title>Endurance Ogbeide | Dashboard Page</title>
            <meta name="description" content="Only Admin can reach here" />
        </Head>
        <TransitionEffect />
        <main className='flex flex-col items-center p-10 md:p-0 justify-center dark:text-light'>
            {/*<h2 className='mt-3'>Hello Eddy</h2>*/}
            <div className='flex items-center justify-center basis-1/2 w-full xs:flex-col mt-5 xs:px-4'>
               {box.map((item) => (
                    <Link key={item.id} href={item.url} className='w-full basis-1/2 p-6 md:p-4 mx-4 mb-4 xs:rounded-2xl xs:w-full xs:mx-4 rounded-3xl border border-solid border-b-8 border-r-8 dark:border-light border-dark cursor-pointer'>
                        <div className='font-medium text-2xl py-4 hover:font-bold md:text-xl '>{item.title}</div>
                        <div className='flex items-center justify-between'>
                            <div className=''>Status</div>
                            <div className={``}>{item.status}% {item.status<100?
                            <span className='text-red-400 md:hidden'>complete</span>:<span className='text-blue-400 md:hidden'>complete</span>}</div>
                        </div>
                    </Link>
                ))}
                
            </div>
            <div className='flex w-full min-h-[60vh] md:flex-col md:px-4'>
                <div className='w-1/3 md:w-full p-6 my-4 mx-4 md:mx-0 xs:rounded-2xl xs:w-full rounded-3xl border border-solid border-b-8 border-r-8 dark:border-light border-dark'>
                    <div className='p-8 text-2xl items-center font-medium md:text-xl'>Articles</div>
                    <Table
                        headData={latestArticles.head}
                        renderHead={(item, index) => renderCustomerHead(item, index)}
                        bodyData={latestArticles.body}
                        renderBody={(item, index) => renderCustomerBody(item, index)}
                    />
                    <div className="font-medium capitalize text-center mt-8 hover:font-bold hover:text-primary hover:dark:text-primaryDark">
                        <Link href='/dashboard/articleadmin'> View All</Link>
                    </div>
                </div>
                <div className='w-2/3 md:w-full p-6 my-4 mx-4 md:mx-0 xs:rounded-2xl xs:w-full rounded-3xl border border-solid border-b-8 border-r-8 dark:border-light border-dark'>
                    <div className='p-8 text-2xl items-center font-medium'>Projects</div>
                    <Table
                        headData={latestProjects.head}
                        renderHead={(item, index) => renderOrderHead(item, index)}
                        bodyData={latestProjects.body}
                        renderBody={(item, index) => renderOrderBody(item, index)}
                    />
                    <div className="font-medium capitalize text-center mt-8 hover:font-bold hover:text-primary hover:dark:text-primaryDark">
                        <Link href='/dashboard/projectadmin'> View All</Link>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default DashboardPage