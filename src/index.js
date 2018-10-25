
// YOUR CODE HERE

document.addEventListener("DOMContentLoaded",() => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  let addToy = false

  function juan(event){
    event.preventDefault()
  const name = event.target[0].value
  const imgUrl = event.target[1].value
    fetch('http://localhost:3000/toys', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: imgUrl,
          likes: 0
          })
    })
    .then(res => res.json())
    .then(showtoys)
  }


  const toy_container = document.querySelector("#toy-collection")
  const URL = fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(res =>res.forEach(showtoys)
      )

      function showtoys(toy){
        const div = document.createElement('div')
        div.className = "card"

        const h2 = document.createElement('h2')
        h2.innerText = toy.name

        const image = document.createElement('img')
        image.className = "toy-avatar"
        image.src = toy.image

        const p = document.createElement('p')
        p.innerText = `${toy.likes} Likes`

        const button = document.createElement('button')
        button.dataset.id = toy.id
        button.className = "like-btn"
         button.innerText = "Like"

        div.append(h2,image,button,p)
        toy_container.append(div)
        button.addEventListener('click', increaseLikes)
      };

      function increaseLikes(event){
        const likes = event.target.parentNode.querySelector('p')
        let increaseLikes = parseInt(likes.innerText)
        // debugger
        increaseLikes ++
        likes.innerText = `${increaseLikes} Likes`
        updateDb(event,increaseLikes)
      };

      function updateDb(event, number){
      const id = event.target.dataset.id
      fetch(`http://localhost:3000/toys/${id}`,{
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            likes: number
          })
      })

      }
    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
        toyForm.addEventListener('submit', juan)
      } else {
        toyForm.style.display = 'none'
      }
    })
})



// OR HERE!
