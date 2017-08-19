import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        grid : {
            raw:true,
            flat:false
        }

    },
    mutations: {
        setGridRaw(state, payload) {
            state.grid.raw = true;
            state.grid.flat = false;
        },
        setGridFlat(state, payload) {
            state.grid.raw = false;
            state.grid.flat = true;
        }
    }
})
