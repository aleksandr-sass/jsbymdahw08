// window.addEventListener('DOMContentLoaded', () => {
// })
const dropdown = document.querySelector('.dropdown')
const dropdownList = document.querySelector('.dropdown__list')
const shopLinks = document.querySelectorAll('.shop__link')
const shopContent = document.querySelector('.shop__content')
const modal = document.querySelector('.modal')
const navLinkShopCart = document.querySelector('.nav__link_shop-cart')
const formInput = document.querySelector('.form__input')

const cards = [
    {
        id: '01',
        name : 'ETHIOPIA COFFEE 100гр',
        img : 'img/s6-f1.png',
        price : '15',
        type : 'ETHIOPIA'
    },
    {
        id: '02',
        name : 'ETHIOPIA COFFEE 400гр',
        img : 'img/s6-f1.png',
        price : '23',
        type : 'ETHIOPIA'
    },
    {
        id: '03',
        name : 'ETHIOPIA COFFEE 900гр',
        img : 'img/s6-f1.png',
        price : '52',
        type : 'ETHIOPIA'
    },
    { 
        id: '04',
        name : 'KENYA COFFEE 100гр',
        img : 'img/s6-f2.png',
        price : '15',
        type : 'KENYA'
    },
    { 
        id: '05',
        name : 'KENYA COFFEE 400гр',
        img : 'img/s6-f2.png',
        price : '25',
        type : 'KENYA'
    },
    { 
        id: '06',
        name : 'KENYA COFFEE 900гр',
        img : 'img/s6-f2.png',
        price : '35',
        type : 'KENYA'
    },
    {
        id: '07',
        name : 'COLUMBIA COFFEE 100гр',
        img : 'img/s6-f3.png',
        price : '15',
        type : 'COLUMBIA'
    },
    {
        id: '08',
        name : 'COLUMBIA COFFEE 400гр',
        img : 'img/s6-f3.png',
        price : '15',
        type : 'COLUMBIA'
    },
    {
        id: '09',
        name : 'COLUMBIA COFFEE 900гр',
        img : 'img/s6-f3.png',
        price : '15',
        type : 'COLUMBIA'
    },
    {
        id: '10',
        name : 'QUATEMALA COFFEE 100гр',
        img : 'img/s6-f4.png',
        price : '15',
        type : 'QUATEMALA'
    },
    {
        id: '11',
        name : 'QUATEMALA COFFEE 400гр',
        img : 'img/s6-f4.png',
        price : '15',
        type : 'QUATEMALA'
    },
    {
        id: '12',
        name : 'QUATEMALA COFFEE 900гр',
        img : 'img/s6-f4.png',
        price : '15',
        type : 'QUATEMALA'
    }
]

const imgCards = {
    ETHIOPIA : 'shop__img_bg1',
    KENYA : 'shop__img_bg2',
    COLUMBIA : 'shop__img_bg3',
    QUATEMALA : 'shop__img_bg4',
}

localStorage.setItem('cards', JSON.stringify(cards))


//ФУНКЦИЯ для отрисовки карточек
const paintCards = (selectCards) => {
    shopContent.innerHTML = ''; //очистка объекта внутри 
    selectCards.forEach(card => {
        let div = document.createElement('div') //новая переменная
        div.classList.add('shop__item')
        //записываем в новую переменную разметку HTML
        div.innerHTML = ` 
        <div class="shop__img ${imgCards[card.type]}">
            <a class="shop__link" href="#" data-type="${card.type}" data-id="${card.id}">КУПИТЬ</a>
        </div>
        <h3>${card.name}</h3>
        <p> ${card.price} бел. р.</p>
        `
        shopContent.append(div) //метод добавляет обьект в конец
    })
}

/**ФУНКЦИЯ сортировки карточек с кофе по типу*/
const sortCards = (type) => {
    let selectCards;
    if (type === 'ПОКАЗАТЬ ВСЁ') {
        selectCards = cards;
    } else {
        selectCards = cards.filter(el => el.type === type);
    }
    paintCards(selectCards);
}

//установка слушателя событий на каждую группу кофе по типу
shopLinks.forEach(link => {
    link.addEventListener('click', ()=> {
        let type = link.dataset.type
        sortCards(type);
    })
})

//ДЕЛЕГИРОВАНИЕ СОБЫТИЙ !!!!!!!!!!!

function showDropdown(e) {
    e.preventDefault();
    if (e.target.closest('.dropdown')) {
        dropdownList.classList.toggle('active');
    }
}
//слушатель события "при наведении" для ссылки выпадающего меню
dropdown.addEventListener('mouseover', showDropdown);
//слушатель события "при убирании курсора мыши" для ссылки выпадающего меню
dropdown.addEventListener('mouseout', showDropdown);

dropdown.addEventListener('click', (e)=> {
    e.preventDefault();
    if (e.target.classList.contains('dropdown__link')) {
        sortCards(e.target.innerHTML)
    }
})



 modal.addEventListener('click', (e)=> {
    e.preventDefault();
    if (e.target.classList.contains('modal')) {
        modal.style.display = 'none';
    }
 })

 //***ФУНКЦИЯ поиска карточек в массиве
const searchCards = () => {
    if (formInput.value === '') {
        location.reload()
    } else {
        const searchCards = cards.filter(el => el.name.toLowerCase().includes(formInput.value.toLowerCase().trim()))
        paintCards(searchCards)
    }
}
//События вызова функция
 formInput.addEventListener('input', searchCards)
//  formBtn.addEventListener('click', searchCards)






// e.preventDefault(); запрет браузеру выполнять события по умолчанию
// e.currentTarget - возвращает обьект-родитель, для которого установлен слушатель событий (addEvent...)
//closest возвращает-ищет обьект с указанным селектором среди родителей поднимается в верх (в поиск включает сам объект, по которому кликнули)
 //e.target.classList.contains - contains возвращает true или false, при наличии класса у объекта



 