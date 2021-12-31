import React from "react";
import "./Joke.css";

const Joke = ({id, joke, vote, upVote, downVote}) => {
    return (
        <div className="Joke">
            <div className="Joke-buttons">
                <i className="fas fa-arrow-up" onClick={upVote}></i>
                {vote}
                <i className="fas fa-arrow-down" onClick={downVote}></i>
            </div>
            
            <div className="Joke-text">{joke}</div>
            <div className="Joke-smiley">SMILEY</div>
        </div>
    );
}

export default Joke;