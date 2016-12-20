var chartObj = {
	settings: {
		"idname": '',
		"data": "",
		"timeData": "",
		"title": "",
		"xAxis_axisTick_lineStyle_color": "#ccc",
		"xAxis_axisLabel_textStyle_color": "#666",
		"yAxis_nameTextStyle": "#ccc",
		"series_areacolor": "#209bce",
		"itemStyle_borderColor": '#5ee8f4',
		"itemStyle_color": '#5ee8f4',
		"mapColorRange": ['#83d629', '#1bd0dc', '#1bd0dc', '#c4d0d1'],
		"mapAreaColor": "",
		"splitNumber": 5,
	},
	myChart: "",
	lineinit: function() {
		this.myChart = echarts.init(document.getElementById(this.settings.idname));
		var option = this.setLineOption();
		this.myChart.setOption(option);
	},
	multiLineInit: function() {
		this.myChart = echarts.init(document.getElementById(this.settings.idname));
		var option = this.setMultiLineOption();
		this.myChart.setOption(option);
	},
	barinit: function() {
		this.myChart = echarts.init(document.getElementById(this.settings.idname));
		var option = this.setBarOption();
		this.myChart.setOption(option);
	},
	pieinit: function() {
		this.myChart = echarts.init(document.getElementById(this.settings.idname));
		var option = this.setPieOption();
		this.myChart.setOption(option);
	},
	mapinit: function() {
		this.myChart = echarts.init(document.getElementById(this.settings.idname));
		var option = this.setMapOption();
		if (option && typeof option === "object") {
			this.myChart.setOption(option, true);
		}
	},
	setMultiLineOption: function() {
		var series = new Array();
		if (this.settings.data) {
			$(this.settings.data).each(function(i, val) {
				var arrays = {
					"name": "",
					"type": "line",
					"stack": "",
					"smooth": true,
					"areaStyle": {
						normal: {
							color: "",
						}
					},
					"itemStyle": {
						normal: {
							borderColor: "",
							color: "",
						}
					},
					data: "",
				};
				arrays.name = val.name;
				arrays.areaStyle.normal.color = arrays.itemStyle.normal.borderColor = arrays.itemStyle.normal.color = val.color;
				arrays.data = val.data;
				series[series.length] = arrays;
			});
		};
		var option = {
			title: {
				text: this.settings.title,
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: "line",
					lineStyle: {
						color: "#ccc",
					}
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					lineStyle: {
						color: this.settings.xAxis_axisTick_lineStyle_color,
					}
				},
				boundaryGap: ['50%', '50%'],
				axisLabel: {
					textStyle: {
						color: this.settings.xAxis_axisLabel_textStyle_color,
					}
				},
				splitArea: {
					areaStyle: {
						shadowColor: 'rgba(0, 0, 0, 0.5)',
						shadowBlur: 10,
					}
				},
				data: this.settings.timeData,
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false,
				},
				nameTextStyle: {
					color: "#ccc",
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: this.settings.xAxis_axisLabel_textStyle_color,
					}
				},
				splitNumber: this.settings.splitNumber,

			},
			series: series,

		};
		return option;
	},
	setLineOption: function() {
		var option = {
			title: {
				text: this.settings.title,
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: "line",
					lineStyle: {
						color: "#ccc",
					}
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					lineStyle: {
						color: this.settings.xAxis_axisTick_lineStyle_color,
					}
				},
				boundaryGap: ['50%', '50%'],
				axisLabel: {
					textStyle: {
						color: this.settings.xAxis_axisLabel_textStyle_color,
					}
				},
				splitArea: {
					areaStyle: {
						shadowColor: 'rgba(0, 0, 0, 0.5)',
						shadowBlur: 10,
					}
				},
				data: this.settings.timeData,
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false,
				},
				nameTextStyle: {
					color: "#ccc",
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: this.settings.xAxis_axisLabel_textStyle_color,
					}
				},
				splitNumber: this.settings.splitNumber,

			},
			series: [{
				name: this.settings.title,
				type: 'line',
				stack: '总量',
				smooth: true,
				areaStyle: {
					normal: {
						color: this.settings.series_areacolor,
					}
				},

				itemStyle: {
					normal: {
						borderColor: this.settings.itemStyle_borderColor,
						color: this.settings.itemStyle_color,
					}
				},
				data: this.settings.data
			}],

		};


		return option;
	},
	setPieOption: function() {
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: this.settings.title,
				type: 'pie',
				radius: '55%',
				center: ['50%', '50%'],
				data: this.settings.data,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		return option;
	},
	setBarOption: function() {
		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '7%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			    legend: {
        data:['计划单数量']
    },
			xAxis: [{
				type: 'category',
				axisLine: {
					show: true,
				},
				splitLine: {
					show: false,
				},
				
				data: this.settings.timeData,
			}],
			yAxis: [{
				type: 'value',
				axisLine: {
					show: true,
				},
				splitLine: {
					show: false,
				},
			}],
			series: [{
					name: this.settings.title,
					type: 'bar',
					barWidth: '33',
					itemStyle: {
						normal: {
							color: this.settings.series_areacolor,
							barBorderRadius: [5,5, 5, 5], //（顺时针左上，右上，右下，左下）
						}
					},
	
//					markPoint: {
//						data: [{
//							type: 'max',
//							name: '最大值'
//						}, {
//							type: 'min',
//							name: '最小值'
//						},]
//					},
					markLine: {
				lineStyle: {
						normal:{
							width:"0.8",
						}
					},
					    precision: '0',
						silent:false,
						data: [
//						{type: 'max',
//							name: '最大值'
//						}, {
//							type: 'min',
//							name: '最小值'
//						},
//						{yAxis:'average',x:"90%"},

						{type : 'average', name: '平均值'},]
					},
					data: this.settings.data,
				},

			]
		};
		return option;
	},
	setMapOption: function() {
		option = {
			tooltip: {
				trigger: 'item'
			},
			visualMap: {
				min: 0,
				max: 1000,
				text: ['高', '低'],
				realtime: false,
				calculable: true,
				color: this.settings.mapColorRange,
				symbolSize:'20',
			},
			series: [{
					name: '',
					type: 'map',
					mapType: 'china',
					roam: false,
					left: '100',
					width: "300",
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							borderColor: 'rgba(255,255,255,0.4)',
						},
						emphasis: {
							areaColor: this.settings.mapAreaColor,
						}
					},
					data: this.settings.data,
				},


			]
		};
		return option;

	}
}

