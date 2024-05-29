import React from 'react';
import style from './SignIn.module.css';
import { Form, Field } from 'react-final-form'

const onSubmit = async values => {};


const SignInForm = (props) => {
    return (
        <Form onSubmit={onSubmit} > 
            {props => (
                <form className={style.form} autoComplete="off">
                    <div className={style.control}>
                        <h1>Sign In</h1>
                    </div>
                    <Field name="username" component="input" placeholder="Username" type="text">
                        {props => (
                            <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                <input {...props.input} />
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
                        )}
                    </Field>
                    <Field name="password" component="input" placeholder="Password" type="password">
                        {props => (
                            <div className={`${style.control} ${style['block-cube']} ${style['block-input']}`}>
                                <input {...props.input} />
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
                        )}
                    </Field>
                    <button className={`${style.btn} ${style['block-cube']} ${style['block-cube-hover']}`} type="button">
                        <div className={style['bg-top']}>
                            <div className={style['bg-inner']}></div>
                        </div>
                        <div className={style['bg-right']}>
                            <div className={style['bg-inner']}></div>
                        </div>
                        <div className={style.bg}>
                            <div className={style['bg-inner']}></div>
                        </div>
                    </button>
                </form>
            )}
        </Form>
    );
}

const SignIn = (props) => {
    return 
        <SignInForm />
}


export default SignIn;