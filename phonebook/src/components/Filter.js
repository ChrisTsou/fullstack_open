import React from "react"

function Filter({filterString, setFilterString}){
  const handleFilterChange = (event) => setFilterString(event.target.value);

  return(
    <div>
      <input onChange={handleFilterChange} value={filterString} />
    </div>
    )
}

export default Filter
