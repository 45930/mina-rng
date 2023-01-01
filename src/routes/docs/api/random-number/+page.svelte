<script>
	import Head from '$components/content/Head.svelte';
	import Para from '$components/content/Para.svelte';
	import Title from '$components/content/Title.svelte';
</script>

<article class="">
	<Title>Random Number API</Title>
	<Para
		>Base Path: <pre class="text-mono">/api/randomNumber/:executorPublicKey?:params</pre></Para
	>
	<div>
		<strong>Executor Public Key</strong> - public key corresponding to the ZkApp you want to use. This
		doesn't have to be the address of the ZkApp, just a public key to which they know the private key.
	</div>
	<Head>Params</Head>
	<div>
		<strong>min</strong> - Mininum number - Default is 0
	</div>
	<div>
		<strong>max</strong> - Maximum number - Default is 999,999
	</div>
</article>
