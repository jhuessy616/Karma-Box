const widget = `<div id="karmaboxid-wrapper">
    <button id="karmaboxid-button">
    </button>
</div>
`;
const buttonStyle = `#karmaboxid-button {
    width: 75px;
    height: 75px;
    border-radius: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: red;
    border: none;

}
#karmaboxid-logo {
    background-color: red;
    width: 1000px;
    height: 1000px;
}
`;
const widgetStyle = `#karmaboxid-mul-container {
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
#karmaboxid-mul-button-solected {
    border: solid yelow 2px;
    background-color: red;
    border-radius: 20px;
    padding: 5px;
    width: 30px;
    height: 30px;
}
.karmaboxclass-mul-button {
    border: solid purple 2px;
    background-color:  #ff00ff19;
    border-radius: 20px;
    padding: 5px_body;
    width: 30px;
    height: 30px;
}
#karmaboxid-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    margin-right: 50px;
    margin-bottom: 50px;
}
#karmaboxbuttonid-popup-contaner {
    width: 300px;
    padding: 10px;
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    right: 0;
    margin-bottom: calc(50vh - 100px);
    margin-right: calc(50vw - 150px);
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
.karmaboxid-form-item {
    display: block;
    padding: 5px;
    margin: 10px

}
`;
const popupContent = `<div id="karmaboxbuttonid-popup-contaner">
    <h3>donate to the<br>rob charity</h3>
    <div id="karmaboxid-mul-container">
        <p class="karmaboxclass-karmapoint" style="display: inline">♥️ $3 each</p>
        <input id="karmaboxid-karma-amount" value="1" type="text"/>
        <button class="karmaboxclass-mul-button" id="karmaboxid-mul-button-solected">1</button>
        <button class="karmaboxclass-mul-button" id="karmaboxid-button-2">3</button>
        <button class="karmaboxclass-mul-button" id="karmaboxid-button-3">5</button>
    </div>
    <form id="karmaboxid-form">
        <input placeholder="enter a custom amount" class="karmaboxid-form-item" type="text" />
        <button class="karmaboxid-form-item" type="submit">donate now</button>
    </form>
</div>
`;
let customStyle = `
#karmaboxbuttonid-popup-contaner {
    bottom: 0;
    right: 0;
    margin-bottom: 125px;
    margin-right: 125px;
    background-color: gray;
    align-items: center;
}
`;
var KARMABOX_IS_OPEN = false;
let karmabox_payload = document.createElement("div");
karmabox_payload.innerHTML = "<style>" + widgetStyle + buttonStyle + customStyle + "</style>" + widget


console.log(karmabox_payload.innerHTML)

let karmabox_body = document.getElementsByTagName("body")[0];
inject(karmabox_body, karmabox_payload);
karmabox_body.addEventListener("click", _ => {
    if (KARMABOX_IS_OPEN) {
        let container = document.getElementById("karmaboxid-wrapper");
        let popup = document.getElementById("karmaboxid-popup-wrapper")
        container.removeChild(popup);
        KARMABOX_IS_OPEN = false;
    }
});

document.getElementById("karmaboxid-button").addEventListener("click", e => {
    try {
        if (!KARMABOX_IS_OPEN2){
            e.stopPropagation();
        }
    }catch(_){
        e.stopPropagation();
    }
    if (!KARMABOX_IS_OPEN) {
        let popup = document.createElement("div");
        popup.innerHTML = popupContent;
        popup.id = "karmaboxid-popup-wrapper"
        let container = document.getElementById("karmaboxid-wrapper");
        container.insertBefore(popup, container.firstChild);
        addFormEvents();
        KARMABOX_IS_OPEN = true;
    } else {
        let container = document.getElementById("karmaboxid-wrapper");
        let popup = document.getElementById("karmaboxid-popup-wrapper")
        container.removeChild(popup);
        KARMABOX_IS_OPEN = false;
    }
});

function addFormEvents() {
    document.getElementById("karmaboxid-form").addEventListener("submit", e => {
        e.preventDefault();
        e.stopPropagation();
        console.log("you gave!!");
    });
    document.getElementById("karmaboxid-popup-wrapper").addEventListener("click", e => {
        e.stopPropagation();
    });

    document.querySelector("#karmaboxid-mul-button-solected").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 1;
        e.target.nextElementSibling.id = "";
        e.target.nextElementSibling.nextElementSibling.id = "";
        e.target.id = "karmaboxid-mul-button-solected"
    });
    document.querySelector("#karmaboxid-button-2").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 3;
        e.target.id = "karmaboxid-mul-button-solected"
        e.target.nextElementSibling.id = "";
        e.target.previousElementSibling.id = "";
    });
    document.querySelector("#karmaboxid-button-3").addEventListener("click", e => {
        e.preventDefault();
        let input = document.getElementById("karmaboxid-karma-amount");
        input.value = 5;
        e.target.id = "karmaboxid-mul-button-solected"
        e.target.previousElementSibling.id = "";
        e.target.previousElementSibling.previousElementSibling.id = "";
    });
}


function inject(target, payload) {
    target.appendChild(payload);
}

