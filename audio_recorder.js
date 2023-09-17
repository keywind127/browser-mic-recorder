export function sleep(duration) {

    return new Promise((resolve) => {

        setTimeout(resolve, duration);

    });

}

export async function record_audio_from_browser()
{

    let mediaRecorder = null;

    let stopPromiseR = null;

    if (navigator.mediaDevices.getUserMedia && window.MediaRecorder) {

        let stream = await navigator.mediaDevices.getUserMedia({ audio : true });

        mediaRecorder = new MediaRecorder(stream);

        let audioChunks = [];

        let audioData = null;

        mediaRecorder.ondataavailable = (event) => {

            if (event.data.size > 0) {

                audioChunks.push(event.data);

            }

        };

        mediaRecorder.onstop = () => {

            const audioBlob = new Blob(audioChunks, { "type" : "audio/wav" });

            let fileReader = new FileReader();

            fileReader.onload = (event) => {

                audioData = event.target.result.split(',')[1];

            };

            fileReader.readAsDataURL(audioBlob);

        };

        let stopPromise = new Promise((resolve) => {

            async function resolve_promise() {

                while (audioData == null) {

                    await sleep(500);

                }

                resolve(audioData);

            }

            resolve_promise();

        });

        stopPromiseR = stopPromise;
    
    }

    return [ mediaRecorder, stopPromiseR ];

}
