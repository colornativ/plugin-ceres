import UrlService from "services/UrlService";

Vue.component("item-filter-price", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-filter-price"
        }
    },

    data()
	{
        return {
            priceMin: "",
            priceMax: "",
            currency: App.activeCurrency
        };
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter-price";

        const urlParams = UrlService.getUrlParams(document.location.search);

        this.priceMin = urlParams.priceMin || "";
        this.priceMax = urlParams.priceMax || "";
    },

    computed:
    {
        isDisabled()
		{
            return (this.priceMin === "" && this.priceMax === "") ||
                    (parseInt(this.priceMin) >= parseInt(this.priceMax)) ||
                    this.isLoading;
        },

        ...Vuex.mapState({
            isLoading: state => state.itemList.isLoading
        })
    },

    methods:
    {
        selectAll(event)
        {
            event.target.select();
        },

        triggerFilter()
        {
            if (!this.isDisabled)
            {
                // TODO reload
                this.$store.dispatch("selectPriceFacet", {priceMin: this.priceMin, priceMax: this.priceMax});
            }
        }
    }
});
