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
            facingMode: "environment",
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
                        height: "auto"
                     }} 
                />
            </>
        )
    }
)

export default CameraComp