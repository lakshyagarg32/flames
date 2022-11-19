var first;
var second;
var visFirst = [];
var visSecond = [];
var disFirst;
var disSecond;
var flames="FLAMES";
var visFlame=[]
var disFlame;
var output;
$(".btn").click(function () {
    first = $(".first").val();
    first=first.toUpperCase();

    second = $(".second").val();
    second=second.toUpperCase();

    create(first,second);
    var common=check(first,second,visFirst,visSecond);
    disFirst=display(first,visFirst);
    disSecond=display(second,visSecond);
    
    var different=first.length+second.length-(common*2);
    output=res(different,visFlame);
    disFlame=dis_flames(flames,visFlame);
    var x;
    if(output==0){
        x="FRIENDS";
    }
    else if(output==1){
        x="LOVERS";
    }
    else if(output==2){
        x="AFFAIR";
    }
    else if(output==3){
        x="MARRIAGE";
    }
    else if(output==4){
        x="ENEMY";
    }
    else if(output==5){
        x="SIBLINGS";
    }

    $.post("/",{name1:first,name2:second,output:x},function(data){
        console.log(data);
    },"json");

    final(disFirst,disSecond,disFlame,output);
    
});

function create(first, second) {
    for (var i = 0; i < first.length; i++) {
        visFirst[i]=0;
    }
    for(var i=0;i<second.length;i++){
        visSecond[i]=0;
    }
    for(var i=0;i<6;i++){
        visFlame[i]=0;
    }
}

function check(first,second,visFirst,visSecond){
    var common=0;
    for(var i=0;i<first.length;i++){
        for(var j=0;j<second.length;j++){
            if(first[i]===second[j] && visSecond[j]===0 && visFirst[i]===0){
                visSecond[j]=1;
                visFirst[i]=1;
                common++;
                break;
            }
        }
    }
    return common;
}

function display(first,visFirst){
    var ans="";
    for(var i=0;i<first.length;i++){
        if(visFirst[i]===0){
            ans+=first[i]+" ";
        }
        else{
            ans+="<del>"+first[i]+"</del> "
        }
    }
    return ans;
}

function dis_flames(first,visFirst){
    var ans="";
    for(var i=0;i<first.length;i++){
        if(visFirst[i]===0){
            ans+="<span style='color:crimson'><b>" + first[i] + "</b></span> ";
        }
        else{
            ans+="<del>"+first[i]+"</del> "
        }
    }
    return ans;
}

function res(different,visFlame){
    for(var i=0;i<5;i++){
        var cnt=different%(6-i);
        if(cnt===0){
            cnt=6-i;
        }
        for(var j=0;j<6;j++){
            if(visFlame[j]===0){
                if(cnt===1){
                    visFlame[j]=1;
                    break;
                }
                cnt--;
            }
        }
    }
    for(var i=0;i<6;i++){
        if(visFlame[i]===0){
            return i;
        }
    }
}

function final(disFirst,disSecond,disFlame,output){
    $("#dis1").html(disFirst).addClass("animate");
    setTimeout(function(){
        $("#dis1").removeClass("animate");
    },500)

    $("#dis2").html(disSecond).addClass("animate");
    setTimeout(function(){
        $("#dis2").removeClass("animate");
    },500) 

    setTimeout(function(){
        $("#dis3").html(disFlame).addClass("animate");
    },800)
    setTimeout(function(){
        $("#dis3").removeClass("animate");
    },1300)

    setTimeout(function(){
        if(output===0){
            $("#dis4").html("Friends").addClass("animate");
        }
        if(output===1){
            $("#dis4").html("Lovers").addClass("animate");
        }
        if(output===2){
            $("#dis4").html("Affair").addClass("animate");
        }
        if(output===3){
            $("#dis4").html("Marriage").addClass("animate");
        }
        if(output===4){
            $("#dis4").html("Enemy").addClass("animate");
        }
        if(output===5){
            $("#dis4").html("Siblings").addClass("animate");
        }
    },1600)
    setTimeout(function(){
        $("#dis4").removeClass("animate");
    },2100)
    }
