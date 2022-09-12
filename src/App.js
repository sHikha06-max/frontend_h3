import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'
 
function App() {
 const [DataPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [Data, setAllData] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 const getPostData = (data) => {
   return (
     data.map(el => <div className="container" key={el.rank}>
       <p> Name {el.id}</p>
       <p>Price: {el.priceUsd}</p>
       <p>Market Cap : {el.marketCapUsd}</p>
     </div>)
   )
 
 }
 
 const getAllData = async () => {
   const res = await axios.get(`https://api.coincap.io/v2/assets`)
   const data = res.data.data;

   console.log(data, "data1")
   const slice = data.slice(offset - 1 , offset - 1 + DataPerPage)
     
 
   const currData = getPostData(slice)
    
  
   setAllData(currData)
   setPageCount(Math.ceil(data.length / DataPerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
   getAllData()
 }, [offset])
 
 return (
   <div className="main-app">
    
   
     {Data}
 
    
     <ReactPaginate
       previousLabel={"previous"}
       nextLabel={"next"}
       breakLabel={"..."}
       breakClassName={"break-me"}
       pageCount={pageCount}
       onPageChange={handlePageClick}
       containerClassName={"pagination"}
       subContainerClassName={"pages pagination"}
       activeClassName={"active"} />
   </div>
 );
}
 
export default App;