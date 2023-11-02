// recursive movie list component
const MovieList = ({ person }) => {
    return (
        <div >
            <div style={{ marginBottom: '5px' }} >{person.name}'s Movies</div>
            <ul style={{ marginBottom: '10px' }}>
                {person.movies.map((movie, idx) => (
                    <li key={idx}>{movie}</li>
                ))}
            </ul>
            <ul >
                {person.friends.map((friend, idx) => (
                    <li key={idx}>
                        <MovieList person={friend} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;