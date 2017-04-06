angular.module('ContactsApp')
    .directive('contactsList', ['$parse', '$document', 'ContactsMainService', function ($parse, $document, ContactsMainService) {
        return {
            restrict: 'E',
            scope: {
                enableEdit: "=enableEdit",
                onEditClicked: "&onEditClicked"
            },
            controller: ['$scope', '$element', '$attrs',
                function CreateUpdateContactController($scope, $element, $attrs) {
                    $scope.contacts = undefined;

                    $scope.init = function () {
                        ContactsMainService.getAllContacts()
                            .then(function(contacts_list){
                                $scope.contacts = contacts_list;
                            });
                    };

                    $scope.editClicked = function(contact_id){
                        if($scope.enableEdit){
                            $scope.onEditClicked({id: contact_id});
                        }
                    }
                }],
            link: function link(scope, element, attrs, controller, transcludeFn) {
            },
            templateUrl: 'scripts/directives/contacts_list/template.html'
        }
    }]);