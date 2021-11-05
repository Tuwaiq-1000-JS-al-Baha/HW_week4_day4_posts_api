const PostsDiv = document.querySelector(".posts-list")
const postsAdd = document.querySelector(".posts-add")

getPosts()
//GET//
function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data
            const PostsSort = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
            /* empty the array in the list becuae input agine*/
            PostsDiv.innerHTML = ""

            PostsSort.forEach(post => {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id
                const PostsElement = `
                <div class="post-item">
                <div class="postinfo">
        <h2>Title: <span>${title}</span></h2> 
        <h4>body: <span>${body}</span></h4>
        <img src="${image}" width="200px">
        <p class="owner-class"> owner: <span>${owner}</span></p>
        <button onclick="deletePosts ('${id}')"> Delete post </button>
        <button onclick="editPosts (this)"> Edit </button>
        </div> 

        <form class="posts-form">
        <label>Title:</label><input type="text" name="title">
        <br>
        <label>body:</label><input type="text" name="body">
        <br>
        <label>Image:</label><input type="url" name="image">
        <br>
        <label>owner:</label><input type="text" name="owner">
        <br>
  
        <button onclick="deletePosts('${id}')">Delete post </button>
        <button onclick="confirmEdit(event, this, '${id}')">Confirm</button>
    </form>
    </div>`
                PostsDiv.innerHTML += PostsElement
            })
        })
}
//Delet//
function deletePosts(id) {
    console.log(id)
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()
        })
}
//EDIT//
function editPosts(editButton) {
    const PostesForm = editButton.parentElement.nextElementSibling
    PostesForm.style.display = "inline"

    const postinfo = editButton.parentElement
    postinfo.style.display = "none"

    const title = postinfo.querySelector("h2 span").innerHTML
    const body = postinfo.querySelector("h4 span").innerHTML
    const image = postinfo.querySelector("img").src
    const owner = postinfo.querySelector(".owner-class span").innerHTML

    const titleInput = PostesForm.elements.title
    const bodyInput = PostesForm.elements.body
    const imageInput = PostesForm.elements.image
    const ownerInput = PostesForm.elements.owner

    titleInput.value = title
    bodyInput.value = body
    imageInput.value = image
    ownerInput.value = owner
}
//CONFIRM EDIT//
function confirmEdit(event, confirmButton, id) {
    event.preventDefault()
    const PostesForm = confirmButton.parentElement

    /* Get Information Form  */
    const title = PostesForm.elements.title.value
    const body = PostesForm.elements.body.value
    const image = PostesForm.elements.image.value
    const owner = PostesForm.elements.owner.value

    const postBody = {
        title: title,
        body: body,
        image: image,
        owner: owner,
    }

    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(response => {
            getPosts()
        })
}
//ADD POST//
function addPosts(event) {
    event.preventDefault()
    const title = postsAdd.elements.title.value
    const body = postsAdd.elements.body.value
    const image = postsAdd.elements.image.value
    const owner = postsAdd.elements.owner.value

    const postBody = {
        title: title,
        body: body,
        image: image,
        owner: owner,
    }
    /* console.log(postBody)*/
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(response => {
            const data = response.data
            getPosts()
        })
}
