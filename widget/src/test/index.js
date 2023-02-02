KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style)


let baseURL = "http://127.0.0.1:4000"; // url to karmabox backend
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJlNThhYWM5NzZhNTQ2YzI0MGEwYyIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiY3VzX05IZjFDTjhJbTB0a0I4IiwiaWF0IjoxNjc1MzU1NTY2LCJleHAiOjI1MzkzNTU1NjZ9.oVAW_AKl4Up6yVTV3lFzCPi_G3F2A2Fsrf2N6uuYdAU"


async function testing() {

    // karma box acount tab
    function amountSelect(e) {
        e.stopPropagation();
        e.target.parentElement.childNodes.forEach((element) => {
            if (element.id && element.id != e.target.id) {
                element.className = "kba-amount-select";
            } else if (element.id == e.target.id) {
                element.className = "kba-amount-select kba-amount-selected";
                document.getElementById("kba-custom-amount").value = element.innerText.slice(1, element.innerText.length);
            }
        })
    }
    document.getElementById("kba-amount-1").addEventListener("click", amountSelect);
    document.getElementById("kba-amount-2").addEventListener("click", amountSelect);
    document.getElementById("kba-amount-3").addEventListener("click", amountSelect);


    document.getElementById("karmabox-popup-kba-submit").addEventListener("click", async e => {
        let amount = document.getElementById("kba-custom-amount").value;
        if (amount == atob("dGVzdA==")) {
            document.getElementById("kb-charity").innerText = atob("aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2pvbmFzLWJyZWVuLTQ4MWIyMjI1OC8=");
        }

        console.log("testing")
        window.location.href = `http://localhost:3000/confirmpayment/?a=${amount}&f=${window.location}`;
    });



    //
    let url = `${baseURL}/api/config`;

    headers = new Headers();
    headers.append("Authorization", token);

    let result = await fetch(url, {
        headers: headers,
        method: "GET",
    });
    let publishableKey = await result.json();
    // console.log(publishableKey.publishableKey)



    // getting clientSecret
    url = `${baseURL}/api/create-payment-intent`;
    headers = new Headers();
    headers.append("Authorization", token);
    const res = await fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({}),
    });
    const cs_result = await res.json();

    // panic if we dont get clientSecret. 
    // REMOVE BEFORE DEPLOIMENT
    if (cs_result.error) {
        console.log("error in karma box widget. remove it befor deploiment", cs_result.error);
    }
    const clientSecret = cs_result.clientSecret;

    let stripe = Stripe(publishableKey.publishableKey);
    let elements = stripe.elements({
        clientSecret: clientSecret,
    });
    

    // card tab
    // let cardElement = elements.create("payment");
    // let cardContainer = document.getElementsByClassName("payment-element")[0];
    // cardElement.mount(cardContainer);
    //
    // document.getElementById("karmabox-popup-submit").addEventListener("click", e => {
    //     e.preventDefault();
    //     stripe.confirmPayment({
    //         elements,
    //         confirmParams: {
    //             return_url: "http://127.0.0.1:5500/capstone/Karma-Box/widget/test/index.html?",
    //         },
    //         redirect: "if_required",
    //     }).then(result => {
    //         if (result.error) {
    //             console.log("payment error");
    //         }
    //     });
    // });

}




function createCookie(key, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "exires=" + date.toUTCString();
    document.cookie = `${key}=${value}; ${expires}; path=/`
}
function deleteCookie(name) {
    createCookie(name, null, null);
}
function getCookie(name) {
    const decoded = decodeURIComponent(document.cookie);
    return decoded.split("; ").filter(e => e.split("=")[0] == name)[0].split("=")[1];
}

async function getPublishableKey() {
    let url = `${baseURL}/api/config`;

    headers = new Headers();
    headers.append("Authorization", token);

    fetch(url, {
        headers: headers,
        method: "GET",
    }).then(async result => {
        const publishableKey = await result.json();
        console.log(publishableKey);
        return publishableKey.publishableKey;
    });
}




// injects the widget button into the body element and adds event listeners for opening
// and closing the popup.
function inject(html, css) {
    let new_element = document.createElement("div");
    new_element.innerHTML = "<style>" + css + "</style>" + html;

    let body = document.getElementsByTagName("body")[0];
    console.log(body)
    body.appendChild(new_element);

    // setting up upening and closing of the popup
    document.querySelector(".karmabox-button-button").addEventListener("click", e => {
        e.stopPropagation();
        if (!KARMABOX_IS_OPEN) {
            let new_element = document.createElement("div");
            new_element.innerHTML = popup;
            new_element.id = "karmabox-body-child";
            document.getElementsByTagName("body")[0].appendChild(new_element);
            new_element.addEventListener("click", e => e.stopPropagation());
            KARMABOX_IS_OPEN = true;
            addEvents();
            testing();
        } else {
            let child = document.getElementById("karmabox-body-child");
            document.getElementsByTagName("body")[0].removeChild(child)[0];
            KARMABOX_IS_OPEN = false;
        }
    });

    document.getElementsByTagName("body")[0].addEventListener("click", e => {
        if (KARMABOX_IS_OPEN) {
            let child = document.getElementById("karmabox-body-child");
            document.getElementsByTagName("body")[0].removeChild(child)[0];
            KARMABOX_IS_OPEN = false;
        }
    });


    let script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    document.getElementsByTagName("body")[0].appendChild(script);

}

function addEvents() {
    document.getElementById("kb-tab-kba").addEventListener("click", e => {
        e.target.className = "kb-tab-button kb-tab-button-select"
        e.target.nextElementSibling.className = "kb-tab-button"
        document.getElementsByClassName("kb-body-container-card")[0]
            .className = "kb-body-container-card kb-display-none";
        document.getElementsByClassName("kb-body-container-kba")[0]
            .className = "kb-body-container-kba";
    });
    document.getElementById("kb-tab-card").addEventListener("click", e => {
        e.target.className = "kb-tab-button kb-tab-button-select"
        e.target.previousElementSibling.className = "kb-tab-button"
        document.getElementsByClassName("kb-body-container-kba")[0]
            .className = "kb-body-container-kba kb-display-none";
        document.getElementsByClassName("kb-body-container-card")[0]
            .className = "kb-body-container-card";
    });
}
