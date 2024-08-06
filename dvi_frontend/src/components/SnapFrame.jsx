import { useEffect, useRef, useState } from 'react';

export const Snap = () => {
    const width = 320; // We will scale the photo width to this
    const [height, setHeight] = useState(0); // This will be computed based on the input stream
    const [streaming, setStreaming] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const photoRef = useRef(null);
    const startButtonRef = useRef(null);

    useEffect(() => {
        const startup = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const photo = photoRef.current;
            const startButton = startButtonRef.current;

            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error(`An error occurred: ${err}`);
                });

            video.addEventListener(
                'canplay',
                (ev) => {
                    if (!streaming) {
                        const computedHeight = (video.videoHeight / video.videoWidth) * width;
                        setHeight(computedHeight);

                        video.setAttribute('width', width);
                        video.setAttribute('height', computedHeight);
                        canvas.setAttribute('width', width);
                        canvas.setAttribute('height', computedHeight);
                        setStreaming(true);
                    }
                },
                false
            );

            startButton.addEventListener(
                'click',
                (ev) => {
                    takePicture();
                    ev.preventDefault();
                },
                false
            );

            clearPhoto();
        };

        const clearPhoto = () => {
            const context = canvasRef.current.getContext('2d');
            context.fillStyle = '#AAA';
            context.fillRect(0, 0, width, height);

            const data = canvasRef.current.toDataURL('image/png');
            photoRef.current.setAttribute('src', data);
        };

        const takePicture = () => {
            const context = canvasRef.current.getContext('2d');
            const video = videoRef.current;
            if (width && height) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                context.drawImage(video, 0, 0, width, height);

                const data = canvasRef.current.toDataURL('image/png');
                photoRef.current.setAttribute('src', data);
            } else {
                clearPhoto();
            }
        };

        startup();
    }, [streaming, height]);

    return (
        <div>
            <div className="camera">
                <video ref={videoRef} id="video">Video stream not available.</video>
                <button ref={startButtonRef} id="startbutton">Take photo</button>
            </div>
            <canvas ref={canvasRef} id="canvas"></canvas>
            <div className="output">
                <img ref={photoRef} id="photo" alt="The screen capture will appear in this box." />
            </div>
        </div>
    );
};
