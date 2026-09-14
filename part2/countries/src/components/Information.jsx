import Weather from "./Weather";

const Information = ({ filtered, query, toggleInfo, showAll, requestWeather }) => {

    const tooMany = query.length >= 1 && filtered.length > 10;
    const listMode = query.length > 1 && filtered.length > 1 && filtered.length <= 10;
    const single = query.length > 1 && filtered.length === 1;

    return (
        <>

            {tooMany && (
                <div>Too many results</div>
            )}
            {listMode && (
                <div>
                    {filtered.map(item => (
                        <div key={item.name.common}>
                            <li >{item.name.common}</li>
                            <button onClick={() => toggleInfo(item.name.common)}>{showAll[item.name.common] ? "Collapse" : "Show"}</button>
                            {showAll[item.name.common] && (
                                <div>
                                    <h1>{item.name.official}</h1>
                                    <p>Capital: {item.capital}</p>
                                    <p>Area: {item.area} km²</p>
                                    <h2>Languages:</h2>
                                    <ul>{Object.values(item.languages).map(item => (
                                        <li key={item}>{item}</li>
                                    ))}</ul>
                                    <br />
                                    <img src={item.flags.png} />
                                    <Weather coords={item.capitalInfo}  capital={item.capital}/>
                                </div>
                            )}
                            <br />
                            <br />
                        </div>
                    ))}
                    
                </div>
            )}

            {single && (
                <div>
                    <h1>{filtered[0].name.official}</h1>
                    <p>Capital: {filtered[0].capital}</p>
                    <p>Area: {filtered[0].area} km²</p>
                    <h2>Languages:</h2>
                    <ul>{Object.values(filtered[0].languages).map(item => (
                        <li key={item}>{item}</li>
                    ))}</ul>
                    <img src={filtered[0].flags.png} />
                    <Weather coords={filtered[0].capitalInfo}  capital={filtered[0].capital}/>
                </div>
            )}
        </>
    )
}
export default Information