import { CornerRightUp, LogIn, Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
var websocket;
var globalMic = true;

type CardProps = React.ComponentProps<typeof Card>;

export default function Chat({ className, ...props }: CardProps) {
	const { data: sessionData } = useSession();
	const [input, setInput] = useState("");

	const chat = api.chat.handleQuery.useMutation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
	};

	// Deepgram STT
	const voiceMessages = {
		micActiveMessage: "say something",
		typeAheadMessage: "Enter your prompt here!",
	};

	const turnOffMic = () => {
		websocket = false;
		console.log(`turned off : ${websocket}`);
	};
	const turnOnMic = () => {
		websocket = true;
		console.log(`turned on : ${websocket}`);
	};
	turnOnMic();

	const [transcript, setTranscript] = useState("");
	const [transcript1, setTranscript1] = useState("");
	const [lang, setLang] = useState("en");
	const [queryResults, setQueryResults] = useState([]);
	const [placeholder, setPlaceholder] = useState("loading");
	const [micActive, setMicActive] = useState(true);

	useEffect(() => {
		const MIMEtype = "audio/webm";

		const webSocketURL =
			lang === "en"
				? "wss://api.deepgram.com/v1/listen?model=nova"
				: `wss://api.deepgram.com/v1/listen?model=base&language=${lang}`;

		const webSocket = new WebSocket(webSocketURL, [
			"token",
			process.env.NEXT_PUBLIC_SPEECH_KEY ?? "",
		]);

		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				if (!MediaRecorder.isTypeSupported(MIMEtype)) {
					// error audio not supported
				}

				const mediaRecorder = new MediaRecorder(stream, {
					mimeType: MIMEtype,
				});

				webSocket.addEventListener("open", () => {
					console.log("[socket]: connetction success");
					setPlaceholder("say something");
					mediaRecorder.addEventListener("dataavailable", (event) => {
						if (webSocket.readyState === 1 && event.data.size) {
							webSocket.send(event.data);
						}
					});
					mediaRecorder.start(1000);
				});

				webSocket.addEventListener("message", (message) => {
					console.log("[socket]: message received", globalMic);
					const received = message && JSON.parse(message?.data);
					const result = received.channel?.alternatives[0].transcript;
					setTranscript((prevState) => {
						if (globalMic)
							return result === "" ? prevState : result;
					});
				});

				webSocket.addEventListener("error", (err) => {
					console.log("[socket]: ", err);
					setPlaceholder("sorry there has been an error");
					setTimeout(() => {
						setPlaceholder("Enter your prompt here!");
					}, 5000);
				});

				webSocket.addEventListener("close", () => {
					setPlaceholder(
						globalMic
							? "try reloading the page"
							: "Enter your prompt here!"
					);
					console.log("[socket]: close");
				});
			})
			.catch((err) => {
				// handle error
				// permission ignored accessed
			});
	}, [lang]);

	// useEffect(() => {
	// 	if (transcript !== "") {
	// 		//callLink(transcript);
	// 		debounce(callList(transcript));
	// 	}
	// }, [transcript]);

	useEffect(() => {
		// set mic status
		globalMic = micActive;
		if (!micActive) {
			// webSocket.close();
			turnOffMic();
			setPlaceholder("Enter your prompt here!");
		} else {
			turnOnMic();
			setPlaceholder("say something");
		}
	}, [micActive]);

	setTimeout(() => {
		if (transcript === "") {
			turnOffMic();
		}
	}, 3000);

  return (
    <div className="flex justify-center min-h-screen items-center">
    <Card className={cn("w-[380px] h-[500px] grid grid-rows-[min-content_1fr_min-content]", className)} {...props}>
      <CardHeader>
        <CardTitle>Chat with SyncBot</CardTitle>
        <CardDescription>Your personal AI Assistant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 text-white text-sm">
            <Avatar>
                <AvatarFallback>DF</AvatarFallback>
                <AvatarImage src={sessionData?.user.image ?? ""} />
            </Avatar>
            <p className="leading-relaxed">
                <span className="block font-bold text-white ">SyncBot:</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quo, porro eligendi corrupti veritatis ipsam molestias obcaecati asperiores aspernatur quas illum eveniet accusantium! Cumque quia, molestias reiciendis a sunt officia?</p>
        </div>
        <div className="flex gap-3 text-white text-sm">
        <Avatar>
                <AvatarFallback>DF</AvatarFallback>
                <AvatarImage src={sessionData?.user.image ?? ""} />

            </Avatar>
            <p className="leading-relaxed">
                <span className="block font-bold text-white ">SyncBot:</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quo, porro ?</p>
        </div>
    </CardContent>
      <CardFooter className="space-x-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form className="w-full space-x-2 flex" onSubmit={handleSubmit}>
      <Input type="text" placeholder={placeholder}  id="search-bar" defaultValue={transcript}
					onChange={(e) => setTranscript1(e.target.value)}
					onKeyDown={(e) => setMicActive(false)}/>
      <div className="flex flex-row gap-1">
      <Button type="submit" size="icon" onClick={()=>{
		console.log(transcript1)
		chat.mutate({
		query:transcript1
	  })}}><CornerRightUp className="h-4 w-4" /></Button>
      {
        micActive ?
        <Button type="submit" size="icon" onClick={(e)=>{
            e.preventDefault();
            setMicActive(!micActive);
      }}><Mic  className="h-4 w-4" /></Button> : <Button type="submit" size="icon" onClick={(e)=>{
        e.preventDefault();
        setMicActive(!micActive);
  }}><MicOff  className="h-4 w-4" /></Button>
    }</div>
      </form>
    </div>
      </CardFooter>
    </Card>
    </div>
  )
}
