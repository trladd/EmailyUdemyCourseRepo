import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Payments extends Component{
    renderMessage(){
        const description = "$" + this.props.numberCredits + " for " +  this.props.numberCredits + " survey credits";
        console.log(description);
        return(description);
    }

    getCredits(number){
        return (this.props.numberCredits * 100);
    }

    render(){
        console.log(this.props.numberCredits);
        return(
            <StripeCheckout 
             name="Emaily"
             description={this.renderMessage()}
             amount ={this.getCredits(this.props.numberCredits)}
             token={token => this.props.handleToken(token)}
             stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn blue">
                    Add {this.props.numberCredits} in Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null,actions)(Payments);