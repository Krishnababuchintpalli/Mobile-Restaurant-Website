import {menuArray} from './data.js'
const menuList=document.getElementById("menu-list")
const billDisplay=document.getElementById("bill")
const totalPrice=document.getElementById("totalprice")
const orderBtn=document.getElementById("order")
const menu=menuArray.map(items=> items)
function renderitems(){
let displayitems=``
for(let item of menu){
    displayitems += `
    <section>
        <div class='item-${item.id}'>
              <div class="fooditem">
                   ${item.emoji}
              </div>
              <div class="elements ${item.name}">
                  <h1>${item.name}</h1>
                  <p>${item.ingredients}</p>
                  <h3>$${item.price}</h3>
              </div>
              <button id="${item.id}" class="add-btn" data-btn="${item.id}">+</button>
    </section>
    <hr>
   `
}

return displayitems
}

menuList.innerHTML=renderitems()
const addBtn=document.getElementById("add-btn")

document.addEventListener("click",function(e){
  if(e.target.dataset.btn){
      renderBill(e.target.dataset.btn)
  }
  else if(e.target.dataset.delete){
    itemsremover(e.target.dataset.delete)
  }
})
const billItems = []
function renderBill(data){
    
    if(data){
            menuArray.forEach(function(item){
                if(data==item.id){
                    billItems.push(item)
                }
        
            })
}
render(billItems)
}
function render(itemsArray){                                
    let displayBill=""
    let price=0
    totalPrice.innerHTML=""
    itemsArray.forEach(function(item){
        displayBill+=`

        <div class="billEl" id="billEl">
        
        <h2 class="itemBill" id="itemBill" data-set=${item.id}>${item.name}</h2>
        <p class="remover" id="remover" data-delete='${item.id}'>remove</p>
        <div class="itemPrice" id="itemPrice">$${item.price}</div>

        </div>
        `
        price+=item.price
    })
    billDisplay.innerHTML=`<h1>Your Order</h1>`+ displayBill+`<hr>`
    totalPrice.innerHTML=`
    <h2>Total Price:</h2>
    <div id="amount" class="amount">$${price}</div>
    `
    orderBtn.innerHTML=`
    <button id="order-btn"  class="order-btn" >Complete order</button>
    `
    const removeItems=document.getElementById("remover")
    removeItems.addEventListener("click",function(e){
        const itemsremove=document.getElementById("itemBill")
        // console.log(itemsremove.value)
    })
    const renderPay=document.getElementById("order-btn")
const payForm=document.getElementById("payment-form")
renderPay.addEventListener("click",function(){
   payForm.style.display="block"
})
const payBtn=document.getElementById("payment-btn")
const final=document.getElementById("confirm-order")
const paymentBill=document.getElementById("paymentBill")
const formDetails=document.getElementById("form-details")

payBtn.addEventListener("click",function(e){
    payForm.style.display="none"
    paymentBill.style.display="none"
    e.preventDefault();
    const myFormdata=new FormData(formDetails)
    const consumer=myFormdata.get('name')
    final.innerHTML=`
    <h1 class="final-note">Thanks,${consumer} your order is on the way</h1>
    `

})

}
function itemsremover(value){
    value=Number(value)
    billItems.forEach((item)=>{
        console.log(item.id,value)
        if(value===item.id){
            console.log(item)
            billItems.pop(item)
        }
        //console.log(billItems)
    })
    render(billItems)
}

