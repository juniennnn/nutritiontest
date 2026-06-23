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
	class="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 sm:p-7"
>
	<div class="mb-5 flex items-start gap-3">
		<span
			class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-500"
		>
			{number}
		</span>
		<p class="text-base font-medium leading-relaxed text-zinc-900 sm:text-lg">{text}</p>
	</div>

	<div class="flex flex-col gap-2.5">
		{#each options as option, i (i)}
			<button
				type="button"
				onclick={() => onSelect(i)}
				class="group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all
					{selected === i
					? 'border-zinc-900 bg-zinc-900/5 text-zinc-900'
					: 'border-zinc-200 bg-transparent text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}"
			>
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors
						{selected === i ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'}"
				>
					{#if selected === i}
						<span class="h-2 w-2 rounded-full bg-white"></span>
					{/if}
				</span>
				<span class="text-sm sm:text-[15px]">{option.label}</span>
			</button>
		{/each}
	</div>
</div>
