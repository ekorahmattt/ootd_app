import { useRef, useState } from 'react'
import CameraComp from './components/Camera'
import Webcam from "react-webcam"

export default function App() {
  const webcamRef = useRef<Webcam>(null)
  const [image, setImage] = useState<string | null>(null)
  const [garment, setGarment] = useState<string | null>('tshirt')

  const handleCapture = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot()
      setImage(capturedImage || null)
      console.log(capturedImage)
    }
    if (image) {
      setImage(null)
    }
  }

  const handleGarment = (name: string) =>{
    setGarment(name)
  }

  const tshirt = [
    {"name": "tshirt"},
    {"name": "00055_00"},
    {"name": "00126_00"},
    {"name": "03244_00"},
    {"name": "050181_1"},
    {"name": "049805_1"},
    {"name": "050191_1"},
  ]

  return (
    <>
      <div className="grid grid-cols-2">
          <div className='bg-white'>
            {image ? (
              <img src={image} alt="model" className='h-full object-cover animate-appear'/>
            ) : (
              <CameraComp ref={webcamRef} width={768} height={1024} />
            )}
          </div>

          <div className="w-full">
            
            <div className="p-5 w-1/3 m-auto">
              <img src={`/img/${garment}.jpg`} alt="tshirt" />
            </div>
            
            <div className="pb-3 flex justify-center gap-5">
              <button className="btn bg-blue-500 text-slate-100" onClick={handleCapture}>
                <span className="material-symbols-outlined">photo_camera</span>
              </button>

              <button className="btn w-1/4 bg-blue-500 text-slate-100">Try</button>
            </div>

            {/* Select Option */}
            <div className="ps-10 pt-5 flex flex-wrap gap-7 overflow-y-auto max-h-96">
              
              {
                tshirt.map((item)=> (
                  <div className="card w-1/4 hover:border-4 hover:border-blue-500" onClick={() => handleGarment(item.name)}>
                    <figure>
                        <img src={`/img/${item.name}.jpg`} alt={item.name} className="rounded-t-2xl" />
                    </figure>
                  </div>
                ))
              }
              
            </div>
          </div>
      </div>
    </>
  )
}