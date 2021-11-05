const postsDiv = document.querySelector(".post-list")
const form = document.querySelector(".form-add")
getPost()
function getPost(){
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts").then(function (response) {
        const posts=response.data
        const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
        console.log("postssorted", postsSorted)
        postsDiv.innerHTML = ""
        posts.forEach(function(post) {
            const title = post.title
            const body = post.body
            const image = post.image
            const owner = post.owner
            const id = post._id
            const postElement =` 
            <div class="post-Item">
              <div class = "post-info">
                <h1> title: <span> ${title} </span> </h1>
                <h4> Body: <span> ${body} </span> </h4>
                <img src="${image}" height="300px">
                <p>  owner: <span> ${owner} </span> </p>
                <button onclick="deletepost('${id}')"> Delete post </button>
                <button onclick="editPost(this)"> Edit </button>
                </div>
            <form class="post-Form">
                        <label> Title </label> <input type="text" name="title"> <br>
                        <label> Body </label> <input type="text" name="body"> <br>
                        <label> image </label> <input type="url" name="image"> <br>
                        <label> owner </label> <input type="text" name="owner"> <br>
                        <button onclick="deletepost('${id}')">Delete post</button>
                        <button onclick="confirmEdit(event, this, '${id}')"> Confirm </button>
                        </form>
            </div>
            `
       postsDiv.innerHTML += postElement
        })


        })
  
    }
    //Add post button
    function addPost(event) {
        event.preventDefault()
        const title = form.elements.title.value
        const body = form.elements.body.value
        const image = form.elements.image.value
        const owner = form.elements.owner.value
        const postsBody = {
            title: title,
            body:  body,
            image: image,
            owner: owner,
            
        }
        axios.post("https:vast-chamber-06347.herokuapp.com/api/posts", postsBody,)
            .then(function(response) {
                const data = response.data
                console.log(data);
                getPost()
               
            })
            document.write("Add has been done")
    }
    //  Confirm put button 
    function confirmEdit(event,confirmButton,id) {
        event.preventDefault()
        const postForm=confirmButton.parentElement
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
        axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody,)
        .then(function(response)  {
            getPost()
        })

       document.write("Update has been done")
}
// edit post button 
function editPost(editButton) {
    const editForm = editButton.parentElement.nextElementSibling
    editForm.style.display = "inline"
    const postInfo = editButton.parentElement
    postInfo.style.display = "none"

    const title = postInfo.querySelector("h1 span").innerHTML
    const body  = postInfo.querySelector("h4 span").innerHTML
    const image = postInfo.querySelector("img").src
    const owner = postInfo.querySelector("p span").innerHTML
   

    const titleInput = editForm.elements.title
    const  bodyInput = editForm.elements.body
    const imageInput = editForm.elements.image
    const ownerInput = editForm.elements.owner
    

    titleInput.value = title
    bodyInput.value =body
    imageInput.value = image
    ownerInput.value =owner
}

//  Delete Post
function deletepost(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`,)
        .then(function(response) {
            getPost()
        })
        document.write("Delete has been done")
} 