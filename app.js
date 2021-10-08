import { fetchContinents, fetchCountries } from './countries.graphql.js'

async function showCountries(event) {
  const continentCode = event.target.value
  const countries = await fetchCountries(continentCode)
  const ul = document.querySelector('ul')

  ul.innerHTML = ''

  const createItem = (country) => {
    const li = document.createElement('li')
    li.textContent = country.name
    ul.appendChild(li)
  }

  countries.forEach(createItem)
}

async function fillContinentDropdown() {
  const continents = await fetchContinents()
  const select = document.querySelector('select')

  const createOption = (continent) => {
    const option = new Option(continent.name, continent.code)
    select.appendChild(option)
  }

  continents.forEach(createOption)
  select.addEventListener('change', showCountries)
}

fillContinentDropdown()
