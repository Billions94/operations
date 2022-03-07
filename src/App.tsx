import { API, Auth } from 'aws-amplify'
import { FormEvent, useEffect, useState } from 'react'
import * as RB from 'react-bootstrap'
import { Songs, Jobs } from './interfaces'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { convertToObject } from 'typescript';

function App() {

  const [song, updateSong] = useState({
    title: '',
    artist: '',
    album: ''
  })

  const [songs, updateSongs] = useState<Songs[]>([])

  async function getData() {
    try {
      const data = await API.get('mysongapi', '/songs/title', {})
      updateSongs(data)
    } catch (error) { console.log(error) }
  }

  async function signOut() {
    try {
      await Auth.signOut()
    } catch (error) { console.log(error) }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const data = await API.post('mysongapi', '/songs', {
      body: {
        title: song.title,
        artist: song.artist,
        album: song.album
      }
    })
    updateSongs([...songs, data])
    updateSong({
      title: '',
      artist: '',
      album: ''
    })
  }

  useEffect(() => {
    getData()
  }, [song])

  return (
    <div className="App">
      <RB.Row className='justify-content-center'>
        <RB.Col className='mt-5' sm={5} md={5}>
          <RB.Form>
            <RB.FormGroup>
              <RB.FormControl
                value={song.title}
                placeholder="Song title"
                onChange={(e) => updateSong({ ...song, title: e.target.value })} />
            </RB.FormGroup>

            <RB.FormGroup>
              <RB.FormControl
                value={song.artist}
                placeholder="Song artist name"
                onChange={(e) => updateSong({ ...song, artist: e.target.value })} />
            </RB.FormGroup>

            <RB.FormGroup>
              <RB.FormControl
                value={song.album}
                placeholder="Song album"
                onChange={(e) => updateSong({ ...song, album: e.target.value })} />
            </RB.FormGroup>

            <RB.Button
              onClick={handleSubmit}
              variant='primary'
              className='mt-3'>
              add song
            </RB.Button>
          </RB.Form>
          <ul>
            {songs.map((song, i) => (
                <li key={i}>{song.title}</li>
            ))}
          </ul>


          <RB.Button onClick={signOut}
            variant='warning'
            className='mt-3'>
            sign Out
          </RB.Button>
        </RB.Col>
      </RB.Row>
    </div>
  )
}

// export default App
export default withAuthenticator(App)
