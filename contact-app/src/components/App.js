import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import {uuid} from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
import api from "../api/contacts";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList'; 
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const [contacts, setContacts]=useState([]);
  const [searchTerm, setSearchTerm]=useState([]);
  const [searchResults,setSearchResults]=useState([]);


  const retrievecontacts= async () => {
    const response= await api.get("/contacts");
    return response.data; 
  };

  const addContactHandler= async (contact) => {
    console.log(contact);
    const request={
      id:uuidv4(),
      ...contact
    }
    const response=await api.post("/contacts",request)
    setContacts([...contacts, response.data]);
  };

 

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map(contact => {
      return contact.id===id?{...response.data}:contact;
    })
  );
  };

  const removeContactHandler=async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList=contacts.filter((contact) => {
      return contact.id !== id;
    }); 

    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) =>
        Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  }

  


  useEffect(() => {
  
    const getAllContacts=async()=>{
      const allContacts= await retrievecontacts();
      if(allContacts){
        setContacts(allContacts);
      }
    };

    getAllContacts();
  },[]);


  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  


  return(
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/add' element={<AddContact addContactHandler={addContactHandler}/>} ></Route>
          <Route path='/edit' element={<EditContact updateContactHandler={updateContactHandler}/>} ></Route>
          <Route path='/' element={<ContactList contacts={searchTerm.length<1?contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />}></Route>
          <Route path='/contact/:id' element={<ContactDetail contacts={contacts} />} 
          ></Route>
        </Routes>
      </Router>
      
    </div>

  ); 
}

export default App;
