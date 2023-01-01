<script lang="ts">
	import Block from '$components/content/Block.svelte';
	import Heading from '$components/content/Head.svelte';
	import Paragraph from '$components/content/Para.svelte';
	import Title from '$components/content/Title.svelte';
</script>

<article class="">
	<Title>Usage in a ZkApp</Title>
	<Block>
		<Heading>How to Incorporate signed randomness into your ZkApp</Heading>
		<Paragraph>There are 2 steps to use this oracle</Paragraph>
		<ol>
			<li>1. Verify the Signature</li>
			<li>2. Decrypt the value</li>
		</ol>
		<div>
			<Paragraph>Verify the siguature</Paragraph>
			<pre class="font-mono bg-slate-200 text-slate-900 overflow-x-scroll m-1 p-1">
// resp = oracle response
// oraclePublicKey = the public key of this oracle
// min, max = the params you used to generate the value
const signature: Signature = Signature.fromJSON(resp.signature);
const ciphertext: Field[] = resp.ciphertext.split(',').map(f => Field(f));
signature.verify(oraclePublicKey, [min, max, ...ciphertext]).assertTrue();
      </pre>
			<div>
				<Paragraph>Decrypt the Value</Paragraph>
				<pre class="font-mono bg-slate-200 text-slate-900 overflow-x-scroll m-1 p-1">
// resp = oracle response
// executorPrivateKey = the private key corresponding to the request made to the oracle
const group: Group = Group.fromJSON(resp.publicKey);
const ciphertext: Field[] = resp.ciphertext.split(',').map(f => Field(f));
const plaintext: Field = Encryption.decrypt(&lbrace;publicKey: group, ciphertext: ciphertext&rbrace;, executorPrivateKey)
        </pre>
			</div>
			<div>
				<Paragraph>
					Real world example can be seen: <a
						class="link-text"
						href="https://github.com/45930/coinflip-executor-contract/blob/cf18d15e38f61f8180c113e4ea171308cf8ed0e2/src/executor.ts#L187"
						target="_blank"
						rel="noreferrer">here</a
					>
				</Paragraph>
			</div>
		</div></Block
	>
</article>
