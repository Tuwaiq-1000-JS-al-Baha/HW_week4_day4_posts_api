const postDiv = document.querySelector(".post-list")
const formAdd = document.querySelector(".form-add")

getPost()

function getPost() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts") 
    .then(respones => {
        const post = respones.data

        const postSorted = post.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))

        console.log("post sorted:", postSorted)

            postDiv.innerHTML = ""
            postSorted.forEach(post => {
                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id

         
                const postElement = `
                <div class="post-item">
                <div class="post-info">
                <h2>Title: <span>${title}</span></h2>
                <h4>Body: <span>${body}</span></h4>
                <img src="${image}" width="200px">
                <p class="owner-class">${owner}</p>
                <button onclick="deletePost('${id}')">Delet post</button>
                <button onclick="editPost(this)">Edit</button>
        </div>
        <form class="post-form">
        <label>Title:</label><input type="text" name="title">
    <br>
    <label>body:</label><input type="text" name="body">
    <br>
    <label>Image:</label><input type="url" name="image">
    <br>
    <label>owner:</label><input type="text" name="owner">
    <br>
    <button onclick="deletePost('${id}')">Delet post</button>
    <button onclick="confirmEdit(event,this,'${id}')">confirm</button>
    
    </form>
    </div>`
    
                    postDiv.innerHTML += postElement 

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
    
        axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}` , postBody)
            .then(response => {
                getPost()
            })
    
    }
    function editPost(editButton) {

        const postForm = editButton.parentElement.nextElementSibling
        postForm.style.display = "inline"
    
        const postInfo = editButton.parentElement
        postInfo.style.display = "none"
    
        console.log(postForm)
    
        const title = postInfo.querySelector("h2 span").innerHTML
        const body = postInfo.querySelector("h4 span").innerHTML  
        const image = postInfo.querySelector("img").src
        const owner = postInfo.querySelector(".owner-class").innerHTML

    
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
                getPost()
            })
    
    }
    function addPost(event) {
        event.preventDefault()
    
        const title = formAdd.elements.title.value
        const body = formAdd.elements.body.value
        const image = formAdd.elements.image.value
        const owner = formAdd.elements.owner.value
    
        const postBody = {
            title: title,
            body: body,
            image: image,
            owner: owner,
        }
        axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
        .then(response => {
            const data = response.data
    
            console.log(data)
    
            getPost()
    
    
    
        })
    
    }