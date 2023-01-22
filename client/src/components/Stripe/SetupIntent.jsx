import { useState, useEffect } from "react"

function SetupIntent() {
  const [customerId, setCustomerId]

  let baseURL = 'http://localhost/4000/'

  useEffect(() => {
    let url = `${baseURL}api/create-customer`
    fetch(url).then
  })

  return (
    <div>SetupIntent</div>
  )
}

export default SetupIntent