<script>
/* eslint-disable */ 
export default {
methods:{
    showModal(){
        this.$refs["modal-edit"].show();
    }
}
}
</script>

<style>

</style>
<template>
  <div>
    <!-- modal vertical center -->
    <b-modal
      id="modal-center"
      centered
      ref="modal-edit"
      title="Vertically Centered"
      ok-only
      ok-title="Accept"
    >
      <b-card-text>
        Croissant jelly-o halvah chocolate sesame snaps.
        Brownie caramels candy canes chocolate cake marshmallow icing lollipop I love.
        Gummies macaroon donut caramels biscuit topping danish.
      </b-card-text>
    </b-modal>
  </div>
</template>

