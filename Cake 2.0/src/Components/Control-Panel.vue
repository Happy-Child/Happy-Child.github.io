<template>
  <div>
    <table class="table table-dark">
		  <thead>
		    <tr>
		      <th scope="col"></th>
		      <th scope="col">Начинка</th>
		      <th scope="col">Толщина</th>
		      <th scope="col">Убрать</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr v-for="(glodLayer, e) in arrLayer">
		      <th scope="row">
		      	{{e + 1}}
		      </th>

		      <td>
		      	<select v-model="arrLayer[e].layerName" class="form-control">
				      <option 
				      	v-for="(layerInfo, i) in arrLayerInfo"
				      	:value="layerInfo.name"
				      >{{layerInfo.label}}</option>
				    </select>
		      </td>

		      <td>
		      	<div class="wrap-num-height form-control">
		      		<span>{{glodLayer.height}}</span>
		      	</div>
		      </td>

		      <td>
		      	<button type="button" class="myclose" @click="removeLayer( e )">
						  <span aria-hidden="true">&times;</span>
						</button>
		      </td>

		    </tr>
		  </tbody>
		</table>
  </div>
</template>

<script>
export default{
	props: {
		arrLayer: [Array, Object],
		arrLayerInfo: [Array, Object]
	},
  data () {
    return {
    }
  },
  methods: {
  	removeLayer ( i ) {
  		if( this.arrLayer.length > 1 ){
  			this.arrLayer.splice(i, 1);
  		}
  	}
  }
}
</script>

<style lang="scss">
	.myclose{
		display: block;
		margin: 0 auto;
		outline: none;
		background-color: transparent;
		border: none;
		color: white;
		font-size: 30px;
		cursor: pointer;
		padding: 0;
		margin-top: -7px;
		&:focus{
			outline: none
		}
	}
	table{
		border-radius: 4px;
		thead th{
			border-top: none !important;
		}
	}
</style>
