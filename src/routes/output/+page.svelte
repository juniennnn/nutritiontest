<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ResultCard from '$lib/components/ResultCard.svelte';
	import results from '$lib/data/results.json';

	let code = $derived((page.url.searchParams.get('type') ?? 'SLC').toUpperCase());
	let result = $derived(results[code as keyof typeof results] ?? results.SLC);
</script>

<svelte:head>
	<title>{result.title} · 영양소 입맛 테스트</title>
</svelte:head>

<main class="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-20 pt-10 sm:pt-24">

	<ResultCard {result} />

	<!-- 액션 버튼 -->
	<div class="mt-12 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
		<button
			type="button"
			onclick={() => goto(resolve('/'))}
			class="w-full rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 sm:w-auto"
		>
			다시 테스트하기
		</button>
	</div>
</main>
