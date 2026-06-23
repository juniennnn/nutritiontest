<script lang="ts">
	type Option = { label: string; scoreA: number };

	let {
		number,
		text,
		options,
		selected = null,
		onSelect
	}: {
		number: number;
		text: string;
		options: Option[];
		selected?: number | null;
		onSelect: (index: number) => void;
	} = $props();
</script>

<div
	class="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-colors hover:border-white/20 sm:p-7"
>
	<div class="mb-5 flex items-start gap-3">
		<span
			class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/70"
		>
			{number}
		</span>
		<p class="text-base font-medium leading-relaxed text-white sm:text-lg">{text}</p>
	</div>

	<div class="flex flex-col gap-2.5">
		{#each options as option, i (i)}
			<button
				type="button"
				onclick={() => onSelect(i)}
				class="group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all
					{selected === i
					? 'border-white/60 bg-white/10 text-white'
					: 'border-white/10 bg-transparent text-white/70 hover:border-white/25 hover:bg-white/4'}"
			>
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors
						{selected === i ? 'border-white bg-white' : 'border-white/30'}"
				>
					{#if selected === i}
						<span class="h-2 w-2 rounded-full bg-black"></span>
					{/if}
				</span>
				<span class="text-sm sm:text-[15px]">{option.label}</span>
			</button>
		{/each}
	</div>
</div>
