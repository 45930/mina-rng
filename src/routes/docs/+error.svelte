<script>
	import { page } from '$app/stores';
</script>

<div class="flex justify-center">
	<h1 class="text-xl">{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>
