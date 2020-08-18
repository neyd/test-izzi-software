import React, { useState } from 'react'
import { addPost, editPost } from '../helpers/ApiRequests'
import { Modal, Form, Button } from 'react-bootstrap'
import store from '../redux'

const AddingModal = ({show, onHide, userId}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const addNewPost = () => {
        console.log(title)
        console.log(body)
        title!="" && body!="" 
        ? addPost(title, body, userId)
        : alert('Fill all inputs')
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onKeyDown={(e)=> {setTitle(e.target.value)}} />
                    </Form.Group>
                    <Form.Group controlId="formBasicBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control type="text" placeholder="Enter body" onKeyDown={(e)=> {setBody(e.target.value)}} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button variant="success" type="button" onClick={()=> {
                    addNewPost()
                    onHide()
                }}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>
    )
}

const EditModal = ({show, onHide, post}) => {
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)

    const editPostHandle = () => {
        console.log(title)
        console.log(body)
        title!="" && body!="" 
        ? editPost(post.id, title, body, post.userId)
        : alert('Fill all inputs')
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder={post.title} onKeyDown={(e)=> {setTitle(e.target.value)}} defaultValue={post.title} />
                    </Form.Group>
                    <Form.Group controlId="formBasicBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control type="text" placeholder={post.body} onKeyDown={(e)=> {setBody(e.target.value)}} defaultValue={post.body}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button variant="success" type="button" onClick={()=> {
                    editPostHandle()
                    onHide()
                }}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>
    )
}

export {
    AddingModal,
    EditModal
}