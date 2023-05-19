
const container = document.querySelector('#container')
container.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const season = getSeason()
    const round = getRound()
    handleDriverData(await f1ApiCall(season, round))
    
})


function handleDriverData(driverInfo){
    for(let i=0; i<driverInfo.slice(0,7).length;i++){
        let name = document.createElement('p')
        let name2 = document.createElement('p')
        let position = document.createElement('p')
        let points = document.createElement('p')
        let team = document.createElement('p')
        let nationality = document.createElement('p')
        
        name.append(driverInfo[i].Driver.givenName)
        name2.append(driverInfo[i].Driver.familyName)
        position.append(driverInfo[i].position)
        points.append(driverInfo[i].points)
        team.append(driverInfo[i].Constructors[0].constructorId)
        nationality.append(driverInfo[i].Constructors[0].nationality)
    document.querySelector('#name').append(name)
    document.querySelector('#name2').append(name2)
    document.querySelector('#position').append(position)
    document.querySelector('#points').append(points)
    document.querySelector('#team').append(team)
    document.querySelector('#nationality').append(nationality)
    }
}
function getSeason(){
    const season = document.querySelector('#season').value
    return season
}
function getRound(){
    const round = document.querySelector('#round').value
    return round
}


const f1ApiCall = async (season,round) => {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    if(res.ok){
        const data = await res.json()
        const driverInfo = data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        return driverInfo
    }
    
    
}
 


