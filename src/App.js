import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entry from './Entry';
import Header from './components/Header'
import store from './redux';
import LoadData from './helpers/LoadData';
import Home from './Pages/Home';
import PostProfileView from './Pages/PostProfile';

const Body = ({user}) => {
  return(
    <div className="body">
      { user==null ? <Entry/> : (
          <Switch>
            <Route path="/post/:postId" component={PostProfileView} />
            <Route path="/" component={Home}/>
          </Switch>
      )}
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: store.getState().user
    }
  }
  componentDidMount(){

    //subscribtion to check user changes
    store.subscribe(() => {
      const authUser = store.getState().authUser
      if (authUser!==this.state.user){
        this.setState({
          user: store.getState().authUserData.name
        })
      }
    })

    //get users from api
    LoadData((users) => {
      store.dispatch({type: "SET_IMPORTED_USERS", users})
    }, 'users')

  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header user={this.state.user}/>
          <Body user={this.state.user}/>
        </Router>
      </div>
    );
  }
}

export default App;
