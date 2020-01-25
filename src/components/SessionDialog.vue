<template>
  <div>
    <v-dialog max-width="40vw" :value="launchSessionState">
      <v-container fluid>
        <v-card>
          <v-card-title>Launch Session :-)</v-card-title>
          <v-card-text>
            <v-row class="d-flex align-center justify-center">
              <v-col class="d-flex flex-column">
                <v-btn @click="customCreate" class="mb-2" x-large>custom create</v-btn>
                <p class="header">Create the folder manually or choose existing</p>
              </v-col>

              <v-col class="d-flex flex-column">
                <v-btn @click="parseContest" class="mb-2" x-large>parse contest</v-btn>
                <p class="header">Parse problems and testcases from a contest</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>

    <v-dialog :value="contestParser" max-width="40vw">
      <v-container>
        <v-card>
          <v-card-title>Parse contest</v-card-title>
          <v-card-text>
            <v-form>
              <!-- write the form here -->
              <v-text-field outlined label="Contest link" v-model="contestLink"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" class="mr-2">submit</v-btn>
            <v-btn @click="cancel" class="mr-2">cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
const { dialog } = require("electron").remote;

export default {
  data() {
    return {
      contestParser: false,
      contestLink: ""
    };
  },

  methods: {
    create: function() {
      this.$store.commit("changeLaunchSessionDialog");
      this.createNewDialog = !this.createNewDialog;
    },
    customCreate: function() {
      this.$store.commit("changeLaunchSessionDialog");
      var sessionPath = dialog.showOpenDialogSync({
        properties: ["openDirectory"]
      });

      console.log(sessionPath);
    },

    parseContest: function() {
      this.contestParser = !this.contestParser;
      this.$store.commit("changeLaunchSessionDialog");
    },

    submit: function() {
      this.contestParser = !this.contestParser;
      console.log("New directory created...");
      console.log(this.contestLink);
    },

    cancel: function() {
      this.contestParser = !this.contestParser;
    }
  },

  computed: {
    launchSessionState() {
      return this.$store.state.launchSessionDialog;
    }
  }
};
</script>



