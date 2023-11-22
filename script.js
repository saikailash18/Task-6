const addTagLink = document.getElementById("addTagLink");
const tagFormPopup = document.getElementById("tagFormPopup");
const data = JSON.parse(localStorage.getItem("data")) || [];
const textInput = document.getElementById("name");
const dateInput = document.getElementById("email");
const textarea = document.getElementById("mobile");
const landline = document.getElementById("landline");
const tasks = document.getElementById("website");
const add = document.getElementById("address");
const nameInput = document.getElementById("name");

addTagLink.addEventListener("click", (e) => {
  e.preventDefault();
  tagFormPopup.classList.add("active");
});
createTasks();
document.addEventListener("click", (e) => {
  if (
    e.target !== tagFormPopup &&
    !tagFormPopup.contains(e.target) &&
    e.target !== addTagLink
  ) {
    tagFormPopup.classList.remove("active");
  }
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  acceptData();
});

function createTasks() {
  const userContent = document.getElementById("userContent");
  userContent.innerHTML = "";

  if (data.length > 0) {
    const table = document.createElement("table");
    table.className = "table";
    const thead = document.createElement("thead");
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    data.forEach((x, index) => {
      const row = tbody.insertRow();
      const cell = row.insertCell();
      cell.innerHTML = `<div id="content-div">${x.text}</div><div id="date-div">${x.date}</div><div id="description-div">${x.description}</div>`;
      row.addEventListener("click", () => {
        displayDataInRightClass(index);
      });
      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = "#cee6f1";
      });

      row.addEventListener("mouseleave", () => {
        row.style.backgroundColor = "";
      });
    });
    table.appendChild(tbody);
    userContent.appendChild(table);
  }
  resetForm();
}

//Function to display in right class
function displayDataInRightClass(index) {
  const rightClass = document.querySelector(".right");
  rightClass.innerHTML = "";

  const selectedData = data[index];
  const selectedDataDiv = document.createElement("div");
  selectedDataDiv.id = "selectedDataDivId";

  const combinedDiv = document.createElement("div");
  combinedDiv.id = "combinedDivId";
  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
    <div id="selectedDataText">${selectedData.text}</div>
    <div>Email: ${selectedData.date}</div>
<div id="contact-details">Landline: ${selectedData.landline} <br> Mobile: ${selectedData.description}</div>
    <div id="websiteInfo">Website: ${selectedData.website}</div>
    <div>Address: ${selectedData.address}</div>
  `;

  const imageAndEditText = document.createElement("div");
  imageAndEditText.innerHTML = `
    <div id="imageandedit">
      <img id="editIcon" src="edit1.jpg" alt="Edit Icon" onclick="editTask(${index})">
      <span id="editcontent" onclick="editTask(${index})">Edit</span>
      <img src="delete2.png" alt="Delete image" id="deleteIcon" onclick="deleteTask(${index})">
      <span id="deletecontent" onclick="deleteTask(${index})">Delete</span>
    </div> 
  `;

  combinedDiv.appendChild(detailDiv);
  combinedDiv.appendChild(imageAndEditText);
  selectedDataDiv.appendChild(combinedDiv);
  rightClass.appendChild(selectedDataDiv);
}

// To Edit the task
let editTask = (index) => {
  let selectedTask = data && data[index] ? data[index] : {};
  textInput.value = selectedTask.text || "";
  dateInput.value = selectedTask.date || "";
  textarea.value = selectedTask.description || "";
  landline.value = selectedTask.landline || "";
  tasks.value = selectedTask.website || "";
  add.value = selectedTask.address || "";
  tagFormPopup.setAttribute("data-edit-index", index);
  tagFormPopup.classList.add("active");
  tagFormPopup.style.display = "block";
};

//Function to Accept the data
function acceptData() {
  const editedIndex = tagFormPopup.getAttribute("data-edit-index");
  if (editedIndex !== null) {
    const editedData = data[editedIndex];
    if (editedData) {
      editedData.text = textInput.value;
      editedData.date = dateInput.value;
      editedData.description = textarea.value;
      editedData.landline = landline.value;
      editedData.website = tasks.value;
      editedData.address = add.value;
    }
    localStorage.getItem("data") === null || !editedData
      ? null
      : localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    tagFormPopup.style.display = "none";
    const rightClass = document.querySelector(".right");
    rightClass.innerHTML = "";
  } else {
    data.push({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
      landline: landline.value,
      website: tasks.value,
      address: add.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    tagFormPopup.classList.remove("active");
  }
  tagFormPopup.classList.remove("active");
  tagFormPopup.removeAttribute("data-edit-index");
}

// Function to delete a task
function deleteTask(index) {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
  const rightClass = document.querySelector(".right");
  rightClass.innerHTML = "";
}
function resetForm() {
  landline.value = "";
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
  tasks.value = "";
  add.value = "";
}
