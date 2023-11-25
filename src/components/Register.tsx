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
import { api } from "~/utils/api";
import { z } from "zod";
import React, { useState } from "react";
import { Gender } from "@prisma/client";

export default function Register() {
	const user = useSession();
	const register = api.user.updateUser.useMutation();
	const [Name, setName] = useState("");
	const [Age, setAge] = useState("");
	const [Height, setHeight] = useState("");
	const [Weight, setWeight] = useState("");
	const [Gender, setGender] = useState<Gender|null>(null);
	const [HealthConditions, setHealthConditions] = useState("");
	const [Medications, setMedications] = useState("");

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
						<Input
							id="name"
							className="col-span-3"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="age" className="text-right">
							Age
						</Label>
						<Input
							id="age"
							type="number"
							className="col-span-3"
							onChange={(e) => setAge(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="height" className="text-right">
							Height
						</Label>
						<Input
							id="height"
							type="number"
							className="col-span-3"
							onChange={(e) => setHeight(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="weight" className="text-right">
							Weight
						</Label>
						<Input
							id="height"
							type="number"
							className="col-span-3"
							onChange={(e) => setWeight(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="gender" className="text-right">
							Gender
						</Label>
						<Select
							onValueChange={(e) => {
								setGender(e as Gender);
							}}
						>
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
						<Textarea
							placeholder="Enter your health conditions here..."
							onChange={(e) => {
								setHealthConditions(e.target.value);
							}}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="age" className="text-right">
							Medications
						</Label>
						<Textarea
							placeholder="Enter any medications you are undergoing..."
							onChange={(e) => {
								setMedications(e.target.value);
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onSubmit={() => {
							register.mutate({
								name: z.string().nonempty().parse(Name),
								age: z.number().positive().parse(Age),
								height: z.number().positive().parse(Height),
								weight: z.number().positive().parse(Weight),
								healthConditions: z
									.string()
									.nonempty()
									.parse(HealthConditions),
								medications: z
									.string()
									.nonempty()
									.parse(Medications),
								gender: z
									.enum("Male", "Female", "Other")
									.parse(Gender),
							});
						}}
					>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
