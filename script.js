const postDiv = document.querySelector(".post")
const postAdd = document.querySelector(".add")

getPosts()

function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(res => {
            const posts = res.data
            console.log(posts)

            const postsSorteds = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
            postDiv.innerHTML = ""
            posts.forEach(post => {

                const title = post.title
                const owner = post.owner
                const body = post.body
                const image = post.image
                const id = post._id

                const postItem =
                    `<div class="bigPost">
                        <div class="old-Post">
                            <h3> title :<span> ${title}</span> </h3>
                            <h4> owner :<span> ${owner}</span></h4>
                            <p> body :<span> ${body}</span></p>
                            <img src="${image}" height="200px">
                            <button onclick="deletePost('${id}')"> delete</button>
                            <button onclick="editPost(this)"> Edit</button>
                        </div>
                        <form class="new-Post">
                            <label> title </label> <input type="text" name="title">
                            <br>
                            <label> owner</label> <input type="text" name="owner">
                            <br>
                            <label>body</label><input type="text" name="body">
                            <br>
                            <label> image</label> <input type="url" name="image">
                            <br>
                            <button onclick="deletePost('${id}')"> delete</button>
                            <button onclick="confirmEdit(event,this,'${id}')"> confirm </button>
                        </form>


                    </div>`

                postDiv.innerHTML += postItem

            });
        })
}





//add post in pot list :

function addPost(event) {
    event.preventDefault()
    const title = postAdd.elements.title.value
    //console.log(title)
    const owner = postAdd.elements.owner.value
    const body = postAdd.elements.body.value
    const image = postAdd.elements.image.value
    //console.log(image)


    const postBody = {
        title: title,
        owner: owner,
        body: body,
        image: image

    }


    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(res => {
            const posts = res.data
            console.log(posts)
            getPosts()

        })

}


// edit post in post list (editing post only )
function editPost(editButton) {
    const newPost = editButton.parentElement.nextElementSibling
    //console.log(newPost)
    newPost.style.display = "inline"
    const oldPost = editButton.parentElement
    oldPost.style.display = "none"
    console.log(oldPost)



    const title = oldPost.querySelector("h3 span").innerHTML
    const owner = oldPost.querySelector("h4 span").innerHTML
    const body = oldPost.querySelector("p span").innerHTML
    const image = oldPost.querySelector("img").src
    console.log(title)
    console.log(image)


    const titleInput = newPost.elements.title
    const ownerInput = newPost.elements.owner
    const bodyInput = newPost.elements.body
    const imageInput = newPost.elements.image



    titleInput.value = title
    ownerInput.value = owner
    bodyInput.value = body
    imageInput.value = image

}

// confirm use method put 


function confirmEdit(event, confirmButton, id) {
    event.preventDefault()

    const newPost = confirmButton.parentElement

    const title = newPost.elements.title.value
    const owner = newPost.elements.owner.value
    const body = newPost.elements.body.value
    const image = newPost.elements.image.value


    const postBody = {
        title: title,
        owner: owner,
        body: body,
        image: image

    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
        .then(res => {
            getPosts()
        })



}


//delete post 
function deletePost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(res => {
            getPosts()
        })

}