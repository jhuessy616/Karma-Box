module.exports = {
    sections: [
        // {
        //     outpath: "./build/button.js",
        //     main_path: "./src/button/button.js",
        //     inputs: [
        //         {
        //             source: "./src/button/index.html",
        //             var_name: "popup"
        //         },
        //         {
        //             source: "./src/button/style.css",
        //             var_name: "popupStyle"
        //         },
        //     ],
        // },
        // {
        //     outpath: "./build/widget.js",
        //     main_path: "./src/widget/widget.js",
        //     inputs: [
        //         {
        //             source: "./src/popup/popup.html",
        //             var_name: "popupContent"
        //         },
        //         {
        //             source: "./src/popup/style.css",
        //             var_name: "widgetStyle"
        //         },
        //         {
        //             source: "./src/widget/button.css",
        //             var_name: "buttonStyle"
        //         },
        //         {
        //             source: "./src/widget/widget.html",
        //             var_name: "widget"
        //         },
        //     ],
        // },
        {
            outpath: "./build/test.js",
            main_path: "./src/test/index.js",
            inputs: [
                {
                    source: "./src/test/index.html",
                    var_name: "html"
                },
                {
                    source: "./src/test/style.css",
                    var_name: "style"
                },
                {
                    source: "./src/test/popup.html",
                    var_name: "popup"
                },
            ],
        },
    ],

};
