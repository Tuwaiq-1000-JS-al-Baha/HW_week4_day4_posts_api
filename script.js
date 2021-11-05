const postList = document.querySelector(".posts-list")
const formAdd = document.querySelector(".form-add")

getposts()

function getposts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data
            const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))

            postList.innerHTML = ""

            postsSorted.forEach(post => {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id

                const postElement = `
           <div class="post-item">
               <div class="post-info">
                   <h3> Title:<span>${title}</span></h3>
                   <h5> Body:<span>${body}</span></h5>
                   <img src="${image}" width="200px">
                   <p> Owner:<span>${owner}</span></p>
                   <button onclick="deletePost('${id}')"> Delete </button>
                   <button onclick="editPost(this)"> Edit </button>
              </div>
                <form class="post-form">
                    <label> Title :</label> <input type="text" name="title">
                    <br>
                    <label> Body :</label> <input type="text" name="body">
                    <br>
                    <label> Image :</label> <input type="url" name="image">
                    <br>
                    <label> Owner : </label><input type="text" name="owner">
                    <br>
                    <button onclick="deletePost('${id}')"> Delete </button>
                    <button onclick="confirmEdit(event,this,'${id}')">Confirm</button>
                </form>
            </div> 
                   `

                    postList.innerHTML+=postElement
            })
        })
}
function confirmEdit(event, confirmButton, id) {
    event.preventDefault()

    const postForm = confirmButton.parentElement

    const title = postForm.elements.title.value
    const body = postForm.elements.body.value
    const image = postForm.elements.image.value
    const owner = postForm.elements.owner.value

    const postBody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(response => {
            getposts()
        })
}

function editPost(editButton){
    const postForm = editButton.parentElement.nextElementSibling
    postForm.style.display ="inline"

    const postInfo = editButton.parentElement
    postInfo.style.display = "none"

    const title = postInfo.querySelector("h3 span").innerHTML
    const body = postInfo.querySelector("h5 span").innerHTML
    const image = postInfo.querySelector("img").src
    const owner = postInfo.querySelector("p span").innerHTML

    const titleInput = postForm.elements.title
    const bodyInput = postForm.elements.body
    const imageInput = postForm.elements.image
    const ownerInput = postForm.elements.owner

    titleInput.value = title
    bodyInput.value = body
    imageInput.value = image
    ownerInput.value = owner
}

function deletePost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getposts()
        })
}

function addpost(event) {
    event.preventDefault()

    const title = formAdd.elements.title.value
    const body = formAdd.elements.body.value
    const image = formAdd.elements.image.value
    const owner = formAdd.elements.owner.value

    const postBody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(response => {
            getposts()
        })
}