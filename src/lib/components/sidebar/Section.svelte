<script lang="ts">
  import { SidebarItem } from ".";
	export let href: string | null;
	export let value: string;
	export let items: SidebarItemProps[];
</script>

<li>
	{#if href}
		<a href={href}
			><h3 class="font-semibold text-lg link-text">{value}</h3></a
		>
	{:else}
		<h3 class="font-semibold text-lg text-slate-900">{value}</h3>
	{/if}
  {#if items}
    <ul class="pl-3 mt-3 space-y-2">
      {#each items as it}
        <SidebarItem href={it.href} value={it.value} />
      {/each}
    </ul>
  {/if}
</li>
