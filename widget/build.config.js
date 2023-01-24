module.exports = {
    sections: [
        {
            outpath: "./build/button.js",
            main_path: "./src/button/button.js",
            inputs: [
                {
                    source: "./src/button/index.html",
                    var_name: "popup"
                },
                {
                    source: "./src/button/style.css",
                    var_name: "popupStyle"
                },
            ],
        },
        {
            outpath: "./build/widget.js",
            main_path: "./src/widget/widget.js",
            inputs: [
                {
                    source: "./src/widget/popup.html",
                    var_name: "popupContent"
                },
                {
                    source: "./src/widget/style.css",
                    var_name: "widgetStyle"
                },
                {
                    source: "./src/widget/widget.html",
                    var_name: "widget"
                },
            ],
        },
    ],

};
