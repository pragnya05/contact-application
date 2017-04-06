angular.module("ContactsApp")
    .controller("AddContactController", 
        ['$rootScope', 'ContactsMainService', '$timeout', function ($rootScope, ContactsMainService, $timeout) {
            var self = this;
            self.showalert = {positive: false, negative: false};
            self.newid = '';
            self.addContactControl = false;

            self.init = function(){
                self.addContactControl = true;
                self.showalert = {positive: false, negative: false};  
                self.newid = '';      
            }

            self.onSuccess = function(contact){
                self.newid = contact['id'];
                self.showalert['positive'] = true;
                self.showalert['negative'] = false;
                self.addContactControl = false;
            };

            self.onFail = function(){
                self.newid = '';
                self.showalert['positive'] = false;
                self.showalert['negative'] = true;
            };

            self.newContact = function(){
                self.init();
            }
            
            $rootScope.$on('contacts:contactadded', function(event,data) {
                
            });
}]);