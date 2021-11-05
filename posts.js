const formAdd = document.querySelector(".formAdd")
const postsDiv = document.querySelector(".PostList")

getPosts()

////////////////////////////دالة get
function getPosts() {
  axios.get("https://vast-chamber-06347.herokuapp.com/api/posts").then(response => {
    const posts = response.data

    const postsSorteds = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
    // console.log("posts sorted:",postsSorteds)
    postsDiv.innerHTML = ""

    postsSorteds.forEach(post => {
      const title = post.title
      const body = post.body
      const image = post.image
      const owner = post.owner
      const id = post._id
      const postsElement = `
 <div class ="post-item">
      <div class="post-info">
          <h2> title :<span>${title}</span></h2>
          <h4> body :<span>${body}</span></h4>
          <img src="${image}" height="200px">
          <p >owner:<span>${owner}</span></p>
        
          <button onclick="deletePost('${id}')"> Delete post </buton>
          <button onclick="editPost(this)">Edit</button>
      </div>
          <form class ="post-form">
          <label>Title:</label><input type="text" name="title">
          <br>
          <label>Body:</label><input type="text" name="body">
          <br>
          <label>Owner:</label><input type="number" name="owner">
          <br>
          <label>Image:</label><input type="url" name="image">
          <br>
          <button onclick="deletePost('${id}')"> Delete post </buton>
          <button onclick="confirmEdit(event,this,'${id}')">  Confirm </buton>
          </form>
</div>
 `
      postsDiv.innerHTML += postsElement
    })
  })
}

////////////////////////////التعديل تاكيد//////////////////////
function confirmEdit(event, confirmButton, id) {
  event.preventDefault()

  const postForm = confirmButton.parentElement

  const title = postForm.elements.title.value
  const body = postForm.elements.body.value
  const owner = postForm.elements.owner.value
  const image = postForm.elements.image.value

  const postBody = {
    title: title,
    body: body,
    owner: owner,
    image: image,
  }

  axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody).then(response => {
    getPosts()
  })
}

//////////////////////////////////تعديل///////////////////////////////////
function editPost(editButton) {
  const postForm = editButton.parentElement.nextElementSibling
  console.log(postForm)
  postForm.style.display = "inline"

  const postInfo = editButton.parentElement
  postInfo.style.display = "none"

  const title = postInfo.querySelector("h2 span").innerHTML
  const body = postInfo.querySelector("h4 span").innerHTML
  const owner = postInfo.querySelector("p span").innerHTML
  const image = postInfo.querySelector("img").src

  const titleInput = postForm.elements.title
  const bodyInput = postForm.elements.body
  const ownerInput = postForm.elements.owner
  const imageInput = postForm.elements.image
  

  titleInput.value = title
  bodyInput.value = body
  ownerInput.value = owner
   imageInput.value = image
}

///////////////////الحذف ////////////////////////
function deletePost(id) {
  console.log(id)
  axios
    .delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
    .then(response => {
      getPosts()
    })
}
//////////////////////////////الاضافه////////////////////////////////

function addPost(event) {
    event.preventDefault()
  
    const title = formAdd.elements.title.value
    const body = formAdd.elements.body.value
    const owner = formAdd.elements.owner.value
    const image = formAdd.elements.image.value
   
  
    const postBody = {
      title: title,
      body: body,
      owner: owner,
      image: image,
      }
    axios
      .post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
      .then(response => {
        const post = response.data
        console.log(post)
        getProducts()
      })
  }
  
