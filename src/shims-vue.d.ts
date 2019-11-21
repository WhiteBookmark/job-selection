declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vuetify/lib';

interface Company {
  name: string;
  requirements: Array<string | string[]>;
}

interface BioData {
  name: string;
  qualifications: string[];
}