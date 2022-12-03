//https://fakeapi.platzi.com/doc/products
//fake api de platzi para usarla

class cartItem{
    constructor(img,title,amount,total,id){
        this.img = img,
        this.title = title,
        this.amount = amount,
        this.total = total,
        this.id = id
    }
    amountIncrement(){
        this.amount++
    }
}


//Variables


const productsContainer = document.querySelector('.products-container');
const nabvar = document.querySelector('.navbar');
const cartContainer = document.querySelector('.cart-container');
let productsList = [];
let categoriesList = [];
let productsInCart = [];


//functions calls



showProducts();
renderCart();


//Events



nabvar.addEventListener('click',showMenu);
productsContainer.addEventListener('click',productsContainerClick)


//Functions


//detects click add to cart button
function productsContainerClick(e){
    e.target.classList.contains('card-cartBtn') ? addToCart(e.target) : "";

}


//render cart
function renderCart(){ 
    clearContainer(cartContainer);

    productsInCart.forEach(item => {
        let {img,title,amount,total} = item;
        renderCartElement(img,title,amount,total);
    })
}


//render item for cart
function renderCartElement(image,title,amount,total){

    let itemCard = document.createElement('div');
    itemCard.classList.add('item');

    let itemImg = document.createElement('img');
    itemImg.classList.add('item-img');
    itemImg.src = image;

    let itemTitle = document.createElement('span');
    itemTitle.classList.add('item-title');
    itemTitle.textContent = title;

    let itemAmount = document.createElement('item-amount');
    itemAmount.classList.add('item-amount');
    itemAmount.textContent = amount;

    let itemTotal = document.createElement('item-total');
    itemTotal.classList.add('item-total');
    itemTotal.textContent = total;

    let itemDelete = document.createElement('a');
    itemDelete.classList.add('delete');
    itemDelete.textContent = 'X';

    itemCard.append(itemImg,itemTitle,itemAmount,itemTotal,itemDelete);
    cartContainer.append(itemCard);

}


//add product to productsInCart array
function addToCart(element){
    let itemId = element.parentElement.parentElement.getAttribute('card-id');
    
    //return product info from productList arrray
    let item = productsList.filter(product =>{
        return product.id == itemId;
    })

    let {images,title,price,id} = item[0];


    //check if the item/product already in to array
    if(productsInCart.filter(producto =>{return producto.id == id}).length == 0){
        productsInCart.push(new cartItem(images[0],title,1,price,id));
    }
    else {
        productsInCart.forEach(item => item.id == id ? item.amountIncrement() : "");
    }

    renderCart();
   
}


//show categories menu
function showMenu(e){
    if (e.target.classList.contains('navbar-menu-categories')) {
        renderCategoriesMenu();
        const categoriesOptionsContainer = document.querySelector('.categories-options-container');
        categoriesOptionsContainer.classList.toggle('hidden');
    }
}


//show main products in main page
async function showProducts(){
    clearContainer(productsContainer);
    await Promise.all([getCategories(),getProducts()]);
    setBanners();
    mainProducts();
}


//obtains categories from API
async function getCategories (){
    let url = 'https://api.escuelajs.co/api/v1/categories';

    try {
        let petition = await fetch(url);
        let result = await petition.json();
        categoriesList = categoriesList.concat(result);
    } catch (error) {
        console.log('error al obtener las categorias');
    }
}


//obtains products from API
async function getProducts (){
    let url = 'https://api.escuelajs.co/api/v1/products';

    try {
        let petition = await fetch(url);
        let result = await petition.json();
        productsList = productsList.concat(result);
    } catch (error) {
        console.log('error al obtener los productos');
    }
}


//choose 20 random products from productsList to show in main page
function mainProducts(){

    for (let i = 0; i < 20; i++) {
        // let random = Math.floor(Math.random() * (productsList.length - 1 + 1)) + 1;
        let random = randomNumber(1,productsList.length -1);
        let {images, title, description, price, id } = productsList[random];
        createCard(images[0],title,description,price,id)
        console.log(id);

    }
}


//render the cards
function createCard(image,title,description,price,id){
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.setAttribute('card-id',id);

    let cardFigure = document.createElement('figure');
    cardFigure.classList.add('card-figure');

    let cardImage = document.createElement('img');
    cardImage.classList.add('card-img');
    cardImage.src = image;
    cardFigure.appendChild(cardImage);

    let cardInformation = document.createElement('div');
    cardInformation.classList.add('card-information');

    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    let cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description');
    cardDescription.textContent = description;

    let cardPriceAmount = document.createElement('div');
    cardPriceAmount.classList.add('card-price-amount');

    let cardPrice = document.createElement('p');
    cardPrice.classList.add('card-price');
    cardPrice.textContent = price;

    let cardAmount = document.createElement('p');
    cardAmount.classList.add('card-amount');
    cardAmount.textContent = '10 avaible';

    cardPriceAmount.append(cardPrice,cardAmount);

    let cardCartBtn = document.createElement('button');
    cardCartBtn.classList.add('card-cartBtn');
    cardCartBtn.textContent = 'Agregar al carrito';

    cardInformation.append(cardTitle,cardDescription,cardPriceAmount,cardCartBtn);
    cardContainer.append(cardFigure,cardInformation);

    productsContainer.append(cardContainer);

}


//clear a specific container from argument
function clearContainer(container){
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
}


//set banners
function setBanners(){
    let random = randomNumber(0,categoriesList.length-2)
    const banner1Img = document.querySelector('.banner-1-img');
    const categoryInfo = document.querySelector('.category-info');
    categoryInfo.children[0].textContent = categoriesList[random].name;
    banner1Img.src = categoriesList[random].image;
}


//random function
function randomNumber(min,max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//clear categories menu container and render categories menu again
function renderCategoriesMenu(){
    let categoriesOptionsList = document.querySelector('.categories-options-list');
    clearContainer(categoriesOptionsList);

    categoriesList.forEach(category =>{
        let option = document.createElement('li');
        option.classList.add('categories-option');
        option.textContent = category.name;

        categoriesOptionsList.append(option);
    })
}