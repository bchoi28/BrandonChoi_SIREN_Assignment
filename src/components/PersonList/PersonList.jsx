// recursive person list component
const PersonList = ({ person }) => {
    return (
        <div >
            <div >{person.name}</div>
            <ul >
                {person.friends.map((friend, idx) => (
                    <li key={idx}>
                        <PersonList person={friend} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonList;
