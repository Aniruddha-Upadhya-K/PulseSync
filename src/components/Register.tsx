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
import React, { useEffect, useState } from "react";
import { Gender } from "@prisma/client";
import { getServerSession } from "next-auth";

export default function EditProfile() {
	const session = useSession();
	const sessionData = session.data;
	const register = api.user.updateUser.useMutation();
	const [Name, setName] = useState(sessionData?.user?.name);
	const [Age, setAge] = useState(sessionData?.user?.age);
	const [Height, setHeight] = useState(sessionData?.user?.height);
	const [Weight, setWeight] = useState(sessionData?.user?.weight);
	const [Gender, setGender] = useState<Gender | null>(
		sessionData?.user?.gender ?? null
	);
	const [HealthConditions, setHealthConditions] = useState(
		sessionData?.user.healthConditions
	);
	const [Medications, setMedications] = useState(
		sessionData?.user?.medications
	);

	//useEffect(() => {
	//	(async () => {
	//		const user = await getServerSession();
	//		return user;
	//	})()
	//		.then((user) => {
	//			setName(user?.user?.name);
	//			setAge(user?.user?.age);
	//			setHeight(user?.user?.height);
	//			setWeight(user?.user?.weight);
	//			setHealthConditions(user?.user?.healthConditions);
	//			setMedications(user?.user?.medications);
	//			setGender(user?.user?.gender ?? null);
	//		})
	//		.catch((e) => console.log(e));
	//});
	return (
		<Dialog>
			<DialogTrigger asChild className="">
				<Button variant="outline" className="text-black bg-white">Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-left">
						Your Profile
					</DialogTitle>
					<DialogDescription className="text-left">
						Create your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							className="col-span-3"
							onChange={(e) => setName(e.target.value)}
							defaultValue={
								sessionData?.user?.name
									? sessionData?.user?.name
									: ""
							}
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
							defaultValue={
								sessionData?.user?.age
									? sessionData?.user?.age
									: ""
							}
							onChange={(e) => setAge(parseInt(e.target.value))}
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
							defaultValue={
								sessionData?.user?.height
									? sessionData?.user?.height
									: ""
							}
							onChange={(e) =>
								setHeight(parseInt(e.target.value))
							}
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
							defaultValue={
								sessionData?.user?.weight
									? sessionData?.user?.weight
									: ""
							}
							onChange={(e) =>
								setWeight(parseInt(e.target.value))
							}
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
							defaultValue={		
								sessionData?.user?.gender
									? sessionData?.user?.gender
									: ""
							}
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
							defaultValue={
								sessionData?.user?.healthConditions
									? sessionData?.user?.healthConditions
									: ""
							}
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
							defaultValue={
								sessionData?.user?.medications
									? sessionData?.user?.medications
									: ""
							}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={() => {
							console.log({
								Name,
								Weight,
								Gender,
								Height,
								HealthConditions,
								Medications,
								Age,
							});
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
								gender: Gender,
							});
						}}
						disabled={register.isLoading ? true : false}
					>
						{register.isLoading ? " Loading..." : " Save changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
