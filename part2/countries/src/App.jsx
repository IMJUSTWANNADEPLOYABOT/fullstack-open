import Country from "./components/Country"
import Information from "./components/Information"
import axios from "axios"
import { useState, useEffect } from "react"

const App = () => {

  const [query, setQuery] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [showAll, setShowAll] = useState({})

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setAllCountries(response.data))

  }, [])

  const toggleInfo = (name) => {
    setShowAll(item => ({
      ...item, [name]: !item[name]
    }))
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const filtered = allCountries.filter(item => (
    item.name.common.toLowerCase().includes(query.toLowerCase())

  ))

  return (
    <>
      <h1>Countries Information</h1>
      <Country query={query} handleQuery={handleQuery} />
      <Information
        filtered={filtered}
        query={query}
        showAll={showAll}
        setShowAll={setShowAll}
        toggleInfo={toggleInfo}

      />
    </>
  )

}

export default App