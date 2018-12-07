$(document).ready(function(){

    $(".dorm-rating").each(function(){      
        let rating = parseFloat($(this).data("rating"));
        if (rating<=.9) {
            $(this).css("color","darkred");
        }
        else if (rating<=1.9) {
            $(this).css("color","red");
        }
        else if (rating<=2.9) {
            $(this).css("color","orange");
        }
        else if (rating<=3.9) {
            $(this).css("color","#D4AC0D");
        }
        else if (rating<=4.9) {
            $(this).css("color","green");
        }
        else {
            $(this).css("color","darkgreen");
        }
    })
    $(".dorm-rating").css("visibility","visible");

    $("#search").keyup(function(){
        $("#no-results").hide();
        $(".dorm").each(function(){
            $(this).css("display", "flex");
        })
        let text = $("#search").val().toLowerCase();
        let filtered = $(".dorm").filter(function(){
            return !($(this).attr("id").toLowerCase().startsWith(text));
        })
        filtered.each(function(){
            $(this).css("display", "none");
        })
        if (filtered.length === 36) {
            $("#no-results").show();
        }
    })

    $(".dorm-main").click(function() {
        let id = $(this).parent().attr("id").toLowerCase().split(" ").join("_");
        window.location.href = "/dorm/"+id;
    })

    $("#add").click(function() {
        let name = $(this).data("name").toLowerCase().split(" ").join("_");
        window.location.href = "/addReview/"+name;
    })
})