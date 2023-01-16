import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/toy.action.js'

export function ToyEdit() {
    ////////////////////////////////////////////////////////////////////////////////////

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [selectedOptions, setSelectedOptions] = useState()

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => {
            return { ...prevToy, [field]: value }
        })
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const lablesToSet = data.length ? data.map((i) => i.value) : []
        setToyToEdit((prevToy) => ({ ...prevToy, lables: lablesToSet }))
    }
    async function onAddToy(values) {
        // ev.preventDefault()
        const lables = selectedOptions.map((option) => option.label)
        const toyToSave = {
            ...toyToEdit,
            ...values,
            lables,
        }
        const savedToy = await saveToy(toyToSave)
        try {
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Cannot add Toy', err)
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        price: Yup.string().min(2, 'Too Short!').max(4, 'Too Long!').required('Required'),
    })

    const h1Props = {
        style: { color: 'red' },
        title: 'Hello im a Title',
    }

    return (
        <section className="toy-edit">
            {/* <h1 title="Hello im an h1" style={{color:'red'}}>Signup</h1> */}
            <h1 {...h1Props}>Add Toy</h1>
            <Formik
                initialValues={{
                    name: '',
                    price: 0,
                    lables: [],
                }}
                validationSchema={SignupSchema}
                onSubmit={onAddToy}
            >
                {({ errors, touched }) => (
                    <Form className="name">
                        <Field name="name" id="name" placeholder="Toy Name" />
                        {errors.name && touched.name ? <span>{errors.name}</span> : null}

                        <Field name="price" id="price" placeholder="Toy Price" />
                        {errors.price && touched.price ? <div>{errors.price}</div> : null}

                        <Select
                            name="lables"
                            options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                            value={selectedOptions}
                            onChange={handleSelect}
                            placeholder="Select lables"
                            isMulti={true}
                        />

                        <button type="submit">Save Toy</button>
                    </Form>
                )}
            </Formik>

            <Link className="nice-link" to="/toy">
                Cancel
            </Link>
        </section>
    )
}
