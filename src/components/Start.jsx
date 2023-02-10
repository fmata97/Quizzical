import React from "react";
import blob_medium_blue from "../assets/blob-medium-blue.svg"
import blob_large_yellow from "../assets/blob-large-yellow.svg"

export default function Start() {
    return (
        <div className="Start">
            <div className="Start-main">
                <h1>Quizzical</h1>
                <h4>The best trivia game</h4>
                <button>Start quiz</button>
            </div>

            <img className="blob blob-medium-blue" src={blob_medium_blue}/>
            <img className="blob blob-large-yellow" src={blob_large_yellow}/>
        </div>
    )
}