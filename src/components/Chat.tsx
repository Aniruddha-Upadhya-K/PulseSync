import { CornerRightUp, LogIn, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export default function Chat({ className, ...props }: CardProps) {
	const { data: sessionData } = useSession();
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card
				className={cn(
					"grid h-[500px] w-[380px] grid-rows-[min-content_1fr_min-content]",
					className
				)}
				{...props}
			>
				<CardHeader>
					<CardTitle>Chat with SyncBot</CardTitle>
					<CardDescription>
						Your personal AI Assistant
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-3 text-sm text-white">
						<Avatar>
							<AvatarFallback>DF</AvatarFallback>
							<AvatarImage src={sessionData?.user.image ?? ""} />
						</Avatar>
						<p className="leading-relaxed">
							<span className="block font-bold text-white ">
								SyncBot:
							</span>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Beatae, quo, porro eligendi corrupti veritatis
							ipsam molestias obcaecati asperiores aspernatur quas
							illum eveniet accusantium! Cumque quia, molestias
							reiciendis a sunt officia?
						</p>
					</div>
					<div className="flex gap-3 text-sm text-white">
						<Avatar>
							<AvatarFallback>DF</AvatarFallback>
							<AvatarImage src={sessionData?.user.image ?? ""} />
						</Avatar>
						<p className="leading-relaxed">
							<span className="block font-bold text-white ">
								SyncBot:
							</span>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Beatae, quo, porro ?
						</p>
					</div>
				</CardContent>
				<CardFooter className="space-x-2">
					<div className="flex w-full max-w-sm items-center space-x-2">
						<form
							className="flex w-full space-x-2"
							onSubmit={handleSubmit}
						>
							<Input
								type="text"
								placeholder="Enter a prompt here!"
								value={input}
								onChange={handleInputChange}
							/>
							<div className="flex flex-row gap-1">
								<Button type="submit" size="icon">
									<CornerRightUp className="h-4 w-4" />
								</Button>
								<Button type="submit" size="icon">
									<Mic className="h-4 w-4" />
								</Button>
							</div>
						</form>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
