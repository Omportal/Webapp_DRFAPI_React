import React from 'react'
import Cart from './Components/Cart/Cart';
import Card from './Components/Card/Card';
import OrderCart from './Components/OrderCart/OrderCart';
import FormInfo from './Components/FormInfo/FormInfo';
import './App.css';
import { useState, useEffect } from 'react';
// import { getData2 } from './db/db2';
import { getData } from './db/db';

const tg = window.Telegram.WebApp
const mb = tg.MainButton
const backButton = tg.BackButton
const elem = document.getElementsByClassName('order__cart');
const cardContainer = document.getElementsByClassName("card__container");
mb.text = "Сформировать заказ";


function App() {
  const data = [];
  const [cartItems, setCartItems] = useState([]);
  // const [foods, setFoods] = useState([]);
  const showMainButton = () => {
    if (cartItems.length != 0) {
      mb.show();
    }
    else {
      mb.hide();
    }
  }
  const foods = getData();
  const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    }
    else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(x => x.id !== food.id))
    } else {
      setCartItems(cartItems.map((x) =>
        x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
      )
      );
    }
  };

  useEffect(() => {
    // getItems();
    if (tg.ready) {
      showMainButton();
      tg.expand();
      const backButtonOnClick = () => {
        showCart();
        backButton.hide();
        mb.text = "Сформировать заказ";
      }
      const handleOnClick = () => {
        if (mb.text === "Оформить") {
          userdata();

        }
        else if (mb.text === "Сформировать заказ") {
          mb.setText("Оформить");
          backButton.show()
          showCart();
        }
        else {
        }
      };
      mb.onClick(handleOnClick);
      backButton.onClick(backButtonOnClick)

      return () => {
        mb.offClick(handleOnClick);
        backButton.offClick(backButtonOnClick);
      };
    }
  }, [tg, mb, cartItems, total, backButton]);



  // const getItems = () => {
  //   getData2().then(response => {
  //     setFoods(response.data);
  //     console.log(response.data)
  //   }).catch(e => {
  //     console.log(e);
  //   });
  // }



  const send = () => {
    // const data = [];
    const adress = document.getElementsByClassName('form__adress')[0].value
    const name = document.getElementsByClassName('form__nameInput')[0].value
    const surname = document.getElementsByClassName('form__surname')[0].value
    const patronym = document.getElementsByClassName('form__patronym')[0].value
    const index = document.getElementsByClassName('form__index')[0].value
    const telephone = document.getElementsByClassName('form__telephone')[0].value
    for (var i of cartItems) {
      data.push(`${i.title} : ${i.quantity}шт. = ${i.price}руб.`)
    }
    data.push(`Итого : ${total} руб. ,ФИО: ${surname} ${name} ${patronym}, Адрес: ${adress} , Индекс: ${index}, Телефон: ${telephone}`)
    tg.sendData(`${data}`);
  };


  const userdata = () => {
    const formData = new FormData()
    send();
    formData.append('data', `${data}`)
    if (tg.initDataUnsafe.user) {
      formData.append('userInfo', JSON.stringify(tg.initDataUnsafe));
    }
    else {
      formData.append('userInfo', '');
    }
    tg.close()


    console.log(formData)
    var request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8000/api/items/');
    // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(formData);
  }


  const showCart = () => {
    elem[0].classList.contains('hide-order') ? elem[0].classList.remove('hide-order') : elem[0].className += ' hide-order';
    cardContainer[0].classList.contains('visible') ? cardContainer[0].classList.remove('visible') : cardContainer[0].className += ' visible';
  }

  return (
    <>
      {/* <Cart onCheckout={userdata} cartItems={cartItems} /> */}
      <div className="card__container">
        <h1 className='heading'>NATOILS</h1>
        {foods.map((food) => {
          return <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />;
        })}
      </div>
      <div className='order__cart hide-order'>

        <div className='order__title'><h2 className='order__titleH2'>ORDER</h2>
        </div>
        <div className='order__top'>
          {cartItems.map((orderResult) => {
            return <OrderCart key={orderResult.id} orderResult={orderResult} />;
          })}
          <div className='total'>
            <span>Итого : {total} руб.</span>
          </div>
        </div>
        <FormInfo />
      </div>
    </>
  );
}

export default App;
