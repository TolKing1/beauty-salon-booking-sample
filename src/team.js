import {collection,getDocs} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {db, form, toggleBurger} from "./js/config.js";
import {formInteractive} from "./js/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    formInteractive()
    form()
    toggleBurger()

    getTeamMembers().then(()=>console.log("Team divs created"))
});

//Create elements for display team members
function createTeam(id, name, imgSrc) {
    // Create elements
    const teamCol = document.createElement('div');
    teamCol.className = 'team__col col-sm-6 col-md-4 col-xl-3';

    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = imgSrc;

    const layer = document.createElement('div');
    layer.className = 'layer';

    const span = document.createElement('span');
    span.textContent = name;
    span.onclick = function() {
        calendar(id);
    };

    // Append
    layer.appendChild(span);
    figure.appendChild(img);
    figure.appendChild(layer);
    teamCol.appendChild(figure);


    const teamContainer = document.getElementById('team-row');
    teamContainer.appendChild(teamCol);
}
function calendar(id){
    console.log(id)
}

//Get data from db and generate html elements
const getTeamMembers = async () => {
    const teamMemberCollection = collection(db, 'members');

    try {
        const querySnapshot = await getDocs(teamMemberCollection);

        querySnapshot.forEach((doc) => {
            const { name, img } = doc.data();
            createTeam(doc.id,name,img)
        });
    } catch (error) {
        console.error('Error getting team members: ', error);
        throw error;
    }
};

