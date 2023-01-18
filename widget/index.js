

var IS_OPEN = false;
const popupContent = `
        <div id="karmaboxid-popup-contaner">
    <h3>donate to the<br>rob charity</h3>
            <div id="karmaboxid-mul-container">
                <p class="karmaboxclass-karmapoint" style="display: inline">♥️ $3 each</p>
                <input id="karmaboxid-karma-amount" value="1" type="text"/>
                <button class="karmaboxclass-mul-button" id="karmaboxid-button-1">1</button>
                <button class="karmaboxclass-mul-button" id="karmaboxid-button-2">3</button>
                <button class="karmaboxclass-mul-button" id="karmaboxid-button-3">5</button>
            </div>
            <form id="karmaboxid-form">
                <input placeholder="enter a custom amount" class="karmaboxid-form-item" type="text" />
                <button class="karmaboxid-form-item" type="submit">donate now</button>
            </form>
        </div>
    `;


let payload = document.createElement("div");
payload.innerHTML = 
    `
    <style>


    #karmaboxid-mul-container {
        margin: 10px;
        align-items: center;
        width: 100%;
    }
    .karmaboxclass-karmapoint {
        padding-right: 20px;
        margin-left: 10px;
    }
    #karmaboxid-karma-amount {
        width: 50px;
        height: 30px;
    }
    .karmaboxclass-mul-button {
        border: solid purple 2px;
        background-color:  #ff00ff19;
        border-radius: 20px;
        padding: 5px;
        width: 30px;
        height: 30px;
    }
    #karmaboxid-wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
    }
    #karmaboxid-popup-contaner {
        width: 300px;
        padding: 10px;
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 0;
        right: 0;
        margin-bottom: 25px;
        margin-right: 65px;
        background-color: gray;
        align-items: center;
    }

    /* h3 inside container */
    #karmaboxid-popup-contaner > h3 {
        color: black;
        padding: 10px;
    }
    
    #karmaboxid-form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }
    #karmaboxid-button {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .karmaboxid-form-item {
        display: block;
        padding: 5px;
        margin: 10px

    }
    </style>
    <div id="karmaboxid-wrapper">
    <button id="karmaboxid-button">click me</button>
    </div>
    `;



let body = document.getElementsByTagName("body")[0];
inject(body, payload);

document.getElementById("karmaboxid-button").addEventListener("click", e => {
    if (!IS_OPEN) {
        let popup = document.createElement("div");
        popup.innerHTML = popupContent;
        popup.id = "karmaboxid-popup-wrapper"
        let container = document.getElementById("karmaboxid-wrapper");
        container.insertBefore(popup, container.firstChild);
        addFormEvents();
        IS_OPEN = true;
    } else {
        let container = document.getElementById("karmaboxid-wrapper");
        let popup = document.getElementById("karmaboxid-popup-wrapper")
        container.removeChild(popup);
        IS_OPEN = false;
    }
});

function addFormEvents() {
    document.getElementById("karmaboxid-form").addEventListener("submit", e => {
        e.preventDefault();
        console.log("you gave!!");
    });
    document.querySelector("#karmaboxid-button-1").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 1;
    });
    document.querySelector("#karmaboxid-button-2").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 3;
    });
    document.querySelector("#karmaboxid-button-3").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 5;
    });
}


function inject(target, payload) {
    target.appendChild(payload);
}


