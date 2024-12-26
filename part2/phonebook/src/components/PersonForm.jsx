const PersonForm = ({ formProps }) => {

    return (
        <>
            <form onSubmit={formProps.addName}>
                <div>
                    name: <input value={formProps.newName} onChange={formProps.handleNameChange} />
                    <div>number: <input value={formProps.newPhone} onChange={formProps.handlePhoneChange} /></div>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm;