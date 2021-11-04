const postsDiv = document.querySelector(".postsList")
const form = document.querySelector(".add")

getPosts()
// get posts
function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data
            console.log(posts);

            const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated));

            postsSorted.forEach(post => {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id

                postsDiv.innerHTML += `
                <div class="postItem">
                    <div class = "post">
                        <h1> <span> ${title} </span> </h1>
                        <h3> Owner: <span> ${owner} </span> </h3>
                        <p> <span> ${body} </span> </p>
                        <img src="${image}" height="200px">
                        <button onclick="editPost(this)"> Edit </button>
                        <button onclick="deletepost('${id}')"> Delete </button>
                    </div>
                    <form class="editForm">
                        <label> Title </label> <input type="text" name="title"> <br>
                        <label> owner </label> <input type="text" name="owner"> <br>
                        <label> Body </label> <input type="text" name="body"> <br>
                        <label> image </label> <input type="url" name="image"> <br>
                        <button onclick="confirmEdit(event, this, '${id}')"> Confirm </button>
                        </form>
                </div>
                `

            });
        })
}

function addPost(event) {
    event.preventDefault()
    const title = form.elements.title.value
    const owner = form.elements.owner.value
    const body = form.elements.body.value
    const image = form.elements.image.value
    console.log("title:", title);
    console.log("image", image);

    const postsBody = {
        title: title,
        owner: owner,
        body: body,
        image: image
    }
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postsBody)
        .then(response => {
            const data = response.data
            console.log(data);

            getPosts()
        })
}

// edit post button 
function editPost(editButton) {
    const editForm = editButton.parentElement.nextElementSibling
    editForm.style.display = "inline"
    const post = editButton.parentElement
    post.style.display = "none"

    const title = post.querySelector("h1 span").innerHTML
    const owner = post.querySelector("h3 span").innerHTML
    const body = post.querySelector("p span").innerHTML
    const image = post.querySelector("img").src

    const titleInput = editForm.elements.title
    const ownerInput = editForm.elements.owner
    const bodyInput = editForm.elements.body
    const imageInput = editForm.elements.image

    titleInput.value = title
    ownerInput.value = owner
    bodyInput.value = body
    imageInput.value = image

}

// confirm post button (Put)
function confirmEdit(event, confirmButton, id) {
    event.preventDefault()

    const editForm = confirmButton.parentElement

    const title = editForm.elements.title.value
    const owner = editForm.elements.owner.value
    const body = editForm.elements.body.value
    const image = editForm.elements.image.value

    const postBody = {
        title: title,
        owner: owner,
        body: body,
        image: image
    }

    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody,)
        .then(response => {
            getPosts()
        })
}

//  delete Post
function deletepost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()
        })
}