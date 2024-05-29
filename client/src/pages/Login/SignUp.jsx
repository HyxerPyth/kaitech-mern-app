import React from 'react';
import SignUpContainer from '../../components/LoginElement/SignUp/SignUpContainer';


const SignUp = (props) => {
    return (
        <SignUpContainer store={props.store}/>
    );
}

export default SignUp;