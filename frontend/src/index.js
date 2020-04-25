// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    // make a function run at onload, loadPet function that will fetch all my /pets, will loop thru 
    loadAllPets();
    createPet();
    eventForAllPets();
})

class Pet {
    constructor(petObj) {
        this.id = petObj.id
        this.userID = petObj.user_id
        this.name = petObj.pet_name
        this.age = petObj.pet_age
        this.health = petObj.health_concern
        this.img = petObj.image_link
        this.category = petObj.category
    }
}

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

    allPets.forEach(petObj => {
        pet = new Pet(petObj)
        // console.log(pet)
        createPetCard(pet) // pet is the object instance of the pet class
    });

}

async function eventForAllPets() {
    // pet buttons
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

class User {
    constructor(user) {
        this.name = user.name
        this.email = user.email
    }
}
// -- get user data --
// fetch (new path/pet-user/${:id} of the pet) return the user
async function getUserFromPetID(petID) {
    let response = await fetch(`http://localhost:3000/pet-user/${petID}`)
    let userData = await response.json()
    let user = new User(userData)
    return user
}

// -- create Card --
async function createPetCard(pet) {
    // to create a card with html and insert pet data

    // if (!pet.id) { debugger; }
    const user = await getUserFromPetID(pet.id)
    const petsCard = document.querySelector('#pet-container')
    const newPet = document.querySelector('#pet-card-template').content.cloneNode(true)
    newPet.querySelector(".img-thumbnail").src = pet.img || "img/NoImage.png"
    let petCardAttributes = newPet.querySelector(".flip-card-back").children
    petCardAttributes[0].innerText = `Name: ${pet.name}`
    petCardAttributes[1].innerText = `Age: ${pet.age}`
    petCardAttributes[2].innerText = `Health Concern: ${pet.health}`
    petCardAttributes[3].innerText = `Owner: ${user.name}`
    petCardAttributes[4].innerText = `Contact email: ${user.email}`
    // debugger;
    petsCard.appendChild(newPet)

}