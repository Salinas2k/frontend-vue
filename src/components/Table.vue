<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <!-- <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>-->

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!--<b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filtro"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="name">Nombre</b-form-checkbox>
            <b-form-checkbox value="surname">Apellidos</b-form-checkbox>
            <b-form-checkbox value="volunteer">Voluntario</b-form-checkbox>
            <b-form-checkbox value="phone">Teléfono</b-form-checkbox>
            <b-form-checkbox value="email">Email</b-form-checkbox>
            <b-form-checkbox value="profession">Profesión</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col> -->

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col> 
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="customers"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(customers[0], customers[0].length)"
          class="mr-2"
        >
          Info
        </b-button>
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
        </b-button>
        <b-button size="sm" variant="danger" v-b-modal.modal-lg>
          Eliminar
        </b-button>

        <b-modal
          id="modal-lg"
          size="lg"
          title="¡Atención!"
          @click="deleteRow(customers[0].id)"
          >¿Seguro que quiere eliminar este usuario?</b-modal
        >
      </template>

      <template #row-details="row">
        <b-row align-v="start" cols="6">
          <b-card
            v-for="(value, key) in row.item"
            :key="key"
            :header="key"
            class="mr-3 mt-2 text-center"
          >
            <b-card-text>{{ value }}</b-card-text>
          </b-card>
        </b-row>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import ApiService from "../common/api.service.js";
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "surname",
          label: "Apellidos",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          class: "text-center",
        },
        {
          key: "volunteer",
          label: "Voluntario",
          formatter: (value, key, item) => {
            return value ? "Sí" : "No";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      customers: [],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    ApiService.get("customers").then((response) => {
      this.customers = response.data;
    });

    // Set the initial number of customers
    this.totalRows = this.customers.length;
  },
  methods: {
    dataFormatTable() {
      return this.customers[0]["email"].trim();
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteRow(id) {
      ApiService.delete("customer/" + id).then((response) => {
        console.log("ok");
      });
    },
  },
};
</script>