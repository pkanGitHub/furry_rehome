// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    console.log("where js lives")
    createPet();
    thing();
})
function thing() {
    const homebutton = document.querySelector("#home-page")
    homebutton.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetch('http://localhost:3000/pets')
    })
}


// class Pet {
//     constructor(pet_name, pet_age, health_concern, image) {
//         this.pet_name = pet_name
//         this.pet_age = pet_age
//         this.health_concern = health_concern
//         this.image = image
//     }

function createPet() {
    const newPetForm = document.querySelector('#rehome-form')
    // const newPetName = document.querySelector('#addPetName')
    // const newPetAge = document.querySelector('#addPetAge')
    // const newHealthInfo = document.querySelector('#addHealth')
    // let newPet = new Pet(newPetName.value, newPetAge.value, newHealthInfo.value)


    newPetForm.addEventListener('submit', function (e) {
        console.log("form submitted")
        e.preventDefault();
        e.stopPropagation();
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
                        // "pets_attributes": [{
                        //     "category": e.target.elements.pet.value,
                        //     "pet_name": e.target.elements.petName.value,
                        //     "pet_age": e.target.elements.petAge.value,
                        //     "health_concern": e.target.elements.petHealth.value,
                        //     "image": e.target.elements.petImg.value
                        // }]
                    }
                }
            )
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(e => console.log(e));
    })
}

// }


// class User {
//     constructor(name, email) {
//         this.name = name
//         this.email = email
//     }
// }
//