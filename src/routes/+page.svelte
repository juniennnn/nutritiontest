<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import { questionList, computeCode, type Question } from '$lib/scoring';

	// 표시할 문항 (페이지 로드 시 랜덤 순서). SSR/하이드레이션 불일치를 피하려고 onMount 에서 셔플.
	let questions = $state<Question[]>([...questionList]);
	let answers = $state<(number | null)[]>(Array(questionList.length).fill(null));

	let answeredCount = $derived(answers.filter((a) => a !== null).length);
	let allAnswered = $derived(answeredCount === questions.length);
	let progress = $derived(Math.round((answeredCount / questions.length) * 100));

	onMount(() => {
		// Fisher-Yates 셔플 (섹션 구분 없이 무작위 배치)
		const shuffled = [...questionList];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		questions = shuffled;
		answers = Array(shuffled.length).fill(null);
	});

	function select(qIndex: number, optionIndex: number) {
		answers[qIndex] = optionIndex;
	}

	function submit() {
		if (!allAnswered) return;
		const code = computeCode(answers, questions);
		const url = new URL(resolve('/output'), location.origin);
		url.searchParams.set('type', code);
		// resolve() 로 만든 경로에 쿼리스트링을 붙인 URL — 규칙이 정적 검증하지 못해 비활성화
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(url);
	}
</script>

<svelte:head>
	<title>나의 영양소 입맛 테스트</title>
</svelte:head>

<!-- 진행도 바 (상단 고정) -->
<div class="fixed inset-x-0 top-0 z-20 h-1 bg-zinc-200">
	<div
		class="h-full bg-zinc-900 transition-all duration-300 ease-out"
		style="width: {progress}%;"
	></div>
</div>

<main class="mx-auto w-full max-w-2xl px-5 pb-40 pt-20 sm:pt-28">
	<!-- 히어로 -->
	<header class="mb-12 text-center">
		<h1 class="text-3xl font-black leading-tight text-zinc-900 sm:text-5xl">
			나의 영양소 입맛은<br />어떤 유형일까?
		</h1>
		<p class="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
			단·짠·탄 9개의 질문에 답하고 나만의 식습관 유형을 알아보세요.
		</p>
	</header>

	<!-- 질문 리스트 (섹션 구분 없이 랜덤 순서) -->
	<div class="flex flex-col gap-5">
		{#each questions as question, i (i)}
			<QuestionCard
				number={i + 1}
				text={question.text}
				options={question.options}
				selected={answers[i]}
				onSelect={(optionIndex) => select(i, optionIndex)}
			/>
		{/each}
	</div>
</main>

<!-- 하단 고정 제출 바 -->
<div class="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-200 bg-white/80 backdrop-blur-md">
	<div class="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-4">
		<span class="text-sm text-zinc-500">{answeredCount} / {questions.length} 응답</span>
		<button
			type="button"
			onclick={submit}
			disabled={!allAnswered}
			class="rounded-full px-7 py-3 text-sm font-semibold transition-all
				{allAnswered
				? 'bg-zinc-900 text-white hover:bg-zinc-800'
				: 'cursor-not-allowed bg-zinc-100 text-zinc-400'}"
		>
			결과 보기
		</button>
	</div>
</div>
