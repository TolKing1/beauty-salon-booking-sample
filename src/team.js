import {collection,getDocs} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {checkAuth, db, form, toggleBurger} from "./js/config.js";
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
        calendar({id:id,name:name});
    };

    // Append
    layer.appendChild(span);
    figure.appendChild(img);
    figure.appendChild(layer);
    teamCol.appendChild(figure);


    const teamContainer = document.getElementById('team-row');
    teamContainer.appendChild(teamCol);
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
function calendar(data){
    const list = [
        {
            id: data.id,
            start: DayPilot.Date.today().addHours(13),
            end: DayPilot.Date.today().addHours(14),
            text: data.id
        }
    ];
    updateScheduler(list,data.name)
}

let dp = null;

//generate calendar
function generateCalendar(){
    dp = new DayPilot.Calendar("calendar", {
        viewType: "WorkWeek",
        headerDateFormat: "ddd M/d/yyyy",
        cellHeight: 50,
        cellDuration: 60,
        dayBeginsHour: 9,
        dayEndsHour: 19,
        eventArrangement: "Full",
        allowEventOverlap: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
            const modal = await DayPilot.Modal.prompt("Create a new booking:", "Write some details");
            const dp = args.control;
            dp.clearSelection();

            const isAuthenticated = await checkAuth();
            if (modal.canceled ) {
                return;
            }
            //Check if client logged
            else if(!isAuthenticated){
                alert("Please login first!")
                return;
            }
            dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: modal.result
            });
        },
        eventMoveHandling: "Disabled",
        eventResizeHandling: "Update",
        onEventResized: (args) => {
            console.log("Event resized: " + args.e.text());
        },
        eventClickHandling: "Enabled",
        eventHoverHandling: "Disabled",
    });
    dp.events.list = [
        {
            id: 2,
            start: DayPilot.Date.today().addHours(10),
            end: DayPilot.Date.today().addHours(12),
            text: 'sdasd'
        }
    ]

    dp.init()
    dp.hide()
}
generateCalendar()

function updateScheduler(list,title) {
    const header = document.getElementById('calendar-title')
    const calendar = document.getElementById('calendar')
    header.innerText = title
    calendar.style.transform = 'translate(0,0)';

    dp.show()
    dp.events.list = list
    dp.update()
    console.log('update')
}
