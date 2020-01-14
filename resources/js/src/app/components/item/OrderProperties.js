import Vue from "vue";
import { mapState, mapMutations } from "vuex";

export default Vue.component("order-properties", {

    props: [
        "template"
    ],

    computed: mapState({
        properties: state => state.item.variation.documents[0].data.properties
    }),

    methods: mapMutations([
        "setVariationOrderProperty"
    ])
});
