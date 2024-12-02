import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';

// Utility function to merge Tailwind CSS classes
// Combines clsx (for conditional classes) with tailwind-merge (to handle conflicts)
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * @param {HTMLElement} node
 * @param {{ y?: number, x?: number, start?: number, duration?: number }} params
 */
export const flyAndScale = (node, {
	y = -8,
	x = 0,
	start = 0.95,
	duration = 150
} = {}) => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	// Converts a value from one scale to another
	// Example: convert 0-1 to start-end scale
	const scaleConversion = (valueA, [minA, maxA], [minB, maxB]) => {
		const percentage = (valueA - minA) / (maxA - minA);
		return percentage * (maxB - minB) + minB;
	};

	// Converts style object to CSS string
	const styleToString = (style) =>
		Object.entries(style)
			.filter(([_, value]) => value !== undefined)
			.map(([key, value]) => `${key}:${value}`)
			.join(';');

	return {
		duration,
		delay: 0,
		css: (t) => {
			// Calculate current position and scale based on time progress
			const yOffset = scaleConversion(t, [0, 1], [y, 0]);
			const xOffset = scaleConversion(t, [0, 1], [x, 0]);
			const scale = scaleConversion(t, [0, 1], [start, 1]);

			return styleToString({
				transform: `${transform} translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale})`,
				opacity: t // Fade in from 0 to 1
			});
		},
		easing: cubicOut // Use cubic-out easing for smooth animation
	};
};
