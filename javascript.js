const posts = document.querySelector(".allPosts")
const form = document.querySelector(".addform")

getPosts()

function getPosts(){
axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
.then(function (response) {
    const items = response.data

    posts.innerHTML = ""

    items.forEach(function (item) {


    const title = item.title
    const body = item.body
    const owner = item.owner
    const image = item.image
    const id = item._id



    const allElements = `
    <div>
    <div class="forminfo">
    <h3 class="title-class">The Title is : <span>${title}</span></h3>
    <h3 class="body-class">The Body is : <span>${body}</span></h3>
    <h3 class="owner-class">The Owner is : <span>${owner}</span></h3>
    <img src="${image}" height="300px" width="300px">
    <br>
    <button onclick="btndelete('${id}')">Delete </button>
    <button onclick="btnedit(this)">Edit </button>
    </div>
    <form onsubmit="btnedit(event)" class="editform">
    <label>Title: </label><input type="text" name="title">
    <br>
    <label>Body: </label><input type="text" name="body">
    <br>
    <label>Owner: </label><input type="text" name="owner">
    <br>
    <label>Image: </label><input type="url" name="image">
    <br>
    <button onclick="btndelete('${id}')">Delete </button>
    <br>
    <button onclick="btnconfirm(event,this,'${id}')">confirm</button>
    </div>
    `

    posts.innerHTML += allElements
})
})
}
function btnadd(event){
    event.preventDefault()

    const title = form.elements.title.value
    const body = form.elements.body.value
    const owner = form.elements.owner.value
    const image = form.elements.image.value

    const postsBody = {
        title : title ,
        body : body ,
        owner : owner ,
        image : image
    }

    axios.post("https://vast-chamber-06347.herokuapp.com/api/posts" , postsBody)
    .then(function (response) {
        getPosts()
    })


}

function btndelete(id) {
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
    .then(function (response) {
        getPosts()
    })
}

function btnedit(edit) {
    const formedit = edit.parentElement.nextElementSibling
    console.log(formedit)
    formedit.style.display = "inline"
    const forminfo = edit.parentElement
    forminfo.style.display = "none"

    const title = forminfo.querySelector(".title-class span").innerHTML
    const body = forminfo.querySelector(".body-class span").innerHTML
    const owner = forminfo.querySelector(".owner-class span").innerHTML
    const image = forminfo.querySelector("img").src


    const inputtitle = formedit.elements.title
    const inputbody = formedit.elements.body
    const inputowner = formedit.elements.owner
    const inputimage= formedit.elements.image


    inputtitle.value = title
    inputbody.value = body
    inputowner.value = owner
    inputimage.value = image 

}
function btnconfirm (event , confirm , id){
    event.preventDefault()

    const btnConfirm = confirm.parentElement

    const title = btnConfirm.elements.title.value
    const body = btnConfirm.elements.body.value  
    const owner = btnConfirm.elements.owner.value
    const image = btnConfirm.elements.image.value


    const postBody = {
        title : title ,
        body : body ,
        owner : owner ,
        image : image
    }
    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}` , postBody)
    .then(function (response) {
        getPosts()
    })
}