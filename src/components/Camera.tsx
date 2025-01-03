import Webcam from "react-webcam";

const videoConstraints:MediaTrackConstraints = {
    aspectRatio: 16 / 9,
    facingMode: 'environment'
}

const Camera = ({
    deviceId,
    setImage,
    timer
}:{
    deviceId?: MediaDeviceInfo,
    setImage: (image: string) => void,
    timer: number
}) => {
    const webcamRef = useReff(null)
}