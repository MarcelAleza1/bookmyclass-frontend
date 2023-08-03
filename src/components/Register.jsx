import { useFormik } from 'formik';
import * as Yup from 'yup'
import apiCalls from '../services/api.js';
export const Register = () => {
    const formik = useFormik(
        {
            initialValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            validationSchema: Yup.object({
                firstName: Yup.string().max(15, "First Name Must be 25 characters or less")
                    .required("Required"),
                lastName: Yup.string().max(15, "First Name Must be 25 characters or less")
                    .required("Required"),
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string().min(8).required("require"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password")], "Password does not match")
                    .required("Confirm Password is required"),
            }),
            onSubmit: async (values) => {
                console.log("sign up details ", values);
                let apiResponse;
                apiResponse = await apiCalls.registerUser(values);
                console.log("console", apiResponse);
            }
        }
    );
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='App mt-2'>
                    <div className=' my-3' >
                        {formik.errors.firstName ? <p className='text-red-600 mb-2'>{formik.errors.firstName}</p> : null}
                        <input id='firstName'
                            name='firstName'
                            type='text'
                            placeholder='First Name'
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className='border-0 px-2 '
                            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
                        >
                        </input>
                    </div>

                    <div className='input-container my-3'>
                        {formik.errors.lastName ? <p className='text-red-600 mb-2'>Last Name</p> : null}
                        <input id='lastName'
                            name='lastName'
                            type='text'
                            placeholder='Last Name'
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className=' border-0 px-2 '
                            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
                        >
                        </input>
                    </div>
                    <div className='input-container my-3 '>
                        {formik.errors.email ? <p className='text-red-600 mb-0'>Invalid Email</p> : null}
                        <input id='email'
                            name='email'
                            type='text'
                            placeholder='Email'
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className=' border-0 px-2'
                            style={{ height: "50px", backgroundColor: "#F3F3F3" }}

                        >
                        </input>
                    </div>
                    <div className='input-container my-3'>
                        {formik.errors.password ? <p className='text-red-600 mb-0'>Password required</p> : null}
                        <input id='password'
                            name='password'
                            type='password'
                            placeholder='Create your password'
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className=' border-0 px-2'
                            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
                        >
                        </input>
                    </div>
                    <div className='input-container my-3 h-50'>
                        {formik.errors.confirmPassword ? <p className='text-red-600 mb-0'>Password mismatched</p> : null}
                        <input id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm your password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className='w-100 border-0 px-2'
                            style={{ height: "50px", backgroundColor: "#F3F3F3" }}
                        >
                        </input>
                    </div>
                    <button type='submit'
                        className='w-[200px] border-0 my-3 px-3 text-white'
                        style={{ height: "50px", backgroundColor: "#6237DE" }}
                    >Create Account</button>
                </div>

            </form>
        </div>
    )
}
