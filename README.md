# color-from-image

> Pick color from an image

[![NPM](https://img.shields.io/npm/v/color-from-image.svg)](https://www.npmjs.com/package/color-from-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save color-from-image
```

## Usage

```tsx
import React from 'react'

import ColorFromImage from 'color-from-image'

const App = () => {
  return <ColorFromImage src='...' />
}

export default App
```

## Documentation

You can use all <img /> attributes.

| Parameter       | Type                         | Description                  |
| :-------------- | :--------------------------- | :--------------------------- |
| `hideColor`     | `boolean`                    | To hide color view in hex.   |
| `onChangeColor` | `(hexColor: string) => void` | To get color on mouse moved. |
| `onChooseColor` | `(hexColor: string) => void` | To get color on click.       |

## License

MIT © [abdulrahmanAlh](https://github.com/abdulrahmanAlh)
