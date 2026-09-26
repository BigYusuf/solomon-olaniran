import React, {useState} from 'react'

const Table = (props) => {

    const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(props.bodyData.slice(start, end))

        setCurrPage(page)
    }

    return (
        <div>
            <div className="overflow-y-auto">
                <table className="w-full min-w-[400px] border-spacing-0 xs:text-sm">
                    {
                        props.headData && props.renderHead ? (
                            <thead className="bg-light dark:bg-dark">
                                <tr className="text-left capitalize">
                                    {
                                        props.headData.map((item, index) => props.renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) : null
                    }
                    {
                        props.bodyData && props.renderBody ? (
                            <tbody>
                                {
                                    dataShow.map((item, index) => props.renderBody(item, index))
                                }
                            </tbody>
                        ) : null
                    }
                </table>
            </div>
            {
                pages > 1 ? (
                    <div className="flex w-full justify-end items-center mt-5">
                        {
                            range.map((item, index) => (
                                <div key={index} className={`flex items-center justify-center cursor-pointer rounded w-7 h-7 ${currPage === index ?
                                 'bg-primary dark:bg-primaryDark dark:text-dark text-light hover:bg-primary' : ''}`} onClick={() => selectPage(index)}>
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
