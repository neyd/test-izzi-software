import React from 'react'
import store from './redux'
import { Form, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const EntryButton = ({usId}) => {
    const history = useHistory()
    
    const logIn = () => {
        store.dispatch({type: "SET_AUTH_USER", user: usId})
        history.push('/')
    }
    return(
        <Button variant="primary" type="button" onClick={logIn}>
            Submit
        </Button>
    )
}

class Entry extends React.Component {
    constructor(props){
        super(props)
        this.selectUser = this.selectUser.bind(this)
        this.state = { 
            users: store.getState().users,
            choosenUser: 1
        }
    }
    componentDidMount(){
        // set subscription for users changes
        store.subscribe(() => {
            const users = store.getState().users
            if (users!==this.state.users){
                console.log(users)
                this.setState({
                    users: users
                })
            }
          })
    }

    selectUser = inp => {
        this.setState({
            choosenUser: inp.target.value
        })
    }

    render() {
        return(
            <Card style={{width: '18em'}} className="mx-auto my-5">
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <Form.Label>Select auth user</Form.Label>
                            <Form.Control as="select" size="sm" custom onChange={this.selectUser}>
                                {this.state.users && this.state.users.map(one => {
                                    return(<option key={one.id} value={one.id}>{one.name}</option>)
                                })}
                            </Form.Control>
                        </Form.Group>
                        <EntryButton usId={this.state.choosenUser}/>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Entry