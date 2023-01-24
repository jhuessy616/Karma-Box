const popupStyle = `#karmaboxid-mul-container {
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
const popup = `<div id="karmaboxbuttonid-popup-contaner">
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

let karmabox_payload2 = document.createElement("div");
karmabox_payload2.id = "karmaboxbuttonid-payload";
karmabox_payload2.innerHTML = "<style>" + popupStyle + "</style>" + popup;


let karmabox_buttons = document.querySelectorAll(".karmabox-button");
let KARMABOX_IS_OPEN2 = false;

karmabox_buttons.forEach((element) => {
    element.addEventListener("click", e => {
        if (!KARMABOX_IS_OPEN2){
            try {
                if(!KARMABOX_IS_OPEN){
                    e.stopPropagation();
                }
            } catch (_) {
                e.stopPropagation();
            }
            document.getElementsByTagName("body")[0].appendChild(karmabox_payload2);
            document.getElementById("karmaboxbuttonid-payload").addEventListener("click", e => {
                e.stopPropagation();
            });
            KARMABOX_IS_OPEN2 = true;
        }
    });
});

let karmaboxbutton_body = document.getElementsByTagName("body")[0];
karmaboxbutton_body.addEventListener("click", e => {
    if (KARMABOX_IS_OPEN2){
        let box = document.getElementById("karmaboxbuttonid-payload");
        karmaboxbutton_body.removeChild(box);
        KARMABOX_IS_OPEN2 = false;
    }
});






