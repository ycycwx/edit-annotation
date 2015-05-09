var app = angular.module("app", ['ngCookies']);

app.controller("EditController", [ '$scope', '$http', '$cookies', '$cookieStore', 'data', function ($scope, $http, $cookies, $cookieStore, data) {
    $scope.title = "Schema Matching";

    $scope.filenames = [
        {
            'name': 'sony d100',
            'data': [[["jd", "型号", "酷睿i5 4690K", false], ["yixun", "型号", "i5-4690k", false]], [["jd", "类型", "CPU", false]], [["jd", "指令集", "SSE 4.1/4.2, AVX 2.0", false], ["jd", "主频", "3.5GHz", false], ["yixun", "二级缓存", "1M", false]], [["yixun", "CPU主频范围", "3.0GHz以上", false]], [["yixun", "三级缓存", "6M", false], ["jd", "三级缓存", "6M", false]], [["jd", "特性", "处理器显卡Intel? HD Graphics 4600，显卡基本频率350 MHz，.显卡最大动态频率1.2 GHz，最大内存大小32GB,内存通道数 2，内存类型DDR3-1333/1600", false]], [["yixun", "核心显卡型号", "HD4600", false]], [["yixun", "耗电功率", "89W", false]], [["yixun", "色系", "蓝色系", false]], [["yixun", "超线程技术", "不支持", false]], [["yixun", "CPU系列", "酷睿i5", false]], [["yixun", "包装形式", "原包", false]], [["yixun", "适用类型", "台式", false]], [["jd", "接口类型", "LGA1150", false]], [["yixun", "版本", "i5-4690K", false]], [["jd", "系列", "酷睿", false]], [["yixun", "保修时限", "三年", false]], [["yixun", "CPU频率", "3.5GHZ", false]], [["jd", "功率", "88 W", false]], [["jd", "64位支持", "是", false], ["yixun", "64位技术", "支持", false]], [["yixun", "制程工艺", "22纳米", false], ["jd", "制程工艺", "22纳米", false]], [["yixun", "CPU插槽类型", "LGA 1150", false]], [["yixun", "核心数量", "四核心", false], ["jd", "核心数量", "四核", false]], [["yixun", "核心代号", "Haswell-refresh", false], ["jd", "核心代号", "haswell", false]], [["yixun", "品牌", "Intel/英特尔", false], ["jd", "品牌", "英特尔 Intel", false]]]
        },
        {
            'name': 'samsung s5',
            'data': [[['test1', 'key1', 'val1', false], ['test2', 'key2', 'val2', false]]]
        }
    ];

    $scope.selected = $scope.filenames[0];
    $scope.data     = $scope.selected['data'];

    $scope.file = "Example";

    $scope.ths = ['Select', 'Source', 'Key', 'Value'];

    // $scope.data = data;
    // $scope.data = $scope.filenames[1]['data'];
    console.log($scope.data);

    $scope.splitKeys = function(keys) {
        var idx = $scope.data.indexOf(keys);
        var item = $scope.data.splice(idx, 1);
        for (var i = 0; i < item[0].length; i ++) {
            $scope.data.push([item[0][i]]);
        }
    };

    $scope.combineKeys = function() {
        var data = [];

        console.log($scope.data);

        for (var i = $scope.data.length - 1; i >= 0; i --) {
            if($scope.data[i].length === 1 && $scope.data[i][0][3] === true) {
                var item = $scope.data.splice(i, 1);
                item[0][0][3] = false;
                data.push(item[0][0]);
            }
        }

        if (data.length !== 0) {
            $scope.data.push(data);
        }

        console.log($scope.data);
    };

    $scope.setTop = function(key, keys) {
        for (var i = 0; i < $scope.data.length; i ++) {
            if ($scope.data[i] === keys) {
                for (var j = 0; j < $scope.data[i].length; j ++) {
                    if ($scope.data[i][j] === key) {
                        var item = $scope.data[i].splice(j, 1);
                        $scope.data[i].unshift(item[0]);
                    }
                }
            }
        }
    };

    $scope.saveKeys = function() {
        $http.post("/", {name: $scope.file, data: $scope.data}).
            success(function(response) {
            console.log("Write File Successfully");
        });
    };

}]);

app.factory('data', [function() {
    var data = [[["jd", "型号", "酷睿i5 4690K", false], ["yixun", "型号", "i5-4690k", false]], [["jd", "类型", "CPU", false]], [["jd", "指令集", "SSE 4.1/4.2, AVX 2.0", false], ["jd", "主频", "3.5GHz", false], ["yixun", "二级缓存", "1M", false]], [["yixun", "CPU主频范围", "3.0GHz以上", false]], [["yixun", "三级缓存", "6M", false], ["jd", "三级缓存", "6M", false]], [["jd", "特性", "处理器显卡Intel? HD Graphics 4600，显卡基本频率350 MHz，.显卡最大动态频率1.2 GHz，最大内存大小32GB,内存通道数 2，内存类型DDR3-1333/1600", false]], [["yixun", "核心显卡型号", "HD4600", false]], [["yixun", "耗电功率", "89W", false]], [["yixun", "色系", "蓝色系", false]], [["yixun", "超线程技术", "不支持", false]], [["yixun", "CPU系列", "酷睿i5", false]], [["yixun", "包装形式", "原包", false]], [["yixun", "适用类型", "台式", false]], [["jd", "接口类型", "LGA1150", false]], [["yixun", "版本", "i5-4690K", false]], [["jd", "系列", "酷睿", false]], [["yixun", "保修时限", "三年", false]], [["yixun", "CPU频率", "3.5GHZ", false]], [["jd", "功率", "88 W", false]], [["jd", "64位支持", "是", false], ["yixun", "64位技术", "支持", false]], [["yixun", "制程工艺", "22纳米", false], ["jd", "制程工艺", "22纳米", false]], [["yixun", "CPU插槽类型", "LGA 1150", false]], [["yixun", "核心数量", "四核心", false], ["jd", "核心数量", "四核", false]], [["yixun", "核心代号", "Haswell-refresh", false], ["jd", "核心代号", "haswell", false]], [["yixun", "品牌", "Intel/英特尔", false], ["jd", "品牌", "英特尔 Intel", false]]];

    return data;
}]);
