import { CopyBlock, dracula, monoBlue, tomorrowNightBlue } from "react-code-blocks";
import "./Docs.css"

export default function Docs() {

    let widgetCode = `<!-- karma box widget -->
<script src="https://js.stripe.com/v3/"></script>
<script type="text/javascript" src="https://karmabox.com/widget.js"></script>`;
                            

    return (
        <div className="doc-wrapper">
        <div className="doc-container">
            <h1>How to add the Karma Box widget to your website</h1>
            <hr/>
            <h2>Add the Karma Box widget</h2>
            <p>Copy and past the following code to the bottom of your body tag.</p>
            <CopyBlock
                text={widgetCode}
                language="html"
                showLineNumbers={false}
                theme={tomorrowNightBlue}
                wrapLines
            />
        </div>
        </div>
    );
}
