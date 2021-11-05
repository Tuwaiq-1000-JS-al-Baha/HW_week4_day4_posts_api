const postsDiv = document.querySelector(".postsList")
const form = document.querySelector(".addPost")
 

    getPosts()


function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts/")
        .then(response => {
            const posts = response.data

            postsDiv.innerHTML = ""

            posts.forEach(post => {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id

                postsDiv.innerHTML +=
                    `
            <div class="postitem">
            <div class="postInfo">
                    <h2>Title: <span> ${title} </span> </h2>
                    <h5> body: <span>${body}</span> </h5>
                    <img src="${image}" height="100px"> <br>
                    <h3> onwer: <span>${owner} </span></h3>
                    <button onclick="editPost(this)"> Edit </button>
                        <button onclick="deletepost('${id}')"> Delete </button>
                    
                </div>
                <form  class="Postform">
                <label> Title </label> <input type="text" name="title"> <br>
                <label> Body</label> <input type="text" name="body"> <br>
                <label> Image </label> <input type="url" name="image"> <br>
                <label> Owner </label> <input type="text" name="owner"> <br>
                <button onclick="confirmEdit(event, this, '${id}')"> Confirm </button>

            </form>
            </div>`
            })
        })
}
//add a post
function addPost(event) {
    event.preventDefault()
    const title = form.elements.title.value
    const body = form.elements.body.value
    const image = form.elements.image.value
    const owner = form.elements.owner.value

    const postBody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts/", postBody)
        .then(response => {

            const data = response.data

            getPosts()
        })
    //  .catch(error => console.log(error.response.data))
}


//update a post
function editPost(editButton) {

    const postForm = editButton.parentElement.nextElementSibling
    postForm.style.display = "inline"
    const postInfo = editButton.parentElement
    postInfo.style.display = "none"

    const title = postInfo.querySelector("h2 span").innerHTML
    const body = postInfo.querySelector("h5 span").innerHTML
    const image = postInfo.querySelector("img").src
    const owner = postInfo.querySelector("h5 span").innerHTML

    const titleInput = postForm.elements.title
    const bodyInput = postForm.elements.body
    const imageInput = postForm.elements.image
    const ownerInput = postForm.elements.owner

    titleInput.value = title
    bodyInput.value = body
    imageInput.value = image
    ownerInput.value = owner
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
            getPosts()
        })
    // .catch(error => console.log(error.response.data))
}
//delet a post
function deletepost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()
        })
    // .catch(error => console.log(error.response.data))
}


