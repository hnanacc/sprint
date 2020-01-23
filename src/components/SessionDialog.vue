<template>
  <div>
    <v-dialog max-width="40vw" v-model="launchSessionState">
      <v-container fluid>
        <v-card>
          <v-card-title>Launch Session :-)</v-card-title>
          <v-card-text>
            <v-row class="d-flex align-center justify-center">
              <v-col class="d-flex flex-column">
                <p class="header">Select Existing</p>
                <v-btn @click="browse" x-large>Browse</v-btn>
              </v-col>

              <v-col class="d-flex flex-column">
                <p class="header">Create New Folder</p>
                <v-btn @click="create" x-large>New Folder</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>

    <v-dialog v-model="createNewDialog" max-width="40vw">
      <v-container>
        <v-card>
          <v-card-title>Create new session</v-card-title>
          <v-card-text>
            <v-form>
              <v-input>Directory name</v-input>
              <v-select>Select from here</v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="cancel">cancel</v-btn>
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
      createNewDialog: false
    };
  },

  methods: {
    browse: function() {
      this.$store.commit("changeLaunchSessionDialog");
      var sessionPath = dialog.showOpenDialogSync({
        properties: ["openDirectory"]
      });

      console.log(sessionPath);
    },
    create: function() {
      this.$store.commit("changeLaunchSessionDialog");
      this.createNewDialog = !this.createNewDialog;
    },

    submit: function() {
      this.createNewDialog = !this.createNewDialog;
      console.log('New directory created...')
    },

    cancel: function() {
      this.createNewDialog = !this.createNewDialog;
    }
  },

  computed: {
    launchSessionState() {
      return this.$store.state.launchSessionDialog;
    }
  }
};
</script>



