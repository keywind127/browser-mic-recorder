
//import { record_audio_from_browser, sleep } from "./audio_recorder.js";

class RecorderController
{

    static SLEEP_INTERVAL_MS = 100;

    constructor() {

        this.mediaRecorder = null;

        this.audioString = null;

    }

    async start() {

        this.mediaRecorder = null;

        record_audio_from_browser().then((recorderData) => {

            this.mediaRecorder = recorderData[0];

            this.audioString = null;

            recorderData[1].then((audioString) => {

                this.audioString = audioString;

                //console.log(this.audioString);

            });

            this.mediaRecorder.start();

            //console.log(this.mediaRecorder);

        });

        while (this.mediaRecorder == null) {
            
            await sleep(this.SLEEP_INTERVAL_MS);

        }

    }

    async stop() {

        //console.log(this.mediaRecorder);

        while (this.mediaRecorder == null) {

            await sleep(this.SLEEP_INTERVAL_MS);

        }

        //console.log(this.mediaRecorder);

        this.mediaRecorder.stop();

        //console.log("STOPPED");
        
        //console.log(this.audioString);

        while (this.audioString == null) {

            await sleep(this.SLEEP_INTERVAL_MS);

        }

        //console.log(this.audioString);

        return this.audioString;

    }

};