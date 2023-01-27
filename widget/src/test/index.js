KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style)


let baseURL = "http://127.0.0.1:4000";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDJmYzRmZjc1ZTgwOTNmMWJlZDk2NiIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiIiwiaWF0IjoxNjc0NzcxNzQyLCJleHAiOjI1Mzg3NzE3NDJ9.fjNSK-zZabg6QGwZkrsWaB8r0r_2gQFj_o7HNCDhedY"


async function testing() {

    let url = `${baseURL}/api/config`;

    headers = new Headers();
    headers.append("Authorization", token);

    let result = await fetch(url, {
        headers: headers,
        method: "GET",
    });
    let publishableKey = await result.json();
    console.log(publishableKey.publishableKey)



    // getting clientSecret
    url = `${baseURL}/api/create-payment-intent`;
    headers = new Headers();
    headers.append("Authorization", token);
    const res = await fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({}),
    });
    const {clientSecret} = await res.json();

    let stripe = Stripe(publishableKey.publishableKey);
    let elements = stripe.elements({
        clientSecret: clientSecret,
    });

    let cardElement = elements.create("payment");
    let cardContainer = document.getElementsByClassName("payment-element")[0];
    console.log(cardContainer)
    cardElement.mount(cardContainer);

    
    document.getElementById("karmabox-popup-submit").addEventListener("click", e => {
        e.preventDefault();
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://127.0.0.1:5500/capstone/Karma-Box/widget/test/index.html?",
            },
            redirect: "if_required",
        }).then(result => {
            if (result.error) {
                console.log("payment error");
            }
        });
    });



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


async function getClientSecret() {

    let url = `${baseURL}/api/create-payment-intent`;
    headers = new Headers();
    headers.append("Authorization", token);

    fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({}),
    }).then(async (result) => {
        const { clientSecret } = await result.json();
        console.log(clientSecret)
        return clientSecret;
    });

}

/// injects the widget button into the body element and adds event listeners for opening
/// and closing the popup.
function inject(html, css, stripe) {
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
