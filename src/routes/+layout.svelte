<script>
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import '../app.css';
</script>

<Header />
<main class="container pt-10">
	<div class="flex">
		<Sidebar />
		<div class="flex-auto w-3/4 px-4 py-10 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
			<slot />
		</div>
	</div>
</main>
<Footer />
