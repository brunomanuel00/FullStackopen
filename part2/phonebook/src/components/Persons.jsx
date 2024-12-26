const Persons = ({ person, handleDelete }) => {
    return (
        <li style={{ listStyle: 'none' }}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)} style={{ marginLeft: 6 }}>delete</button>
        </li>
    )
}

export default Persons