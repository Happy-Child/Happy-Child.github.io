<template>
  <div class="wrap-total-sum bg-dark">
    
    <span class="sum">{{this.calcTotalSum}}<span>$</span></span>
    <button class="btn btn-success">Заказать</button>

  </div>
</template>

<script>
export default {
	props: {
    arrLayer: [Array, Object],
    arrLayerInfo: [Array, Object]
  },
  data () {
    return {
    }
  },
  computed: {
  	calcTotalSum () {
  		let total = 0;
  		let arrLayerInfo = this.arrLayerInfo;

  		this.arrLayer.forEach(function (curI) {
  			let nameLayer = curI.layerName;

  			arrLayerInfo.forEach(function (curX){
  				if( curX.name == nameLayer ){
  					total += curX.price / 4
  				}
  			}),

  			total += curI.height * 2
  		})

  		return ~~total;
  	}
  }
}
</script>

<style lang="scss">
	.wrap-total-sum{
		border-radius: 4px;
		padding: 10px 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
	}
	.sum{
		font-size: 45px;
		color: white;
		span{
			font-size: 25px;
			margin-left: 5px;
		}
	}
	button{
		margin-left: 30px;
	}
</style>
