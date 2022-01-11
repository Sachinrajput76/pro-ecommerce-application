import React, { useState } from 'react'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../../utils/server';
import { postData } from '../../utils/services';
import ButtonLoader from '../../layouts/ButtonLoader'
import { notify } from '../../utils/utility'
import { messages } from "../../utils/constants"
import { signIn } from 'next-auth/client'

const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async data => {
        setLoading(true);

        // const res = await postData(`${server}/api/login`, {
        //     email: data.email,
        //     password: data.password
        // });

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        setLoading(false)

        if (result.error) {
            notify(messages.ToastError, "something went wrong");
        } else {
            window.location.href = '/'
            notify(messages.ToastSuccess, "Success");
        }
        setLoading(false)

        // console.log("res", res)
        // if (res.status === false) {
        //     notify(messages.ToastError, "something went wrong");
        // } else {
        //     notify(messages.ToastSuccess, "Success");
        //     window.location.href = '/'
        // }
    };

    return (

        <section className="form-page">
            <div className="container">
                <div className="back-button-section">
                    <Link href="/products">
                        <a><i className="icon-left"></i> Back to store</a>
                    </Link>
                </div>

                <div className="form-block">
                    <h2 className="form-block__title">Log in</h2>
                    <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__input-row">
                            <input
                                className="form__input"
                                placeholder="email"
                                type="text"
                                name="email"
                                ref={register({
                                    required: true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                            />

                            {errors.email && errors.email.type === 'required' &&
                                <p className="message message--error">This field is required</p>
                            }

                            {errors.email && errors.email.type === 'pattern' &&
                                <p className="message message--error">Please write a valid email</p>
                            }

                        </div>

                        <div className="form__input-row">
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                ref={register({ required: true })}
                            />
                            {errors.password && errors.password.type === 'required' &&
                                <p className="message message--error">This field is required</p>
                            }
                        </div>

                        <div className="form__info">
                            <div className="checkbox-wrapper">
                                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                                    <input
                                        type="checkbox"
                                        name="keepSigned"
                                        id="check-signed-in"
                                        ref={register({ required: false })}
                                    />
                                    <span className="checkbox__check"></span>
                                    <p>Keep me signed in</p>
                                </label>
                            </div>
                            <a href="/forgot-password" className="form__info__forgot-password">Forgot password?</a>
                        </div>

                        <div className="form__btns">
                            <button type="button" className="btn-social fb-btn bg-[#3B5998]"><i className="icon-facebook"></i>Facebook</button>
                            <button type="button" className="btn-social google-btn"><img src="/images/icons/gmail.svg" alt="gmail" /> Gmail</button>
                        </div>

                        <button type="submit" className="btn btn--rounded btn--yellow btn-submit"
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : 'Sign in'}
                        </button>

                        <p className="form__signup-link">Not a member yet? <a href="/register">Sign up</a></p>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default LoginPage