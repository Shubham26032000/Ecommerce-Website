import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
export default function ProductAddScreen(){
    const userSignin = useSelector( (state) => state.userSignin);
    const { userInfo}=userSignin;
    const [name ,setProductName]=useState('');
    const [brand,setBrand] =useState('');
    const [category,setCategory] =useState('');
    const [price,setPrice]=useState('');
    const [description,setDescription] =useState('');
    const [countInStock,setCountInStock]=useState('');
    const [rating,setRating]=useState('');
    const [review,setReview]=useState('');
    const [profilePic,setProfilepic] =useState('');

 
    
    

    const addNewProductsHandler =async() =>{
        let url='http://localhost:5000/api/products/addproducts';
        const formData =new FormData();
        formData.append('myfile',profilePic,profilePic.name);
        formData.append('name',name);
        formData.append('brand',brand);
        formData.append('category',category);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('countInStock',countInStock);
        formData.append('rating',rating);
        formData.append('review',review);
        try {
            let response =await axios.post(url,formData);
            if(response.status === 200){
                console.log("added");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const imageUpload=(e)=>{
        console.log(e.target.files[0]);
        setProfilepic(e.target.files[0]);
    }
    
    return(
        <>
        {
           userInfo!=null && !userInfo.isAdmin?
           (
               <>
               <MessageBox variant="danger">Only Admin Can Access This Web Page <Link to="/" className="brand">Go To Home Page</Link></MessageBox>
               </>
           ):
           (
               <>
               <div>
              <form className="form">
              <div>
                      <h1>Add Products</h1>
                  </div>
                       <div>
                      <label htmlFor="product">Enter Product Name:</label>
                      <input type="text" id="product" placeholder="Enter Product Name" required
                      onChange={ e => setProductName(e.target.value)}></input>
                      </div>
                  
                  <div>
                      <label htmlFor="brand">Enter Brand Name:</label>
                      <input type="text" id="brand" placeholder="Enter Brand" required
                      onChange={ e => setBrand(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="category">Enter Category:</label>
                      <input type="text" id="category" placeholder="Enter Category" required
                      onChange={ e => setCategory(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="qty">Enter Price:</label>
                      <input type="number" id="price" placeholder="Enter Price" required
                      onChange={ e => setPrice(e.target.value)}></input>
                      </div>


                      <div>
                      <label htmlFor="desc">Enter Description:</label>
                      <input type="text" id="desc" placeholder="Enter Description" required
                      onChange={ e => setDescription(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="count">Enter Count In Stock:</label>
                      <input type="number" id="stock" placeholder="Enter Stock" required
                      onChange={ e => setCountInStock(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="rating">Enter Rating:</label>
                      <input type="number" id="rating" placeholder="Enter Rating" required
                      onChange={ e => setRating(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="reviews">Enter Reviews:</label>
                      <input type="number" id="reviews" placeholder="Enter Reviews" required
                      onChange={ e => setReview(e.target.value)}></input>
                      </div>

                      <div>
                      <label htmlFor="image">Choose Image:</label>
                      <input type="file" id="image" placeholder="choose file" required name="myfile"
                      onChange={imageUpload}></input>
                      </div>

                      <div>
                       <label/>
                       < button className="primary" onClick={addNewProductsHandler} type="button">
                           Add New Products 
                       </button>
                      </div>
               </form>
              </div>
 
            </>
           )
        }
              </>
    )
}