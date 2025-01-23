import React,{useRef} from "react";
import { Link}  from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    console.log(props);
    const inputEl=useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return(
        <ContactCard 
            contact={contact} 
            clickHandler={deleteContactHandler} 
            key={contact.id}>

        </ContactCard>
        );

    });

    const getSearchTerm=()=>{
        props.searchKeyword(inputEl.current.value);
    };
    
    return(

        <div class="main">
            <h2>Contact list
                <Link to={"/add"}>
                    <button className="ui button blue right">Add Contact</button>
                </Link> 
            </h2>

            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search contact" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="icon search"></i>
                </div>
            </div>

            <div className="ui celled list">
                {props.contacts.length>0?(
                    renderContactList
                    ):(<div>No contacts available. Please add some contacts!</div>

                )}
            </div>
        </div>
        
    );
}

export default ContactList;