// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    // make a function run at onload, loadPet function that will fetch all my /pets, will loop thru 
    Pet.loadAllPets();
    Pet.createPet();
    Pet.eventForAllPets();
})

class Pet {
    constructor(petObj) {
        this.id = petObj.id
        this.user_id = petObj.user_id
        this.pet_name = petObj.pet_name
        this.pet_age = petObj.pet_age
        this.health_concern = petObj.health_concern
        this.image_link = petObj.image_link
        this.category = petObj.category
    }

    static createPet() {
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
                .then(json => new Pet(json).createPetCard())
                .then(() => { newPetForm.reset() })
                .catch(e => console.log(e));
        })


    }
    // -- get pet data --
    static async loadAllPets(category) {
        // if the pet card don't belong to that category, 
        // then clear the pet cards and re insert the cards
        if (!!document.querySelector(".pet-card")) {
            let petCards = document.querySelectorAll(".pet-card")
            for (let card of petCards) {
                card.remove()
            }
        }
        // create and insert into html for every single one of the pet
        let request = await fetch("http://localhost:3000/pets")
        let allPets = await request.json()

        if (category) {
            allPets = allPets.filter(pet => pet.category === category)
        }

        // putting in all pet data into createPetCard 
        allPets.forEach(petObj => {
            let pet = new Pet(petObj)
            // console.log(pet)
            pet.createPetCard() // pet is the object instance of the pet class
        });
    }

    static async eventForAllPets() {
        // pet buttons
        const allBtn = document.getElementById("allBtn");
        allBtn.addEventListener('click', () => Pet.loadAllPets())
        const dogBtn = document.getElementById("dogsBtn");
        dogBtn.addEventListener('click', () => Pet.loadAllPets("dog"))
        const catBtn = document.getElementById("catsBtn");
        catBtn.addEventListener('click', () => Pet.loadAllPets("cat"))
        const ferretBtn = document.getElementById("ferretsBtn");
        ferretBtn.addEventListener('click', () => Pet.loadAllPets("ferret"))
        const horseBtn = document.getElementById("horsesBtn");
        horseBtn.addEventListener('click', () => Pet.loadAllPets("horse"))
        const otherCritterBtn = document.getElementById("otherCrittersBtn");
        otherCritterBtn.addEventListener('click', () => Pet.loadAllPets("otherCritter"))

        const searchBtn = document.getElementById("searchBtn")
        searchBtn.addEventListener('submit', Pet.filterPetsByEmail)
    }

    static async filterPetsByEmail(event) {
        event.preventDefault()
        const email = event.target.elements.email.value
        const response = await fetch(`http://localhost:3000/pets?email=${email}`)
        let petsFromEmail = await response.json()

        if (!!document.querySelector(".pet-card")) {
            let petCards = document.querySelectorAll(".pet-card")
            for (let card of petCards) {
                card.remove()
            }
        }

        petsFromEmail.forEach(petObj => {
            let pet = new Pet(petObj)
            pet.createPetCard()
        });

    }

    // -- get user data --
    // fetch (new path/pet-user/${:id} of the pet) return the user
    async getUserFromPetID() {
        let response = await fetch(`http://localhost:3000/pet-user/${this.id}`)
        let userData = await response.json()
        let user = new User(userData)
        return user
    }

    // -- create Card --
    async createPetCard() {
        // to create a card with html and insert pet data
        // if (!pet.pet_name) { debugger; }
        const user = await this.getUserFromPetID()

        const petsCard = document.querySelector('#pet-container')
        const newPet = document.querySelector('#pet-card-template').content.cloneNode(true)
        newPet.querySelector(".img-thumbnail").src = this.image_link || "img/NoImage.png"
        let petCardAttributes = newPet.querySelector(".flip-card-back").children
        petCardAttributes[0].innerText = `Name: ${this.pet_name}`
        petCardAttributes[1].innerText = `Age: ${this.pet_age}`
        petCardAttributes[2].innerText = `Health Concern: ${this.health_concern}`
        petCardAttributes[3].innerText = `Owner: ${user.name}`
        petCardAttributes[4].innerText = `Contact email: ${user.email}`
        // debugger;
        petsCard.appendChild(newPet)

    }

}

class User {
    constructor(user) {
        this.name = user.name
        this.email = user.email
    }
}

