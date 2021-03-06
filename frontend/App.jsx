import React, {Component, Fragment} from 'react';
import Home from './Home';
import Profile from './Profile';
import Finance from './Finance';
import TopMenu from './TopMenu';
import CodeCamp from './CodeCamp';
import Dashboard from './Dashboard';
import AuthenticationModal from './AuthenticationModal';
import RegisterModal from './RegisterModal';

class App extends Component {

    constructor(props) {
        super(props);

        if($.cookie('layout') === undefined) {
            $.cookie('layout','home');
        }

        if($.cookie('authuser') === undefined) {
            $.cookie('authuser', 'anonymous');
            $.cookie('avatar', md5(Math.random().toString()));
        }

        this.state = {
            layout: $.cookie('layout'),
            user: $.cookie('authuser'),
            avatar: $.cookie('avatar'),
            token: $.cookie('authtoken')
        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAuthValidation = this.handleAuthValidation.bind(this);
        this.handleRevokeToken = this.handleRevokeToken.bind(this);
    }

    componentDidMount() {
        this.handleAuthValidation(function(){}, function(){});
    }

    handleRevokeToken() {
        var that = this;

        fetch('/oauth/token?token=' + that.state.token, {
            method: 'delete',
            headers: {
                'Authorization' : 'Basic bWFzdGVyOjEyMzQ1Ng==',
                'Accept' : 'application/json'
            }
        })
        .then(function(response) {
            if (response.status === 200) {
                $.removeCookie('authtoken');
                $.cookie('authuser', 'anonymous');
                $.cookie('avatar', md5(Math.random().toString()));

                that.setState({
                    user: 'anonymous',
                    avatar: $.cookie('avatar'),
                    token: undefined,
                    layout: 'home'
                });
            }

        });
    }

    handleStateChange(object, callback) {
        this.setState(object, callback);
    }

    handleAuthValidation(onSuccessCallback, onErrorCallback) {
        var that = this;

        if(this.state.token !== undefined && this.state.user !== 'anonymous') {
            fetch('/oauth/check_token?token=' + that.state.token, {
                method: 'post',
                headers: {
                    'Authorization' : 'Basic bWFzdGVyOjEyMzQ1Ng==',
                    'Accept' : 'application/json'
                }
            })
            .then(function(response) {
                if (response.status !== 200) {
                    $.removeCookie('authtoken');
                    $.cookie('authuser', 'anonymous');
                    $.cookie('avatar', md5(Math.random().toString()));

                    that.setState({
                        user: 'anonymous',
                        avatar: $.cookie('avatar'),
                        token: undefined
                    }, onErrorCallback());

                    return;
                }

                onSuccessCallback();
            });
        } else {
            onErrorCallback();
        }
    }

    render() {
        var layout = (<Fragment />);

        if(this.state.layout === 'home') {
            layout = (<Home
                parentStateCallback={this.handleStateChange}
                authCallback={this.handleAuthValidation}
                user={this.state.user}
                token={this.state.token}
                avatar={this.state.avatar}
            />);
        } else if(this.state.layout === 'profile') {
            layout = (<Profile
                parentStateCallback={this.handleStateChange}
                authCallback={this.handleAuthValidation}
                user={this.state.user}
                token={this.state.token}
                avatar={this.state.avatar}
            />);
        } else if(this.state.layout === 'finance') {
            layout = (<Finance
                parentStateCallback={this.handleStateChange}
                authCallback={this.handleAuthValidation}
                user={this.state.user}
                token={this.state.token}
                avatar={this.state.avatar}
            />);
        } else if(this.state.layout === 'codecamp') {
          layout = (<CodeCamp
              parentStateCallback={this.handleStateChange}
              authCallback={this.handleAuthValidation}
              user={this.state.user}
              token={this.state.token}
              avatar={this.state.avatar}
          />);
        } else if(this.state.layout === 'dashboard') {
          layout = (<Dashboard
              parentStateCallback={this.handleStateChange}
              authCallback={this.handleAuthValidation}
              user={this.state.user}
              token={this.state.token}
              avatar={this.state.avatar}
          />);
        }

        return (
            <Fragment>
              <TopMenu
                user={this.state.user}
                avatar={this.state.avatar}
                parentStateCallback={this.handleStateChange}
                signOut={this.handleRevokeToken}/>
              {layout}
              <AuthenticationModal parentStateCallback={this.handleStateChange} />
              <RegisterModal />
            </Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

export default App;