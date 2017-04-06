angular.module("ContactsApp")
    .controller("UpdateContactController", 
        ['$rootScope', 'ContactsMainService', '$timeout', '$location', '$anchorScroll', '$state',
            function ($rootScope, ContactsMainService, $timeout, $location, $anchorScroll, $state) {
            var self = this;
            
            self.enableEdit = true;
            self.editThisContact = undefined;
            self.showalert = {positive: false, negative: false};
            self.edited_contact = '';

            self.init = function(){
                self.showalert = {positive: false, negative: false};  
                self.edited_contact = '';
                var c = $state.current;
                if(c.name == 'Edit'){
                    self.editThisContact = $state.params.id;
                    $timeout(function(){
                        //wait for ui to be rendered and scroll
                        $anchorScroll("edit_form");
                    });
                }
            };
            self.onEditClicked = function(id){
                $state.go('Edit',{id: id}, {reload: true});
            };

            self.onSuccess = function(contact){
                self.edited_contact = contact['id'];
                self.showalert['positive'] = true;
                self.showalert['negative'] = false;
                self.editThisContact = undefined;
            };

            self.onFail = function(){
                self.edited_contact = '';
                self.showalert['positive'] = false;
                self.showalert['negative'] = true;
            }


            $rootScope.$on('contacts:contactupdated', function(event,data) {
                
            });
            
            $rootScope.$on('contacts:contactdeleted', function(event,data){
            	$state.go($state.current, {}, {reload: true});
            });
}]);