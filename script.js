const postDive = document.querySelector(".posts-list");
const form = document.querySelector(".addPost");

getposts();

function getposts() {
  axios
    .get("https://vast-chamber-06347.herokuapp.com/api/posts")
    .then(function (response) {
      const posts = response.data;
    

      postDive.innerHTML = "";
      posts.forEach(function (post) {
        const title = post.title;
        const body = post.body;
        const owner = post.owner;
        const image = post.image;
        const id = post._id;

        const postElement = `
        <div class="post-item">
        <div class="post-info">
        <h2>Title:<span>${title}</span></h2>
        <p class="body-class">Body:<span>${body}</span></p>
        <p class="owner-class">Owner:<span>${owner}</span></p>
        <img src="${image}" width="200px">
        
        <button onclick="deletePost('${id}')">Delete post</button>
        <button onclick="editPost(this)">Edit</button>
        </div>
        <form class="post-form">
        
        <label>Title:</label><input type="text" name="title">
        <br>
        <label>Body:</label><input type="text" name="body">
        <br>
        <label>owner:</label><input type="number" name="owner">
        <br>
        <label>Image:</label><input type="url" name="image">
        <br>
        <button onclick="deletePost('${id}')">Delete post</button>
        <button onclick="confirmEdit(event, this,'${id}')">confirm</button>
        </form>
        </div>`;
        postDive.innerHTML += postElement;
      });
    });
}


function editPost(editButton) {
  const postForm = editButton.parentElement.nextElementSibling;
  console.log(postForm );
  postForm.style.display = "inline";

  const postinfo = editButton.parentElement;
  postinfo.style.display = "none";

  const title = postinfo.querySelector("h2 span").innerHTML;
  const body = postinfo.querySelector(".body-class span").innerHTML;
  const owner = postinfo.querySelector(".owner-class span").innerHTML;
  const image = postinfo.querySelector("img").src;

  const titleInput = postForm.elements.title;
  const bodyInput = postForm.elements.body;
  const ownerInput = postForm.elements.owner;
  const imageInput = postForm.elements.image;

  titleInput.value = title;
  bodyInput.value = body;
  ownerInput.value = owner;
  imageInput.value = image;
}

function confirmEdit(event, confirmButton, id) {
  event.preventDefault();
  const postForm = confirmButton.parentElement;

  const title = postForm.elements.title.value;
  const body = postForm.elements.body.value;
  const owner = postForm.elements.owner.value;
  const image = postForm.elements.image.value;

  const postBody = {
    title : title,
    body : body,
    owner : owner,
    image : image,
  };

  axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postBody)
  .then((response) => {
    getposts();
  });
}

function addPost(event) {
  event.preventDefault();
  console.log("submit");
  const title = form.elements.title.value;
  const body = form.elements.body.value;
  const owner = form.elements.owner.value;
  const image = form.elements.image.value;

  const postBody = {
    title: title,
    body: body,
    owner: owner,
    image: image,
  };
  axios
    .post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody)
    .then((response) => {
      
      getposts();
    });
}
