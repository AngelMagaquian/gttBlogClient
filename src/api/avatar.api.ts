export const getAvatar = async()=>{
    const result = await fetch('https://rickandmortyapi.com/api/character', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await result.json()
    return res.results.map((e :any)=>(
        {img:e.image, name: e.name}
    ))
}