import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './Contact.css'
import axios from 'axios';
import backend_endpoint from '../Constants';

function createMessage(name, email, message){
    return 'A message received from '+name+'\n'+'Email : '+email+'\n'+'Message : '+message;
}
function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(backend_endpoint+'/email/send', {
            email: 'jainaashay123@gmail.com',
            message: createMessage(name,email,message)
          });
          alert(response.data.message);
        } catch (err) {
          console.error('Error sending email:', err);
        }
      };

    return (
        <div id='contact' style={{backgroundColor:'antiquewhite'}}>
            <div className='text-center fw-bold fs-1 py-4'><FontAwesomeIcon icon={faComment} style={{color:'red'}} /> 
            &nbsp;Get In Touch
            </div>
   
           <div className='row g-0 py-4 mx-auto shadow rounded contact' style={{width:'70%',backgroundColor:'lightcoral'}}>
               <div className='col-lg-6 col-md-6 col-sm-0 col-6 text-center mt-4 mb-2 img-contact'>
               <img src={process.env.PUBLIC_URL + '/images/Contact/contact.png'} alt='' style={{width:'80%',height:'100%',maxHeight:'400px'}}/>
                   
               </div>
               <div className='col-lg-6 col-md-6 col-sm-12 text-center px-3'>
                   <div className='fw-bold fs-2 text-dark'>
                          Contact me ..
                   </div>
                   <div className='fst-italic py-2 text-light fw-bold px-3'>
                   Feel free to contact me if you have any question question.
                   </div>
                   <div className='px-4'>
                    <form action='/' method='POST'>
                    <input value={name} className="form-control form-control-md my-4" type="text" placeholder="Your Name" aria-label=".form-control-md" onChange={(e) => setName(e.target.value)}/>
                   <input value={email} className="form-control form-control-md my-4" type="text" placeholder="Your Email" aria-label=".form-control-md" onChange={(e) => setEmail(e.target.value)}/>
                   <textarea value={message} className="form-control form-control-md my-4" rows='5' placeholder="Write a message .." aria-label=".form-control-md" onChange={(e) => setMessage(e.target.value)}/>
                   <button type='submit' className='btn btn-primary btn-md px-3' style={{backgroundColor:'blueviolet'}} onClick={handleSubmit}>Send Message</button>
                    </form>
                  
                   </div>
               </div>
           </div>
    

           <div className='py-4'></div>
        </div>

    )
}

export default Contact