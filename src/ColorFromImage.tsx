import React from 'react'
import { FC, ImgHTMLAttributes, useEffect, useRef, useState } from 'react'

function getElementPosition(obj: any) {
  var curleft = 0,
    curtop = 0
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft
      curtop += obj.offsetTop
    } while ((obj = obj.offsetParent))
    return { x: curleft, y: curtop }
  }
  return undefined
}

function getEventLocation(element: any, event: any) {
  var pos: any = getElementPosition(element)

  return {
    x: event.pageX - pos.x,
    y: event.pageY - pos.y
  }
}

function rgbToHex(r: any, g: any, b: any) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component'
  return ((r << 16) | (g << 8) | b).toString(16)
}

export interface ColorFromImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  hideColor?: boolean
  onChangeColor?: (hexColor: string) => void
  onChooseColor?: (hexColor: string) => void
}

let Img: HTMLImageElement

const ColorFromImage: FC<ColorFromImageProps> = ({
  hideColor,
  onChangeColor,
  onChooseColor,
  ...props
}) => {
  const canvasRef = useRef(null)

  const [hexColor, setHexColor] = useState<any>('')

  useEffect(() => {
    Img = new Image()
    Img.crossOrigin = 'Anonymous'

    Img.addEventListener('load', function () {
      // The image can be drawn from any source
      const canvas: any = canvasRef.current
      let context = canvas.getContext('2d')
      context.globalCompositeOperation = 'copy'
      canvas.width = Img.width
      canvas.height = Img.height
      context.drawImage(
        Img,
        0,
        0,
        Img.width,
        Img.height,
        0,
        0,
        canvas.width,
        canvas.height
      )
    })

    for (var key in props) {
      Img.setAttribute(key, (props as any)[key])
    }
  }, [props.src])

  return (
    <div>
      <canvas
        style={{
          cursor: 'crosshair',
          ...(props.style && props.style)
        }}
        ref={canvasRef}
        onMouseMove={(e) => {
          var eventLocation = getEventLocation(canvasRef.current, e)
          // Get the data of the pixel according to the location generate by the getEventLocation function
          const canvas: any = canvasRef.current
          const context = canvas.getContext('2d')
          var pixelData = context.getImageData(
            eventLocation.x,
            eventLocation.y,
            1,
            1
          ).data

          var hex =
            '#' +
            (
              '000000' + rgbToHex(pixelData[0], pixelData[1], pixelData[2])
            ).slice(-6)

          setHexColor(hex)
          if (onChangeColor) onChangeColor(hex)
        }}
        onClick={() => {
          if (onChooseColor) onChooseColor(hexColor)
        }}
      />
      {!hideColor && (
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            margin: '0 10px'
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: hexColor
            }}
          />
          <span>{hexColor}</span>
        </div>
      )}
    </div>
  )
}
export default ColorFromImage
