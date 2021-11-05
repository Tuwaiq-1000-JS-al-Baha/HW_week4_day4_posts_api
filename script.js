const postsDiv = document.querySelector(".postsList")
const formAdd = document.querySelector(".form-add")

getposts()

function getposts() {
  axios.get("https://vast-chamber-06347.herokuapp.com/api/posts").then(response => {
    const posts = response.data
    console.log(posts)

    const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))
    console.log("post sorted:", postsSorted)

    postsDiv.innerHTML = ""

    postsSorted.forEach(post => {
      const title = post.title
      const body = post.body
      const image = post.image
      const owner = post.owner
      const id = post._id

      const postElement = `
            <div class="post-item">
                <div class="post-info">
                 <h2>Title:<span> ${title}</span></h2>
                 <br>
                 <h4>body: <span>${body}</span></h4>
                 <br>
                 <img src="${image}" width="200px">
                 <br>
                 <p class="owner-class">owner: <span>${owner}</span></p>
                 <br>
                 <button onclick="deletePost('${id}')">Delete post</button>
                 <button onclick="editPost(this)">Edit post</button>
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
                      <button onclick="deletepost('${id}')">Delete</button>
                      <button onclick="confirmEdit(event, this, '${id}')" class="confirmButton">Confirm</button>
                </form>
            </div>`
      postsDiv.innerHTML += postElement
    })
  })
}
console.log(confirmButton)
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
    getposts()
  })
}
function editPost(editButton) {
  const postForm = editButton.parentElement.nextElementSibling
  postForm.style.display = "inline"

  const postInfo = editButton.parentElement
  postInfo.style.display = "none"

  const title = postInfo.querySelector("h2 span").innerHTML
  const body = postInfo.querySelector("h4 span").innerHTML
  const owner = postInfo.querySelector(".owner-class span").innerHTML
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

function deletePost(id) {
  console.log(id)
  axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`).then(response => {
    getposts()
  })
}
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

  axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody).then(response => {
    const data = response.data
    console.log(data)
    getposts()
  })
}
