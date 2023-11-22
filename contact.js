const contactManager = new ContactManager();
const tagFormPopup = document.getElementById("tagFormPopup");
const textInput = document.getElementById("name");
const dateInput = document.getElementById("email");
const textarea = document.getElementById("mobile");
const landline = document.getElementById("landline");
const tasks = document.getElementById("website");
const add = document.getElementById("address");
let addButton = document.getElementById("addButton");
let updateButton = document.getElementById("updateButton");
let addTagLink = document.getElementById("addTagLink");

function addcontact() {
  tagFormPopup.style.display = "block";
  updateButton.style.display = "none";
  addButton.style.display = "block";
}

function formclose() {
  tagFormPopup.style.display = "none";
}
addButton.onclick = function (e) {
  acceptData();
  addButton.style.display = "block";
  updateButton.style.display = "none";
};

updateButton.onclick = function (e) {
  acceptData();
  tagFormPopup.style.display = "none";
};
function createTasks() {
  const data = contactManager.getAllContacts();
  const userContent = document.getElementById("userContent");
  userContent.innerHTML = "";

  if (data.length > 0) {
    const divTable = document.createElement("div");
    divTable.className = "divTable";

    data.forEach((contact) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "rowDiv";
      rowDiv.onclick = () => {
        displayDataInRightClass(contact.id);
      };
      rowDiv.onmouseenter = () => {
        rowDiv.style.backgroundColor = "#cee6f1";
      };
      rowDiv.onmouseleave = () => {
        rowDiv.style.backgroundColor = "";
      };

      rowDiv.innerHTML = `<div id="content-div">${contact.text}</div><div id="date-div">${contact.date}</div><div id="description-div">+91 ${contact.description}</div>`;

      divTable.appendChild(rowDiv);
    });

    userContent.appendChild(divTable);
  }
  resetForm();
}

function displayDataInRightClass(id) {
  const rightClass = document.querySelector(".right");
  rightClass.innerHTML = "";

  const selectedData = contactManager.getContactById(id);
  const selectedDataDiv = document.createElement("div");
  selectedDataDiv.id = "selectedDataDivId";

  const combinedDiv = document.createElement("div");
  combinedDiv.id = "combinedDivId";
  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
    <div id="selectedDataText">${selectedData.text}</div>
    <div>Email: ${selectedData.date}</div>
    <div id="contact-details">Landline: ${selectedData.landline} <br> Mobile: +91 ${selectedData.description}</div>
    <div id="websiteInfo">Website: ${selectedData.website}</div>
    <div>Address: ${selectedData.address}</div>
  `;

  const imageAndEditText = document.createElement("div");
  imageAndEditText.innerHTML = `
    <div id="imageandedit">
      <img id="editIcon" src="edit1.jpg" alt="Edit Icon" onclick="editTask(${id})">
      <span id="editcontent" onclick="editTask(${id})">Edit</span>
      <img src="delete2.png" alt="Delete image" id="deleteIcon" onclick="deleteTask(${id})">
      <span id="deletecontent" onclick="deleteTask(${id})">Delete</span>
    </div>  
  `;

  combinedDiv.appendChild(detailDiv);
  combinedDiv.appendChild(imageAndEditText);
  selectedDataDiv.appendChild(combinedDiv);
  rightClass.appendChild(selectedDataDiv);
}

let editTask = (id) => {
  let selectedTask = contactManager.getContactById(id) || {};
  textInput.value = selectedTask.text || "";
  dateInput.value = selectedTask.date || "";
  textarea.value = selectedTask.description || "";
  landline.value = selectedTask.landline || "";
  tasks.value = selectedTask.website || "";
  add.value = selectedTask.address || "";
  tagFormPopup.setAttribute("data-edit-id", id);
  tagFormPopup.classList.add("active");
  tagFormPopup.style.display = "block";
  addButton.style.display = "none";
  updateButton.style.display = "block";
  const rightClass = document.querySelector(".right");
  rightClass.innerHTML = "";
  rightClass.appendChild(tagFormPopup);
};
function acceptData() {
  const editedId = tagFormPopup.getAttribute("data-edit-id");

  if (textInput.value === "") {
    document.getElementById("nameerror").innerText = "Name is required";
    return;
  } else {
    document.getElementById("nameerror").innerText = "";
  }

  if (dateInput.value === "") {
    document.getElementById("emailerror").innerText = "Email is required";
    return;
  } else {
    document.getElementById("emailerror").innerText = "";
  }

  if (textarea.value === "") {
    document.getElementById("mobileerror").innerText = "Mobile is required";
    return;
  } else {
    if (!/^\d+$/.test(textarea.value)) {
      document.getElementById("mobileerror").innerText =
        "Mobile must be a number";
      return;
    }
    if (!/^[0-9]{10}/.test(textarea.value)) {
      document.getElementById("mobileerror").innerText =
        "Mobile Number must be 10 digits";
      return;
    }
    document.getElementById("mobileerror").innerText = "";
  }

  if (landline.value === "") {
    document.getElementById("landlineerror").innerText = "Landline is required";
    return;
  } else {
    if (!/^\d+$/.test(landline.value)) {
      document.getElementById("landlineerror").innerText =
        "Landline must be a number";
      return;
    }
    document.getElementById("landlineerror").innerText = "";
  }

  if (tasks.value === "") {
    document.getElementById("websiteerror").innerText = "Website is required";
    return;
  } else {
    document.getElementById("websiteerror").innerText = "";
  }

  if (add.value === "") {
    document.getElementById("addresserror").innerText = "Address is required";
    return;
  } else {
    document.getElementById("addresserror").innerText = "";
  }

  if (editedId !== null) {
    var editedData = contactManager.getContactById(editedId);
    if (editedData) {
      editedData.text = textInput.value;
      editedData.date = dateInput.value;
      editedData.description = textarea.value;
      editedData.landline = landline.value;
      editedData.website = tasks.value;
      editedData.address = add.value;
      contactManager.updateContact(editedId, editedData);
    }
    createTasks();
  } else {
    const newContact = new Contact({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
      landline: landline.value,
      website: tasks.value,
      address: add.value,
    });
    contactManager.addContact(newContact);
    createTasks();
    tagFormPopup.style.display = "none";
    const rightClass = document.querySelector(".right");
  }

  const rightClass = document.querySelector(".right");
  tagFormPopup.removeAttribute("data-edit-id");
}

function deleteTask(id) {
  contactManager.deleteContact(id);
  createTasks();
  const rightClass = document.querySelector(".right");
  rightClass.innerHTML = "";
  tagFormPopup.style.display = "none";
  document.querySelector(".container .right").appendChild(tagFormPopup);
}

function resetForm() {
  landline.value = "";
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  tasks.value = "";
  add.value = "";
}

createTasks();
