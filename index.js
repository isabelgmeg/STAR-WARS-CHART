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

console.log(getInfo())

