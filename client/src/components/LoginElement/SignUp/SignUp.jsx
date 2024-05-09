import React from 'react';
import style from './SignUp.module.css'
import { Form, Field } from 'react-final-form'
import { useNavigate } from 'react-router-dom';




const SignUpForm = (props) => {


    const navigate = useNavigate();

    const onSubmit = async values => {

        if (!values.FirstName || !values.LastName || !values.Email || !values.Password) {
            console.error('Missing required field');
            return;
        }



        const userData = {
            FirstName: values.FirstName,
            LastName: values.LastName,
            PhoneNumber: values.PhoneNumber,
            Email: values.Email,
            PasswordHash: values.Password,
            DateOfBirth: values.DateOfBirth,
            Address: {
                Street: "",
                City: "",
                State: "",
                PostalCode: "",
                Country: ""
            },
        };

        switch (currentField) {
            case 'FirstName':
                setCurrentField('LastName');
                break;
            case 'LastName':
                setCurrentField('Email');
                break;
            case 'Email':
                setCurrentField('Password');
                break;
            // Add more cases as needed for additional fields
            default:
                setCurrentField('FirstName');
        };



        const signUpSuccessful = await props.createUser(userData);

        if(signUpSuccessful) {
            navigate('/profile');
        }


    };

    return (

        <Form 
            onSubmit={onSubmit}
            initialValues={{PhoneNumber: '+1'}}> 
            {props => (
                    <form className={style.form} autoComplete="off" onSubmit={props.handleSubmit}>
                        <h1>Sign Up</h1>
                        <Field name="FirstName" component="input" type="text" >
                            {props => (
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input} placeholder="First Name"/>
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        
                        </Field>
                        <Field name="LastName" component="input"  type="text">
                            {props => (
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input} placeholder="Last Name"/>
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field 
                            name="PhoneNumber" 
                            component="input"  
                            type="tel" 
                            // validate={validatePhoneNumber}
                        >
                            {props => (  
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input} placeholder="Phone Number" />
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field name="Email" component="input"  type="email">
                            {props => (
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input}  placeholder="Email" />
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field name="Password" component="input"  type="password">
                            {props => (
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input}  placeholder="Password" />
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        </Field>
                        Date Of Birth
                        <Field name="DateOfBirth"  type="date">
                            {props => (
                                <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                    <input {...props.input} placeholder="Date of Birth"/>
                                    <div className={style['bg-top']}>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            )}
                        </Field>
                            <button className={`${style.btn} ${style['block-cube']} ${style['block-cube-hover']}`} type="submit">
                            Sign Up
                                <div>
                                    <div className={style['bg-top']}>
                                    <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style['bg-right']}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                    <div className={style.bg}>
                                        <div className={style['bg-inner']}></div>
                                    </div>
                                </div>
                            </button>
                    </form>
            )}
        </Form>)
};



const SignUp = (props) => {

    return (
        <SignUpForm createUser={props.createUser}/>
    );
}

export default SignUp;