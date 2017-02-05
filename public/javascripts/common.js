$(function(){
  var lineChartData = [
                     {
                       label: "Series 1",
                       values: [ {time: 1370044800, y: 1}, {time: 1370044801, y: 4}]
                     },

                     {
                       label: "Series 2",
                       values: [ {time: 1370044800, y: 2}, {time: 1370044801, y: 3}]
                     },
                   ];


var lineChart = $('#lineChart').epoch({
  type: 'time.line',
  data: lineChartData,
  axes: ['left', 'bottom', 'right'],
  height: 200,
  range: [0, 100],
  ticks: { time: 10, right: 5, left: 5 }
});

setInterval(function(){

	$.ajax({
		url : 'http://localhost:9000/api/vote',        //testdata.jsonというサーバーにあるファイルを
		type : "GET",               //GETメソッドでサーバーから取得し
		dataType : "json",          //処理結果はjson形式で受信
		success : function(data){   //取得が成功したらtestdata.jsonをコールバック関数のfunctionの引数dataにセット 
		var current = [
		                 { time: data.time/1000, y: data.cntA },
		                 { time: data.time/1000, y: data.cntB }
		               ];
			lineChart.push(current);
		}
	});
}, 1000);

$("#button-a").click( function(){
  $.ajax({
    type : 'post',
    url : 'http://localhost:9000/api/vote',
    data : JSON.stringify({vote: "A"}),
    contentType: 'application/JSON',
    dataType : 'JSON'
  });
})

$("#button-b").click( function(){
  $.ajax({
    type : 'post',
    url : 'http://localhost:9000/api/vote',
    data : JSON.stringify({vote: "B"}),
    contentType: 'application/JSON',
    dataType : 'JSON'
  });
})

$("#button-reset").click( function(){
  $.ajax({
    type : 'post',
    url : 'http://localhost:9000/api/reset',
  });
})

});

