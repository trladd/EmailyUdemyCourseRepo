import React, {Component} from 'react';
import Payments from '../Payments';
import { connect } from 'react-redux';

class Account extends Component{

    constructor(){
        super();
        this.state = {
            numberCredits:5
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    renderAccountInfo(){
        if(this.props.auth){
            return(
                <div className="row">
                    <div className="col s12 m6">
                        <label>Signed in with</label>
                        <br/>
                        <span>{this.props.auth.provider}</span>
                    </div>
                    <div className="col s12 m6">
                        <label>{this.props.auth.emailVerified ? "Verified " : "NON-VERIFIED "}Email</label>
                        <br/>
                        <span>{this.props.auth.email ? this.props.auth.email: "No email on record"}</span>
                    </div>
                </div>
                
                
            );
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

      showPaymentButton(){
          if(this.state.numberCredits > 0 && this.state.numberCredits <= 1000){
              return(
                    <div className="col s6">
                        <Payments numberCredits={this.state.numberCredits}/>
                    </div>
              );
          }
          return(
              <span className="red-text">Credit amount must be greater than zero and less than 1000</span>
          );
      }

    render(){
        return(
            <div>
                <div className="row" style={{marginTop:"10px"}}>
                    <img src={this.props.auth ? this.props.auth.profileImageURL : "image"} className="col s5 m4 circle responsive-img" style={{maxHeight:"130px", maxWidth:"130px"}}></img>
                    <h3 className="flow-text col s7 m8">{this.props.auth && this.props.auth.name ? this.props.auth.name+"'s ": ""} Account Settings</h3>
                </div>
                {this.renderAccountInfo()}
                <hr/>
                
                <div className="row">
                
                    <div className="col s12">
                        <h5>Add Credits</h5>
                    </div>
                    <form className="col s6 row">
                        <div className="col s12">
                        <label>Number of Credits to Add</label>
                        <input name="numberCredits" type="number" 
                                onChange={this.handleInputChange} value={this.state.numberCredits}/>
                        </div>
                    </form>
                    {this.showPaymentButton()}
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth}){
    return { auth};
}

export default connect(mapStateToProps)(Account);