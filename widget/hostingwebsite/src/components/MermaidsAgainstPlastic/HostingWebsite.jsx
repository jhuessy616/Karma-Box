import React from 'react'
import AboutSite from './AboutSite'
import SiteBanner from './SiteBanner'
import Images from "./Images";
import Film from "./Film";

import "./hostingwebsite.css"

function HostingWebsite() {
    return (
      <div>
        <SiteBanner />
            <AboutSite />
            <Images />
            <Film/>
      </div>
    );
}

export default HostingWebsite