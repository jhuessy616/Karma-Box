let customStyle = `
#karmaboxbuttonid-popup-contaner {
    bottom: 0!;
    right: 0;
    margin-bottom: 75px;
    margin-right: 75px;
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

