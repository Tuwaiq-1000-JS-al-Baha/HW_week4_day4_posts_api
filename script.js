const list = document.querySelector(".list-post")
const form=document.querySelector(".form-add")
getPost()
function getPost() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            // console.log(response)
            const posts = response.data
            //console.log(posts)
            const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
            console.log("post sorted:",postsSorted)

           list.innerHTML = ""



            postsSorted.forEach(element => {

                const image = element.image
                //console.log("image:",image)
                const owner = element.owner
                // console.log("owner:",owner)
                const title = element.title
                //console.log("title:",title)
                const body = element.body
                const id = element._id
                // console.log(id)
                //console.log(body)
                const postElement = `
   <div>
   <h1>${title}</h1>
   <p>${body}</p>
   <img src="${image}" width="200px" weidth="200px">
   <h3>${owner}</h3>
   <button onclick="deletePost('${id}')"> delete</button>
<button onclick="editPost(this)"> Edit</button>
<form class="form-new">
        <label>title:</label>
        <input type="text" name="title">
        <br>
        <label>image:</label>
        <input type="url" name="image">
        <br>
        <label>body:</label>
        <input type="text" name="body">
        <br>
        <label>owner:</label>
        <input type="text" name="owner">
        <br>
        <button onclick="deletePost('${id}')"> delete</button>
        <button onclick="confirmEdit(event,this,'${id}')"> confirm </button>



    </form>

   `

                list.innerHTML += postElement
            });

        })
}



/*------------------------CONFIRM-------------------------------------*/
function confirmEdit(event,confirmButton,id){
    event.preventDefault()
    const postForm=confirmButton.parentElement
    
    const title = postForm.elements.title.value
    const body = postForm.elements.body.value
    const image = postForm.elements.image.value
    const owner = postForm.elements.owner.value

   
    const bodyPost={
        title:title,
        body:body,
        image:image,
        owner:owner
    }

        axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`,bodyPost)
        .then(response=>{
            getProducts()
        })
}
/*----------------------------EDITE------------------------------*/

function editPost(editButton){
    const postForm=editButton.parentElement.nextElementSibling
    postForm.style.display="inline"

    const postInfo=editButton.parentElement
    postInfo.style.display="none"

    const title =postInfo.querySelector("title").innerHTML
    const body =postInfo.querySelector("body").innerHTML
    const owner =postInfo.querySelector("owner").innerHTML
    const image=postInfo.querySelector("image").src

    const titleInput=postForm.elements.title

    const imageInput=postForm.elements.image
    const bodytInput=postForm.elements.body
    const ownerInput=postForm.elements.owner

    titleInput.value=title
    imageInput.value=image
    bodytInput.value=body
    ownerInput.value=owner

}

/*------------------------DELETE-----------------------------------------*/
function deletePost(id) {
    console.log(id)
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {

getPost()
        })
}
/*-----------------------POST---------------------------*/
function addPost(event){
    event.preventDefault()

//console.log("sumbit")
 const  title= form.elements.title.value
 console.log(title)
   const body=form.elements.body.value
   const image=form.elements.image.value
   const owner=form.elements.owner.value
   console.log(owner)

   const bodyPost={
    title:title,
    body:body,
    image:image,
    owner:owner
}

   axios.post("https://vast-chamber-06347.herokuapp.com/api/posts",bodyPost)
.then(response=>{
    const data=response.data
    console.log(data)
getPost()

})
}

