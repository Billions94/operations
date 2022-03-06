import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Songs } from './interfaces'

function App() {
  const [songs, updateSongs] = useState<Songs>()

  const getData = async () => {
    try {
      const data = await API.get('myOpApi', '/songs', {})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      test
    </div>
  )
}

export default App
