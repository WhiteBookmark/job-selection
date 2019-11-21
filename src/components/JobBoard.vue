<template>
	<v-container>
		<v-row>
			<v-col>
				<v-simple-table>
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">Qualified</th>
								<th class="text-left">Job</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="company in companies" :key="company.name">
								<td>{{ company.name }}</td>
								<td>{{ description(company) }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { StringMixins } from "@/utils/string";

interface Company {
  name: string;
  requirements: Array<string | string[]>;
}

interface BioData {
  name: string;
  qualifications: Array<string[]>;
}

@Component
export default class JobTable extends Mixins<StringMixins>(StringMixins) {
  @Get("company") private companies!: Company[];
  @Get("bioData") private bio!: Company[];

  // Generate job description based on conditions
  private description(company: Company): string {
    // Return if no condition for job
    if (company.requirements.length < 1) {
      return `${company.name} doesn't require anything, you can come and start working immediately`;
    }

    const ANDRequirements: string = this.compulsoryRequirements(company);
    const ORRequirements: string = this.conditionalRequirements(company);
    const concatenatedRequirements: string = this.concatenateRequirements(
      ORRequirements,
      ANDRequirements
    );

    // Concatenate string then replace last comma with "and"
    const message: string = `${company.name} requires ${concatenatedRequirements}`.replace(
      /,(?=[^,]*$)/,
      " and"
    );

    return message;
  }

  // Check job qualification
//   private qualified(company: Company): boolean {
//     const ANDRequirements: string = this.compulsoryRequirements(company);
//     // const ORRequirements: string = this.conditionalRequirements(company);

//     return true;
//   }
}
</script>
