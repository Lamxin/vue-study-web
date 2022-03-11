<template>
<div>{{arr}}</div>
</template>
<script>
  export default{
	name: 'about',
	data () {
	  return {
		arr: [1, 2, 3, [4, 5]]
	  }
	},
	mounted() {
	//   this.calData(this.arr)
	},
	methods: {
	  calData (arr) {
		var res = []
		arr.forEach((item) => {
		  if(Array.isArray(item)){
			res.concat(this.calData(item))
		  } else {
			res.push(arr)
		  }
		})
		return res
	  }
	}
  }
</script>