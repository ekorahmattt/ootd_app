import { useRef, useState } from 'react'
import CameraComp from './components/Camera'
import Webcam from "react-webcam"

// interface ResponseData{
//   "message" : string;
// }

export default function App() {
  const webcamRef = useRef<Webcam>(null)
  const [image, setImage] = useState<string | null>(null)
  const [garment, setGarment] = useState<string>('tshirt')
  const [model, setModel] = useState<File | null>(null)
  // const [responseData, setResponseData] = useState<ResponseData | null>(null)

  const handleCapture = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot()

      if (capturedImage){
        const cleanBase64String = capturedImage.split(",")[1];
        // console.log(cleanBase64String)
      
        const byteCharacters = atob(cleanBase64String);
        // console.log(byteCharacters)
        const byteNumb = Array.from(byteCharacters, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumb)
        // console.log(byteArray)

        const blob = new Blob([byteArray], {type:"image/png"})
        // console.log(blob)
        const file = new File([blob], "model_img", {type:"image/png"})
        setModel(file)
        console.log(model)
      }
      setImage(capturedImage || null)
      // console.log(capturedImage)
    }
    if (image) {
      setImage(null)
    }
  }

  const handleGarment = (name: string) =>{
    setGarment(name)
  }

  const handleUpload = async() => {
    if(!image) {
      alert("Please Capture an Image first!")
      return;
    }

    const formData = new FormData()
    formData.append("garment_img", garment)
    if(model) formData.append("model_img", model)

    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      })

      if(response.ok){
        const result = await response.json()
        // setResponseData(result)
        alert(result.clothes)
        console.log("Upload Successful", result)
      }else{
        console.error("Upload Failed: ", response.statusText)
      }
    } catch (error) {
      console.error("Error uploading files: ", error)
    }
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

              <button className="btn w-1/4 bg-blue-500 text-slate-100" onClick={handleUpload}>Try</button>
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