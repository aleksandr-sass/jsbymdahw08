const tableBody = document.querySelector('.table__body');
const length = navLinkShopCart.querySelector('.length');


/**ФУНКЦИЯ для ГЕНЕРИРОВАНИЯ красивого HTML-кода для наименования*/
const generateFancyHtmlForName = (element) => { 
    return ` 
    <div class="shop__item shop__item_100 padding30">
        <div class="shop__img ${imgCards[element.type]}"></div>
        <h3>${element.name}</h3>
    </div>
    `;
}




//***ФУНКЦИЯ отрисовки карточек в корзине */
const paintShopCart = () => {
    tableBody.innerHTML = ''
    const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || [];
    cardsLS.forEach((el, index) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${generateFancyHtmlForName(el)}</td> 
            <td>${el.price}</td>
            <td>${el.count}</td>
            <td>${el.price*el.count}</td>
            <td><img src="img/delete.png" alt="Удалить" class="delete" data-index="${index}"></td>
        `
        tableBody.append(tr);        
    });
    implementDeleteFunction();
}

function shopCart() {
    



const shopContent = document.querySelector('.shop__content');






//метод some возвращает true если найден обьект ПЕРВЫЙ удовлетворяющий условию
//***ФУНКЦИЯ поиска карточки товара (объекта)
const searchCard = (clickedCardId) => { 
    cardsInShopCart = JSON.parse(localStorage.getItem('shopCart')) || []
    const foundCard = cards.find(el => el.id === clickedCardId)
    //проверка обьекта в корзине
    if(cardsInShopCart.some(el => el.id === foundCard.id)) {
        cardsInShopCart.map(el => {
            if (el.id === foundCard.id) {
                el.count++
            }
        })
    } else {
        foundCard.count = 1
        cardsInShopCart.push(foundCard)
    }     
    localStorage.setItem('shopCart', JSON.stringify(cardsInShopCart));
    paintShopCart();
    printLocalStorageLength();

}

//получение ID карточки товара по клику на товар
shopContent.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('shop__link') && e.target.dataset.id !== undefined) {
        const clickedCardId = e.target.dataset.id;
        searchCard(clickedCardId);
    }
})

//открытие модального окна 
navLinkShopCart.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.style.display = 'flex';
    paintShopCart() //метод отрисовки 
 })
 printLocalStorageLength();




}
shopCart()

















/**ФУНКЦИЯ-ВЕШАЛКА для кнопок УДАЛИТЬ */
function implementDeleteFunction() {
    const deleteArr = tableBody.querySelectorAll('.delete');
    deleteArr.forEach((el) => el.addEventListener('click', handler));
}

/**ФУНКЦИЯ-обработчик события 'click' для кнопок УДАЛИТЬ */
function handler(e) {    
    let img = e.target;
    let i = img.dataset.index;
    let arr = JSON.parse(localStorage.getItem('shopCart')) || [];
    arr.splice(i, 1);
    localStorage.setItem('shopCart', JSON.stringify(arr));
    paintShopCart();
    printLocalStorageLength();
}

/**ФУНКЦИЯ подсчета КОЛИЧЕСТВА карточек в корзине */
function getLocalStorageLength() {
    return (JSON.parse(localStorage.getItem('shopCart')) || []).length;
}

/**ФУНКЦИЯ отрисовки КОЛИЧЕСТВА карточек в корзине */
function printLocalStorageLength() {
    let count = getLocalStorageLength();
    let str;
    if (count > 0) {
        str = ` (${count})`;
    } else if (count == 0) {
        str = '';
    } else {
        str = '';
        alert('java.lang.error: Длина массива не может быть отрицательной');
    }
    length.innerHTML = str;
}
