// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    console.log("where js lives")
    loadAllPets();
    createPet();
})

// class Pet {
//     constructor(pet_name, pet_age, health_concern, image_link) {
//         this.pet_name = pet_name
//         this.pet_age = pet_age
//         this.health_concern = health_concern
//         this.image_link = image_link
//     }

// -- get pet data --
async function loadAllPets() {
    let request = await fetch("http://localhost:3000/pets")
    let allPets = await request.json()
    allPets.forEach(pet => createPetCard(pet))
    //inputting pet as an argument to the createPetCard function
}

// -- get user data --
async function getUserFromPetID(petID) {
    let response = await fetch(`http://localhost:3000/pet-user/${petID}`)
    let userData = await response.json()
    return userData
}

// -- create Card --
async function createPetCard(pet) {
    // to create a card with html and insert pet data
    // We do not know anything, until we can write it or say it out loud
    // 1) keep talking
    // 2) you have to ask me specific questions
    // if (!pet.id) { debugger; }
    const user = await getUserFromPetID(pet.id)
    const petsCard = document.querySelector('#pet-container')
    const newPet = document.querySelector('#pet-card-template').content.cloneNode(true)
    newPet.querySelector(".img-thumbnail").src = pet.image_link || "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
    let petCardAttributes = newPet.querySelector(".flip-card-back").children
    petCardAttributes[0].innerText = `Name: ${pet.pet_name}`
    petCardAttributes[1].innerText = `Age: ${pet.pet_age}`
    petCardAttributes[2].innerText = `Health Concern: ${pet.health_concern}`
    petCardAttributes[3].innerText = `Owner: ${user.name}`
    petCardAttributes[4].innerText = `Contact email: ${user.email}`
    // debugger;
    petsCard.appendChild(newPet)

}

// -- form for new pet --
function createPet() {
    const newPetForm = document.querySelector('#rehome-form')
    // const newPetName = document.querySelector('#addPetName')
    // const newPetAge = document.querySelector('#addPetAge')
    // const newHealthInfo = document.querySelector('#addHealth')
    // let newPet = new Pet(newPetName.value, newPetAge.value, newHealthInfo.value)


    newPetForm.addEventListener('submit', function (e) {
        console.log("form submitted")
        e.preventDefault();
        fetch('http://localhost:3000/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "user": {
                        "name": e.target.querySelector('#addContactName').value,
                        "email": e.target.querySelector('#addContactEmail').value,
                        "pets_attributes": [{
                            "category": e.target.elements.pet.value,
                            "pet_name": e.target.elements.petName.value,
                            "pet_age": e.target.elements.petAge.value,
                            "health_concern": e.target.elements.petHealth.value,
                            "image_link": e.target.elements.petImg.value
                        }]
                    }
                }
            )
        })
            .then(response => response.json()) // .json() converts json into a plain javascript object
            .then(json => createPetCard(json)) //pass in my new function, passing the json as a arg(pets) i am calling. have access to all my pet data
            .catch(e => console.log(e));
    })

}

// function createPetCard(pet) => to create a card with html and insert pet data

// create custom route 
// that custom route need to forward to your new action
// this new action like show

// js
// create function that will create a card with json data, takes in 1 arg, (pets)
// fetch (new path/pet-user/${:id} of the pet) return the user


// after all this done, function take in data from my pet, 
// make a function run at onload, loadPet function that will fetch all my /pets, will loop thru 
// that array and putting in all pet data into createPetCard, create and insert into html for every single one of the pet







// class User {
//     constructor(name, email) {
//         this.name = name
//         this.email = email
//     }
// }
//