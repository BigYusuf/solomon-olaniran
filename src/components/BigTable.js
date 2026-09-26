import useTable from "../hooks/useTable";
import React, { useEffect, useState } from "react";


const Table = ({ data, headerData, renderBody, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const TableFooter = ({ range, setPage, page, slice }) => {
      useEffect(() => {
        if (slice.length < 1 && page !== 1) {
          setPage(page - 1);
        }
      }, [slice, page, setPage]);
      return (
        <div className="flex bg-light dark:bg-dark px-2 w-full font-bold text-left text-xs rounded-b-[15px] items-center justify-end text-dark dark:text-light">
          {range.map((el, index) => (
            <button
              key={index}
              className={`${"flex items-center justify-center cursor-pointer rounded w-7 h-7"} ${
                page === el ? "bg-primary dark:bg-primaryDark dark:text-dark text-light hover:bg-primary" : "styles.inactiveButton"
              }`}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          ))}
        </div>
      );
    };
   
    const TableHeader = ({item}) => {
        return <th className='pl-4'>{item}</th>
    }
    const TableBody = ({item}) => {
        return <th className='pl-4'>{item}</th>
    }
  return (
   <div className="overflow-y-auto">
      <table className="w-full min-w-[400px] border-spacing-0 xs:text-sm">
        <thead className="bg-light dark:bg-dark">
          <tr className="text-left capitalize">
            {headerData.map((item, index)=>
                <TableHeader key={index} item={item} />
            )}
          </tr>
        </thead>
        <tbody>
          {slice.map((item) => (
           renderBody(item)
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default Table;