import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        apiResponse: {
            statusText:undefined,
            status:undefined,
            rawResponseData:undefined
        },
        grid : {
            raw:true,
            flat:false
        }

    },
    mutations: {
        setApiResponse(state, payload) {
            state.apiResponse.statusText = payload.statusText;
            state.apiResponse.status = payload.status;
            state.apiResponse.rawResponseData = payload.data
        },
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
