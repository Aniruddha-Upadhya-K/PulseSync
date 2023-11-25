import { CornerRightUp, LogIn, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type CardProps = React.ComponentProps<typeof Card>

export default function Chat({ className, ...props }: CardProps) {
    const { data: sessionData } = useSession();

  return (
    <div className="flex justify-center min-h-screen items-center">
    <Card className={cn("w-[380px] h-[500px] grid grid-rows-[min-content_1fr_min-content]", className)} {...props}>
      <CardHeader>
        <CardTitle>Chat with SyncBot</CardTitle>
        <CardDescription>Your personal AI Assistant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex">
            <Avatar>
                <AvatarFallback>DF</AvatarFallback>
                <AvatarImage src={sessionData?.user.image ?? ""} />
            </Avatar>
            <p>Whats stopping you?</p>
        </div>
        <div>
        <Avatar>
                <AvatarFallback>DF</AvatarFallback>
                <AvatarImage src={sessionData?.user.image ?? ""} />

            </Avatar>
        </div>
    </CardContent>
      <CardFooter className="space-x-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Enter a prompt here!" />
      <Button type="submit" size="icon"><CornerRightUp className="h-4 w-4" /></Button>
      <Button type="submit" size="icon"><Mic  className="h-4 w-4" /></Button>
    </div>
      </CardFooter>
    </Card>
    </div>
  )
}
