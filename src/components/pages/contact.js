import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default function () {
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

                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="envelope" />
                        </div>
                        <div className="text">
                            jdog1123@gmail.com
                        </div>

                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="map-marked-alt" />
                        </div>
                        <div className="text">
                            Sandy, UT
                        </div>

                    </div>

                </div>


            </div>

        </div>

    )
}