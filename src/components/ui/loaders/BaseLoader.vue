<template>
  <div class="o-pokeball c-loader u-pulse"></div>
</template>
<style lang="scss" scoped>
.u-pulse {
  animation: pulse 1000ms infinite;
}

/* Pokeball draw code */
// Size variable to keep all proportional if manipulate it
$size: 50px;

.o-pokeball {
  width: $size;
  height: $size;
  border-radius: $size;
  border: solid ($size/25) black;
  position: relative;
  background: linear-gradient(to bottom, #eeeeee 0%, #ffffff 100%);
  margin: 10px auto;
  box-sizing: content-box;

  &:before,
  &:after {
    content: "";
    display: block;
  }

  &,
  &:before,
  &:after {
    transition: all 600ms cubic-bezier(0.67, 0.4, 0.36, 0.75);
  }

  &:before {
    width: $size;
    height: ($size/2) - ($size/25/2);
    border-bottom: solid ($size/25) black;
    border-radius: ($size/2) ($size/2) 0 0;
    background: linear-gradient(to bottom, #d10000 0%, #ff0000 50%);
  }

  &:after {
    content: "";
    width: $size/5;
    height: $size/5;
    background: linear-gradient(to bottom, #fff 0%, #ccc 100%);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0 0 ($size/50) black, 0 0 0 ($size/25) #ddd,
      0 0 0 ($size/14) black, 0 0 ($size/10) ($size/17) rgba(0, 0, 0, 0.4);
  }
}
</style>
