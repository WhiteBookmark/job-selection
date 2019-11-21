import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import states from '@/store/states';
import { make } from 'vuex-pathify';

Vue.use(Vuex);

const mutations = make.mutations(states);

export default new Vuex.Store({
	state: states,
	mutations,
	plugins: [pathify.plugin],
});
