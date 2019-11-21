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
								<td>
									<v-icon v-if="qualified(company)" color="green">{{ Icons.mdiCheckboxMarkedOutline }}</v-icon>
									<v-icon v-else color="red">{{ Icons.mdiCloseBoxOutline }}</v-icon>
								</td>
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
import { StringMixins } from "@/utils/description";
import { QualificationMixins } from "@/utils/qualification";
import { mdiCheckboxMarkedOutline, mdiCloseBoxOutline } from "@mdi/js";

@Component
export default class JobTable extends Mixins(
  StringMixins,
  QualificationMixins
) {
  @Get("company") private companies!: Company[];
  @Get("bioData") private bioData!: BioData;

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
  private qualified(company: Company): boolean {
    // If company has no requirements then return true immediately
    if (company.requirements.length < 1) {
      return true;
    }

    // Apply AND operator on both type of conditions (conditional and compulsory)
    return (
      this.requirementsQualified(company, this.bioData) &&
      this.conditionalRequirementsQualified(company, this.bioData)
    );
  }

  get Icons() {
    return {
      mdiCheckboxMarkedOutline,
      mdiCloseBoxOutline
    };
  }
}
</script>
