app.service('coreService', function (){

    var core = {};
    
    var nums = [],
    total = 0;   


    function swap(arr, i, j) {
        if(i !== j){
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    core.setup = function (begin, end){
        for(var i = begin; i <= end; i++){
            nums.push(i);
        }
        total = nums.length;
    };

    core.reset = function (){
        nums = [];
        total = 0;
    };

    core.shuffle = function() {
        var N = nums.length;
        if(N === 1) return nums;

        for (var i = 0; i < N; i++) {
            var r = core.random(i + 1);
            swap(nums, i, r);
        }
        return nums;
    };    

    core.random = function(min, max) {
        if(max)
            return Math.floor(Math.random() * (max - min) + min);
        else
            return Math.floor(Math.random() * min);        
    };

    core.getRandomInList = function (min, max){
        return nums[core.random(min, max)];                      
    };

    core.getList = function (){
        return nums;
    };

    core.getByIndex = function (index){
        return nums[index];
    };

    core.getAndRemoveByIndex = function (index){
        return nums.splice(index, 1).pop();
    };

    core.getLength = function (){
        return nums.length;       
    };

    return core;
});