function createLineChart(id, data, title, timeData) {
	chartObj.settings.idname = id;
	chartObj.settings.data = data;
	chartObj.settings.timeData = timeData;
	chartObj.settings.series_areacolor = "#a76cff",
		chartObj.settings.itemStyle_borderColor = '#a76cff',
		chartObj.settings.itemStyle_color = '#a76cff',
		chartObj.lineinit();
}

function createMultiLineChart(id, multidata, title, timeData) {
	chartObj.settings.idname = id;
	chartObj.settings.data = multidata;
	chartObj.settings.timeData = timeData;
	chartObj.settings.series_areacolor = "#a76cff",
		chartObj.settings.itemStyle_borderColor = '#a76cff',
		chartObj.settings.itemStyle_color = '#a76cff',
		chartObj.multiLineInit();
}

function createBarChart(id, data, title, timeData) {
	chartObj.settings.idname = id;
	chartObj.settings.data = data;
	chartObj.settings.timeData = timeData;
	chartObj.barinit();
}

function createPieChart(id, data, title) {
	chartObj.settings.idname = id;
	chartObj.settings.data = data;
	chartObj.settings.series_areacolor = "#e7614b",
		chartObj.pieinit();
}

function createMapChart(id, data, title) {
	chartObj.settings.idname = id;
	chartObj.settings.data = data;
	chartObj.mapinit();
}