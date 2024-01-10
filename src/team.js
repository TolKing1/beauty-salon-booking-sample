import {collection,getDocs,addDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {auth, checkAuth, db, form, toggleBurger} from "./js/config.js";
import {formInteractive} from "./js/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    formInteractive()
    form()
    toggleBurger()
    getTeamMembers().then()
    generateCalendar()
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
        calendar({id:id,name:name}).then();
    };

    // Append
    layer.appendChild(span);
    figure.appendChild(img);
    figure.appendChild(layer);
    teamCol.appendChild(figure);


    const teamContainer = document.getElementById('team-row');
    teamContainer.appendChild(teamCol);
}

function getAccUID(){
    if (auth.currentUser){
        return auth.currentUser.uid
    }
    return 0;
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

//member clicked
async function calendar(data) {

    const list = await getEvents(data.id, getAccUID());
    updateScheduler(list, data.name)
}
//Get events
async function getEvents(memberId, user) {
    const eventDb = collection(db, 'events');

    member = memberId;
    let events = [];
    try {
        const querySnapshot = await getDocs(eventDb);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (memberId === data.member) {
                const timeStart = new Date(data.start);
                const timeEnd = new Date(data.end);

                const start = DayPilot.Date(timeStart,true);
                const end = DayPilot.Date(timeEnd,true);

                let text;
                if (data.user === user) {
                    text ="Your booking:\n\n"+ data.text;
                } else {
                    text = "BOOKED"
                }
                events.push({id: doc.id, start: start, end: end, text: text})
            }

        });
        return events;
    } catch (error) {
        console.error('Error getting team events: ', error);

    }
    return events;
}
//Set events
async function setEvents(args,text) {
    const events = collection(db, 'events');

    try {
        const document = {
            member: member,
            user: getAccUID(),
            start: args.start.toString(), // Assuming eventData has a 'start' property
            end: args.end.toString(),    // Assuming eventData has an 'end' property
            text: text   // Assuming eventData has a 'text' property
        }
        console.log(document)
        const docRef = await addDoc(events,document);
        console.log('Event added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding event: ', error);
        throw error; // Rethrow the error to handle it at a higher level if needed
    }
}


let dp = null;
let member;

//generate calendar
function generateCalendar(){
    dp = new DayPilot.Calendar("calendar", {
        viewType: "WorkWeek",
        headerDateFormat: "ddd M/d/yyyy",
        cellHeight: 50,
        cellDuration: 60,
        dayBeginsHour: 8,
        dayEndsHour: 19,
        eventArrangement: "Full",
        allowEventOverlap: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
            const modal = await DayPilot.Modal.prompt("Create a new booking:", "Write some details");
            const dp = args.control;
            dp.clearSelection();

            //Check if client logged
            const isAuthenticated = await checkAuth();
            if (modal.canceled ) {
                return;
            }
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

            //write to firebase
            await setEvents(args,modal.result);
        },
        eventMoveHandling: "Disabled",
        eventResizeHandling: "Update",
        onEventResized: (args) => {
            console.log("Event resized: " + args.e.text());
        },
        eventClickHandling: "Enabled",
        eventHoverHandling: "Disabled",
    });

    dp.init()
}
//update datas
function updateScheduler(list,title) {
    const header = document.getElementById('calendar-title')
    const calendar = document.getElementById('calendar')
    header.innerText = title
    calendar.style.transform = 'translate(0,0)';

    dp.show()
    dp.events.list = list
    dp.update()
}

