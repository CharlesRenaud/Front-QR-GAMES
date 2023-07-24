import React, { useState, useEffect, useRef } from "react";
import MayaGame from "./scripts/MayaGame";


const QrChecker = (props) => {

    const { scriptLinked } = props.props;

    return (
        <div className="QrChecker">
            {scriptLinked === "MayaQrGenerator" ? <MayaGame props={props} /> : window.location.href = "/"}
        </div>
    );
}

export default QrChecker;
