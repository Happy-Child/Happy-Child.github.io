<template>
  <div id="app">
    <div class="wrap-modal" 
      v-show="modal"
    >
      <p>Для увеличения толщины слоя - <span class="text-warning">нажать</span> на слой (если с ПК - нажать правой кнопкой мыши).</p>
      <p>Для уменьшения толщины слоя - <span class="text-warning">нажать и держать</span> (если с П -К нажать левой кнопкой мыши).</p>

      <span 
        @click="modal = !modal" class="closeModal"
      >&times;</span>

    </div>

    <div class="container">

      <div class="row">
        <div class="col-12">
          <h2>Конструктор торта</h2>
          <div class="wrap-btn bg-dark">

            <button class="btn btn-primary" 
              @click="addLayer"
            >Добавить слой</button>

          </div>
        </div>
      </div>

      <div class="row justify-content-center mtb">
        <div class="col-md-6">
          <layers :arrLayer="curLayers"></layers>
        </div>

        <div class="col-md-6">

          <panel 
            :arrLayer="curLayers"
            :arrLayerInfo="layersInfo"
            @newLayer="replaceLayer($event)"
          ></panel>

        </div>
      </div>

      <div class="row">
       <div class="col-12">

          <sum 
          :arrLayer="curLayers"
          :arrLayerInfo="layersInfo"
          ></sum>

       </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      modal: true,
      layersInfo: [
        {
          name: "biskvit",
          label: "Бисквит",
          price: 30
        },
        {
          name: "crease",
          label: "Мёд",
          price: 120
        }, 
        {
          name: "milk",
          label: "Молоко",
          price: 55
        },
        {
          name: "raspberries",
          label: "Малина",
          price: 70
        }, 
        {
          name: "cocao",
          label: "Какао",
          price: 60
        }
      ],
      curLayers: [{
        "layerName": "biskvit",
        "labelName": "Бисквит",
        "height": 2
      }],
    }
  },
  methods: {
    addLayer () {
      if( this.curLayers.length < 10 ){
        this.curLayers.push({
          "layerName": this.layersInfo[0].name,
          "labelName": this.layersInfo[0].label,
          "height": 2
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h2{
    margin: 20px 0;
  }
  .wrap-btn{
    border-radius: 4px;
    button{
      margin: 20px;
    }
  }
  .mtb{
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .wrap-modal{
    background-color: rgba(0,0,0,.9);
    position: fixed;
    top: 0;
    left: -0;
    width: 100%;
    height: 100%;
    z-index: 9;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    flex-direction: column;
    .closeModal{
      content: "×";
      position: absolute;
      top: 8%;
      right: 5%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .wrap-modal {
      font-size: 16px;
      p{
        width: 70%;
      }
      .closeModal{
        font-size: 40px;
        right: 0;
      }
    }
    .mtb{
      margin-bottom: 20px;
    }
  }
  @media (max-width: 450px){
    .wrap-modal {
      font-size: 14px;
      p{
        width: 90%;
      }
    }
  }
</style>
