import React from 'react';


const PersonDetails = ({person}) => {
    return(
        <div className = 'person jumbotron'>
            <h2 className='lead'>Выбран пользователь <b>{person.firstName + ' ' + person.lastName} </b></h2>
            <p>Описание:
            <br/>
            <textarea cols='30' defaultValue = {person.description}/></p>
            <p>Адрес проживания: <b>{person.address.streetAddress}</b></p>
            <p>Город: <b>{person.address.city}</b></p>
            <p>Провинция/штат: <b>{person.address.state}</b></p>
            <p>Индекс: <b>{person.address.zip}</b></p>
        </div>
    )
}

export default PersonDetails