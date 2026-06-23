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
	<!-- 상단 중앙: 이미지 공간 -->
	<div
		class="relative aspect-square w-full max-w-75 overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
		style="background-color: {result.color.accent};"
	>
		<!-- 은은한 상단 글로스 (이미지 뒤에 깔아 인물을 덮지 않음) -->
		<div
			class="pointer-events-none absolute inset-0"
			style="background-image: radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.28), transparent 60%);"
		></div>
		{#if imageSrc}
			<!-- 투명 배경 일러스트: 그라데이션 위에 패딩 + 드롭섀도로 띄움 -->
			<img
				src={imageSrc}
				alt={result.title}
				class="absolute inset-0 h-full w-full object-contain p-5 drop-shadow-[0_10px_22px_rgba(0,0,0,0.3)]"
			/>
		{:else}
			<div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
				<span class="text-7xl drop-shadow-lg">{result.emoji}</span>
				<span class="text-2xl font-black tracking-[0.25em] text-white/90">{result.code}</span>
			</div>
		{/if}
	</div>

	<!-- 하단: 설명문 -->
	<div class="mt-8 flex flex-col items-center text-center">
		<span
			class="mb-3 rounded-full border px-4 py-1 text-sm font-semibold tracking-widest"
			style="border-color: {result.color.accent}55; color: {result.color
				.accent}; background-color: {result.color.accent}1a;"
		>
			{result.code}
		</span>
		<h1 class="text-3xl font-black leading-tight sm:text-4xl" style="color: {result.color.accent};">
			{result.title}
		</h1>
		<p class="mt-2 text-lg font-medium text-white/80">{result.subtitle}</p>
		<p class="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
			{result.description}
		</p>
	</div>
</div>
