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

<!-- 유형 색상 기반 배경 글로우 -->
<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
	<div
		class="absolute left-1/2 top-[-15%] h-150 w-150 -translate-x-1/2 rounded-full opacity-40 blur-[140px] transition-colors duration-500"
		style="background-image: radial-gradient(circle, {result.color.accent}, transparent 70%);"
	></div>
</div>

<main class="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-20 pt-16 sm:pt-24">
	<span class="mb-10 text-xs font-medium tracking-widest text-white/40">YOUR RESULT</span>

	<ResultCard {result} />

	<!-- 액션 버튼 -->
	<div class="mt-12 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
		<button
			type="button"
			onclick={() => goto(resolve('/'))}
			class="w-full rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 sm:w-auto"
		>
			다시 테스트하기
		</button>
	</div>
</main>
