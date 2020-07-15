$(function(){
    load();
    //获取本地存储的数据
    function getDate(){
        var data=localStorage.getItem("todolist");
        //没有取到数据
        if(data==null){
            //没有数据返回空数组
            return [];
        }else{
            // 本地存储里面的数据是字符串格式的，需要转换成对象格式
            return JSON.parse(data);
        }
    }
    //保存本地存储的数据
    function saveDate(data){
        //获取本地存储的数据进行转换成
         localStorage.setItem("todolist",JSON.stringify(data))//数据改成字符型
    }
    $("#title").on("keydown",function(event){
        if(event.keyCode===13){
            var local=getDate();
            //
            local.push({title:$(this).val(),done:false});
            //把数组local数组存储的数据存储给本地存储
            saveDate(local);
            load();
        }
    })
    //3.
    $("ol,ul").on("click","a",function(){
        //获得数据
        var data=getDate();
        //修改数据
        var index=$(this).prop("id");
        data.splice(index,i);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    })
 //4.toDolist正在进行和完成选项操作
 $("ol,ul").on("click","input",function(){
     //获取本地存储数据
    var data=getDate();
    //
    var index=$(this).siblings("a").attr("id");
    //把done的值修改成当前input的checked 的值；
    data[index].done=$(this).prop("checked");
})
    //渲染加载页面数据
    function load(){
        //清空ol中的数据
        $("ol").empty();
        //获取本地存储的数据
        var arr=getDate();
        //循环遍历数据
        for(var i=0;i<arr.length;i++){
            if(arr[i].done==true){
                //把数据添加到页面
                $("ul").prepend(`<li>
                <input type="checked" checked>
                <p>${arr[i].title}</p>
                <a href="javascript:;" id="${i}"></a>
            </li>`);
            }else{
                //把数据添加到页面中
                $("ol").prepend(`<li>
            <input type="checked">
            <p>${arr[i].title}</p>
            <a href="javascript:;" id="${i}"></a>
        </li>`);
            }
        }
        //直接利用元素的总数算出已完成和未完成的数量，也可利用循环遍历数组，利用声明一个变量count++来统计总数
        $("#todocount").text($("ol li").length);
        $("#donecount").text($("ul li").length);
    }
   
})