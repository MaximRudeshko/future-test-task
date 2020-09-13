import React, {useState} from 'react'
import './Modal.css'

const Modal = ({closeModal, isModalOpen, addItem }) => {

    const [id, setId] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();   
        addItem({
            id,
            firstName,
            lastName,
            email,
            phone
        })     
    }
    
    const clazz = isModalOpen ? '' : 'hide'

    return(
        <div className = {`add-modal ${clazz}`}>
            <form onSubmit = {onSubmit}>
                <i className="fa fa-times-circle-o" aria-hidden="true" onClick = {() => closeModal()}></i>
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="inputId">ID</label>
                        <input onChange = {(e) => setId(e.target.value)} type="number" className="form-control" id="inputId" placeholder="ID"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input onChange = {(e) => setFirstName(e.target.value)} type="text" className="form-control" id="inputFirstName" placeholder="First Name"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="inputLastName">last Name</label>
                        <input onChange = {(e) => setLastName(e.target.value)} type="test" className="form-control" id="inputLastName" placeholder="Last Name"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="inputEmail">Email</label>
                        <input onChange = {(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="inputPassword4">Phone</label>
                        <input onChange = {(e) => setPhone(e.target.value)} type="phone" className="form-control" id="inputPhone" placeholder="Phone"/>
                    </div>
                </div>
                <button className = 'btn btn-primary '
                        disabled = {id && firstName && lastName && email && phone != null ? false : true } 
                        type = 'submit'>Add Item</button>
            </form>
        </div>
    )
}

export default Modal