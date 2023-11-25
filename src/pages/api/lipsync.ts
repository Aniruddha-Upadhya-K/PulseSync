import type { NextApiRequest, NextApiResponse } from 'next'
import util from "util";
import axios from "axios";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "@ffmpeg-installer/ffmpeg"

ffmpeg.setFfmpegPath(ffmpegPath.path)
const inputFilePath = 'audio.mp3';
const outputFilePath = 'audio.ogg';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const exec = util.promisify(require("child_process").exec);

  try {
    const body = req.body;

    async function getAudioData() {
      const result = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
        {
          text: body.lamaResponse,
        },
        {
          headers: {
            accept: "audio/mpeg",
            "content-type": "application/json",
            "xi-api-key": '024cd486c973697009d766606536c003',
          },
          responseType: "arraybuffer",
        }
      );

      await fs.promises.writeFile("audio.ogg", Buffer.from(result.data));

      const oggFile = new Promise((resolve, reject) => {
        ffmpeg()
          .input(inputFilePath)
          .audioCodec('libvorbis')
          .on('end', () => {
            console.log('Conversion finished');
            resolve("success")
          })
          .on('error', (err: any) => {
            console.error('Error:', err);
            reject("error")
          })
          .save(outputFilePath);
      })
      await oggFile

	  return result.data
    }
    const audioBuffer = await getAudioData();
    console.log(body);
    const command = '"C:/Users/satwi/Desktop/TASC Hackathon/pulsesync/src/pages/api/rhubarb.exe" -f json audio.ogg'
    console.log(command)

    const result = await exec(command)
    return res.json({ message: "success", data: {lipsync:result.stdout, audio:audioBuffer}});
  }
  catch (error) {
    console.log(error)
    return res.json({ message: "error" })
  }
}
