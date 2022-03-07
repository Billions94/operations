import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Songs, Jobs } from './interfaces'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {


  return (
    <div className="App">

    </div>
  )
}

// export default App
export default withAuthenticator(App)
