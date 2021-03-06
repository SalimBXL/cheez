import React, { useState, useEffect } from "react";
import "./JokeList.css";
import uuid from "react-uuid";
import logo from "./logo2.png";
import axios from "axios";
import Joke from "./Joke";

const API_URL = "https://icanhazdadjoke.com/";

const JokeList = ({numJokesToGet}) => {
    const [jokes, setJokes] = useState(
            JSON.parse(window.localStorage.getItem("jokes") || "[]")
        );
    const [loading, setLoading] = useState(false);
    const seenJokes = new Set(jokes.map(joke => joke.joke));

    useEffect(() => {
        (jokes.length === 0) && fetchJokes();
    },[])

    function handleClick() {
        fetchJokes();
    }

    async function fetchJokes() {
        setLoading(true);
        try {
            const _jokes = [];
            while(_jokes.length < numJokesToGet) {
                let response = await axios.get(API_URL, {headers: {"Accept": "application/json"}});
                let data = await response.data;
                const joke = data.joke;
                (!seenJokes.has(joke)) && _jokes.push(
                    { id: uuid(), joke: data.joke, vote: 0}
                );
            }
            setJokes(prevs => {
                const news = [...prevs, ..._jokes];
                window.localStorage.setItem("jokes", JSON.stringify(news));
                return news;
            });
        } catch(e) {
            alert(e);
        }
        setLoading(false);
    }

    const handleVote = (id, delta) => {
        setJokes((prevs) => {
            const news = prevs.map((prev) => {
                return {
                    ...prev,
                    vote: (prev.id === id) ? (prev.vote + delta) : prev.vote
                }}
            );
            window.localStorage.setItem("jokes", JSON.stringify(news));
            return news;
        });
    }

    const loadingScreen = () => (
        <div className="JokeList-spinner">
            <i className="far fa-8x fa-laugh fa-spin"></i>
            <h1 className="JokeList-title">Loading...</h1>
        </div>);

    const jokeList = jokes.sort((a,b) => b.vote - a.vote).map((joke, idx) => (
        <Joke   key={joke.id} 
                id={joke.id} 
                joke={(idx+1) + "/" + jokes.length + " - " + joke.joke}
                vote={joke.vote}
                upVote={() => handleVote(joke.id, 1)}
                downVote={() => handleVote(joke.id, -1)}
        />));

    const jokeListScreen = () => (
        <div className="JokeList">
            <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad</span> Jokes
                </h1>
                <h2 className="JokeList-subtitle">React Random Dad's Joke Demo</h2>
                <img className="JokeList-logo" src={logo} alt="logo"></img>
                <button className="JokeList-button" onClick={handleClick}>New Jokes</button>
            </div>
            <div className="JokeList-jokes">
                {jokeList}
            </div>
        </div>);

    return (loading) 
        ? loadingScreen()
        : jokeListScreen();
}

JokeList.defaultProps = {
    numJokesToGet: 10
}

export default JokeList;