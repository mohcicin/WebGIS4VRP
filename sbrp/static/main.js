/**********************************************************************
 Các biến toàn cục
 **********************************************************************/
var dataDir = "./static/";
var problem = new Problem();
var render = new Render();
var start = null;
var finish = null;
var numroute = 2;
var fitness = "time";
var busSpeed = 40;
var walkSpeed = 4.5;
var penalty = 0.1;
stops = load("stops");
routes = load("routes");
distances = load("distances");

/**********************************************************************
 Các hàm khởi động
 **********************************************************************/
$(document).ready(function () {

    problem.Init();
    render.InitMap();
    render.InitMathProg();
    render.InitConstraint();

    $(document).on("click", "a#leafmap", function () {
        $("li").removeClass("active");
        $("#leafmap").parent().addClass("active");
        render.LeafletMap();
    });

    $(document).on("click", "a#location", function () {
        $("li").removeClass("active");
        $("#location").parent().addClass("active");
        render.StopControl();
    });

    $(document).on("click", "a#route", function () {
        $("li").removeClass("active");
        $("#route").parent().addClass("active");
        render.RouteControl();
    });

    $(document).on("click", "a#optimize", function () {
        if(render.StartPoint && render.TargetPoint) {
            start = problem.NearestStartStop(render.StartPoint._latlng, render.TargetPoint._latlng);
            finish = problem.NearestFinishStop(render.TargetPoint._latlng);

            $("li").removeClass("active");
            $("#optimize").parent().addClass("active");
            render.MathProg();
            render.MathModel();
        }
        else {
            alert("Hãy chọn điểm đi và điểm đến trước khi lựa chọn chức năng này.")
        }
    });


    $(document).on("click", "a#contraint", function () {
        $("li").removeClass("active");
        $("#contraint").parent().addClass("active");
        render.ContraintControl();
    });

    $(document).on("click", "a#solver", function () {
        problem.WalkDistance();
        var data = render.ModelEditor.getValue();
        if(data != "") {
            problem.Solve(data);
        }
    });

    $(document).on("click", "a#sample", function () {
        numroute = parseInt($(this).attr("value"));
        $("a#data").attr("value",numroute);
        $("a#data").text($(this).text());
        $("a#data").append('<span class="caret"/>');
        render.Reload();
    });
    
    $(document).on("click", "a#fitness", function () {
        fitness = $(this).attr("value");
        $("a#fitnessinfo").attr("value",fitness);
        $("a#fitnessinfo").text($(this).text());
        $("a#fitnessinfo").append('<span class="caret"/>');
        render.Reload();
    });


});
/**********************************************************************
 Hàm toàn cục
 **********************************************************************/
function load(data) {
    var result = null;
    $.ajax({
        url: dataDir + data,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(json) {
            result = json;
        }
    });
    return result;
}
