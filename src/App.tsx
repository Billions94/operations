import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import * as RB from 'react-bootstrap'
import { Songs, Jobs } from './interfaces'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { convertToObject } from 'typescript';

function App() {

  const [songs, updateSongs] = useState({
    title: '',
    artist: '',
    album: ''
  })

  async function getData() {
    try {
      const data = await API.get('mysongapi', '/songs/title', {})
      console.log(data)
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <RB.Row className='justify-content-center'>
        <RB.Col className='mt-5' md={5}>
          <RB.Form>
            <RB.FormGroup>
              <RB.FormControl
                value={songs.title}
                placeholder="Song title"
                onChange={(e) => updateSongs({ ...songs, title: e.target.value })} />
            </RB.FormGroup>

            <RB.FormGroup>
              <RB.FormControl
                value={songs.title}
                placeholder="Song artist name"
                onChange={(e) => updateSongs({ ...songs, artist: e.target.value })} />
            </RB.FormGroup>

            <RB.FormGroup>
              <RB.FormControl
                value={songs.title}
                placeholder="Song album"
                onChange={(e) => updateSongs({ ...songs, album: e.target.value })} />
            </RB.FormGroup>
          </RB.Form>
        </RB.Col>
      </RB.Row>
    </div>
  )
}

// export default App
export default withAuthenticator(App)
