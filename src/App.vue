<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title>Job Board</v-toolbar-title>
		</v-app-bar>

		<v-content>
			<job-summary></job-summary>
			<job-board></job-board>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import JobSummary from "@/components/JobSummary.vue";
import JobBoard from "@/components/JobBoard.vue";

export default Vue.extend({
  name: "App",

  components: {
    JobSummary,
    JobBoard
  },

  data: () => ({
    //
  })
});
</script>
