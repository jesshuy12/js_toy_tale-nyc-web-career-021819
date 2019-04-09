const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const likeButton = document.querySelector(".like-btn")
let addToy = false
let toys = []
const URL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", function() {

const toyCollection = document.querySelector("#toy-collection")

//When the page loads, make a 'GET' request to fetch all the toy objects
fetch(URL)
  .then(function(response) {
    return response.json()
  })//end of the first .then
  .then(function(json) {
    toys = json
    toyCollection.innerHTML = ""
    renderAllToys()
  })//end of second .then


function renderSingleToy(toy) {
  toyCollection.innerHTML += `
  <div data-id=${toy.id} class="card">
    <h2>${toy.name}</h2>
      <img data-id=${toy.id} src=${toy.image} class="toy-avatar" />
      <p data-id=${toy.id}>${toy.likes} Likes </p>
      <button data-id=${toy.id} data-action='like' class="like-btn">Like <3</button>
      <button data-id=${toy.id} data-action='delete' class="delete-btn">Delete 👅</button>
  </div>
  `
}//renderSingleToy end

function renderAllToys() {
  toyCollection.innerHTML = ""
  toys.forEach(function(toy) {
    renderSingleToy(toy)
  })//end of the forEach for toys
}//end of renderAllToys function

// YOUR CODE HERE
//event listener for theaddButton

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', function(e){
      e.preventDefault()
      const name = e.target.elements.name.value
      const image = e.target.elements.image.value
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        })
      })// Close of the Fetch POST
      .then( res => res.json())
      .then(renderSingleToy)

      e.target.elements.name.value = ''
      e.target.elements.image.value = ''
})//end of the toyForm event listener
  } else {
    toyForm.style.display = 'none'
  }
})

toyCollection.addEventListener("click", function(e) {
  const toyID = parseInt(e.target.dataset.id)
  if (e.target.dataset.action === "like") {
      // const foundToy = toys.find(function(toy) {
      //   return toy.id === toyID
      likeTheToy(toyID)

  } else if (e.target.dataset.action === "delete") {
    deleteTheToy(toyID)
  }
  //end of the if
})//end of likeButton event listener

    function likeTheToy(id) {
      const foundToy = toys.find(function(toy) {
        return toy.id === id
      })//closes find
      foundToy.likes++
      fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
          body: JSON.stringify({likes: foundToy.likes})
      })//end of fetch
      renderAllToys()
    }//end of likeTheToy function

function deleteTheToy(id) {
  const foundToy = toys.find(function(toy) {
    return toy.id === id
  })//end of toys.find
    fetch(`${URL}/${id}`, {
      method: "delete"
    })//end of fetch
    const deletedToy = document.querySelector(`div[data-id="${id}"]`)
    toyCollection.removeChild(deletedToy)
}// delete the toy ending




})// closes DOMContentLoaded
