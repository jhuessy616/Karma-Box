const popup = `<div class="karmabox-popup-container">
    <div class="kb-tabs">
        <button id="kb-tab-kba" class="kb-tab-button kb-tab-button-select">Karma Box account</button>
        <button id="kb-tab-card" class="kb-tab-button">Card</button>
    </div>
    <!-- karma box acount tab -->
    <div class="kb-body-container-kba">
        <div class="kb-body-wrapper-kba">
            <h3 id="kb-charity">Donate to the Rob Charity today</h3>
            <div class="kba-amount-select-container">
                <button id="kba-amount-1" class="kba-amount-select kba-amount-selected">$5</button>
                <button id="kba-amount-2" class="kba-amount-select">$10</button>
                <button id="kba-amount-3" class="kba-amount-select">$20</button>
            </div>
            <h3 class="kba-or">or</h3>
            <label>Enter a custom amount</label>
            <div>
                <label>$</label>
                <input value="5" id="kba-custom-amount">
            </div>
            <button id="karmabox-popup-kba-submit" type="submit">Donate Now</button>
        </div>
    </div>
    <!-- card tab -->
    <div class="kb-body-container-card kb-display-none">
        <form class="karmabox-popup-card-container">
            <label>Enter a custom amount</label>
            <div class="kb-amount-container">
                <div>
                    <input class="karmabox-popup-input">
                </div>
                <button class="kb-amount-button">up</button>
                <button class="kb-amount-button">down</button>
            </div>
            <div>
                <div class="karmabox-popup-input payment-element"></div>
            </div>
            <button id="karmabox-popup-submit" type="submit">Donate Now</button>
        </form>
    </div>
</div>
`;
const style = `


.karmabox-button-container {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 75px;
    margin-bottom: 75px;
}
.karmabox-button-button {
    border: none;
    width: 75px;
    height: 75px;
    border-radius: 50px;
    /* background-color: red; */
    background-image: url("http://localhost:3000/assets/logo3.png");
}
.karmabox-popup-container {
    --kb-tab-height: 35px;
    --kb-body-height: calc(500px var(--kb-tab-height));
    --kb-height: 500px;
    --primary: #0081c9;
    --secondary: #5bc0f8;
    --tertiary: #86e5ff;
    --yellow: #ffc93c;
    --yellow-plus: #fdbc02;
    height: var(--kb-body-height);
    width: 315px;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 150px;
    margin-bottom: 150px;
    padding: 0px 20px 20px 20px;
    background-color: var(--primary);
    border-radius: 10px;
    color: white;
}

/* form */
.karmabox-popup-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* primary #0081c9
 * secondary #5bc0f8
 * tertiary #86e5ff
 * yellow #ffc93c
*/

.karmabox-popup-input {
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #e7faff;
    border-radius: 10px;
}


.kb-tabs {
    display: flex;
    justify-content: space-between;
    height: var(--kb-tab-height);
}

.kb-tab-button {
    width: 50%;
    height: 100%;
    border: none;
    background-color: var(--secondary);
    color: black;
}

.kb-tab-button:hover {
    background-color: var(--tertiary);
}

.kb-tab-button-select {
    background-color: var(--primary);
    color: white;
}

.kb-tab-button-select:hover {
    background-color: var(--primary);
}

/* card tab container */
.kb-body-container-card{
    height: var(--kb-body-height);
    overflow-y: scroll;
}
/* karma box acount tab container */
.kb-body-container-kba{
    height: var(--kb-body-height);
    overflow-y: scroll;
}
.kb-display-none {
    display: none;
}


#karmabox-popup-submit {
    background-color: var(--yellow);
    border: none;
    margin: 10px;
    height: 40px; 
    padding: 10px;
    font-size: 1.2em;
    border-radius: 5px;
}
#karmabox-popup-submit:hover {
    background-color: var(--yellow-plus);
}

.kb-amount-container {
    display: flex;
    justify-content: flex-start;
    margin: 20px;
    width: 100%;
}

.kb-amount-button {
    justify-self: flex-end;
    width: 50px;
}

/* karma box acount tab */

.kba-amount-select-container {
    display: flex;
    justify-content: center;
}
.kba-amount-select {
    height: 35px;
    width: 35px;
    border-radius: 50px;
    background-color: var(--secondary);
    border: none;
    margin: 10px;
}
.kba-amount-select:hover {
    background-color: var(--tertiary);
}
.kba-amount-selected {
    background-color: var(--yellow);
}
.kba-amount-selected:hover {
    background-color: var(--yellow-plus);
}

.kb-body-wrapper-kba {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.kb-body-wrapper-kba > div > input {
    height: 25px;
    width: 78px;
    margin-right: 14px;
}
.kb-body-wrapper-kba > label {
    margin: 10px;
}

#karmabox-popup-kba-submit {
    background-color: var(--yellow);
    border: none;
    margin: 10px;
    height: 40px; 
    padding: 10px;
    font-size: 1.2em;
    border-radius: 5px;
    margin-top: 20px;
}
#karmabox-popup-kba-submit:hover {
    background-color: var(--yellow-plus);
}
.kba-or {
    margin: 0;
}

`;
const html = `<div class="karmabox-button-container">
    <div type="button" class="karmabox-button-button"></div>
</div>
`;
KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style)


let baseURL = "http://127.0.0.1:4000";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDVlYmFjM2IyMWQyYTMwNTNlZDQyZiIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiY3VzX05GeGswbElBNG80R2hLIiwic2V0dXBJZCI6InNldGlfMU1WUm92SFphSFFGSENqVUxBNGFlSkN5IiwicGF5bWVudE1ldGhvZElkIjoicG1fMU1WUnBCSFphSFFGSENqVWxvcGt5ZzNjIiwiaWF0IjoxNjc0OTY0MTY2LCJleHAiOjI1Mzg5NjQxNjZ9.7fNzmo6ySugUgByDnaXRra7RwyYhPZ1ixqZviuLA9jE"


async function testing() {

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
    console.log(clientSecret)
    console.log(publishableKey)
    let elements = stripe.elements({
        clientSecret: clientSecret,
    });
    
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

        url = `${baseURL}/api/create-payment-intent`;
        headers = new Headers();
        headers.append("Authorization", token);
        const res = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({}),
        });
        const cs_result = await res.json();
        console.log(cs_result);



    });

    // card tab
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
