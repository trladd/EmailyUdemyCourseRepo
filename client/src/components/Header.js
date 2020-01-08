import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import M from "materialize-css/dist/js/materialize.min.js";

class Header extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 500, 
            outDuration: 1000
        });
    }

    renderAuthContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (<li><a href='/auth/google'>Login With Google</a></li>);
    
            default:
                return [
                <li key="1"><Payments /></li>,
                <li key="2" style={{ margin: '0 10px'}}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="3"><a href='/api/logout'>Logout</a></li>
                
                
            ];
        }
    }

    /**
     * Renders content that will display in the header regardless of authentication status
     */
    renderCommonContent() {
        return [
            <li key="about"><Link to='/about'>About</Link></li>
        ];
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <nav>
                    <div className="nav-wrapper deep-orange darken-4 z-depth-3">
                        <Link 
                        to={this.props.auth ? '/surveys' : '/'}
                        className="brand-logo"
                        >
                            Emaily
                        </Link>
                        <a href="#" data-target="mobileTray" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            {this.renderCommonContent()}
                            {this.renderAuthContent()}
                        </ul>
                        
                    </div>
                </nav>
                <ul className="sidenav" id="mobileTray">
                    {this.renderCommonContent()}
                    {this.renderAuthContent()}
                </ul>
            </div>
           
        )
    }
}

function mapStateToProps({auth}){
    return { auth};
}

export default connect(mapStateToProps)(Header);