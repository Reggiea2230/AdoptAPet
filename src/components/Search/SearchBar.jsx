import React from "react";  
import axios from 'axios';  




function SearchBar({setResults, results, setSearchText, searchText}) {      
    
    const apiKey = 'LnaEpnYWwZRjywZ2VH9tmITZeHlnaPUeuqsW5u58H6I2roZzSt';
 
    

    function handleChange(event) { 
        const searchText = event.target.value; 
        setSearchText(searchText);
    } 
    function handleSubmit(event) {  
        event.preventDefault();  
        axios.get("https://api.petfinder.com/v2/animals?" + searchText + "&key=" + apiKey + "&maxResults=40")  
            .then(data => {  
                setResults(data.data.items);
                                 
            }) 
            .then(d => {
                
            }) 
            
    }  
    return (  
        <div>            
        <form onSubmit={handleSubmit}>  
       
            <div className="card-header main-search">  
                <div className="row">  
                    <div className="col-12 col-md-3 col-xl-3">                      
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Search pets" type="text" style={{ minWidth: 500 }}/>  
                    </div>  
                    <div style={{float: 'right'}}>  
                    <input type="submit" value="Search" className="btn btn-primary search-btn" />  
                    </div>  
                </div>  
            </div>  
            

        </form>  
        </div>
  
    )  
}  
  
export default SearchBar