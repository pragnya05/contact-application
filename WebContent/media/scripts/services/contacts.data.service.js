angular.module("ContactsApp").factory("ContactsMainService",
    ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
        var service = {
            contacts: undefined //initially nothing 
            //model:  { id: '', firstname: '', lastname: '', 'email': '', phone_number: '', status: '' }

        };
        service.getAllContacts = function () {
	        return $http.get("/proj_1/api/getallcontacts").then(function(response){
	        	service.contacts = response.data;
	        	return service.contacts;
	        });
        };

        service.getContact = function (contact_id) {
        	return $http.post("/proj_1/api/getcontact/", contact_id).then(function(response){
        		return response.data;
        	});
        }
         

        service.addContact = function (new_contact) {
        	return $http.post("/proj_1/api/addcontact", new_contact).then(function(response){
        		$rootScope.$broadcast('contacts:contactadded', response.data);
        		return response.data;
        	});
        };

        service.deleteContact = function(contact_id){
        	return $http.post("/proj_1/api/deletecontact", contact_id).then(function(response){
        		$rootScope.$broadcast('contacts:contactdeleted', contact_id);
        		return response.data;
        	});
        }

        service.updateContact = function (updated_contact) {
        	return $http.post("/proj_1/api/updatecontact", updated_contact)
        		.then(function(response){
        			$rootScope.$broadcast('contacts:contactupdated', updated_contact);
        			for(var i=0;i<service.contacts.length; i++){
        				if(service.contacts[i]['id'] == updated_contact['id']){
        					service.contacts[i] = updated_contact;
        					break;
        				}
        			}
        			return response.data;
        		});
        };

        return service;
    }]);