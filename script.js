const listItemDiv = document.querySelector('.list-item')
const formAdd = document.querySelector('.form-add') 
getPosts()

//get
function getPosts(){
axios.get(`https://vast-chamber-06347.herokuapp.com/api/posts`)

.then(response => {
    const listItem = response.data
    // console.log(listItem)

    listItemDiv.innerHTML = ''

listItem.forEach(item => {
    const title = item.title
    const body = item.body
    const image = item.image
    const owner = item.owner
    const id = item._id

    console.log(listItem)
    const elements = `
<div class="elements">
  <div class="form">
    <h3>Title: <span>${title}</span></h3>
    <h4>Body: <span>${body}</span></h4>
    <img src="${image}" width=300px >
    <h4>Owner:<span>${owner}</span></h4>
    <button onclick="editPost(this)">Edit</button>
    <button onclick="deletePost('${id}')">Delete Post</button>
  </div>
    <form class="form-Edit">
    <label>Title:</label><input type="text" name="title">
    <br>
    <label>Body:</label><input type="text" name="body">
    <br>
    <label>image:</label><input type="url" name="image">
    <br>
    <label>Owner:</label><input type="text" name="owner">
    <br>
    <button onclick="deletePost('${id}')">Delete Post</button>
    <button onclick="confirmEdit(event , this ,'${id}')">Confirm</button>
    </form>
</div>`
    
   
    console.log(elements)
    listItemDiv.innerHTML += elements
    console.log(listItem)

    })
})
}
//put

function confirmEdit(e , confiemButton ,id){
    e.preventDefault()
   
    const form = confiemButton.parentElement
    
   
    const title = form.elements.title.value
    const body = form.elements.body.value
    const image = form.elements.image.value
    const owner = form.elements.owner.value
   
    const postBody = {
       title: title,
       body : body ,
       image: image,
       owner : owner
   }
   axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}` , postBody )
       .then(response => {
           getPosts()
       })
   
   
    }
function editPost(editButton){
   const form = editButton.parentElement.nextElementSibling
   form.style.display = 'inline'
//    form.style.color = 'red'

   const formEdit = editButton.parentElement
   formEdit.style.display = 'none'

    formEdit.style.color = 'blue'
   const title = formEdit.querySelector('h3 span').innerHTML
   const body = formEdit.querySelector('h4 span').innerHTML
   const image = formEdit.querySelector('img').src
   const owner = formEdit.querySelector('h4 span').innerHTML
    
   const titleIn = formEdit.elements.title.value
   const bodyIn = formEdit.elements.body.value
   const imageIn = formEdit.elements.image.value
   const ownerIn = formEdit.elements.owner.value

   titleIn.value = title
   bodyIn.value = body
   imageIn.value = image
   ownerIn.value = owner


}



//post

function addPosts(event){
    event.preventDefault()


const title = formAdd.elements.title.value
const body = formAdd.elements.body.value
const image = formAdd.elements.image.value
const owner = formAdd.elements.owner.value

const PostBody = {
    title : title ,
    body : body ,
    image : image ,
    owner : owner  
}

axios.post(`https://vast-chamber-06347.herokuapp.com/api/posts` , PostBody)
.then(response => {
    const data = response.data

    console.log(data)


})



}

//delete
function deletePost(id){
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
    .then(response => {
        
        
        getPosts()
        
    })
}

