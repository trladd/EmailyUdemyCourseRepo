import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";

class Header extends Component {
    
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 500, 
            outDuration: 1000
        });
        const modalOptions = {
            onOpenStart: () => {
              console.log("Open Start");
            },
            onOpenEnd: () => {
              console.log("Open End");
            },
            onCloseStart: () => {
              console.log("Close Start");
            },
            onCloseEnd: () => {
              console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, modalOptions);
    }

    renderAccountImage(){
      if(this.props.auth.profileImageURL){
        return(
          <img src={this.props.auth.profileImageURL} className="circle" style={{height: "40px", width: "40px",position:"relative", top:"12px", right:"5px"}}></img>
        );
      }
      else{
        return(
          <i className="material-icons">account_box</i>
        );
      }
    }

    renderAuthContent(headerType) {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (<li><a
                    className="waves-effect waves-light btn blue modal-trigger"
                    data-target="modal1"
                  >
                    Login
                  </a></li>);
    
            default:
                return [
                
                <li key="2" style={{ margin: '0 10px'}}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="3"><a href='/api/logout'>Logout</a></li>,
        <li key="44"><Link to='/account'>{this.renderAccountImage()}Account</Link></li>
                
                
            ];
        }
    }

    /**
     * Renders content that will display in the header regardless of authentication status
     */
    renderCommonContent(headerType) {
        return [
            <li key="about"><Link to='/about'>About</Link></li>
        ];
    }

    render() {
        console.log(this.props);
        return (
            <div>
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
                                {this.renderCommonContent("bar")}
                                {this.renderAuthContent("bar")}
                            </ul>
                            
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobileTray">
                        {this.renderCommonContent("tray")}
                        {this.renderAuthContent("tray")}
                    </ul>
                </div>
                <div>
                
        

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
        bottom-sheet class */}
          <div className="modal-content"  style={{textAlign: 'center'}}>
              <ul>
                  <li>
                    <a className ="waves-effect btn-flat blue center white-text" href="/auth/google">Login with Google</a>
                  </li>
                  <br></br>
                  <li>
                    <button className ="waves-effect btn-flat blue center white-text" href="/auth/linkedin">Login with LinkedIn</button>
                  </li>
              </ul>
            
            
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-white btn-flat">
              Close
            </a>
          </div>
        </div>
      
                </div>
            </div>
            
           
        )
    }
}

function mapStateToProps({auth}){
    return { auth};
}

export default connect(mapStateToProps)(Header);