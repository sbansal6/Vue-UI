
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'

Vue.use(Vuetify)

new Vue({
    el: '#app',
    template: `
      <v-app id="example-2" toolbar>
    <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Api-Monk</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <div class="title">Click on sidebar to re-open.</div>
        <!--v-router-->
      </v-container>
    </main>
  </v-app>
    `,
    router,
    data:{
        drawer: true,
        items: [
            { title: 'Home', icon: 'dashboard' },
            { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
    }
});