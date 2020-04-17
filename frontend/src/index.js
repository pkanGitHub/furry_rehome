// test that we can get data from the backend
document.addEventListener('DOMContentLoaded', function () {
    // console.log("where js lives")
    fetch("http://localhost:3000/pets")
        .then(response => response.json())
        .then()

})

// const BACKEND_URL = 'localhost:3000';
// fetch(`${BACKEND_URL}/test`)
//     .then(response => response.json())
//     .then(parsedResponse => console.log(parsedResponse));