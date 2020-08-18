import React, { useState } from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import store from '../redux'
import LoadData from '../helpers/LoadData'
import { useHistory } from 'react-router-dom'
import { AddingModal, EditModal } from '../components/Modals'
import { removePost } from '../helpers/ApiRequests'

const OnePost = ({post, withBody=true, setEditModal}) => {
    const history = useHistory()

    const openPostProfile = () => {
        history.push(`/post/${post.id}`)
    }

    return(
            <Card className="my-1" style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{store.getState().users.find(u=>u.id === post.userId).name}</Card.Subtitle>
                    {withBody && (<Card.Text>
                        {post.body}
                    </Card.Text>)}
                    <Card.Link onClick={openPostProfile}>View</Card.Link>
                    <Card.Link onClick={()=>{setEditModal(true, post.id)}}>Edit</Card.Link>
                    <Card.Link onClick={()=>{removePost(post.id)}}>Remove</Card.Link>
                </Card.Body>
            </Card>
    )
}

const AllNews = ({posts, setEditModal}) => {
    return(
        <Col md="7">
            <Row className="h3">
                News
            </Row>
            <Row style={{width: '100%',maxHeight: '82vh', overflow: 'scroll'}}>
                {posts && posts.sort((a,b) => a.id > b.id ? -1 : 1).map(post => {
                    return (<OnePost key={post.id} post={post} setEditModal={setEditModal}/>)
                })}
            </Row>
        </Col>
    )
}

const MyProfile = ({user, news, setModalShow, setEditModal}) => {
    return(
        <Col md="4">
            <Row className="w-100">
                <Card className="w-100">
                    <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_173fd187153%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_173fd187153%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.0078125%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                    <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                        <Row className="mx-auto">
                            <Button variant="success" className="ml-2" onClick={()=>{setModalShow(true)}}>Add</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="py-2 h4">
                My resent news
            </Row>
            <Row style={{width: '100%',maxHeight: '30vh', overflow: 'scroll'}}>
                {news && news.filter(n=>n.userId === user.id).sort((a,b) => a.id > b.id ? -1 : 1).map(post => {
                    return (<OnePost key={post.id} post={post} withBody={false} setEditModal={setEditModal}/>)
                })}
            </Row>
        </Col>
    )
}

class Home extends React.Component {
    constructor(props){
        super(props)
        this.setModalShow = this.setModalShow.bind(this)
        this.setEditModal = this.setEditModal.bind(this)
        this.state = {
            news: store.getState().news,
            modalShow: false,
            modalEdit: false,
            editPost: []
        }
    }
    componentDidMount(){
        //subscribtion to check news changes
        store.subscribe(() => {
            const news = store.getState().news
            if (news!==this.state.news){
                this.setState({
                    news: news
                })
            }
        })
    
        //get news from api
        LoadData((news) => {
            store.dispatch({type: "SET_IMPORTED_NEWS", news})
        }, 'posts')
    }
    setModalShow = (bool) => {
        this.setState({modalShow: bool})
    }
    setEditModal = (bool, id=0) => {
        console.log(store.getState().news.find(n => n.id == id))
        this.setState({
            modalEdit: bool,
            editPost: id == 0 ? [] : store.getState().news.find(n => n.id == id)
        })
    }
    render(){
        return(
            <Container className="lg">
                <Row className="w-100">
                    <MyProfile 
                        news={this.state.news} 
                        user={store.getState().authUserData} 
                        setModalShow={this.setModalShow}
                        setEditModal={this.setEditModal}
                    />
                    <Col md="auto"></Col>
                    <AllNews 
                        posts={this.state.news}
                        setEditModal={this.setEditModal}
                    />
                    <AddingModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow(false)}
                        userId={store.getState().authUserData.id}
                    />
                    <EditModal
                        show={this.state.modalEdit}
                        onHide={() => this.setEditModal(false)}
                        post={this.state.editPost}
                        userId={store.getState().authUserData.id}
                    />
                </Row>
            </Container>
        )
    }
}

export default Home