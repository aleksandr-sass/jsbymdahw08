# Домашняя работа к занятию №8
1. Добавить в таблицу корзины номера позиций строк с товаром.
2. Реализовать возможность удаления строк с товаром.
3. В ссылку "Корзина" добавить текст с количеством видов пакетов кофе, находящихся в корзине.
4. Реализовать отображение в корзине изображений, соответствующих видам пакетов кофе, которые выбрал пользователь.
5. Стилизовать всё с помощью CSS
6. Добавить в выпадающее меню ещё один элемент списка. И если пользователь его выберет, то на главной странице следует отобразить все имеющиеся виды пакетов кофе, содержащиеся в каталоге.

## Решение

1. **Номера позиций строк:**
* HTML:
```
<thead>
  <th>№</th>
  ...
</thead>
```
* JS (файл: shopCart,js): Дополним функцию paintShopCart() следующим кодом:
```
//***ФУНКЦИЯ отрисовки карточек в корзине */
const paintShopCart = () => {
  ....
  const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || [];
  cardsLS.forEach((el, index) => {
    ...
    tr.innerHTML = `
      <td>${index + 1}</td>
      ...        
  });
}
```
* ***Всё готово: теперь в корзине отображается столбец, в котором записаны номера строк с товаром.***
2. **Удаление строк:**
* HTML:
```
<thead>
  ...
  <th>Удалить</th>
</thead>
```
* CSS:
```
.delete {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
```
* JS (файл: shopCart,js): 

a. ФУНКЦИЮ отрисовки карточек в корзине paintShopCart() необходимо вынести наверх, за пределы главной функции shopCart().
b. В нижнюю часть файла **shopCart,js** необходимо вставить следующий код:
```
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
}
```
c.  В конец стрелочной функции paintShopCart() нужно вставить следующий код:
```
//***ФУНКЦИЯ отрисовки карточек в корзине */
const paintShopCart = () => {
    ...
    implementDeleteFunction();
}
```
* ***Всё готово: теперь можно удалять строки с товаром из корзины.***
3. **Количество видов пакетов кофе:**
* HTML:
```
<li class="nav__link">
  <a class="nav__link_shop-cart" href="">
    Корзина
    <span class="length"></span>
  </a>
</li>
```
* JS (файл: shopCart,js): 

a. Вставим в начало файла следующий код:
```
const  length  =  navLinkShopCart.querySelector('.length');
```
b. В нижнюю часть файла **shopCart,js** необходимо вставить следующий код:
```
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
```
c. JS: необходимо в нескольких местах вставить код запуска функции printLocalStorageLength():

при нажатии кнопки "Купить":
```
//***ФУНКЦИЯ поиска карточки товара (объекта)
const searchCard = (clickedCardId) => { 
    ...
    printLocalStorageLength();
}
```
при нажатии на рисунок с крестиком (см. столбец "Удалить"):
```
/**ФУНКЦИЯ-обработчик события 'click' для кнопок УДАЛИТЬ */
function handler(e) {    
    ...
    printLocalStorageLength();
}
```
при каждой очередной/внеочередной отрисовке стартовой страницы:
```
function shopCart() {
  ...
  printLocalStorageLength();
}
shopCart()
```

* ***Всё готово: необходимая информация отображается/обновляется в установленном месте (рядом со ссылкой на корзину товаров, выбранных пользователем)***
4. **Отображение изображений:**
* JS (файл: shopCart,js): 
a. В верхнюю часть (выше объявления функции **shopCart()**) файла **shopCart,js** необходимо вставить следующий код:
```
/**ФУНКЦИЯ для ГЕНЕРИРОВАНИЯ красивого HTML-кода для наименования*/
const generateFancyHtmlForName = (element) => { 
    return ` 
    <div class="shop__item shop__item_100 padding30">
        <div class="shop__img ${imgCards[element.type]}"></div>
        <h3>${element.name}</h3>
    </div>
    `;
}
```
b. Немного модифицируем стрелочную функцию **paintShopCart()**:
```
//***ФУНКЦИЯ отрисовки карточек в корзине */
const paintShopCart = () => {
    ...
    cardsLS.forEach((el, index) => {
        ...
        tr.innerHTML = `
            ...
            <td>${generateFancyHtmlForName(el)}</td> 
            ...`
        ...     
}
```
* CSS: полностью перепишем следующий селектор класса:
```
.modal__body {
    width: 70%;
    height: 60%;
    background-color: bisque;
    overflow-y: scroll;
}
```
* CSS: добавим следующие селекторы класса:
```
.shop__item_100 {
    width: 100%;
    text-align: center;
}

.padding30 {
    padding-top: 30px;
}
```
* ***Всё готово: картинки с кофе отображаются в корзине.***
5. ~~Стилизовать всё с помощью CSS~~ - **не реализовано: нет идей для воплощения.**
6. **ПОКАЗАТЬ ВСЁ:**
* HTML:
```
<ul class="dropdown__list">
  ...
  ...QUATEMALA</a></li>
  <li><a class="dropdown__link" href="">ПОКАЗАТЬ ВСЁ</a></li>
</ul>
```
* JS (файл: **app,js**): функция sortCards(type) должна принять следующий вид:
```
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
```
* ***Всё готово: реализован дополнительный функционал.***
