# job-selection

## Project Description
Shows a tick for qualified and cross on disqualified jobs based on given user qualifications.

![Sample Image](https://i.imgur.com/IU2iIHN.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Project Info

To function, each job requires requirements to be in a specific format. All data is stored in Vuex store whic acts as the data point for the application.

For a **company A**, its format in store would be according to following interface:

```typescript
interface Company {
  name: string; // Name of the company
  requirements: Array<string | string[]>; // Array of requirements in string
}
```

Implementing above interface would give following example:

```javascript
{
    name: 'Company A',
    requirements: [['House', 'Apartment'], 'Property Insurance'],
},
{
    name: 'Company B',
    requirements: [['5 Door Car', '4 Door Car'], 'Driving License', 'Car Insurance'],
},
```

Requirements array can have a sub-array which would be used as a choice for qualifications.
In the above example, Company A requires 2 things in order for the individual to qualify for the job.

1. Has a property Insurance
2. Has a house or an Apartment

Basically sub-arrays give the individual a choice between the conditions while non-array requirements are absolutely neccessary.

### Description

Everything is generated using JavaScript, even the description of a job.

```typescript
// Checks if the starting word is a vowel
public isVowel(character: string): boolean {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(character.toLowerCase()) !== -1;
}

// In grammar, article means a, an or the
public addArticle(value: string): string {
  return this.isVowel(value.charAt(0)) ? `an ${value}` : `a ${value}`;
}

// Generates description for requirements that have a choice
public conditionalRequirements(company: Company): string {
  return company.requirements
    .filter((requirement) => Array.isArray(requirement))
    .flat()
    .map((requirement) => this.addArticle(requirement))
    .join(' or ')
    .toLowerCase();
}

/// Generates description for absolutely neccessary requirements
public compulsoryRequirements(company: Company): string {
  return company.requirements
    .filter((requirement) => !Array.isArray(requirement))
    .flat()
    .map((requirement) => this.addArticle(requirement))
    .join(', ')
    .toLowerCase();
}

// Joins all given requirements and forms a sentance based on the truth table
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
```

### Qualification

Verifying whether the individual is qualified for a job uses different methods.abnf

```typescript

// For neccessary requirements, checks if person is qualified
public requirementsQualified(company: Company, bioData: BioData): boolean {
  const requirements: string[] = this.generateRequirements(company);
  const updated: string[] = requirements.filter((requirement) => bioData.qualifications.includes(requirement));

  return requirements.length === updated.length;
}

// For conditional requirements which have choice
// Checks if person is qualified like for a requirement of a car or a motorcycle
public conditionalRequirementsQualified(company: Company, bioData: BioData): boolean {
  const requirements: string[] = this.generateConditionalRequirements(company);
  const updated: string[] = requirements.filter((requirement) => bioData.qualifications.includes(requirement));

  return requirements.length === updated.length;
}

// Generates an array of only the requirements that are neccessary
// Is used by requirementsQualified() method
private generateRequirements(company: Company, conditional: boolean = false): string[] {
  return company.requirements.filter((requirement) => !Array.isArray(requirement)).flat();
}

// Generates an array of only the requirements that have choices in them
// Is used by conditionalRequirementsQualified() method
private generateConditionalRequirements(company: Company): string[] {
  return company.requirements.filter((requirement) => Array.isArray(requirement)).flat();
}
```