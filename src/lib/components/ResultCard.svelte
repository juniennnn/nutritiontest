<script lang="ts">
	type Result = {
		code: string;
		title: string;
		subtitle: string;
		emoji: string;
		description: string;
		color: { accent: string };
	};

	let { result }: { result: Result } = $props();

	// src/lib/assets/{code}.png 를 빌드 타임에 번들링. 파일이 없으면 undefined → placeholder 노출
	const images = import.meta.glob('/src/lib/assets/*.png', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	let imageSrc = $derived(images[`/src/lib/assets/${result.code}.png`] ?? null);
</script>

<div class="flex w-full flex-col items-center">
	<!-- 상단 중앙: 박스 없이 흰 배경과 일체된 일러스트 (투명 PNG) -->
	{#if imageSrc}
		<img
			src={imageSrc}
			alt={result.title}
			class="aspect-square w-full max-w-80 object-contain"
		/>
	{:else}
		<div class="flex aspect-square w-full max-w-80 flex-col items-center justify-center gap-3">
			<span class="text-7xl">{result.emoji}</span>
			<span class="text-2xl font-black tracking-[0.25em] text-zinc-300">{result.code}</span>
		</div>
	{/if}

	<!-- 하단: 설명문 -->
	<div class="mt-6 flex flex-col items-center text-center">
		<span class="mb-3 text-sm font-semibold tracking-[0.25em] text-zinc-400">{result.code}</span>
		<h1 class="text-3xl font-black leading-tight sm:text-4xl" style="color: {result.color.accent};">
			{result.title}
		</h1>
		<p class="mt-2 text-lg font-medium text-zinc-500">{result.subtitle}</p>
		<p class="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
			{result.description}
		</p>
	</div>
</div>
