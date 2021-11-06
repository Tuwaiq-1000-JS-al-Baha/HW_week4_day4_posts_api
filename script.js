const elementList = document.querySelector(".element-list")
const form = document.querySelector(".form")


// -------------------- get elements -------------------//
getElements()

function getElements() {

  axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
  .then(response => {
 
      const elements = response.data

      const elementSorted = elements.sort((elementA , elementB) => 
      elementB.dateCreated.localeCompare(elementA.dateCreated))
      
      elementList.innerHTML = ""

      elementSorted.forEach(element => {
         
        const title = element.title 
        const body = element.body
        const owner = element.owner
        const img = element.image
        const id = element._id

        const postElements = `
     <div class="elementItem">
        <div class="element-info">
          <h2> title : <span>${title}</span></h2>
          <h3> body : <span>${body}</span></h3>
          <p> owner :  <span>${owner}</span></p>
          <img src="${img}" height="200px" >
        
          <button onclick="deleteElement('${id}')"> DELETE ELEMENT </button>
          <button onclick="editElement(this)"> EDIT ELEMENT </button>
        </div>

        <form class="edit-form">
          <label> TITLE </label> <input type="text" name="title">
          <br>
          <br>
          <label> BODY </label> <input type="text" name="body">
          <br>
          <br>
          <label> OWNER </label> <input type="text" name="owner">
          <br>
          <br>
          <label> IMAGE </label> <input type="url" name="image">
          <br>
          <br>
          <button onclick="deleteElement('${id}')"> DELETE ELEMENT </button>
          <button onclick="confirmElement(event , this , '${id}')"> CONFIRM </button>
        </form>
     </div>
        `

        elementList.innerHTML += postElements

        
      })
      
  })
  .catch(error => console.log(error.response.data))
}


// --------------- add a new element ---------------------//

function addElements(event) {
    event.preventDefault()

    const title = form.elements.title.value
    const body = form.elements.body.value
    const owner = form.elements.owner.value
    const image = form.elements.image.value
    
    console.log(form);
    console.log(title);
    console.log(body);
    console.log(owner);
    console.log(image);

    const elementBody = {
        title : title,
        body : body,
        owner : owner,
        image : image,
        
    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts" , elementBody)
    .then(response => {
        const data = response.data

        getElements()
    })
    .catch(error => console.log(error.response.data))
}


// ----------------------- delete elements ----------------//

function deleteElement(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
    .then(response => {
        getElements()
    })
    
    .catch(error => console.log(error.response.data))
}


//------------------ edit element ---------------------//

function editeElement(editButton) {

    const elementForm = editButton.parentElement.nextElementSibling
   elementForm.style.display = "inline"

    const elementInfo = editButton.parentElement
    elementInfo.style.display="none"

    const title = elementInfo.querySelector("h2 span").innerHTML
    const body = elementInfo.querySelector("h3 span").innerHTML
    const owner = elementInfo.querySelector("p span").innerHTML
    const image = elementInfo.querySelector("img").src

    const titleInfo = elementForm.elements.title
    const bodyInfo = elementForm.elements.body
    const ownerInfo = elementForm.elements.owner
    const imageInfo = elementForm.elements.image


    titleInfo.value = title
    bodyInfo.value = body
    ownerInfo.value = owner
    imageInfo.value = image

}

//--------------------- confirm edit---------------------//

function confirmElement(event, confirmButton, id) {
    event.preventDefault()

    const elementForm = confirmButton.parentElement

    const title = elementForm.elements.title.value
    const body = elementForm.elements.body.value
    const owner = elementForm.elements.owner.value
    const image = elementForm.elements.image.value

    const elementBody = {
        title : title,
        body : body,
        owner : owner,
        image : image,
    }

    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}` , elementBody)
    .then(response => {
        getElements()
    })
    .catch(error => console.log(error.response.data))
}



