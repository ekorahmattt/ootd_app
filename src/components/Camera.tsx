import { forwardRef } from "react";
import Webcam from "react-webcam";

interface CameraComponents {
    width?: number;
    height?: number;
}

const CameraComp =  forwardRef<Webcam, CameraComponents>((
    {width = 768, height = 1024}, ref) => {
        const videoConstraints = {
            width,
            height,
            facingMode: "user",
        }

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