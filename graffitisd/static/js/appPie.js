var myChart2 = document.getElementById("myPieChart").getContext("2d");

//global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "grey";

const city2 = {
district: [],
pieRange: [],
};

// var pie = []
// mynewDataSet.data.forEach(function (value, i) {
//     pie.push(new myChart)
// })

// d3.csv("./pieChart.csv")
d3.json("/piechartdf",function(data) {
    
    console.log(data);
    
    for(var i in data){
        city2.district.push(data[i].district);
        city2.pieRange.push(data[i].Count1);
    }

    console.log(city2, 'all')
    drawChart2()
});

function drawChart2() {
    const { district, pieRange} = city2;
    var colors = ["orange", "DarkOrange", "coral", "Tomato", "OrangeRed", "Gold", "red", "Gold", "Yellow",];
    
    var graphSD = new Chart(myChart2, {
        type: "doughnut",
        data: {
            labels: district,
            datasets:[{
                label: "Count1",
                data: pieRange,
                backgroundColor: colors,
                borderWidth: 3,
                borderColor: "green",
                hoverBorderWidth: 5,
                hoverBorderColor: "dodgerblue",
            }]
        },
        options: {
            title: {
                display: true,
                text: "Days to complete"
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                }
            }
            }
        }
    );
}



