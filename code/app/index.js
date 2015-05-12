
var cartController = function ($scope) {

    $scope.cart = [
        {
            id: 1000,
            name: 'Apple',
            quantity: 3,
            price: 4
        },
        {
            id: 3300,
            name: 'Pear',
            quantity: 30,
            price: 3
        },
        {
            id: 232,
            name: 'Peach',
            quantity: 4,
            price: 2
        },
        {
            id: 1400,
            name: 'Plum',
            quantity: 5,
            price: 2
        }
    ];


    /**
     * calcul the total prize
     */
    $scope.totalPrice = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += item.quantity * item.price;
        })
        return total;
    }

    /**
     * the total quantity
     */
    $scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += parseInt(item.quantity);
        })
        return total;
    }


    /**
     * find a index
     */
    var findIndex = function (id) {
        var index = -1;

        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return;
            }
        });

        return index;
    }


    /**
     * add the quantity
     */
    $scope.add = function (id) {
        var index = findIndex(id);

        if (index !== -1) {
            ++$scope.cart[index].quantity;
        }
    }


    /**
     * minus the quantity
     */
    $scope.reduce = function (id) {
        var index = findIndex(id);

        if (index !== -1) {
            var item = $scope.cart[index];
            if(item.quantity > 1){
                --item.quantity;
            }else{
                var returnKey = confirm('Do you want to delete this item!');
                if(returnKey){
                    $scope.remove(id);
                }
            }

        }
    }

    /**
     * delete
     */
    $scope.remove = function (id) {


        var index = findIndex(id);
        // if we find this item
        if (index !== -1) {
            $scope.cart.splice(index, 1);
        }

    }

    // watch the quantity, if it is moin que 1, ask the user if he want to delete the item
    $scope.$watch('cart',function(newValue,oldValue){

        angular.forEach(newValue,function(item,key){
            if(item.quantity < 1){
                var returnKey = confirm('Do you want to delete this item!');
                if(returnKey){
                    $scope.remove(item.id);
                }else{
                    item.quantity = oldValue[key].quantity;
                }
            }
        })
    },true);



}