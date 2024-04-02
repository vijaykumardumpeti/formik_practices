import React, { useState } from 'react'

import { Form, Formik, useField } from 'formik'

import { object, string, number, date, boolean } from 'yup'

import { Container, Row, Col, Button } from 'reactstrap'

//using only children



const formData = [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter Your firstname'
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter Your lastname'
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter Your email address'
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter Your password'
        }
    ];
  
  










const FormikPractice = () => {



    const [formData, setFormData] = useState({})


    const MyInput = ({ label, ...props }) => {

        const [field, meta, helpers] = useField(props)
        console.log('helpers', helpers);

        // const { value } = meta;
        // const { setValue } = helpers;

        return (
            <>
                <div className='d-flex flex-column text-start my-2'>
                    <label className='mb-1' htmlFor={props.name || props.id}>{label}</label>
                    <input placeholder={props.placeholder} className='rounded outline-none text-success' {...field} {...props} />
                    {meta.touched && meta.error ? (
                        <small className='text-danger'>{meta.error}</small>
                    ) : null}
                </div>
            </>
        )
    }

    const MySelect = ({ label, ...props }) => {

        const [field, meta] = useField(props)

        return (
            <div className='d-flex flex-column text-start my-2'>
                <label htmlFor={props.name || props.id}>{label}</label>
                <select className='rounded' {...field} {...props} />
                {meta.touched && meta.error ? (
                    <small className='text-danger'>{meta.error}</small>
                ) : null}
            </div>
        )
    }



    const MyCheckbox = ({ label, ...props }) => {


        const [field, meta, helpers] = useField(props.name)
        console.log(helpers);

        return (
            <div className='d-flex flex-column text-start'>
                <div className=''>
                    <input {...props} {...field} />
                    <label className='' htmlFor={props.name || props.id}>{label}</label>
                </div>
                {meta.touched && meta.error ? (
                    <small className='text-danger'>{meta.error}</small>
                ) : null}
            </div>
        )
    }

    const MyRadio = ({ label, ...props }) => {
        // name='jobType'
        // type='radio'
        // label='Full Time'
        // value='fulltime'

        const [field, meta, helpers] = useField(props)

        console.log(helpers);

        return (
            <div className='d-flex flex-column text-start'>
                <div>
                    <input {...props} {...field} />
                    <label htmlFor={props.name || props.id} className='me-2'>{label}</label>
                </div>
                {meta.touched && meta.error ? (
                    <small className='text-danger'>{meta.error}</small>
                ) : null}
            </div>
        )
    }


    const userSchema = object({
        firstName: string().matches(/^[a-zA-Z]+$/, 'First name must contain alphabatic characters').required('First name is required'),
        lastName: string().matches(/^[a-zA-Z]+$/, 'Last name must contain alphabatic characters').required('Last name is required'),
        email: string().email('Invalid email address').required('Email is Required'),
        password: string().min(6, 'Password Must be Atleast 6 Characters').required('Password is Required'),
        date: date().required('Date is Required'),
        gender: string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is Required'),
        age: number().min(18, 'Age must be at least 18').required('Age is Required'),
        isAccepted: boolean().oneOf([true], 'You must accept terms and conditions').required('You must accept terms and conditions'),
        jobType: string().oneOf(['fulltime', 'parttime']).required('Job Type is Required')
    })


    console.log('This is form Form Data', formData);
    return (
        <>
            <h1>Formik</h1>
            <Container>
                <Formik
                    initialValues={
                        {
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            date: new Date(),
                            gender: '', //dropdown
                            age: '',
                            isAccepted: false, //check box,
                            jobType: '', //radio

                        }
                    }

                    validationSchema={userSchema}

                    onSubmit={
                        (values, actions) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2))
                                alert(JSON.stringify(actions, null, 2))
                                // actions.setSubmitting(false)
                                console.log('form_values: ', values);
                                setFormData(values)
                            }, 200)
                        }
                    }
                >
                            <Row className='d-flex justify-content-center'>
                                <Col xs={10} md={7} lg={5} className='bg-light p-3 border shadow rounded '>
                                    <Form>
                                        {/* //label, Field, ErrorMessage  */}


                                    {
                                        formData.map(formProps=> <MyInput {...formProps}/> )
                                    
                                        }

                                        <MyInput
                                            name='lastName'
                                            label='Last Name'
                                            type='text'
                                            placeholder='Enter Your lastname'
                                        />
                                        <MyInput
                                            name='email'
                                            label='Email'
                                            type='email'
                                            placeholder='Enter Your email address'
                                        />
                                        <MyInput
                                            name='password'
                                            label='Password'
                                            type='password'
                                            placeholder='Enter Your password'
                                        />

                                        <div className='d-flex'>
                                            < MyRadio
                                                name='jobType'
                                                type='radio'
                                                label='Full Time'
                                                value='fulltime'
                                            />
                                            < MyRadio
                                                name='jobType'
                                                type='radio'
                                                label='Part Time'
                                                value='parttime'
                                            />
                                        </div>

                                        <MyInput
                                            name='date'
                                            label='Date'
                                            type='date'
                                        // placeholder='Enter Your password'
                                        // value={values.date}
                                        />
                                        <MySelect
                                            name='gender'
                                            label='Gender'
                                        >
                                            <optgroup label='Gender'>
                                                <option value=''>Select a Gender Type</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                                <option value='other'>Other</option>
                                            </optgroup>
                                        </MySelect>
                                        <MyInput
                                            name='age'
                                            label='Age'
                                            type='number'
                                            placeholder='Enter Your Age'
                                        />

                                        <MyCheckbox
                                            name='isAccepted'
                                            label='Terms and Conditions'
                                            type='checkbox'

                                        />
                                        {/* <Field type='radio/> */}
                                        

                                        <Button type='submit' color='success'>Submit</Button>

                                        </Form>
                                </Col>
                            </Row>
                        
                    
                </Formik>
            </Container>
        </>
    )
}

export default FormikPractice

















