<script>
	import Head from '$components/content/Head.svelte';
	import Para from '$components/content/Para.svelte';
	import Title from '$components/content/Title.svelte';
</script>

<article class="">
	<Title>Dice API</Title>
	<Para
		>Base Path: <pre class="text-mono">/api/dice/:executorPublicKey?:params</pre></Para
	>
	<div>
		<strong>Executor Public Key</strong> - public key corresponding to the ZkApp you want to use. This
		doesn't have to be the address of the ZkApp, just a public key to which they know the private key.
	</div>
	<Head>Params</Head>
	<div>
		<strong>n</strong> - Number of dice to roll
	</div>
	<div>
		<strong>sides</strong> - How many sides the dice have
	</div>
	<Head>Example</Head>
	<div class="pt-2 font-mono bg-slate-200 overflow-x-scroll">
		<p>
			GET
			<a
				class="link-text"
				href="https://mina-rng.45930.xyz/api/dice/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH?n=3&sides=20"
				target="_blank"
				rel="noreferrer"
				>https://mina-rng.45930.xyz/api/dice/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH?n=3&sides=20</a
			>
		</p>
	</div>
</article>
