const postsDiv = document.querySelector(".posts-list")
const formAdd = document.querySelector(".form-add")
// const commentsDiv = document.querySelector(".comments-list")
// const commentAdd = document.querySelector(".comments-add")

getPosts()
function getPosts() {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
        .then(response => {
            const posts = response.data // تعطينا جميع البيانات في posts


            const postsSorted = posts.sort((postA, postB) => postB.dateCreated.localeCompare(postA.dateCreated))

            postsDiv.innerHTML = ""

            postsSorted.forEach(post => {
                // const allComments = post.comments
                // // console.log(allComments)


                // allComments.forEach(comments => {
                //     const titleComment = comments.comment
                //     const ownerComment = comments.owner
                //     const idComment = comments._id
                //     const postId = comments.postId

                //     commentsDiv.innerHTML = ""
                //     const commentElement = `
                //                 <div class="div-item">
                //                 <div class="comment-div">
                //                 <h3>Comment:</h3>
                //                 <h5 class="h5-titleComment"><span>${titleComment}</span></h5>
                //                 <br>
                //                 <h5 class="h5-ownerComment"><span>${ownerComment}</span></h5>
                //                 <button onclick="editBtnComment(this,'${idComment}')">Edit</button>
                //                 <button onclick="deleteBtnComment('${postId}','${idComment}')">Delete</button>
                //                 </div>
                //                 <form class="comment-form">
                //                 <label>Comment:</label><input type="text" name="titleComment">
                //                 <br>
                //                 <label>Owner:</label><input type="text" name="ownerComment">
                //                <button onclick="confirmEditComment(event, this,'${postId}' ,'${idComment}')">confirm</button>
                //                <button onclick="deleteBtnComment('${idComment}')">Delete</button>
                //                </form>
                //                </div>`

                //     commentsDiv.innerHTML += commentElement
                // })



                const title = post.title
                const body = post.body
                const image = post.image
                const owner = post.owner
                const id = post._id

                const postElement = `
                <div class="post-item">
                <div class="post-info"> 
                <h3 class="h3-title"><span>${title}</span></h3>
                <br>
                <h3 class="h3-body"><span>${body}</span></h3>
                <br>
                <img src="${image}" width="200px">
                <br>
                <p><span>${owner}</span></p>
                <button onclick="editBtn(this)">Edit</button>
                <button onclick="deleteBtn(event,'${id}')">Delete</button>
                </div>
                <form class="post-form">
                <label>Title:</label><input type="text" name="title">
                <br>
                <label>Body:</label><input type="text" name="body">
                <br>
                <label>Image:</label><input type="url" name="image">
                <br>
                <label>Owner:</label><input type="text" name="owner">
                <br>
                <button onclick="confirmEdit(event, this, '${id}')">confirm</button>
                <button onclick="deleteBtn(event,'${id}')">Delete</button>
                </form>
                </div>`

                postsDiv.innerHTML += postElement
            })

        })
}

function addPosts(event) {
    event.preventDefault() // عشان ماتتحدث الصفحة

    const title = formAdd.elements.title.value
    const body = formAdd.elements.body.value
    const image = formAdd.elements.image.value
    const owner = formAdd.elements.owner.value


    const postbody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }

    axios.post(`https://vast-chamber-06347.herokuapp.com/api/posts`, postbody)
        .then(response => {
            const data = response.data
            getPosts()

        })


}

function editBtn(editButton) {

    const postForm = editButton.parentElement.nextElementSibling
    postForm.style.display = "inline"

    const postInfo = editButton.parentElement
    postInfo.style.display = "none"
    // console.log(postForm)

    // post-info 
    const title = document.querySelector(".h3-title span").innerHTML
    const body = document.querySelector(".h3-body span").innerHTML
    const image = document.querySelector("img").src
    const owner = document.querySelector("p span").innerHTML
    // const titleComment = document.querySelector(".h5-titleComment span").innerHTML
    // const ownerComment = document.querySelector(".h5-ownerComment span").innerHTML

    //post-form
    // const titleCommentInput = postForm.elements.comment
    // const ownerCommentInput = postForm.elements.ownerComment
    const titleInput = postForm.elements.title
    const bodyInput = postForm.elements.body
    const imageInput = postForm.elements.image
    const ownerInput = postForm.elements.owner

    // titleCommentInput.value = titleComment
    // ownerCommentInput.value = ownerComment
    titleInput.value = title
    bodyInput.value = body
    imageInput.value = image
    ownerInput.value = owner
}

function confirmEdit(event, confirmEdit, id) {
    event.preventDefault()

    const postForm = confirmEdit.parentElement

    const title = postForm.elements.title.value
    const body = postForm.elements.body.value
    const image = postForm.elements.image.value
    const owner = postForm.elements.owner.value

    const postbody = {
        title: title,
        body: body,
        image: image,
        owner: owner
    }

    axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`, postbody)
        .then(response => {
            getPosts()

        })
}

function deleteBtn(event, id) {
    event.preventDefault() //    لان اذا سويت تعديل وجيت بحذف تتحدث الصفحه  event
    axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${id}`)
        .then(response => {
            getPosts()

        })

}

//comments

// function editBtnComment(editBtnComment) {

//     const commentForm = editBtnComment.parentElement.nextElementSibling
//     commentForm.style.display = "inline"

//     const commentInfo = editBtnComment.parentElement
//     commentInfo.style.display = "none"

//     const titleComment = document.querySelector(".h5-titleComment span").innerHTML
//     const ownerComment = document.querySelector(".h5-ownerComment span").innerHTML

//     const titleCommentInput = commentForm.elements.titleComment
//     const ownerCommentInput = commentForm.elements.ownerComment

//     titleCommentInput.value = titleComment
//     ownerCommentInput.value = ownerComment


// }

// function addComments(event, postId) {
//     event.preventDefault()

//     const titleComment = commentAdd.elements.titleComment.value
//     const ownerComment = commentAdd.elements.ownerComment.value


//     const commentbody = {
//         comments: [{
//             titleComment: titleComment,
//             ownerComment: ownerComment
//         }]
//     }
//     axios.post(`https://vast-chamber-06347.herokuapp.com/api/posts/${postId}/comment`, commentbody)
//         .then(response => {
//             getPosts()

//         })
// }

// function confirmEditComment(event, confirmEditComment, postId, idComment) {
//     event.preventDefault()

//     const commentForm = confirmEditComment.parentElement

//     const titleComment = commentForm.elements.titleComment.value
//     const ownerComment = commentForm.elements.ownerComment.value

//     const commentbody = {
//         comments: [{
//             titleComment: titleComment,
//             ownerComment: ownerComment
//         }]
//     }
//     axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${postId}/comment/${idComment}`, commentbody)
//         .then(response => {
//             getPosts()

//         })
// }

// function deleteBtnComment(postId, idComment) {
//     axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${postId}/comment/${idComment}`)
//         .then(response => {
//             const post = response.data.comments
//             getPosts()

//         })
// }
