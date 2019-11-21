import { Component, Vue } from 'vue-property-decorator';

@Component
export class QualificationMixins extends Vue {
	// For normal requirements
	public requirementsQualified(company: Company, bioData: BioData): boolean {
		const requirements: string[] = this.generateRequirements(company);
		const updated: string[] = requirements.filter((requirement) => bioData.qualifications.includes(requirement));

		return requirements.length === updated.length;
	}

	// For conditional requirements like requirement of a car or a motorcycle
	public conditionalRequirementsQualified(company: Company, bioData: BioData): boolean {
		const requirements: string[] = this.generateConditionalRequirements(company);
		const updated: string[] = requirements.filter((requirement) => bioData.qualifications.includes(requirement));

		return requirements.length === updated.length;
	}

	// Generates an array of only the requirements that are neccessary
	private generateRequirements(company: Company, conditional: boolean = false): string[] {
		return company.requirements.filter((requirement) => !Array.isArray(requirement)).flat();
	}

	// Generates an array of only the requirements that have choices in them
	private generateConditionalRequirements(company: Company): string[] {
		return company.requirements.filter((requirement) => Array.isArray(requirement)).flat();
	}
}
