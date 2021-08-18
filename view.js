
function header(path, callback){
    const div = document.createElement('div');
    div.className = 'nav';
    div.innerHTML = `
    <ul>
        <li><a href="/contacts" class="${path === '/contacts' ? 'active' : ''}">Contacts</a></li>
        <li><a href="/add" class="${path === '/add' ? 'active' : ''}">Add new contact</a></li>
    </ul>
    `;

    div.onclick = function(e){
        e.preventDefault();
        if(e.target.localName === 'a'){
            let p = e.target.getAttribute('href');
            callback(p);
        }
    }
    return div;
}

function contactsView(contacts, selectedItemIndex, callback){
    const div = document.createElement('div');
    div.className = 'contacts';
    div.append(contactList(contacts,selectedItemIndex,callback));
    div.append(contactView(selectedItemIndex >= 0 ? contacts[selectedItemIndex]:null, selectedItemIndex));
    return div;
}

function contactList(contacts, selectedItemIndex, callback){
    const ul = document.createElement('ul');
    ul.className = 'list';
    ul.innerHTML = contacts.map(function(contact, index){
        return contactRow(contact, index, index === selectedItemIndex);
    }).join("\n");
    ul.onclick = function(e){
        e.preventDefault();
        let el = e.target;
        if(e.target.localName === 'ul') return;
        if(e.target.localName !== 'li'){
            el = e.target.parentElement;
        }
        callback(parseInt(el.dataset.index));
    }
    return ul;
}

function contactRow({name,phone}, index, isSelected){
    return `
    <li class="list-item ${isSelected ? 'item-active' : ''}" data-index="${index}">
        <h2 class="title">${name}</h2>
        <h3 class="sub-title">${phone}</h3>
    </li>
    `;
}

function contactView(contact, index){
    const div = document.createElement('div');
    div.className = 'contact-view';
    div.innerHTML = contact !== null ? `
        <h2>${contact.name}</h2>
        <button id="edit-btn">EDIT</button>
        <button id="delete-btn">DELETE</button>
        
        <div class="contact-view-row"><img src="img/technology.png" alt=""><h3>${contact.phone}</h3></div>
        <div class="contact-view-row"><img src="img/multimedia.png" alt=""><h3>${contact.email}</h3></div>
        <div class="contact-view-row"><img src="img/buildings.png" alt=""><h3>${contact.address}</h3></div>
        <p>${contact.description}</p>
    ` : ``;
    div.onclick = function(e){
        if(e.target.id == "edit-btn"){
            editContactView(contact, div);
        }
        else if (e.target.id == "delete-btn"){
            deleteContact(index);
        }
    }

    return div;
}

function deleteContact(index){
    state.contacts.splice(index, 1);
    state.selectedIndex = -1;
    render(); 
}
function editContactView(contact, div){
    div.className = 'add-contact';
    div.innerHTML = `
    <form action="#">
        <input class="form-control" type="text" name="name" value="${contact.name}">
        <input class="form-control" type="text" name="phone" value="${contact.phone}">
        <input class="form-control" type="text" name="email" value="${contact.email}">
        <input class="form-control" type="text" name="address" value="${contact.address}">
        <textarea class="form-control" type="text" name="description" value="${contact.description}"></textarea>
        <div class="buttons"><button class="save-btn">SAVE</button></div>
     </form>
    `;
    div.onclick = function(e){
        e.preventDefault();
        if(e.target.localName == "button"){
            let name = div.querySelector("[name='name']");
            let phone = div.querySelector("[name='phone']");
            let email = div.querySelector("[name='email']");
            let address = div.querySelector("[name='address']");
            let description = div.querySelector("[name='description']");
            contact.name = name.value;
            contact.phone = phone.value;
            contact.email = email.value;
            contact.address = address.value;
            contact.description = description.value;
            render();
        }
    }
    return div;
}


function addContactView(status, addContactHandler){
    const div = document.createElement('div');
    div.className = 'add-contact';
    div.innerHTML = `
    ${status === 'success' ? '<div class="suc">success</div>':''}
    ${status === 'error' ? '<div class="err">All fields need to be fill</div>':''}
    <form action="#">
        <input class="form-control" type="text" name="name" placeholder="Type name">
        <input class="form-control" type="text" name="phone" placeholder="Type phone">
        <input class="form-control" type="text" name="email" placeholder="Type email">
        <input class="form-control" type="text" name="address" placeholder="Type address">
        <textarea class="form-control" type="text" name="description" placeholder="Type description"></textarea>
        <div class="buttons"><button class="add-btn">Add</button></div>
     </form>
    `;

    div.onsubmit = function(e){
        e.preventDefault();
        const form = e.target;

        addContactHandler({
            name:form.name.value,
            phone:form.phone.value,
            email:form.email.value,
            address:form.address.value,
            description:form.description.value
        });

    }
    return div;
}