import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Songs, Jobs } from './interfaces'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  // const [songs, updateSongs] = useState<Songs>()
  const [query, updateQuery] = useState('')
  const [searchData, updateSearchData] = useState<Jobs[] | []>([])

  // const getData = async () => {
  //   try {
  //     const data = await API.get('myOpApi', '/songs', {})
  //     console.log(data)
  //   } catch (error) { console.log(error) }
  // }

  const search = async () => {
    try {
      const searchData = await API.post('myOpApi', '/jobs', { body: { search: query } })
      if (searchData) {
        console.log('search data:', searchData)
      } else throw new Error('Cannot find job')
    } catch (error) { console.log(error) }
  }

  // useEffect(() => {
  //   search()
  // }, [query])

  return (
    <div className="App">
      test

      <input onChange={(e) => updateQuery(e.target.value)} />
      <button onClick={search}>
        search
      </button>
      {
        searchData.map((job, i) => (
          <div key={i}>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App

// export default withAuthenticator(App)
