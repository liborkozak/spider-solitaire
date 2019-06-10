<template>
  <v-data-table :pagination.sync="pagination" hide-actions :headers="headers" :items="listItems">
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.username }}</td>
      <td class="text-xs-left">{{ props.item.score }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ComponentsScoreTable",
  props: {
    personal: Boolean
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          sortable: false,
          value: "username"
        },
        {
          text: "Score",
          sortable: false,
          value: "score"
        }
      ],
      listItems: [],
      pagination: {
        rowsPerPage: -1
      }
    };
  },
  created() {
    this.getListItems();
  },
  methods: {
    getListItems() {
      let url = "/scoreList?_sort=score&_order=desc&";
      if (this.personal) {
        let username = encodeURIComponent(this.$route.params.username);
        url += "username=" + username;
      } else {
        url += "_limit=10";
      }
      this.$http.get(url).then(this.setListItems.bind(this));
    },
    setListItems(response) {
      this.listItems = response.data;
    }
  }
};
</script>