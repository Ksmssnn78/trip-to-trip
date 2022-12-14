import React from 'react';
import './Community.css'
import TextField from '@mui/material/TextField';
import CommunitySlick from '../CommunitySlick/CommunitySlick';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProPic from '../resources/adventurer.png';


const Community = (props) => {

    const navigate = useNavigate();
    const [imageup, setImageUp] = useState("");
    const [postData, setPostData] = useState({
        heading: "posting some test data",
        description: "",
        name: "",
    });
    const handleImagefile = (e) =>{
        setImageUp(e.target.files[0]); 
    }
    const postIt = async() =>{
        postData.name = props.fname +" "+props.lname;
        let formData = new FormData();
        formData.append("heading",postData.heading);
        formData.append("description",postData.description);
        formData.append("name",postData.name);
        formData.append("email",props.email);
        formData.append("file",imageup);
        if(props.email === "" || postData.name === "")
        {
            navigate('/SignIn')
            return;
        }
        if(postData.description === "" || postData.file === "")
        {
            toast.error('Please write some description with an Image!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        else{
            axios.post('http://localhost:5000/addpost',formData).then(respose => {
            console.log(respose)
            }).catch(error => {
                console.log(error)
            })
            //alert("your request is processed correctly! please wait for confirmation email.");
            toast.success('Your Post is successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return (
        <div id="container">
            <div id="first">
                <div id="profile">
                    <div id="image">
                    {
                        (Object.keys(props.pro_img).length === 0) ?
                        <img className='commuity_pro_img' src={ProPic} alt="profile image"/>
                        : <img className='commuity_pro_img' src={"data:image/jpeg;base64," + props.pro_img.image} alt="profile image"/>
                    }
                    </div>
                    <div id="profile-name">
                        <p>
                            <b>{props.fname} {props.lname}</b>
                        </p>
                        <p>
                            #{props.email}
                        </p>
                    </div>

                </div>
            </div>
            <div id="second">
                <Form id="create-post" encType="multipart/form-data">
                    <TextField id="outlined-loguser" onChange={(event) => setPostData((prev) => ({ ...prev, description: event.target.value }))} size="small" label="What's New?" variant="outlined" />
                    <input id="choplc" type="file" onChange={handleImagefile} name='file'></input>
                    <button id="btn-post" onClick={postIt}>Post it</button>
                </Form>
                
                <div id="post">
                    <CommunitySlick />
                </div>
            </div>
            <div id="third">
                <div id="menu">
                    <button id="btn-profile" onClick={ props.email !=="" ? ()=>navigate('/Profile') :()=>navigate('/SignIn') }>Profile</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Community;