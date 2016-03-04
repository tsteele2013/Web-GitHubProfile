import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'tsteele2013',
      userData: [],
      userRepos: [],
      perPage: 5
    }
  }

  //Get user data from GitHub
  getUserData(){
    $.ajax({
      url: 'https://api.GitHub.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userData: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({username: null});
        alert(err);
      }.bind(this)
    });
  }

  //Get user repos from GitHub
  getUserRepos(){
    $.ajax({
      url: 'https://api.GitHub.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'sort=created',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userRepos: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({userName: null});
        alert(err);
      }.bind(this)
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
      <div>
        <Profile {...this.state} />
      </div>
    )
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '75182a1fb3eba2deb834',
  clientSecret: '9367533b89e8bb6b2b56d58d6281fd91e49aa480'
};

export default App
