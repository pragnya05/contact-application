oangular.module('ContactsApp')
    .directive('createUpdateContact', ['$parse', '$document', 'ContactsMainService', function ($parse, $document, ContactsMainService) {
        return {
            restrict: 'E',
            scope: {
                onSuccess: "&onSuccess",
                onFail: "&onFail",
                actionId: "=actionId",
                reset: "&reset",
                onDelete: "&onDelete"
            },
            controller: ['$scope', '$element', '$attrs',
                function CreateUpdateContactController($scope, $element, $attrs) {
                    $scope.state = 0; // 1 for create, 2 for update, 3 for error
                    $scope.auContact = undefined;
                    $scope.phoneNumberPattern = '\\d+';
                    //choices are fetched from server
                    $scope.status_choices = [{key: 'active', value:'Active'}, {key:'inactive', value:'In active'}];
                    $scope.init = function () {
                        if($scope.actionId == undefined || $scope.actionId.toString().length <= 0){
                            $scope.state = 1;
                            $scope.auContact = {
                                firstname: '',
                                lastname: '',
                                email: '',
                                phone_number: '',
                                status: ''
                            };
                        }else{
                            $scope.state = 2;
                            $scope.$watch('actionId', function(newValue, oldValue) {
                                var editVal = newValue;
                                if (editVal == undefined){
                                    editVal = oldValue;
                                }
                                ContactsMainService.getContact(editVal)
                                .then(function(contact_to_update){
                                    if(contact_to_update != undefined){
                                        $scope.auContact = angular.copy(contact_to_update);
                                        $scope.state = 2;
                                    }else{
                                        $scope.state = 3;
                                    }
                                });
                            }, true );
                        }
                        $scope.showalert = {positive: false, negative: false};
                        $scope.newid = '';
                    };

                    $scope.resetform = function(auForm){
                        $scope.init();
                        auForm.$setPristine();
                        auForm.$setUntouched();
                    }

                    $scope.onDeleteContact = function(auForm){
                        if($scope.state == 2){
                            ContactsMainService.deleteContact($scope.auContact.id)
                                .then(function(on_delete_success_id){
                                    $scope.onDelete(on_delete_success_id);
                                    $scope.state = 3;
                                }, function(on_delete_fail_id){
                                    //ignore?
                                    $scope.state = 3;
                                });
                        }
                    }

                    $scope.addUpdateContact = function(auForm){
                        if($scope.state == 1){
                            //add
                            if(auForm.$valid){
                                var cp = angular.copy($scope.auContact);
                                ContactsMainService.addContact(cp)
                                    .then(function(added_contact){
                                        if(added_contact != undefined && added_contact.id.toString().length > 0){
                                            $scope.onSuccess({contact: added_contact});
                                        }else{
                                            $scope.onFail();
                                        }
                                });
                            }
                        }else if($scope.state == 2){
                            if(auForm.$valid){
                                var cp = angular.copy($scope.auContact);
                                ContactsMainService.updateContact(cp)
                                    .then(function(updated_contact){
                                        $scope.resetform(auForm);
                                        $scope.onSuccess({contact: updated_contact});
                                    }, function(updated_failed_contact){
                                        $scope.onFail();
                                    });
                            }
                        }else{
                            //??
                        }
                    }

                }],
            link: function link(scope, element, attrs, controller, transcludeFn) {
            },
            templateUrl: 'scripts/directives/add_edit_contact/template.html'
        }
    }]);