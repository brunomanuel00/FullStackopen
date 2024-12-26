const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            <span>find countries</span>
            <input type="text" value={search} onChange={handleSearch} />
        </div>
    )

}

export default Filter;