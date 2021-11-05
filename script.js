const postsDiv = document.querySelector(".posts-list")
const formAdd = document.querySelector(".form-add")
///////////get post///////////
getPosts()
function getPosts(){
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
    .then(res => {
        const posts= res.data

         const postsStor = posts.sort((productA, productB) =>
         productB.dateCreated.localeCompare(productA.dateCreated) )
         ////
         postsDiv.innerHTML = ""
         ///
          postsStor.forEach(post => {
          const title = post.title
          const body = post.body
          const image = post.image
          const owner = post.owner
          const id = post._id
          const postsElement = `
          
          <div class="card post-info" style="width: 18rem;">
          <img src="${image}" class="card-img-top" alt="...">
           <div class="card-body">
            <h5 class="card-title"> Title: <span>${title}</span></h5>
            <p class="card-text"><span>${body}</span></p>
            <a href="#" class="btn btn-primary">owner: <span>${owner}</span></a>
            <button onclick="deletePost('${id}')"> Delete posts </buton>
            <button onclick="editPost(this)">Edit</button>
           </div>
          
            <form class="post-form">
            <label >title</label><input type="text" name="title">
            <br>
            <label >body:</label><input type="text" name="body">
            <br>
            <Label>iamge:</Label><input type="url" name="image">
            <br>
            <label >owner:</label><input type="text" name="owner">
            <br>
            <button onclick="deletePost('${id}')"> Delete posts </buton>
            <button onclick="confirmEdit(event,this,'${id}')">confirm post</button>
            </form>
            <!---->
            </div>`
            
            
            
       postsDiv.innerHTML += postsElement
        
        
    })
  })
}

/////////////////confirmmmm//////////////
function confirmEdit(event, confirmButton, id) {
  event.preventDefault()
  const postForm = confirmButton.parentElement
  const title = postForm.elements.title.value
  const body = postForm.elements.body.value
  const image = postForm.elements.image.value
  const owner = postForm.elements.owner.value


  const postBody ={
    title: title,
    body: body,
    image: image,
    owner:owner,
  }

  axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
  .then(res =>{
    getPosts()
  } )
}
/////editPost/////
function editPost(editButton){
const postForm = editButton.parentElement.nextElementSibling
console.log(postForm)
postForm.style.display = "inline"

const postInfo =editButton.parentElement
console.log(postInfo)
///
postInfo.style.display = "none"

const title = postInfo.querySelector("h5 span").innerHTML
const body = postInfo.querySelector(" p span").innerHTML
const owner = postInfo.querySelector("a ").innerHTML
const image = postInfo.querySelector(".card-img-top img").src
///console.log(iamge)


const titleInput = postForm.elements.title
const bodyInput = postForm.elements.body  
const imageInput = postForm.elements.iamge
const ownerInput = postForm.elements.owner

titleInput.value = title
bodyInput.value = body
imageInput.value = image
ownerInput.value= owner


}




////////////delete/////
function deletePost(id){
  console.log(id)
  axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
  .then(res =>{
    getPosts()
  })
}



////////// post add//////
function addPost(event){
  event.preventDefault()
  
  const title = formAdd.elements.title.value
  const body = formAdd.elements.body.value
  const image = formAdd.elements.image.value
  const owner = formAdd.elements.owner.value

  const postBody = {
    title  : title,
    body : body,
    image : image ,
    owner : owner,
  }

  axios.post("https://vast-chamber-06347.herokuapp.com/api/posts",postBody)
  .then(response =>{
    const data = response.data
   
    getPosts()
  })
}