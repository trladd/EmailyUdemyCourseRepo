import React, {Component} from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (<li><a href='/auth/google'>Login With Google</a></li>);
    
            default:
                return (<li><a href='/api/logout'>Logout</a></li>);
        }
    }

    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper deep-orange darken-4 z-depth-3">
                    <a href = '/' className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}){
    return { auth};
}

export default connect(mapStateToProps)(Header);