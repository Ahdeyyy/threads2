<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import '../app.postcss';
	import { HomeIcon, UserIcon, SearchIcon, BookmarkIcon, MoonIcon } from 'lucide-svelte';

	import { Button } from '$components/ui/button';
	import type { LayoutServerData } from './$types';
	import { enhance } from '$app/forms';

	export let data: LayoutServerData;

	const nav_links = [
		{ name: 'home', href: '/', icon: HomeIcon },
		{ name: 'profile', href: '/profile', icon: UserIcon },
		{ name: 'search', href: '/search', icon: SearchIcon },
		{ name: 'bookmarks', href: '/bookmarks', icon: BookmarkIcon }
	];
</script>

<section class="md:grid grid-flow-col grid-cols-12 gap-6 h-3/4 mb-3">
	<nav class="hidden md:grid col-span-2 align-middle overflow-hidden">
		<ul>
			{#each nav_links as item}
				<li class="w-fit mb-2">
					<Button href={item.href} class="px-7 py-4 w-full rounded-3xl" variant="ghost">
						{#if item.icon}
							<svelte:component this={item.icon} class="mr-2 h-5 w-5" />
						{/if}
						{item.name}
					</Button>
				</li>
			{/each}

			{#if data.user}
				<li class="w-fit mb-2">
					{data.user.username}
				</li>
				<form use:enhance method="post">
					<Button variant="ghost" type="submit" class="px-14 py-4 mb-2 rounded-3xl">sign out</Button
					>
				</form>
			{:else}
				<li class="w-fit mb-2">
					<Button href="/signup" class="px-14 py-4 rounded-3xl">sign up</Button>
				</li>
			{/if}

			<li class="w-fit mb-0">
				<Button
					type="button"
					on:click={() => {
						document.querySelector('body')?.classList.toggle('dark');
					}}
					class="ml-4 rounded-full "
				>
					<MoonIcon class="h-5 w-5" />
				</Button>
			</li>
		</ul>
	</nav>
	<Separator class="h-screen " orientation="vertical" />
	<main class="col-span-8">
		<slot />
	</main>
</section>
