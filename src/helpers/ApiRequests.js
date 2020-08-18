import store from "../redux"

function addPost(title, body, userId){
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
      store.dispatch({type: "ADD_NEW_POST", post: json})
    })
}

function editPost(id, title, body, userId){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
      body,
      userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    store.dispatch({type: "EDIT_POST", post: json})
  })
}

function removePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then(success => {
        store.dispatch({type: "REMOVE_POST", post: id})
        console.log(success)
    })
}

export {
    addPost,
    editPost,
    removePost
}