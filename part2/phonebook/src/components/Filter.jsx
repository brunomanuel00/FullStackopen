const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            <span>filter shown with</span>
            <input type="text" value={search} onChange={handleSearch} />
        </div>
    )

}

export default Filter;