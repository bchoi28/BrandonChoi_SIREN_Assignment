import React, { useState } from "react";
import { createPerson, addMovie, addFriend, findMostPopularMovieBFS, findMostPopularMovieDFS } from "../utils";
import PersonList from "../PersonList";
import MovieList from "../MovieList";
import './FindMostPopularMovie.css';

const FindMostPopularMovie = () => {

    // state variables for adding movies
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [newMovie, setNewMovie] = useState("");

    // create people, Brandon being the root
    const brandon = createPerson("Brandon");
    const mark = createPerson("Mark");
    const joe = createPerson("Joe");
    const emily = createPerson("Emily");
    const sarah = createPerson("Sarah");
    const andrew = createPerson("Andrew");
    const taylor = createPerson("Taylor");

    // create a person list array
    const personList = [brandon, mark, joe, emily, sarah, andrew, taylor];

    // establish the network
    addFriend(brandon, mark, joe);
    addFriend(mark, emily, sarah);
    addFriend(joe, andrew, taylor)

    // add liked movies to the network
    addMovie(brandon, "Movie1", "Movie2", "Movie3");
    addMovie(mark, "Movie1");
    addMovie(joe, "Movie1", "Movie2", "Movie4");
    addMovie(emily, "Movie1", "Movie2");
    addMovie(sarah, "Movie3", "Movie4");
    addMovie(andrew, "Movie2", "Movie3");
    addMovie(taylor, "Movie1", "Movie4", "Movie5");

    // find most popular movie of brandon's network
    const { maxCount, mostPopularMovie } = findMostPopularMovieBFS(brandon);
    // const { maxCount, mostPopularMovie } = findMostPopularMovieDFS(brandon);

    // function to handle movie addition
    const handleAddMovie = () => {
        if (selectedPerson && newMovie) {
            addMovie(selectedPerson, newMovie);
            setNewMovie("");
        }
    };

    return (
        <div className="main-container">
            <header className="main-header">Find The Most Popular Movie</header>
            <div className="network-movies-container">
                <div className="network-container">
                    <div className="network-header">Network</div>
                    <div className="network-list">
                        <PersonList person={brandon} />
                    </div>
                </div>
                <div className="movies-container">
                    <div className="movies-header">Movies</div>
                    <div className="movies-list">
                        <MovieList person={brandon} />
                    </div>
                </div>
            </div>
            <div className="result-container">The Most Popular Movie is:
                <div className="result">{mostPopularMovie}</div>
                <div>with a count of {maxCount}</div>
                <div className="add-movie-bar" >
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        value={newMovie}
                        onChange={(e) => setNewMovie(e.target.value)}
                    />
                    <select
                        value={selectedPerson ? selectedPerson.name : ""}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                    >
                        <option value="">Select a person</option>
                        {personList.map((person, idx) => (
                            <option key={idx} value={person.name}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddMovie}>Add Movie</button>
                </div>
            </div>

        </div>
    )
};

export default FindMostPopularMovie;
