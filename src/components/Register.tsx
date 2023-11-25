import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

export default function Register() {
	const user = useSession();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Register</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Enter Details</DialogTitle>
					<DialogDescription>
						Create your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							defaultValue={
								user?.data?.user?.name
									? user.data.user.name
									: ""
							}
							htmlFor="name"
							className="text-right"
						>
							Name
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="age" className="text-right">
							Age
						</Label>
						<Input id="age" type="number" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="height" className="text-right">
							Height
						</Label>
						<Input id="height" type="number" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="weight" className="text-right">
							Weight	
						</Label>
						<Input id="height" type="number" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="gender" className="text-right">
							Gender
						</Label>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select Gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Male">Male</SelectItem>
								<SelectItem value="Female">Female</SelectItem>
								<SelectItem value="Other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="age" className="text-right">
							Health Conditions
						</Label>
						<Textarea placeholder="Enter your health conditions here..." />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="age" className="text-right">
							Medications
						</Label>
						<Textarea placeholder="Enter any medications you are undergoing..." />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
