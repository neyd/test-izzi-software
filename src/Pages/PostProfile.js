import React from 'react'
import store from '../redux'
import { Card, Container, Row, Toast } from 'react-bootstrap'
import LoadData from '../helpers/LoadData'

const Comment = ({comment}) => {
    return(
        <Row className="w-100 my-1">
            <Toast className="mx-auto">
                <Toast.Header>
                <strong className="mr-auto">{comment.name}</strong>
                <small>{comment.email}</small>
                </Toast.Header>
                <Toast.Body>{comment.body}</Toast.Body>
            </Toast>
        </Row>
    )
}

class PostProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post: store.getState().news.find(n => n.id == this.props.postId),
            comments: []
        }
    }
    componentDidMount(){
        //get post from api
        // LoadData((post) => {
        //     this.setState({
        //         post: post
        //     })
        // }, `posts/${this.props.postId}`)

        //get comments from api
        LoadData((comments) => {
            this.setState({
                comments: comments.filter(c=> c.postId == this.props.postId)
            })
        }, `comments`)
    }

    render(){
        return this.state.post!=null 
                ? (<Container>
                        <Card className="my-1" style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>{this.state.post.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{store.getState().users.find(u=>u.id === this.state.post.userId).name}</Card.Subtitle>
                                <Card.Text>
                                {this.state.post.body}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Row className="py-1"/>
                        <Row style={{maxHeight: '65vh', overflow: 'scroll'}}>
                            {this.state.comments && this.state.comments.map(co => {
                                return (<Comment comment={co}/>)
                            })}
                        </Row>
                    </Container>)
                : <div>Loading</div>
    }
}

function PostProfileView({ match }) {
    let { postId } = match.params;
    return(
        <PostProfile postId={postId}/>
    );
}

export default PostProfileView