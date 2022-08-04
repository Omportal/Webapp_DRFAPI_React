import React from 'react';
import './FormInfo.css';
import { useState, useEffect } from 'react';


const tg = window.Telegram.WebApp
const userInfo = tg.initDataUnsafe.user
const blurEnter = (e) => {
    if (e.keyCode === 13) {
        e.currentTarget.blur();
    }
}
const validateEmail = () => {
    console.log('asd')
}

// const first_name = tg.initDataUnsafe.user.first_name ? tg.initDataUnsafe.user.first_name : "asd";

const validatePhone = () => {
    console.log('phone');
}

function FormInfo() {

    return (
        <form className='forminfo'>
            <div className='form'>
                <span className='form__header'>Введите данные для оформления заказа</span>
                <div className="form__group">
                    <input type="text" onKeyDown={blurEnter} placeholder=" " className='form__nameInput' ></input>
                    <label className='form__label'>Имя</label>
                </div>
                <div className="form__group">
                    <input className='form__surname' onKeyDown={blurEnter} placeholder=" " type="text" ></input>
                    <label className='form__label'>Фамилия</label>
                </div>
                <div className="form__group">
                    <input className='form__patronym' onKeyDown={blurEnter} placeholder=" " type="text"></input>
                    <label className='form__label'>Отчество</label>
                </div>
                <div className="form__group">
                    <input className='form__index' onKeyDown={blurEnter} placeholder=" " type="text"></input>
                    <label className='form__label'>Почтовый индекс</label>
                </div>
                <div className="form__group">
                    <input className='form__adress' onKeyDown={blurEnter} placeholder=" " type="text"></input>
                    <label className='form__label'>Область,город,улица,дом,квартира</label>
                </div>
                <div className="form__group">
                    <input className='form__telephone' onKeyDown={blurEnter} placeholder=" " type="tel"></input>
                    <label className='form__label'>Номер телефона</label>
                </div>
            </div>
        </form>


    )
}

export default FormInfo