const postList = document.querySelector(".posts-list")
const formAdd = document.querySelector(".form-add")
let comment = []

getPosts()

function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(Response => {
            const allData = Response.data



            const postsDate = allData.sort((postA, postB) => (postB.dateCreated.localeCompare(postA.dateCreated)))
            postList.innerHTML = ""
            allData.forEach(function (post) {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id
                const comment = post.comments





                const postElement = `
            <div class="post-info">
            <h2>title: <span>${title}</span></h2>
            <h3>body: <span>${body}</span></h3>
            <img src = "${image}" width=200px height=200px alt='avatar'>
            <h4>owner: <span>${owner}</span></h4>
            <p> comment: <span>${comment}</span></p>
            <button onclick="deletePosts('${id}')">Delete</button>
            <button onclick="editPosts(this)">Edit</button>
            <button onclick="postComment(this)">Add Comment</button>
            <form id="input-comment">
            <textarea name="comment"></textarea>
            <input type="submit" value="submit" onsubmit="submit(event, this, ${id})">
            </form>
            </div>
            
            <form class="form-posts">
        
            <label>Title:</label>
            <input type="text" name="title">
                <br>
                <label>Body:</label>
                <input type="text" name="body">
                <br>
                <label>Image:</label>
                <input type="url" name="image">
                <br>
                <label>Owner:</label>
                <input type="type" name="owner">
                <br>
                <button onclick="confirmPosts(event, this, '${id}')">Confirm</button>
            </form>
        
            `

                postList.innerHTML += postElement
            })
        })
}


function addPosts(e) {
    e.preventDefault()

    const title = formAdd.elements.title.value
    const body = formAdd.elements.body.value
    const image = formAdd.elements.image.value
    const owner = formAdd.elements.owner.value



    const postsBody = {
        title: title,
        body: body,
        image: image,
        owner: owner,



    }

    console.log(postsBody);
    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postsBody)
        .then(response => {
            const allData = response.data

            getPosts()
        })

}

function deletePosts(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()
        })
}

function editPosts(editButton) {
    const formPosts = editButton.parentElement.nextElementSibling
    formPosts.style.display = 'inline'
    const postsInfo = editButton.parentElement
    postsInfo.style.display = 'none'

    const title = postsInfo.querySelector("h2 span").innerHTML
    const body = postsInfo.querySelector("h3 span").innerHTML
    const image = postsInfo.querySelector("img").src
    const owner = postsInfo.querySelector("h4 span").innerHTML





    formPosts.elements.title.value = title
    formPosts.elements.body.value = body
    formPosts.elements.image.value = image
    formPosts.elements.owner.value = owner



}

function confirmPosts(e, confirmButton, id) {
    e.preventDefault()
    const formPosts = confirmButton.parentElement

    const title = formPosts.elements.title.value
    const body = formPosts.elements.body.value
    const image = formPosts.elements.image.value
    const owner = formPosts.elements.owner.value

    const postsBody = {
        title: title,
        body: body,
        image: image,
        owner: owner

    }

    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postsBody)
        .then(function (response) {
            getPosts()
        })
}






function postComment(commentButton) {

    const input = commentButton.nextElementSibling
    input.style.display = 'inline'
    const postInfo = commentButton
    postInfo.style.display = 'none'

    const comment = postInfo.querySelector("#input-comment").innerHTML





}

function submit(e, sumbitButton, id) {
    e.preventDefault()




    const title = postInfo.elements.title.value
    const body = postInfo.elements.body.value
    const image = postInfo.elements.image.value
    const owner = postInfo.elements.owner.value
    const comment = postInfo.elements.comment.value

    const postsBody = {
        title: title,
        body: body,
        image: image,
        owner: owner,
        comment: comment

    }

    axios.post(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}/comment`, postsBody)
        .then(response => {
            getPosts()
        })
}
