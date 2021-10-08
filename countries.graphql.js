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

export async function fetchContinents() {
  const { continents } = await graphqlQuery(`
    query getContinents {
      continents {
        code
        name
      }
    }
  `)
  return continents
}

export async function fetchCountries(continentCode) {
  const { continent } = await graphqlQuery(
    `
      query getCountries($code: ID!) {
        continent(code: $code) {
          countries {
            name
          }
        }
      }
    `,
    { code: continentCode }
  )
  return continent.countries
}
