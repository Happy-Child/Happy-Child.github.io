<template>
  <div class="mb-50">

    <div class="layer" 
	    :class="'layer-' + layer.layerName" 
	    :style="{height: layer.height * 10 + 'px'}"
	    @contextmenu.prevent="removeHeight(i)"
	    @click="addHeight(i)"
    	v-for="(layer, i) in arrLayer"
    ></div>

    <div class="bottom-plate"></div>

  </div>
</template>

<script>
export default {
	props: {
		arrLayer: [Array, Object]
	},
  data () {
    return {
    }
  },
  methods: {
  	removeHeight (i) {
  		if( this.arrLayer[i].height > 2 ){
  			this.arrLayer[i].height--
  		}
  	},
  	addHeight (i) {
			if( this.arrLayer[i].height < 7 ){
  			this.arrLayer[i].height++
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
	.layer{
		width: 80%;
		margin: 0 auto;
		transition: .2s background ease-in-out, .2s height ease-in-out;
		cursor: pointer;
		z-index: 9;
		&:first-child{
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		&:last-child{
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	@media (max-width: 1200px) {
		.bottom-plate{
			margin-top: -32px;
		}
  }
	@media (max-width: 991px) {
		.bottom-plate{
			margin-top: -35px;
		}
	}
	@media (max-width: 768px) {
		.bottom-plate{
			margin-top: -30px;
		}
		.mb-50{
			margin-bottom: 90px;
		}
	}
	@media (max-width: 500px) {
		.bottom-plate{
			margin-top: -35px;
		}
	}
</style>
