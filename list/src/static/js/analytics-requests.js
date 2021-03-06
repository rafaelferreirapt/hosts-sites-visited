$(document).ready(function(){
    $.getJSON("/api/v1/register/list_months/2016/", function (data) {
        data.forEach(function(entry) {
            var select = "#month"+entry.month;

            $(select).html("<a href=\"#month\" rel=\"" + entry.month + "\"><span class=\"btn btn-success btn-xs\"><strong>" + $(select).html()
                + "</strong></span></a>");
        });

        $("#messageAnalytics").html('<div class="alert alert-info alert-dismissible fade in" role="alert"><strong>Select one month!</strong><br/> You should select one month to get the days available for that month. Months with data are displayed with strong format.</div>');

        $("a[href='#month']").click(function () {
            $("#messageAnalytics").html("");
            var month = $(this).attr("rel");
            $.getJSON("/api/v1/register/list_days/2016/" + month + "/", function (data) {
                console.log(data);
                data.forEach(function(entry) {
                    var select = "#day" + entry.day;
                    $(select).html("<a href=\"#day\" rel=\"" + month + "." + entry.day + "\"><span class=\"btn btn-success btn-xs\"><strong>" + entry.day
                        + "</strong></span></a>");
                });

                $("#messageAnalytics").html('<div class="alert alert-info alert-dismissible fade in" role="alert"><strong>Select one day!</strong><br/> You should select one day to get the hours available for that day. Hours with data are displayed with strong format.</div>');

                $("a[href='#day']").click(function () {
                    $("#messageAnalytics").html("");
                    var day_month = $(this).attr("rel").split(".");
                    var day_d = day_month[1];
                    var month_d = day_month[0];

                    $.getJSON("/api/v1/register/list_hours/2016/" + month_d + "/"  + day_d + "/", function (data) {
                        console.log(data);
                        data.forEach(function(entry) {
                            var select = "#hour" + entry.hour;
                            $(select).html("<a href=\"#hour\" rel=\"" + month_d + "." + day_d + "." + entry.hour + "\"><span class=\"btn btn-success btn-xs\"><strong>" + entry.hour + "</strong></span></a>");
                        });
                        $("#messageAnalytics").html('<div class="alert alert-info alert-dismissible fade in" role="alert"><strong>Select one hour!</strong><br/> You should select one hour to get the hosts available for that hour.</div>');

                        $("a[href='#hour']").click(function () {
                            $("#messageAnalytics").html("");
                            var day_month_hour = $(this).attr("rel").split(".");
                            var day_h = day_month_hour[1];
                            var month_h = day_month_hour[0];
                            var hour_h = day_month_hour[2];

                            $.getJSON("/api/v1/register/hosts/2016/" + month_h + "/"  + day_h + "/" + hour_h + "/", function (data) {
                                console.log(data);

                                var hosts = [];
                                data.forEach(function(entry) {
                                    hosts.push(entry.host);
                                });

                                var stats = [];

                                data.forEach(function (entry) {
                                   stats.push({
                                                value: entry.hits,
                                                name: entry.host
                                              });
                                });

                                /* echarts donut */

                                var echartDonut = echarts.init(document.getElementById('echart_donut'), theme);

                                echartDonut.setOption({
                                tooltip: {
                                  trigger: 'item',
                                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                calculable: true,
                                legend: {
                                  x: 'center',
                                  y: 'bottom',
                                  data: hosts
                                },
                                toolbox: {
                                  show: true,
                                  feature: {
                                    magicType: {
                                      show: true,
                                      type: ['pie', 'funnel'],
                                      option: {
                                        funnel: {
                                          x: '25%',
                                          width: '50%',
                                          funnelAlign: 'center',
                                          max: 1548
                                        }
                                      }
                                    },
                                    restore: {
                                      show: true,
                                      title: "Restore"
                                    },
                                    saveAsImage: {
                                      show: true,
                                      title: "Save Image"
                                    }
                                  }
                                },
                                series: [{
                                  name: 'Host',
                                  type: 'pie',
                                  radius: ['35%', '55%'],
                                  itemStyle: {
                                    normal: {
                                      label: {
                                        show: true
                                      },
                                      labelLine: {
                                        show: true
                                      }
                                    },
                                    emphasis: {
                                      label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                          fontSize: '14',
                                          fontWeight: 'normal'
                                        }
                                      }
                                    }
                                  },
                                  data: stats
                                }]
                                });

                            });
                        });
                    });
                });
            });
        });

    });
});
