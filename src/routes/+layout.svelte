<script lang="ts">
	import '../app.postcss';
	import { HomeIcon, UserIcon, SearchIcon, BookmarkIcon } from 'lucide-svelte';

	import { Button } from '$components/ui/button';

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
				<li class="w-fit mb-2 last:mb-0">
					<Button href={item.href} class="px-7 py-4 w-full rounded-lg" variant="ghost">
						{#if item.icon}
							<svelte:component this={item.icon} class="mr-2 h-5 w-5" />
						{/if}
						{item.name}
					</Button>
				</li>
			{/each}

			<li>
				<Button href="/signup" class="px-14 py-4">sign up</Button>
			</li>
		</ul>
	</nav>
	<main class="col-span-8">
		<slot />
	</main>
</section>
