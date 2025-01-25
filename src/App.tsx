import { useEffect, useRef, useState } from 'react'
import CameraComp from './components/Camera'
import Webcam from "react-webcam"

interface WebcamDevice {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
}

export default function App() {
  const webcamRef = useRef<Webcam>(null)
  const [image, setImage] = useState<string | null>(null)
  const [garment, setGarment] = useState<string>('tshirt')
  const [model, setModel] = useState<File | null>(null)
  const [webcams, setWebcams] = useState<WebcamDevice[]>([])
  const [deviceid, setDeviceid] = useState<string>('')
  const [countdown, setCountdown] = useState<number | null>(null)
  const [fullStat,setFullstat] = useState<boolean>(false)
  const fullscreenRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    const getWebcams = async () => {
      try{
        const devices = await navigator.mediaDevices.enumerateDevices()

        const videoDevices = devices.filter(device => device.kind === 'videoinput') as MediaDeviceInfo[]

        const webcamlist: WebcamDevice[] = videoDevices.map(device => ({
          deviceId: device.deviceId,
          kind: device.kind,
          label: device.label,
          groupId: device.groupId,
        }))

        setWebcams(webcamlist)
        if (webcamlist.length > 0){
          setDeviceid(webcamlist[0].deviceId)
        }
      } catch (error) {
        console.log("Error Fetching: ",error)
      }
    }
    getWebcams()
  }, [])

  const handleSelectWebcam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceid(event.target.value)
  }

  const handleFullscreen = () => {
    if (fullscreenRef.current) {
      if(document.fullscreenElement) {
        document.exitFullscreen()
        setFullstat(false)
      } else {
        fullscreenRef.current.requestFullscreen()
        setFullstat(true)
      }
    }
  }

  // Fungsi ScreenShot Webcam
  const handleCapture = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot()

      if (capturedImage){

        // Mengubah hasil screenshot base64 menjadi file image
        const cleanBase64String = capturedImage.split(",")[1];
        const byteCharacters = atob(cleanBase64String);
        const byteNumb = Array.from(byteCharacters, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumb)
        const blob = new Blob([byteArray], {type:"image/png"})
        const file = new File([blob], "model_img", {type:"image/png"})
        setModel(file)
      }
      setImage(capturedImage || null)
    }
    if (image) {
      setImage(null)
    }
  }

  // Fungsi Hitung mundur
  const startCountdown = () => {
    let timeLeft = 3
    setCountdown(timeLeft)
    
    const timer = setInterval(() => {
      timeLeft -= 1
      if (timeLeft <= 0){
        clearInterval(timer)
        setCountdown(null)
        handleCapture()
      }else{
        setCountdown(timeLeft)
      }
    }, 1000)
  }

  // Fungsi Tombol Camera
  const handleCamera = () =>{
    if(image !== null){
      setImage(null)
    }else{
      startCountdown()
    }
  }

  // Fungsi memilih garment
  const handleGarment = (name: string) =>{
    setGarment(name)
  }

  // Fungsi kirim form screenshot dan garment ke backend
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
        setImage(result.model_img)
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

      <div className="grid grid-cols-2 bg-dark" ref={fullscreenRef}>

        {/* Kolom 1 */}
          <div className="w-full flex items-start">
            
            {/* Tombol Fullscreen */}
            <button className='btn bg-dark border-none' onClick={handleFullscreen}>
              {fullStat ? (
                <span className='material-symbols-outlined'>close_fullscreen</span>
              ) : (
                <span className='material-symbols-outlined'>open_in_full</span>
              )}
            </button>

            {/* Layout Webcam & Image */}
            <div className='bg-white w-4/5 mx-auto h-screen'>
              {image ? (
                <img src={image} alt="model" className='h-full object-cover animate-appear'/>
              ) : (
                <CameraComp deviceId={deviceid} ref={webcamRef} width={768} height={1024} />
              )}{
                countdown !== null && (
                  <div className='absolute top-0 left-0 w-1/2 h-full flex items-center justify-center text-8xl text-white animate-appear'>
                    {countdown}
                  </div>
                )
              }
            </div>
          </div>
        
        {/* Kolom 2 */}
          <div className="w-full">
            
            {/* Garment terpilih */}
            <div className="p-5 w-1/3 mx-auto">
              <img src={`/img/${garment}.jpg`} alt="tshirt" />
            </div>
            
            {/* Tombol */}
            <div className="pb-3 flex justify-center gap-5">
              {webcams.length > 0 ? (
                <select value={deviceid} onChange={handleSelectWebcam} className='select bg-primary text-white'>
                  {webcams.map((webcam) => (
                    <option key={webcam.deviceId} value={webcam.deviceId}>
                      {webcam.label || `Webcam ${webcam.deviceId}`}
                    </option>
                  ))}
                </select> 
              ): (
                <p>No Webcams found.</p>
              )}
              <button className="btn w-1/4 bg-primary text-slate-100" onClick={handleCamera}>
                <span className="material-symbols-outlined">photo_camera</span>
              </button>

              <button className="btn w-1/4 bg-primary text-slate-100" onClick={handleUpload}>Try</button>
            </div>

            {/* Select Option */}
            <div className="ps-10 pt-5 flex flex-wrap gap-7 overflow-y-auto max-h-[560px]">
              
              {
                tshirt.map((item)=> (
                  <div key={item.name} className="card w-1/4 hover:opacity-85 hover:border-4 hover:border-primary" onClick={() => handleGarment(item.name)}>
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