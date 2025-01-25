import { forwardRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

interface CameraComponents {
    deviceId: string;
    width?: number;
    height?: number;
}

const CameraComp =  forwardRef<Webcam, CameraComponents>((
    {deviceId, width, height}, ref) => {
        const [videoConstraints, setVideoConstraints] = useState({
            width,
            height,
            facingMode: "environment",
            deviceId: deviceId,
        })

        useEffect(() => {
            setVideoConstraints((prevConstraints) => ({
                ...prevConstraints,
                deviceId: deviceId
            }))
        }, [deviceId])

        return (
            <>
                <Webcam 
                    audio={false}
                    ref={ref} //forwarding ref ke App()
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    style={{ 
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                     }} 
                />
            </>
        )
    }
)

export default CameraComp