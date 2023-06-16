document.addEventListener("DOMContentLoaded", fetchDogs)
let tableBody = document.querySelector('#table-body');


function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then((data) => {
       renderDogs(data)
    })
};

let dogId;
let dogForm = document.querySelector('#dog-form');
function renderDogs(dogs){
    dogs.forEach((dog) => {
        console.log(dog.id)
       
        let tableRow = document.createElement('tr');
        dogName = document.createElement('td');
        dogBreed = document.createElement('td');
        let dogSex = document.createElement('td');
        let editColumn = document.createElement('td');
        let editButton = document.createElement('button');

        dogName.textContent = dog.name;
        dogBreed.textContent = dog.breed;
        dogSex.textContent = dog.sex;
        editButton.textContent = `Edit`

        tableRow.appendChild(dogName);
        tableRow.appendChild(dogBreed);
        tableRow.appendChild(dogSex);
        editColumn.appendChild(editButton);
        tableRow.appendChild(editColumn);
      
        tableBody.appendChild(tableRow);

        editButton.addEventListener("click", () => {
            dogId = dog.id
            editDog(dog)});      
        })
};




function editDog(dog){
dogForm.name.value = dog.name;
dogForm.breed.value = dog.breed;
dogForm.sex.value = dog.sex;
let dogId = dog.id
};


dogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateDog()});
   
function updateDog(){
   
    const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
    };

    const configObject = {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(updatedDog),
    };

    fetch(`http://localhost:3000/dogs/${dogId}`, configObject)
    .then(resp => resp.json())
    .then((data) => {
        tableBody.textContent = ""
        fetchDogs()
    })
    .catch((erro) => console.erro("error updating dog:", error))   
};


