import React from 'react'

import ColorFromImage from 'color-from-image'
import 'color-from-image/dist/index.css'

const App = () => {
  return (
    <ColorFromImage
      style={{ width: 500, height: 500 }}
      src='https://picsum.photos/300'
    />
  )
}

export default App
