import questions from './data/questions.json';

type Axis = {
	id: string;
	poleA: string;
	poleB: string;
	section: string;
	labelA: string;
	labelB: string;
};

type Option = { label: string; scoreA: number };

export type Question = {
	axis: string;
	section: string;
	text: string;
	options: Option[];
};

export const axes = questions.axes as Axis[];
export const questionList = questions.questions as Question[];

const CODE_ORDER = ['sugar', 'sodium', 'carb'];

export function computeCode(
	answers: (number | null)[],
	questions: Question[] = questionList
): string {
	const sums: Record<string, number> = {};
	const counts: Record<string, number> = {};

	questions.forEach((q, i) => {
		const choice = answers[i];
		if (choice == null) return;
		sums[q.axis] = (sums[q.axis] ?? 0) + q.options[choice].scoreA;
		counts[q.axis] = (counts[q.axis] ?? 0) + 1;
	});

	return CODE_ORDER.map((axisId) => {
		const axis = axes.find((a) => a.id === axisId)!;
		const sum = sums[axisId] ?? 0;
		const maxSum = (counts[axisId] ?? 0) * 3;
		return sum * 2 >= maxSum ? axis.poleA : axis.poleB;
	}).join('');
}
