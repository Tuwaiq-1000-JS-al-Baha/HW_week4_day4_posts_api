const postDiv = document.querySelector(".post-div")
const form = document.querySelector(".form-add")

getPosts()

function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data

            postDiv.innerHTML = ""

            posts.forEach(post => {

                const title = post.title
                const body = post.body
                const owner = post.owner
                const image = post.image

                const id = post._id

                const postElement = `
            <div class="post-element">
            <div class="form">
                <h3 class="title-class">Title: <span>${title}</span></h3>
                <h3 class="body-class">body: <span>${body}</span></h3>
                <h3 class="owner-class">owner: <span>${owner}</span></h3>
                <img src="${image}" height="200" width="200">
                <br>
                <button onclick="deletePost(${id})">Delete</button>
                <button onclick="editPost(this)">Edit</button> 
            </div>
            <form onsubmit="editPost(event)" class="form-edit">
                
                <label>Title:</label><input type="text" name="title">
                <br>
                <label>Body:</label><input type="text" name="body">
                <br>
                <label>Owner:</label><input type="text" name="owner">
                <br>
                <label>Image:</label><input type="url" name="image">
                <br>
                <button onclick="deletePost(${id})">Delete</button>
                <button onclick="confirmPost(event,this,'${id}')">confirm </button>
   
        
    
        </div>
            `
                postDiv.innerHTML += postElement
            })
        })
}

function addPosts(event) {
    event.preventDefault()

    const title = form.elements.title.value
    const body = form.elements.body.value
    const owner = form.elements.owner.value
    const image = form.elements.image.value

    const postBody = {
        title: title,
        body: body,
        owner: owner,
        image: image
    }

    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(response => {
            getPosts()

        })
}

function deletePost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()
        })
}
function editPost(edit) {
    const bostEdit = edit.parentElement.nextElementSibling
    console.log(bostEdit)
    bostEdit.style.display = "inline"
    const formInfo = edit.parentElement
    formInfo.style.display = "none"

    const title = formInfo.querySelector(".title-class span").innerHTML
    const body = formInfo.querySelector(".body-class span").innerHTML
    const owner = formInfo.querySelector(".owner-class span").innerHTML
    const image = formInfo.querySelector("img").src

    const titleInput = bostEdit.elements.title
    const bodyInput = bostEdit.elements.body
    const ownerInput = bostEdit.elements.owner
    const imageInput = bostEdit.elements.image

    titleInput.value = title
    bodyInput.value = body
    ownerInput.value = owner
    imageInput.value = image

}
function confirmPost(event, confirm, id) {
    event.preventDefault()

    const confirmPost = confirm.parentElement

    const title = confirmPost.elements.title.value
    const body = confirmPost.elements.body.value
    const owner = confirmPost.elements.owner.value
    const image = confirmPost.elements.image.value

    const postBody = {
        title: title,
        body: body,
        owner: owner,
        image: image
    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(response => {
            getPosts()

        })
}