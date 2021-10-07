function showCountries(event) {
  const continentCode = event.target.value
  fetchCountries(continentCode)
}

async function fetchCountries(continentCode) {
  const { continent } = await graphqlQuery(`
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
  `, { code: continentCode })
  console.table(continent.countries)
}

async function fillContinentDropdown() {
  const { continents } = await graphqlQuery(`
    query getContinents {
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
  select.addEventListener('change', showCountries)
}

async function graphqlQuery(query, variables) {
  const response = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })
  const jsonObject = await response.json()
  return jsonObject.data
}

fillContinentDropdown()
