const postDiv = document.querySelector(".post-list")
const form = document.querySelector(".form")

getposts()

function getposts() {
  axios
    .get("https://vast-chamber-06347.herokuapp.com/api/posts")

    .then(response => {
      const posts = response.data

      const postSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))

      // console.log(posts)// here i get hol postsاستخرجت كل البوست
      postDiv.innerHTML = ""

      posts.forEach(post => {
        //  const _id = post._id
        const title = post.title
        const body = post.body
        const image = post.image
        const owner = post.owner
        const dateCreated = posts.dateCreated

        //console.log(owner) to be shoreعشان اتاكد
        const id = post._id
        console.log(id)
        const postElement = `
      <div class="post">
     <divclass="post-info"> 
      <h2> Title:<span>${title}</span></h2>
      <h4>Body:<span>${body}</span></h4>
      <img src="${image}" width="200px">
      <p> Owner:<span>${owner}</span></p>
      //<button onclick="deletepost('${id}')">Delete product</button>
      <button onclick="aditPpst(this)">Edit</button>
      
     </div>

     <form class="post-form"> 
     <label>Id</label> <input type="text" name="id">
     <br>
     <label>Title</label><input type="text" name="title">
     <br>
     <label>Image</label><input type="url" name="image">
     <br>
     <label>Body</label> <input type="text" name="body">
     <br>
     <label>owner</label><input type="text" name="owner">
    <br>
    <button onclick="deletepost('${id}')">Delete post</button>

         <button onclick="confirm(event, this,'${id}')">Confirm</button>
         </form>

      
      </div>
      `
        postDiv.innerHTML += postElement
      })
    })
}
function confirm(event, confirmButton, id) {
  event.preventDefault()
  const postForm = confirmButton.parentElement

  const title = postForm.elements.title.value //////حصلنا المتغيراااااات هناااااااا
  const image = postForm.elements.image.value
  const body = postForm.elements.body.value
  const owner = postForm.elements.owner.value

  const postBody = {
    // id: id,
    title: title,
    image: image,
    body: body,
    owner: owner,
  }
  axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody).then(response => {
    const data = response.data
  })
  function addPost(event) {
    event.preventDefault()
  }

  function aditpost(editButton) {
    const postForm = editButton.postElement.nextElementSibling
    postForm.style.display = "inline"

    const postInfo = editButton.postElement
    postInfo.style.display = "none"

    const title = postInfo.querySelector("h2 span").innerHTML

    const image = postInfo.querySelector("img").src
    const owner = postInfo.querySelector("p span").innerHTML
    const body = postInfo.querySelector("h4 span").innerHTML

    const titleInput = postForm.elements.title
    const imageInput = postForm.elements.image
    const bodyInput = productForm.elements.body
    const ownerInput = productForm.elements.owner
    
     titleInput.value=title
     imageInput.value=image
     bodyInput.value=body
     ownerInput.value=owner
  }
  function deletepost(id){
    console.log(id)

   
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody).then(response => {
      const data = response.data
    
  } )

  }
  function addPost(event){

    event.postDefault()
     const id = form.elements.id.value
     const title = form.elements.title.value //////حصلنا المتغيراااااات هناااااااا
     const image = form.elements.image.value
    const body = form.elements.body.value
     const owner = form.elements.owner.value

    // console.log(id)

    const postBody = {
      // id: id,
      title: title,
      image: image,
      body: body,
      owner: owner,
    } //////نصنع البدي هنا بعد ماحصلنا المتغيرات

    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody).then(response => {
      const data = response.data

      console.log(data)
      getposts()
    })
    //.catch(error=>console.log(error.response.data))
  }

  //function click1(button) {
  //console.log(button)
  //

}

