async function fillContinentDropdown() {
  const { continents } = await graphqlQuery(`
    query {
      continents {
        code
        name
      }
    }
  `)
  const select = document.querySelector('select')
  const createOption = (continent) => {
    const option = new Option(continent.name, continent.code)
    select.appendChild(option)
  }
  continents.forEach(createOption)
  console.log(select)
}

async function graphqlQuery(query) {
  const response = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  })
  const jsonObject = await response.json()
  return jsonObject.data
}

fillContinentDropdown()
