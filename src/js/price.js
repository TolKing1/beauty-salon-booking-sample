import {collection,getDocs} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {formInteractive} from "./util/validate.js";
import {db, form, toggleBurger} from "./util/config.js";

document.addEventListener("DOMContentLoaded", function () {
    formInteractive();
    form();
    toggleBurger();
    getServices().then();
    search()
});
function createCard(price, category) {
    var outerDiv = document.createElement("div");
    outerDiv.classList.add("price__col", "col-sm-6", "col-md-4", "col-xl-3", "col-xxl-2");

    var innerDiv = document.createElement("div");
    innerDiv.classList.add("price__inner");

    var priceUpDiv = document.createElement("div");
    priceUpDiv.classList.add("price__up");

    var categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = category;

    priceUpDiv.appendChild(categoryParagraph);

    var priceBotDiv = document.createElement("div");
    priceBotDiv.classList.add("price__bot");

    var priceHeading = document.createElement("h1");
    priceHeading.textContent = price + "$";

    priceBotDiv.appendChild(priceHeading);

    innerDiv.appendChild(priceUpDiv);
    innerDiv.appendChild(priceBotDiv);

    outerDiv.appendChild(innerDiv);

    const priceRowContainer = document.querySelector(".price__row")

    priceRowContainer.appendChild(outerDiv);
}
//Get data from db and generate html elements
const getServices = async () => {
    const teamMemberCollection = collection(db, 'services');

    try {
        const querySnapshot = await getDocs(teamMemberCollection);

        querySnapshot.forEach((doc) => {
            const { name, price } = doc.data();
            createCard(price,name)
        });
    } catch (error) {
        console.error('Error getting team members: ', error);
        throw error;
    }
};

function search(){
    const inp = document.getElementById('search');


    inp.addEventListener('input',()=>{
        const cards = document.querySelectorAll('.price__col');

        cards.forEach(card => {
            const categoryText = card.querySelector('.price__up p').textContent;

            if (categoryText.toLowerCase().includes(inp.value.toLowerCase())) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    })

}
// Example usage:
generateAndAppendPriceCard("49.89", "Styling");
