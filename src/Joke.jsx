import React from "react";
import "./Joke.css";

const Joke = ({id, joke, vote, upVote, downVote}) => {

    const getColor = () => {
        if (vote >= 15) return "#4CAF50";
        if (vote >= 12) return "#8BC34A";
        if (vote >= 9) return "#CDDC39";
        if (vote >= 6) return "#FFEB3B";
        if (vote >= 3) return "#FFC107";
        if (vote >= 0) return "#FF9800";
        return "#F44336";
    }

    const getEmoji = () => {
        if (vote >= 15) return "far fa-grin-squint-tears";
        if (vote >= 12) return "far fa-laugh-beam";
        if (vote >= 9) return "far fa-laugh-wink";
        if (vote >= 6) return "far fa-meh";
        if (vote >= 3) return "far fa-meh-rolling-eyes";
        if (vote >= 0) return "far fa-flushed";
        return "far fa-angry";
    }

    return (
        <div className="Joke">
            
            <div className="Joke-buttons">
                <i className="fas fa-arrow-up" onClick={upVote}></i>
                <span className="Joke-votes" style={{borderColor: getColor()}}>{vote}</span>
                <i className="fas fa-arrow-down" onClick={downVote}></i>
            </div>
            
            <div className="Joke-text">
                {joke}
            </div>

            <div className="Joke-emoji">
                <i className={getEmoji()}></i>
            </div>
            
        </div>
    );
}

export default Joke;