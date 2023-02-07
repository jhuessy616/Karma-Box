import React from 'react'

function Film() {
  return (
    <div classname="videocontainer">
      <h1 className="txtcenter videotitle">Mermaids Against Plastic The Documentary</h1>{" "}
      <h3 className="txtcenter videoinfo">
        A Free Roaming Studios production made possible with the support of the National Geographic Society and the Conservation Media
        Group
      </h3>
      <div className="tamaravideo">
        <video width="640" height="360" controls autoplay>
          <source
            src="https://www.dropbox.com/s/lbdnzkqsgps9j4j/tamaraunderwater.mov?raw=1"
            type="video/mp4"
          />
        </video>
      </div>
      <p className="txtcenter"> See the full film on Vimeo: <a href="https://vimeo.com/372952803"> {""} Mermaids Against Plastic: Tamara
        </a>{" "}
      </p>
    </div>
  );
}

export default Film