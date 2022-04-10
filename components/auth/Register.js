import React, { useState, useEffect } from 'react'

import Link from 'next/link';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../store/actions/userActions'
import { notify } from '../../utils/utility'
import { messages } from "../../utils/constants"

const RegisterPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { success, error, loading } = useSelector(state => state.auth)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = user;
    useEffect(() => {
        if (success) {
            router.push('/login')
            notify(messages.ToastSuccess, "Success");
        }

        if (error) {
            notify(messages.ToastError, "something went wrong");
            dispatch(clearErrors())
        }

    }, [dispatch, success, error])
    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, password
        }

        dispatch(registerUser(userData))

    }
    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }

    return (

        <section className="form-page">
            <div className="container">
                <div className="back-button-section">
                    <Link href="/products">
                        <a><i className="icon-left"></i> Back to store</a>
                    </Link>
                </div>

                <div className="form-block">
                    <h2 className="form-block__title">Create an account and discover the benefits</h2>
                    <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

                    <form className="form" onSubmit={submitHandler}>
                        <div className="form__input-row">
                            <input className="form__input" placeholder="Name" type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form__input-row">
                            <input className="form__input" placeholder="Email" type="text"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form__input-row">
                            <input className="form__input" type="Password" placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        {/* <div className="form__info">
                            <div className="checkbox-wrapper">
                                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                                    <input name="signed-in" type="checkbox" id="check-signed-in" />
                                    <span className="checkbox__check"></span>
                                    <p>I agree to the Google Terms of Service and Privacy Policy</p>
                                </label>
                            </div>
                        </div> */}

                        <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Sign up</button>

                        <p className="form__signup-link">
                            <Link href="/login">
                                <a href="#">Are you already a member?</a>
                            </Link>
                        </p>
                    </form>
                </div>

            </div>
        </section>

    )
}
export default RegisterPage
