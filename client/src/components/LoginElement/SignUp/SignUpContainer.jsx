import React from 'react';
import SignUp from './SignUp';





const SignUpContainer = (props) => {

    const HandleCreateUser = async (userData) => {

        try {
            const response = await fetch('/signups/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                // Sign-up successful
                console.log('User signed up successfully');
                return true;
            } else {
                // Handle error response from backend
                console.error('Sign-up failed:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            return false;
        };
       
    };

    
    

    return (
        <SignUp createUser={HandleCreateUser}/>
    );
}

export default SignUpContainer;