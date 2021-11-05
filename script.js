const postsDiv = document.querySelector(".posts-list")
const formAdd = document.querySelector(".form-add")
getposts()

function getposts() {



    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts").then(Response => {
        const posts = Response.data
        const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))

        console.log("postsSorted:", postsSorted)
        postsDiv.innerHTML = ""


        postsSorted.forEach(post => {
            const title = post.title
            const body = post.body
            const image = post.image
            const owner = post.owner
            const id = post._id

            const postElement = `<div class="post-item">
        <div class="post-info">
        <h2>Title:<span>${title}</span><h2>
        <h4>Body:<span>${body}</span></h4>
        <img src="${image}" widht=100px">
        <p>owner:<span>${owner}</span></p>
        <button onclick="deletePost('${id}')">Delete post</button>
        <button onclick="editPost(this)">Edit</button>
        </div>

        <form class="post-form">
        <label>Title:</label><input type="text" name="title">
        <br>
        <label>Body:</label><input type="text" name="body">
        <br>
        <label>image:</label><input type="url" name="image">
        <br>
        <label>owner:</label><input type="text" name="owner">
        <br>
<button onclick="deletePost"('${id}')">Delete post</button>
<button onclick="confirmEdit(event, this,'${id}')">Confirm</button>

</form>
</div>
`
            postsDiv.innerHTML += postElement
        });
    })

}
function confirmEdit(event, confirmButton, id) {
    event.preventDefault()

    const postForm = confirmButton.parentElement
    console.log(postForm)
    const title = postForm.elements.title.value
    const body = postForm.elements.body.value
    const image = postForm.elements.image.value
    const owner = postForm.elements.owner.value

    console.log(owner)
    const postBody = {
        title: title,
        body: body,
        owner: owner,
        image: image,

    }
    console.log(postBody)
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(response => {
            getposts()
        })

}
function editPost(editButton) {
    const postForm = editButton.parentElement.nextElementSibling
    postForm.style.display = "inline"

    const PostInfo = editButton.parentElement
    PostInfo.style.display = "none"

    const title = PostInfo.querySelector("h2 span").innerHTML
    const body = PostInfo.querySelector("h4 span").innerHTML
    const image = PostInfo.querySelector("img").src
    const owner = PostInfo.querySelector("p span").innerHTML



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
    console.log(id)
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(Response => {
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
        owner: owner,
        image: image,

    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(Response => {
            const data = Response.data
            console.log(data)
            getposts()
        })
}
