<template>
    <div :class="{'cross': true, 'active': active}">
      <div class="line1"/>
      <div class="line2"/>
    </div>
</template>

<script setup>
defineProps({
  value: Number,
  active: Boolean,
  size: {
    default(){
      return 'medium'
    }
  }
});

</script>

<style scoped>

.small {
  transform: scale(0.6)
}

.cross {
  height: 28px;
  width: 28px;
  position: relative;
}

.line1, .line2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 6px;
  width: 30px;
  background-color: #ab0000;
  transform-origin: center;
  border-radius: 5px;
}
.line1 {
  transform: rotate(45deg);
}

.line2 {
  transform: rotate(-45deg);
}

</style>