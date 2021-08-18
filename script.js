const state = {
    path:'',
    contacts: [
        {name:'John Doe',phone:'098766543',address:'Haifa',email:'john@mail.com',description:'desc'},
        {name:'Jack Sparoow',phone:'1245788',address:'Rehovot',email:'jack@mail.com',description:'desc'},
        {name:'Tony Stark',phone:'07777777',address:'Tel Aviv',email:'tony@stark.com',description:'desc'},
    ],
    selectedIndex:-1,
    addStatus:null,
    addContactState:{name:"", phone:"", address:"", email:"", description:""}
};





const root = document.querySelector('#root');

navigate('/contacts');

function navigate(path){
    if(path === state.path) return;
    state.path = path;
    state.addStatus = null;
    render();
}

function render(){
    root.innerHTML = '';
    root.append(header(state.path, headerClickHandler));
    root.append(document.createElement('hr'));
    if(state.path === '/contacts'){
        root.append(contactsView(state.contacts,state.selectedIndex,contactClickHandler));
    }else{
        root.append(addContactView(state.addStatus, addContactHandler));
    }
}

function headerClickHandler(path){
    navigate(path);
}

function contactClickHandler(index){
    console.log(index);
    if(index === state.selectedIndex) return;
    state.selectedIndex = index;
    render();
}

function addContactHandler(contact){
    // state.contacts.push(contact);
    // state.addStatus = 'success';
    // render();
    if (contact.name.length !== 0 &&
    contact.phone.length !== 0 &&
    contact.email.length !== 0 &&
    contact.address.length !== 0 &&
    contact.description.length !== 0){ 

    state.contacts.push(contact);
    state.addStatus = 'success';
    }
    else{
    state.addStatus = 'error';
    state.addContactState = contact;
    }
    render();

}
