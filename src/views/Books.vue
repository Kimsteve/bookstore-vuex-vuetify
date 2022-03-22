<template>
  <v-row>
    <v-col md="8" offset-sm="2">
        <v-skeleton-loader
          v-if="loading"
          height="500"
          type="table"
        />
        <v-data-table
          v-else
          :headers="headers"
          :items="books"
          sort-by="names"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Books Table</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Book</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="Book name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.author" label="Author"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-toolbar>
          </template>
          <!-- <template v-slot:item.actions="{ item }"> -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
     <!-- </component> -->
    </v-col>
  </v-row>
</template>
<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    loading: true,
    transition: 'scale-transition',
    dialog: false,
    headers: [
      { text: 'ID', value: 'id' },
      {
        text: 'Books',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Author', value: 'author' },
      { text: 'Price', value: 'price' },
      { text: 'Date created', value: 'createdDate' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      author: '',
      price: '',
      createdDate: ''
    },
    defaultItem: {
      id: '',
      name: '',
      author: '',
      price: '',
      createdDate: ''
    }
  }),

  computed: {
    ...mapGetters({
      books: 'getBooks'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions(['fetchBooks', 'removeItem', 'saveEditedItem', 'addNewBook']),
    initialize () {
      this.$store.dispatch('fetchBooks')
    },

    editItem (item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.books.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.books.splice(index, 1)
      this.removeItem(item)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        // EDITED
        Object.assign(this.books[this.editedIndex], this.editedItem)
        this.saveEditedItem({ id: this.editedItem.id, name: this.editedItem.name, author: this.editedItem.author, price: this.editedItem.price })
      } else {
        // CREATED
        this.addNewBook({ name: this.editedItem.name, author: this.editedItem.author, price: this.editedItem.price })
      }
      this.close()
    }
  },
  mounted () {
    this.loading = true
    console.log(this.$store.getters.getBooks)
    setTimeout(() => {
      this.loading = false
    }, 5000)
  }
}
</script>
