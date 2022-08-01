<template>
  <div class="display">
    <div class="mainImg">
      <b-carousel
        class="item"
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333; width: 70vh;"
        @sliding-start="onSlideStart(slide)"
        @sliding-end="onSlideEnd(slide)"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=55">
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div>
      <h4>aaaaa</h4>
    </div>
  </div>

</template>

<script>
import { getFarms } from '@/api/test'
export default {
  name: 'main',
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },

    init() {
      this.test()
    },
    async test() {
      const res = await getFarms()
      console.log(res)
    }
  }
}
</script>

<style scoped>
.display {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10vh;
}
</style>
