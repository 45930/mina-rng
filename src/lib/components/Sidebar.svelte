<script lang="ts">
	import { SidebarSection } from './sidebar';

	const apiRoutesItems: SidebarItemProps[] = [
		{
			href: '/docs/api/random-number',
			value: 'Random Number'
		},
		{
			href: '#',
			value: 'Dice (Coming Soon!)'
		},
		{
			href: '#',
			value: 'Shuffle (Coming Soon!)'
		}
	];
</script>

<nav class="py-8 pl-4 pr-2 text-base w-96 bg-slate-100">
	<ul class="py-7 pl-0.5 space-y-2">
		<SidebarSection href="/docs/quickstart" value="Quickstart" items={[]} />
		<SidebarSection href="/docs/usage-in-a-zkapp" value="Usage in a ZkApp" items={[]} />
		<SidebarSection href={null} value="Api Routes" items={apiRoutesItems} />
	</ul>
</nav>
