const Country = ({ query, handleQuery }) => {

    return (
        <>
        Find countries <input value={query} onChange={handleQuery}/>
        </>
    )
}
export default Country