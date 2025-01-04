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
  }

  return (
    <>
      <div className="flex h-screen">
          <div>
            {image ? (
              <img src="/img/model_6.png" alt="model" className="h-screen" />
            ) : (
              <CameraComp ref={webcamRef} />
            )}
          </div>

          <div className="w-1/2">
            <div className="w-full">
              
              <div className="w-1/3 m-auto p-5">
                <img src="/img/tshirt.jpg" alt="tshirt" />
              </div>
              
              <div className="flex justify-center gap-5">
                <button className="btn bg-red-500 text-slate-100" onClick={handleCapture}>
                  <span className="material-symbols-outlined">photo_camera</span>
                </button>

                <button className="btn w-1/4 bg-red-500 text-slate-100">Try</button>
              </div>

              <div className="p-3 flex flex-wrap justify-center gap-5">
                <div className="card w-1/4">
                  <figure>
                    <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl"/>
                  </figure>
                </div>

                <div className="card w-1/4">
                  <figure>
                    <img src="/img/tshirt.jpg" alt="tshirt" className="rounded-t-2xl" />
                  </figure>
                </div>
                
              </div>
            </div>
          </div>
      </div>
    </>
  )
}