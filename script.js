const postList = document.querySelector(".posts-list")
const addForm = document.querySelector(".add-form")
const comment = document.querySelector(".comment")
getposts()

function getposts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data
            console.log(posts)
            postList.innerHTML = ""
            posts.forEach(post => {
                const title = post.title
                const image = post.image
                const body = post.body
                const owner = post.owner
                const id = post._id
                const postElement = `
                <div class="post-element">
                <div class="post-info">
                <h1>${title}</h1>
                <img src="${image}" height="200px"/>
                <p>${body}</p>
                <h3>${owner}</h3>
                <button onclick="deletPost('${id}')"> Delet post </button>
                <button onclick="editPost(this)"> Edit post </button>
                <button onclick="addComent(this, '${id}')"> add Coment </button>
                </div>
                <form onsubmit="addPost(event)" class="edit-form">
        <label>title:</label>
        <input type="text" name="title"> </br>
        <label>image:</label>
        <input type="url" name="image"> </br>
        <label>body:</label>
        <input type="text" name="body"> </br>
        <label>owner:</label>
        <input type="text" name="owner"> </br>
        <button onclick="deletPost('${id}')"> Delet post </button>
        <button onclick="ConfirmPost(event, this, '${id}')"> Confirm post </button>
    </form>
    <div class="comment">
                </div>
                </div>
                
                `
                postList.innerHTML += postElement

            })

        })
}

function addPost(e) {
    e.preventDefault()
    const title = addForm.title.value
    const image = addForm.image.value
    const body = addForm.body.value
    const owner = addForm.owner.value
    const postBody = {
        title: title,
        image: image,
        body: body,
        owner: owner
    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(response => {
            const data = response.data
            getposts()
        })
}



function deletPost(id) {


    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getposts()

        })
}


function editPost(editButton) {
    const editForm = editButton.parentElement.nextElementSibling
    editForm.style.display = "inline"

    const postInfo = editButton.parentElement
    postInfo.style.display = "none"

    const title = postInfo.querySelector("h1").innerHTML
    const image = postInfo.querySelector("img").src
    const body = postInfo.querySelector("p").innerHTML
    const owner = postInfo.querySelector("h3").innerHTML


    const titleInput = editForm.elements.title
    const imageInput = editForm.elements.image
    const bodyInput = editForm.elements.body
    const ownerInput = editForm.elements.owner


    titleInput.value = title
    imageInput.value = image
    bodyInput.value = body
    ownerInput.value = owner

}


function ConfirmPost(event, confirmButton, id) {

    const editForm = confirmButton.parentElement

    const title = editForm.elements.title.value
    const image = editForm.elements.image.value
    const body = editForm.elements.body.value
    const owner = editForm.elements.owner.value

    const postBody = {
        title: title,
        image: image,
        body: body,
        owner: owner
    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(response => {
            getposts()

        })
}


function addComent(addComentButton, id) {
    const post = addComentButton.parentElement
    console.log(post)
    console.log(id)
}

