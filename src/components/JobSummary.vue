<template>
	<v-container>
		<v-row>
			<v-col>
				<p>
					<b>Name:</b>
					{{data.name}}
				</p>
				<p>
					<b>Total Jobs:</b>
					{{company.length}}
				</p>
				<p>
					<b>Qualifications:</b>
					{{data.qualifications.join(', ')}}
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Get } from "vuex-pathify";

@Component
export default class JobSummary extends Vue {
  @Get("bioData") private data!: any;
  @Get("company") private company!: any;
}
</script>
