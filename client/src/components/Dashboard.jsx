import React, { useEffect, useState,useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteBlog, viewBlogs,postComment} from '../redux/FormSlice'
import {Button, Form, Input} from 'reactstrap'


import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const Dashboard = () => {


const navigate=useNavigate()

let [input,setInput] = useState([{}])
let [flag,setFlag] = useState(false)


const dispatch = useDispatch()



const getData=()=>{
dispatch(viewBlogs())
  .then((data)=>{
     setInput(data.payload) 
})
}

useEffect(()=>{
 getData()
},[flag])


  let toggleShowFullContent = (blogid) => {
  
   let blogIndex = input.findIndex((blog) => blog._id === blogid)
   input[blogIndex].showContent = !input[blogIndex].showContent
   console.log('showContent',input[blogIndex].showContent)
    setInput([...input])
   
  }



const userloggedIn=localStorage.getItem('userId')

const handleDelete=async (blogid)=>{
  for(let x in input){
    if(input[x]._id === blogid){
        if(userloggedIn !== input[x].userId){
            console.log('You are not authorised to edit')
            toast.warning('Only owner can delete')
        }
        else{
          await dispatch(deleteBlog(blogid))
            setFlag(!flag)
            break
        
        }
    }
}
  
}

const user = localStorage.getItem('username')
// let x = useRef('')
let [com,setCom] = useState(
  {
    username:user,
    text:''
  }
)

const handleChange = (e)=>{
  setCom({...com,[e.target.name]:e.target.value})
}


const formSubmit =async (e,blogid)=>{
  e.preventDefault()

  let commentData = await dispatch(postComment({com,blogid})) 
// Find the index of the blog in the 'input' state array
let blogIndex = input.findIndex((blog) => blog._id === blogid);
// Update the comments array for the corresponding blog

input[blogIndex].comments
.push(commentData.payload.comments[(commentData.payload.comments.length)-1])
setInput([...input]) 
  // Reset the form fields after successful submission
  e.target.reset()
  setFlag(!flag)
}


const handleClick = (blogid) => {
  
  input.map((data,idx)=>{
    if(data._id === blogid){
      data.hide = !(data.hide)
      input[idx].hide=data.hide
      setInput([...input])
    }
  })
  }


  return (
    <div >
          {input && input.map((res,index)=>{
        const {_id,title,author,description,comments,hide,showContent} = res
        // console.log('hide',hide)
        return(

          <div className='card p-4' key={index}
          > 
            <div className="card-header" 
            style={{color:'black',backgroundColor:'blanchedalmond'}}>
             <b>{title}</b>
            </div>
               <div className="card-body">
                  <blockquote className="blockquote mb-0">
                  <p
                  style={{
                    height: showContent ? 'auto' : '100px',
                    width: '100%',
                    overflow: 'hidden'}}>
                    {description}</p>

              <footer className="blockquote-footer"> 
                <cite title="Source Title">{author}</cite>
                <div>
                  <Link to={`/loadblog/${_id}`}>
                  <Button>Edit</Button>
                  </Link>  
                  
                  <Button style={{marginLeft:'50px'}}
                  onClick={()=>{handleDelete(_id)}}>Delete</Button>

                  <Button onClick={()=>toggleShowFullContent(_id)}
                  style={{marginLeft:'950px',
                  backgroundColor:'green', 
                  marginTop:'-69px'
                  }}>
                {showContent ? 'Read Less' : 'Read More'}
              </Button>
                </div>
                
              <div>
                {/* Display comments */}
              {comments && comments.map((data, commentIndex) => ( 
                
                <div style={{
                  width:'500px',
                  display : (hide ? 'none' : 'block')  
                }}

                key={commentIndex}>
                  <b>{data.username}:</b> {data.text}
                </div>
                
              ))}
              {comments && comments.length > 0 && (
              <button
              style={{marginLeft:'300px',
                      border:'none',
                      backgroundColor:'transparent',
                      color:'maroon'}}
                      
              onClick={(e)=>{
                handleClick(_id)}}>
                  {hide ? 'Show Comments':'Hide Comments'} 
                  </button>)}

                <Form onSubmit={(e)=>{formSubmit(e,_id)}}>
                  <Input
                  type='text'
                  name='text'
                  // value={com.text}
                  onChange={handleChange}
                  // ref = {x}
                  style={{width:'300px',
                marginBottom:'-10px'}}
                  placeholder='Enter your comment'
                  >
                  </Input>
                  <Button style={{marginTop:'20px'}}>Post</Button>
                </Form> 

              </div>
               </footer>
              </blockquote>
          </div>
            </div>
        )
      })}


      
    </div>
  )
}

export default Dashboard;