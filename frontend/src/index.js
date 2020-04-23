// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    console.log("where js lives")
    // make a function run at onload, loadPet function that will fetch all my /pets, will loop thru 
    loadAllPets();
    createPet();
    eventForAllPetType();
})

// class Pet {
//     constructor(pet_name, pet_age, health_concern, image_link, category) {
//         this.pet_name = pet_name
//         this.pet_age = pet_age
//         this.health_concern = health_concern
//         this.image_link = image_link
//          this.category = category
//     }

//     static get allPets() {
//         return pets
//     }
// }

// -- form for new pet --
function createPet() {
    const newPetForm = document.querySelector('#rehome-form')

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
            .then(() => { newPetForm.reset() })
            .catch(e => console.log(e));
    })

}
// -- get pet data --
async function loadAllPets(category) {
    // if the pet card don't belong to that category, 
    // then clear the pet cards and re insert the cards
    if (!!document.querySelector(".pet-card")) {
        let petCards = document.querySelectorAll(".pet-card")
        for (card of petCards) {
            card.remove()
        }
    }
    // create and insert into html for every single one of the pet
    let request = await fetch("http://localhost:3000/pets")
    let allPets = await request.json()

    if (category) {
        allPets = allPets.filter(pet => pet.category === category)
    }
    // putting in all pet data into createPetCard, 
    allPets.forEach(pet => createPetCard(pet));
}

async function eventForAllPetType() {
    const allBtn = document.getElementById("allBtn");
    allBtn.addEventListener('click', () => loadAllPets())
    const dogBtn = document.getElementById("dogsBtn");
    dogBtn.addEventListener('click', () => loadAllPets("dog"))
    const catBtn = document.getElementById("catsBtn");
    catBtn.addEventListener('click', () => loadAllPets("cat"))
    const ferretBtn = document.getElementById("ferretsBtn");
    ferretBtn.addEventListener('click', () => loadAllPets("ferret"))
    const horseBtn = document.getElementById("horsesBtn");
    horseBtn.addEventListener('click', () => loadAllPets("horse"))
    const otherCritterBtn = document.getElementById("otherCrittersBtn");
    otherCritterBtn.addEventListener('click', () => loadAllPets("otherCritter"))
}

// -- get user data --
// fetch (new path/pet-user/${:id} of the pet) return the user
async function getUserFromPetID(petID) {
    let response = await fetch(`http://localhost:3000/pet-user/${petID}`)
    let userData = await response.json()
    return userData
}

// -- create Card --
async function createPetCard(pet) {
    // to create a card with html and insert pet data

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

// class User {
//     constructor(name, email) {
//         this.name = name
//         this.email = email
//     }
// }
//