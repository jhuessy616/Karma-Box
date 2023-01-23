import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import "./Docs.css"
import { UncontrolledTooltip } from "reactstrap";

export default function Docs(props) {

    let widgetCode = `<!-- karma box widget -->
<script src="karmabox.com/addon/widget"></script>`;
    let buttonCode = `<!-- karma box button -->
<script src="karmabox.com/addon/button"></script>`;
                            
    function copyToClipboard(e) {
        navigator.clipboard.writeText(e.target.textContent)
    }

    return (
        <div className="doc-wrapper">
        <div className="doc-container">
            <h1>How to add the Karma Box widget/button to your website</h1>
            <hr/>
            <h2>Add the karmabox button</h2>
            <p className="inline">
                add a standard button to the page and give it the class 
                <code id="copy-tooltip" onClick={copyToClipboard} className="copy inline"> karmabox-button</code>
                <UncontrolledTooltip placement="bottom" target="copy-tooltip">copy</UncontrolledTooltip>
            </p>
            <p>Then copy and past the following code to the bottom of your page.</p>
            <CopyBlock
                text={buttonCode}
                language="html"
                showLineNumbers={false}
                theme={dracula}
                wrapLines
            />

            <hr/>
            <br/>

            <h2>Add the Karma Box widget</h2>
            <p>Copy and past the following code to the bottom of your page.</p>
            <CopyBlock
                text={widgetCode}
                language="html"
                showLineNumbers={false}
                theme={dracula}
                wrapLines
            />
        </div>
        </div>
    );
}
