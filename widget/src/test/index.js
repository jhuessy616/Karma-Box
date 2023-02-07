KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style);

let karmabox_url = "http://localhost:3000";
let baseURL = "http://127.0.0.1:4000"; // url to karmabox backend
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJlNThhYWM5NzZhNTQ2YzI0MGEwYyIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiY3VzX05IZjFDTjhJbTB0a0I4IiwiaWF0IjoxNjc1MzU1NTY2LCJleHAiOjI1MzkzNTU1NjZ9.oVAW_AKl4Up6yVTV3lFzCPi_G3F2A2Fsrf2N6uuYdAU"


async function karmabox_acount_tab() {

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


    document.getElementById("karmabox-popup-kba-submit").addEventListener("click", async (e) => {
        let amount = document.getElementById("kba-custom-amount").value;
        if (amount == atob("dGVzdA==")) {
            document.getElementById("kb-charity").innerText = atob(
                "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2pvbmFzLWJyZWVuLTQ4MWIyMjI1OC8="
            );
        } else {
            window.location.href = `${karmabox_url}/paymentRedirect/?f=${window.location}&a=${amount}`;
        }
    });
}
async function cardTab() {
    url = `${baseURL}/api/create-payment-intent-guest`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    body = JSON.stringify({
        amount: 500,
    });

    const res = await fetch(url, {
        method: "POST",
        headers,
        body
    });
    const cs_result = await res.json();

    url = `${baseURL}/api/config`;
    const res2 = await fetch(url, {
        method: "GET",
    });
    const publishableKey = await res2.json();
    console.log(cs_result)


    let stripe = Stripe(publishableKey.publishableKey);
    let elements = stripe.elements({
        clientSecret: cs_result.clientSecret,
    });


    let cardElement = elements.create("payment");
    let cardContainer = document.getElementsByClassName("payment-element")[0];
    cardElement.mount(cardContainer);

    document.getElementById("karmabox-popup-submit").addEventListener("click", e => {
        e.preventDefault();
        cardElement.clear();
        
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
            karmabox_acount_tab();
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

  document.getElementsByTagName("body")[0].addEventListener("click", (e) => {
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
  document.getElementById("kb-tab-kba").addEventListener("click", (e) => {
    e.target.className = "kb-tab-button kb-tab-button-select";
    e.target.nextElementSibling.className = "kb-tab-button";
    document.getElementsByClassName("kb-body-container-card")[0].className =
      "kb-body-container-card kb-display-none";
    document.getElementsByClassName("kb-body-container-kba")[0].className =
      "kb-body-container-kba";
  });
  document.getElementById("kb-tab-card").addEventListener("click", (e) => {
    e.target.className = "kb-tab-button kb-tab-button-select";
    e.target.previousElementSibling.className = "kb-tab-button";
    document.getElementsByClassName("kb-body-container-kba")[0].className =
      "kb-body-container-kba kb-display-none";
    document.getElementsByClassName("kb-body-container-card")[0].className =
      "kb-body-container-card";
    cardTab();
  });
}
