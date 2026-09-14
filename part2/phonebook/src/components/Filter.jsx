const Filter = ({ handleFiltered, filtered }) => {
    return (
        <>
            <div>
                Filter:
                <input
                    onChange={handleFiltered}
                    value={filtered}
                />
            </div>
        </>
    )
}

export default Filter
