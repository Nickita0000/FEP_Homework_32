import { save } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {Formik, Field, ErrorMessage, Form, useFormikContext} from "formik";
import * as Yup from 'yup';
import './styles.css'

const TEMPLATE_PHONE = /^\d{3}(-\d{2}){2}$/;
const TEMPLATE_NAMES = /^[a-zA-Zа-яА-Я]*$/;

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Must be more then 2 letters')
        .matches(TEMPLATE_NAMES, 'Must be used only letters')
        .required(),
    surname: Yup.string()
        .min(3, 'Must be more then 2 letters')
        .matches(TEMPLATE_NAMES, 'Must be used only letters')
        .required(),
    phone: Yup.string()
        .matches(TEMPLATE_PHONE, 'Must be templated xxx-xx-xx')
        .required(),
});

export default function ContactForm () {
    const userEdit = useSelector((state) => state.userEdit)
    const dispatch = useDispatch()

    function onSubmit(value, action) {
        const user = {
            ...userEdit,
            "name": value.name,
            "surname": value.surname,
            "phone": value.phone,
        }

        action.resetForm({
            values: {
                name: '',
                surname: '',
                phone: '',
            }
        })

        dispatch(save(value))
    }

    return(
        <Formik
            enableReinitialize
            initialValues={userEdit}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <div>
                    <Field type="text" name="name" placeholder="Your name"/>
                    <ValidationError name="name"/>
                </div>
                <div>
                    <Field type="text" name="surname" placeholder="Your surname"/>
                    <ValidationError name="surname"/>
                </div>
                <div>
                    <Field type="text" name="phone" placeholder="Phone number"/>
                    <ValidationError name="phone"/>
                </div>

                <SaveButton/>
            </Form>
        </Formik>
    )
}

function ValidationError({ name }) {
    return <ErrorMessage
    name={name}
    component='span'
    className='validationError'
    />
}

function SaveButton() {
    const { isValid } = useFormikContext();

    return <button type='submit' disabled={!isValid}>Save</button>
}