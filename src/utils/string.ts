import { Component, Vue } from 'vue-property-decorator';

interface Company {
	name: string;
	requirements: Array<string | string[]>;
}

@Component
export class StringMixins extends Vue {
	public isVowel(character: string): boolean {
		return ['a', 'e', 'i', 'o', 'u'].indexOf(character.toLowerCase()) !== -1;
	}

	// In grammar, article means a, an or the
	public addArticle(value: string): string {
		return this.isVowel(value.charAt(0)) ? `an ${value}` : `a ${value}`;
	}

	public conditionalRequirements(company: Company): string {
		return company.requirements
			.filter((requirement) => Array.isArray(requirement))
			.flat()
			.map((requirement) => this.addArticle(requirement))
			.join(' or ')
			.toLowerCase();
	}

	public compulsoryRequirements(company: Company): string {
		return company.requirements
			.filter((requirement) => !Array.isArray(requirement))
			.flat()
			.map((requirement) => this.addArticle(requirement))
			.join(', ')
			.toLowerCase();
	}

	public concatenateRequirements(conditional: string, compulsory: string): string {
		const conditionalExists: boolean = conditional.length > 0;
		const compulsoryExists: boolean = compulsory.length > 0;

		// Two booleans will have 4 different possible combinations thus creating a truth table
		// Case 0 0 does not exist in this function
		// Case 0 1
		if (!conditionalExists && compulsoryExists) {
			return compulsory;
		}

		// Case 1 0
		if (conditionalExists && !compulsoryExists) {
			return conditional;
		}

		// Case 1 1
		return `${conditional}, ${compulsory}`;
	}
}
