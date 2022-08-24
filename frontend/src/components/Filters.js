import React,{ useState} from "react";
import { useDispatch} from "react-redux";
import { filterProducts } from "../actions/productActions";
const Filters =() =>{
    const [searchKey,setSearchKey]=useState('');
    const dispatch =useDispatch();
    return(
        <>
      <form class="SearchForm">
          <div>
            <input type="text" id="search" name="search" value={searchKey} onChange={e =>setSearchKey(e.target.value)} placeholder="Search Results..."></input>
          </div>

          <div>
              <button onClick={() => dispatch(filterProducts(searchKey))} className="searchBtn">Search</button>
          </div>
      </form>
        </>
    )
}

export default Filters;