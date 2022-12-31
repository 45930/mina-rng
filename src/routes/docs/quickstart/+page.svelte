<script lang="ts">
	const exampleResponse = `
  {
    "publicKey":{
      "x":"28069081889865512785535907027563583556859543819810569133717282683313287656508",
      y":"114801819760945418684714368220236623186407767669428920999572232042974262559"
    },
    "cipherText": "15516045327229051517268199910027564223674063392139107785261681014552201178278,23093742241897088039507123382784660517938449088200780008089947470624886898694",
    "signature":{
      "r":"361143905020689387224721614567111942153416868704565446408843073277714917162",
      "s":"2523345972758017480448948006355106244312421432158742060161138105811067766281"
    }
  }
  `;
</script>

<article class="">
	<h1 class="title">Welcom to Mina RNG</h1>
	<p class="text-xl text-red-600">This site is under development.</p>
	<div class="pt-5 text-justify text-slate-900 pb-2">
		<h3 class="text-lg font-semibold pt-2">What is Mina RNG?</h3>
		<p>
			Mina RNG is an oracle that generates random numbers for use in ZkApps on Mina. We provide
			endpoints which can be called from your ZkApp and return data in a format usable by a snarkyJS
			SmartContract or ZKProgram. There is a basic random number endpoint already, but we would like
			to expand to other useful concepts like rolling multiple dice, or shuffling a collection.
			Please reach out to contact@45930.xyz for any endpoint requests.
		</p>
		<h3 class="text-lg font-semibold pt-2">Why Do I Need an RNG Oracle?</h3>
		<p>
			Mina smart contracts are static snark circuits. Any use case involving randomness (e.g.
			gaming) requires that a source outside of the smart contract generates the random value. In
			nearly all of the possible use cases, it is not appropriate for the user of the smart contract
			to choose the randomness - that wouldn't actually be random. The design that Mina RNG uses is
			that the user of a smart contract will make a request to us for randomness, but we will
			encrypt the value so that user doesn't know what the outcome will be. The smart contract must
			be able to decrypt the value, and then will be able to execute a method with the static
			"random" input.
		</p>
		<h3 class="text-lg font-semibold pt-2">Do you use VRF?</h3>
		<p>
			No, this is just Math.random based randomness. The user and smarrt contract must both trust
			that the oracle is not colluding with the other party. We don't recommend using this oracle
			for high value applications, but it should be suitable for apps on the Berkeley test network,
			and non financial apps on main net.
		</p>
		<p>
			This oracle is a side project meant to be a public good to help other devs. WE OFFER NO
			WARRANTY OR GUARANTEE OF EXECUTION. USE AT YOUR OWN RISK.
		</p>
	</div>

	<div class="pt-5 text-justify text-slate-900">
		<h3 class="text-lg font-semibold pt-2">Baseline Example</h3>
		<p>To get started, you need a valid Mina public key base58 encoded, and that's it.</p>
		<p>
			Just make a GET request to https://mina-rng.45930.xyz/api/randomNumber/$publicKey to get an
			encrypted random integer between 0 and 999,999
		</p>
		<div class="pt-2">
			<p>GET</p>
			<a
				class="text-blue-600 hover:text-blue-400"
				href="https://mina-rng.45930.xyz/api/randomNumber/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH"
				target="_blank"
				rel="noreferrer"
				>https://mina-rng.45930.xyz/api/randomNumber/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH</a
			>
		</div>

		<h3 class="text-lg font-semibold pt-2">Response</h3>
		<p>The response contains 3 elements:</p>
		<ul>
			<li>- publicKey</li>
			<li>- cipherText</li>
			<li>- signature</li>
		</ul>

		<p>
			The public key is a Group element which is needed to decrypt the value. This would be used as
			an input to a smart contract method alongside the ciphertext.
		</p>
		<p>
			The ciphertext is the actual encrypted value represented as an array of Field. There should
			always be exactly 2 Fields in the array for the size of data this oracle encrypts. One slot is
			needed for the shared secret (this is actually the "public key") and one slot is needed for
			the actual value.
		</p>
		<p>
			The signature is just a signature of the ciphertext so that an app can confirm that this
			oracle created the randomness and not some imposter.
		</p>
		<!-- 
    pre {
      background: #f4f4f4;
      border: 1px solid #ddd;
      border-left: 3px solid #f36d33;
      color: #666;
      page-break-inside: avoid;
      font-family: monospace;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 1.6em;
      max-width: 100%;
      overflow: auto;
      padding: 1em 1.5em;
      display: block;
      word-wrap: break-word;
  } -->
		<pre class="font-mono bg-slate-200 text-slate-900 overflow-x-scroll m-1 p-1">
  {exampleResponse}
</pre>
	</div>
</article>
