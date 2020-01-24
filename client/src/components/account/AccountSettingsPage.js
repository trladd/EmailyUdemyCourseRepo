import React, {Component} from 'react';
import Payments from '../Payments';
import { connect } from 'react-redux';

class Account extends Component{

    renderAccountInfo(){
        if(this.props.auth){
            return(
                <div>
                    <div>
                        <label>Signed in with</label>
                        <br/>
                        <span>{this.props.auth.provider}</span>
                    </div>
                    <div>
                        <label>{this.props.auth.emailVerified ? "Verified " : "NON-VERIFIED "}Email</label>
                        <br/>
                        <span>{this.props.auth.email ? this.props.auth.email: "No email on record"}</span>
                    </div>
                </div>
                
                
            );
        }
    }

    render(){
        return(
            <div>
                <div className="row" style={{marginTop:"10px"}}>
                    <img src={this.props.auth ? this.props.auth.profileImageURL : "image"} className="col s2 m5 circle responsive-img" style={{maxHeight:"130px", maxWidth:"130px"}}></img>
                    <h3 className="col s10 m7">{this.props.auth && this.props.auth.name ? this.props.auth.name+"'s ": ""} Account Settings</h3>
                </div>
                {this.renderAccountInfo()}
                
                <p className="red-text">going to put things like account defaults, adding funds, etc</p>
                <h5>Add Credits</h5>
                <Payments/>
            </div>
        )
    }
}

function mapStateToProps({auth}){
    return { auth};
}

export default connect(mapStateToProps)(Account);