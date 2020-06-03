<template>
  <div id="myChart" :style="{width: '90%', height: '400px'}"></div>
</template>
<script type="text/babel">
    import * as api from "@/api";
    import page from "@/mixins/page";
    
    export default {
      name: "hello",
      data() {
        return {
          msg: "Welcome to Your Vue.js App"
        };
      },
      mounted() {
        this.drawLine();
      },
      methods: {
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表

          
          new Promise(async (resolve, reject) => {
                    try {

                        var lineData =  await api.analysis.lineData()
                        // console.log(lineData.memberData[0]);
                        
                        var dateJson = new Array();
                        var numberJson = new Array();

                        lineData.memberData.forEach((v,index) => {
                          Object.keys(v).forEach(function(key){
                          dateJson.push(key)
                          numberJson.push(v[key])
                          console.log(key,v[key]);

                          });
                        });
                        
                        dateJson = dateJson.reverse()

                        myChart.setOption({
                            title: { text: "每日新增用户" },
                            tooltip: {},
                            xAxis: {
                              data: dateJson
                            },
                            yAxis: {},
                            series: [
                              {
                                name: "销量",
                                type: "line",
                                data: numberJson
                              }
                            ]
                          });
                          
                        resolve({
                          
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
          
          
        }
      }
    };
</script>
<style lang="scss" type="text/scss" scoped>
</style>
