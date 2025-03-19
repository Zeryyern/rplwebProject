// Example food recommendations based on BMI categories
const bmiRecommendations = {
   "Underweight": [1, 2], // Example food IDs
   "Normal": [3, 4],
   "Overweight": [5,6],
   "Obese": [7,8]
};

// Example menu items (this would normally come from your database)
const menuItems = [
   { food_id: 1, food_name: "High-Calorie Smoothie", category: "High-Calorie", price: "$5.99" },
   { food_id: 2, food_name: "Peanut Butter Sandwich", category: "High-Calorie", price: "$4.99" },
   { food_id: 3, food_name: "Grilled Chicken Salad", category:"High-Protein", price:"$6.99"},
   { food_id:4 ,food_name :"Quinoa Bowl",category :"Low-Calorie",price :"$5.49"},
   { food_id :5 ,food_name :"Veggie Stir Fry",category :"Low-Calorie",price :"$4.49"},
   { food_id :6 ,food_name :"Fruit Salad",category :"Low-Calorie",price :"$3.99"},
   { food_id :7 ,food_name :"Pasta Alfredo",category :"High-Carb",price:"$7.99"},
   { food_id :8 ,food_name :"Cheese Pizza",category :"High-Carb",price :"$8.49"}
];

// Cart array to store added items
let cart = [];

// Function to handle adding items to the cart
function addToCart(item) {
   const existingItem = cart.find(cartItem => cartItem.id === item.id);
   
   if (existingItem) {
       existingItem.quantity += item.quantity; // Increase quantity if already in cart
   } else {
       cart.push(item); // Add new item to cart
   }
   
   updateCartDisplay(); // Update the displayed cart
}

// Function to update the cart display
function updateCartDisplay() {
   const cartItemsDiv = document.getElementById('cart-items');
   const totalAmountDiv = document.getElementById('total-amount');
   
   cartItemsDiv.innerHTML = ''; // Clear previous items
   let totalAmount = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity,0);

   
   cart.forEach(item => {
       const div = document.createElement('div');
       div.innerHTML = `${item.name} - ${item.price} x ${item.quantity}`;
       cartItemsDiv.appendChild(div);
   });

   totalAmountDiv.innerHTML = `Total Amount Payable : $${totalAmount.toFixed(2)}`; // Display total amount
}

// Function to handle page transition
document.getElementById('enter-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById('landing-page').style.display = 'none'; // Hide landing page
    document.getElementById('main-content').style.display = 'block'; // Show main content

    // Initialize BMI calculation functionality
    setupBmiCalculator();
});

// Function to setup BMI calculator
function setupBmiCalculator() {

    document.getElementById('bmiForm').addEventListener('submit', function(event) {

        event.preventDefault();

        const height = document.getElementById('height').value /100; // Convert cm to meters
        const weight = document.getElementById('weight').value;

        const bmi = (weight / (height * height)).toFixed(2);
        document.getElementById('bmiResult').innerText = `Your BMI is ${bmi}.`;

        // Determine BMI category
        let bmiCategory;

        if (bmi<18.5) {

            bmiCategory='Underweight';

        } else if(bmi>=18.5 && bmi<24.9){

            bmiCategory='Normal';

        } else if(bmi>=25 && bmi<29.9){

            bmiCategory='Overweight';

        } else {

            bmiCategory='Obese';

        }

        // Fetch recommended foods based on BMI category

        const recommendedFoodIds=bmiRecommendations[bmiCategory];

        // Display recommended foods

        const recommendedFoodsDiv=document.getElementById('recommendedFoods');
        recommendedFoodsDiv.innerHTML=''; // Clear previous recommendations

        recommendedFoodIds.forEach(foodId => {

            const foodItem=menuItems.find(item => item.food_id===foodId);

            if(foodItem){

                const div=document.createElement('div');
                div.innerHTML=`<strong>${foodItem.food_name}</strong> - ${foodItem.price}`;
                recommendedFoodsDiv.appendChild(div);
            }
        });
    });
}

// Add event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {

        const gridItem=button.parentElement; // Get the parent grid item

        const item={
            id:gridItem.dataset.id,
            name:gridItem.dataset.name,
            price:gridItem.dataset.price,
            quantity :1 // Default quantity is set to one when added to the cart.
        };

        addToCart(item); // Add item to cart
    });
});

// Checkout Button functionality
document.getElementById('checkout-button').addEventListener('click', function() {

    if(cart.length===0){
         alert("Your cart is empty!");
         return;

    }

    // Create a new window for checkout confirmation
    const checkoutWindow=window.open("", "_blank", "width=400,height=400");

    let checkoutContent="<h2>Checkout Confirmation</h2><ul>";

    cart.forEach(item => {

         checkoutContent+=`<li>${item.name} - ${item.price} x ${item.quantity}</li>`;
    });

    const totalAmount=cart.reduce((total,item)=>total+parseFloat(item.price.replace('$','')) * item.quantity ,0);

    checkoutContent+=`</ul><strong>Total Amount Payable : $${totalAmount.toFixed(2)}</strong>`;

    checkoutWindow.document.write(checkoutContent);
    checkoutWindow.document.close();
});
