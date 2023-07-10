<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from "$app/forms";
	
	export let form: ActionData;
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';

	export let data: PageData;
</script>

<form action="" method="post" use:enhance >
	<Card class="w-2/3 mx-auto shadow-2xl">
		<CardHeader>
			<CardTitle class="font-sans text-2xl font-bold text-center" tag="h1"
				>Create your account</CardTitle
			>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="grid gap-2">
				<Label for="username">username</Label>
				<Input id="username" name="username" value={form?.username ?? ""} type="text" />
				{#if form?.missing}<p class="text-destructive">username is required</p>{/if}
				{#if form?.error}<p class="text-destructive">{form?.message}</p>{/if}

			</div>
			<div class="grid gap-2">
				<Label for="password">password</Label>
				<Input id="password" name="password" type="password" />
			</div>
		</CardContent>
		<CardFooter>
			<Button class="w-full py-4 px-14 rounded-3xl">sign up</Button>
		</CardFooter>
	</Card>
</form>
