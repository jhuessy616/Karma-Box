
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






