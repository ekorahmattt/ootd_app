import { useRef, useState } from 'react'
import CameraComp from './components/Camera'
import Webcam from "react-webcam"

export default function App() {
  const webcamRef = useRef<Webcam>(null)
  const [image, setImage] = useState<string | null>(null)

  const handleCapture = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot()
      setImage(capturedImage || null)
    }
    if (image) {
      setImage(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2">
          <div>
            {image ? (
              <img src={image} alt="model" className='h-full object-cover'/>
            ) : (
              <CameraComp ref={webcamRef} width={768} height={1024} />
            )}
          </div>

          <div className="w-full">
            
            <div className="p-5 w-1/3 m-auto">
              <img src="/img/tshirt.jpg" alt="tshirt" />
            </div>
            
            <div className="pb-3 flex justify-center gap-5">
              <button className="btn bg-blue-500 text-slate-100" onClick={handleCapture}>
                <span className="material-symbols-outlined">photo_camera</span>
              </button>

              <button className="btn w-1/4 bg-blue-500 text-slate-100">Try</button>
            </div>

            {/* Select Option */}
            <div className="p-5 flex flex-wrap gap-10 overflow-y-auto max-h-96">
              
              <div className="card w-1/4 hover:border-4 hover:border-blue-500">
                <figure>
                  <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl"/>
                </figure>
              </div>

              <div className="card w-1/4 hover:border-4 hover:border-blue-500">
                <figure>
                  <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl" />
                </figure>
              </div>

              <div className="card w-1/4 hover:border-4 hover:border-blue-500">
                <figure>
                  <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl" />
                </figure>
              </div>

              <div className="card w-1/4 hover:border-4 hover:border-blue-500">
                <figure>
                  <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl" />
                </figure>
              </div>
              
            </div>
          </div>
      </div>
    </>
  )
}