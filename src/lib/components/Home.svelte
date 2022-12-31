<h1>Welcom to Mina RNG</h1>
<p class="text-xl text-red-600">This site is under development.</p>
<p>
	Mina RNG is an oracle that generates random numbers for use in ZkApps on Mina. More docs to come,
	but see the following example for usage:
</p>

<div>
	Account Public key is the counterparty which will use this random number. The value is encrypted
	so that only that account can read it.
	<p>GET --this_base_url--/api/randomNumber/--account_public_key--</p>
	<p>
		EX: GET <a
			href="https://mina-rng.45930.xyz/api/randomNumber/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH"
			target="_blank"
			rel="noreferrer"
			>https://mina-rng.45930.xyz/api/randomNumber/B62qqPo32ULMxYW745CFdF1z8KAtxbT6Du7jnxVy2XWrBxryQeX72HH</a
		>
	</p>

	<p>Response:</p>

	<pre><code>
  {JSON.stringify({
				publicKey: {
					x: '13349352062316521833745610858923027217058761660713349452458350572712093460468',
					y: '381250922620708132086597483421890725698792532797482074378977311386751408704'
				}
			})},
  {JSON.stringify({
				cipherText:
					'28757474367711621732515511794695884396230147975070040873644421805208671539133,406293540617627788666360792703185259569093889706907143162317625144578865572'
			})},
  {JSON.stringify({
				signature: {
					r: '28056083610992800755314076152128656859786997425249622924808421490735014369244',
					s: '15896454747423855267798603916419290914221608635346147578281173781943555881099'
				}
			})}
</code></pre>
	<p>The "public key" in the response is the group which is needed to decrypt the message.</p>
	<p>The "ciphertext" in the response is the encrypted random number.</p>
	<p>The "signature" in the response is a signature created by the oracle of the ciphertext.</p>
	<p>
		Put all together, this response is sufficient for a ZkApp to ingest the value and treat it as
		random. The user must trust this oracle to behave honestly, but otherwise does not have to trust
		the ZkApp itself to choose a random number since they will be providing the number themselves.
	</p>
</div>

<footer>
	<a href="https://github.com/45930/mina-rng">
		<img
			width="50"
			height="50"
			alt="github"
			src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
		/>
	</a>
</footer>
