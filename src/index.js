let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  postToy(toyObj)
}

function renderOneToy(toy) {
  //Build toy
  let card = document.createElement("div")
  card.className = "card"
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src= "${toy.image}" class = "toy-avatar"/>
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
    `
  card.querySelector(".like-btn").addEventListener("click", () => {
    toy.likes++
    card.querySelector("p").textContent = toy.likes
    updateLikes(toy)
  })

    //Add toy card to DOM
  const toyCollection = document.querySelector("#toy-collection")
  toyCollection.appendChild(card)
}



function getAllToys(){
fetch ("http://localhost:3000/toys")
.then(response => response.json())
.then(toyData => {
  toyData.forEach(toy => renderOneToy(toy))})
}

getAllToys()


function postToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(toy => console.log(toy))
}

function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(toy => console.log(toy))
}
