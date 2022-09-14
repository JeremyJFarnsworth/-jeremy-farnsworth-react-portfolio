import React from "react"
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default function() {
    return (
        <div className="content-page-wrapper">
            <div 
            className="left-column"
            style={{
                background: "url(" + loginImg + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
            >

            </div>
            <div className="right-column">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium blanditiis commodi voluptas itaque officia eius minus dicta eaque corporis totam? Ea expedita, quod nesciunt perspiciatis odit dolore reprehenderit reiciendis quidem.
            </div>
        </div>
    )
}

