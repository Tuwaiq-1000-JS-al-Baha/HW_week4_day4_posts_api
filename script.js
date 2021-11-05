const postList = document.querySelector(".post-list")
const formList = document.querySelector(".form-list")

function addposts() {
    axios.get(`https://vast-chamber-06347.herokuapp.com/api/posts`).then(function (response) {
        const posts = response.data
        const postSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
        postList.innerHTML = ""
        posts.forEach(function (post) {
            const title = post.title
            const body = post.body
            const image = post.image
            const owner = post.owner
            const id = post._id

            //محاولات 
            //const comments = post.comments
            //comments.forEach(commenta => {
                //const ownercoment = commenta.owner
                //const commenttow = commenta.comment
                //console.log(comments)
           // })


            const newpost =
                `<div class="post-div">
        <div class="postitme">
           <h2><span>${title}</span></h2>
           <p><span>${body}</spam><p>
           <img src="${image}" heghit="200px" width="200px">
           <h4><span> ${owner}</span></h4>
           <button onclick="deletepost('${id}')">delete</button>
           <button onclick="editpost(this)">Edit</button>

        </div>
        <form class="form-2">
           <label>Title:</label>
           <input type="text" name="title">
           <br>
           <label>Body:</label>
           <input type="text" name="body">
           <br>
           <label>Imag:</label>
           <input type="url" name="image">
           <br>
           <label>Owner:</label>
           <input type="text" name="owner">
           <br>
           <button onclick="deletepost('${id}')">Delete</button>
           <button onclick="comfirpost(event,this ,'${id}')">Comfirm</button>
        </form>
        
    </div> `
            postList.innerHTML += newpost
        })
    })
}
addposts()
function addpost(event) {
    event.preventDefault()
    const title = formList.elements.title.value
    const body = formList.elements.body.value
    const image = formList.elements.image.value
    const owner = formList.elements.owner.value
    const postbody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }

    axios.post(`https://vast-chamber-06347.herokuapp.com/api/posts`, postbody).then(function (response) {
        const posts = response.data
        addposts()
    })
}
function deletepost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(function (response) {
            addposts()
        })
}
function editpost(Edit) {
    const postFormTwo = Edit.parentElement.nextElementSibling
    postFormTwo.style.display = "inline"
    const postEdit = Edit.parentElement
    postEdit.style.display = "none"



    const title = postEdit.querySelector("h2 span").innerHTML
    const body = postEdit.querySelector("p span").innerHTML
    const owner = postEdit.querySelector("h4 span").innerHTML
    const Image = postEdit.querySelector("img").src


    const titleInput = postFormTwo.elements.title
    const bodyInput = postFormTwo.elements.body
    const ownerInput = postFormTwo.elements.owner
    const imageInput = postFormTwo.elements.image


    titleInput.value = title
    bodyInput.value = body
    ownerInput.value = owner
    imageInput.value = Image

}
function comfirpost(e, comfirmpost, id) {
    e.preventDefault()
    const postFormTwo = comfirmpost.parentElement
    const title = postFormTwo.elements.title.value
    const body = postFormTwo.elements.body.value
    const image = postFormTwo.elements.image.value
    const owner = postFormTwo.elements.owner.value
    const postbody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postbody).then(function (response) {
        const data = response.data
        addposts()
    })
}