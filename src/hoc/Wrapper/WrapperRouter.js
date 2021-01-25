import React from 'react'
import Wrapper from "./Wrapper";
import * as actionTypes from "../../store/actions/router";
import {connect} from "react-redux";

class WrapperRouter extends React.Component
{
    render(){
        this.props.routerSelected(this.props.keyName);
        return(
                <Wrapper>
                    {this.props.children}
                </Wrapper>
        );
    }
}


const mapDispatchToProps = dispatch => {
        return {
            routerSelected: (routerKey) => dispatch(actionTypes.routerUpdate(routerKey)),
        }
    }

export default connect(null , mapDispatchToProps)(WrapperRouter);