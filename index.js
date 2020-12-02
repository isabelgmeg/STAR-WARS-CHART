const url = 'https://swapi.dev/api/films/'

const spliceFn = (string) => string.split('-')

const getYear = (array) =>{
  let newArray = []
  let newDates = array.map((dateString)=>{
    return spliceFn(dateString)
  })
  console.log(newDates)
  newDates.forEach((date)=>{
    newArray.push(parseInt(date[0]))
  })
  return newArray
}


const getInfo = () => {
    fetch(url)
        .then((res) => res.json())
        .then((result) => {
            //console.log(result.results)
            let filmArray = result.results.map((film) =>{
              return film.title
              })
            let yearArray = result.results.map((film) =>{
              return film.release_date
              })
            let dateFormatted = getYear(yearArray)
            //console.log(filmArray,dateFormatted)

            let data = {
                "labels": filmArray ,
                "series": [dateFormatted]
              }
              console.log(data)

            new Chartist.Line('#ct-chart', data);

        })
        .catch((error) => {
            console.log(error.message)
        })
}

let urlCharacters = 'https://swapi.dev/api/people/'


const getInfoCharacters = () => {
    fetch(urlCharacters)
        .then((res) => res.json())
        .then((result) => {
            //console.log(result.results)
            let charactersArray = result.results.map((character) =>{
              return character.name
              })
            let filmsArray = result.results.map((film) =>{
              return film.films
              })
            let filmsArrayLength = filmsArray.map((characterInArray)=>{
              return characterInArray.length
            })
            //console.log(filmsArrayLength,charactersArray)
            let data = {
                "series": [filmsArrayLength],
                "labels": charactersArray
              }
            console.log(data)

            new Chartist.Bar('#ct-chart-bar', data);

        })
        .catch((error) => {
            console.log(error.message)
        })
}


getInfo()

getInfoCharacters()


