package proj_1.web.db;

import java.util.ArrayList;
import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import proj_1.web.model.Contact;

public class ContactsDB {
	private static final String temp = "[{\"id\":1,\"firstname\":\"Ryan\",\"lastname\":\"Collins\",\"email\":\"rcollins0@ifeng.com\",\"phone_number\":\"230-(555)532-5419\",\"status\":{key: 'active', value:'Active'}},{\"id\":2,\"firstname\":\"Ernest\",\"lastname\":\"Daniels\",\"email\":\"edaniels1@woothemes.com\",\"phone_number\":\"62-(897)433-5906\",\"status\":{key: 'active', value:'Active'}},{\"id\":3,\"firstname\":\"Dorothy\",\"lastname\":\"Baker\",\"email\":\"dbaker2@jugem.jp\",\"phone_number\":\"62-(680)261-2298\",\"status\":{key: 'active', value:'Active'}},{\"id\":4,\"firstname\":\"Ralph\",\"lastname\":\"Gibson\",\"email\":\"rgibson3@walmart.com\",\"phone_number\":\"86-(545)205-0869\",\"status\":{key: 'active', value:'Active'}},{\"id\":5,\"firstname\":\"Michael\",\"lastname\":null,\"email\":\"malexander4@sphinn.com\",\"phone_number\":\"62-(972)322-1478\",\"status\":{key: 'active', value:'Active'}},{\"id\":6,\"firstname\":\"Chris\",\"lastname\":\"Mccoy\",\"email\":\"cmccoy5@hatena.ne.jp\",\"phone_number\":\"880-(369)994-4064\",\"status\":{key: 'active', value:'Active'}},{\"id\":7,\"firstname\":\"Denise\",\"lastname\":\"Austin\",\"email\":\"daustin6@prweb.com\",\"phone_number\":\"62-(142)341-6312\",\"status\":{key: 'active', value:'Active'}},{\"id\":8,\"firstname\":\"Wayne\",\"lastname\":null,\"email\":\"wboyd7@shareasale.com\",\"phone_number\":\"353-(224)272-1191\",\"status\":{key: 'active', value:'Active'}},{\"id\":9,\"firstname\":\"Kimberly\",\"lastname\":\"Wheeler\",\"email\":\"kwheeler8@blinklist.com\",\"phone_number\":\"86-(770)947-0069\",\"status\":{key: 'active', value:'Active'}},{\"id\":10,\"firstname\":\"Jesse\",\"lastname\":\"Nelson\",\"email\":\"jnelson9@intel.com\",\"phone_number\":\"351-(395)365-7503\",\"status\":{key: 'active', value:'Active'}}]";
	private static Gson gson = new Gson();
	private static final ArrayList<Contact> contacts = gson.fromJson(temp, new TypeToken<ArrayList<Contact>>(){}.getType() );
	private static Random randomGenerator = new Random();
	
	
	public static ArrayList<proj_1.web.model.Status> getAllStatuses(){
		ArrayList<proj_1.web.model.Status> statuses = new ArrayList<>();
		proj_1.web.model.Status status1 = new proj_1.web.model.Status("active", "Active");
		statuses.add(status1);
		
		proj_1.web.model.Status status2 = new proj_1.web.model.Status("inactive", "In Active");
		statuses.add(status2);
		return statuses;
	}
	
	public static ArrayList<Contact> getAllContacts(){
		// make database call and return list of contacts
		return contacts;
	}
	
	public static Contact getContact(int id){
		for(int i=0;i<contacts.size(); i++){
			if(contacts.get(i).getId() == id){
				return contacts.get(i);
			}
		}
		return null;
	}
	
	public static Contact addContact(Contact ct){
		ct.setId(randomGenerator.nextInt(10000));
		contacts.add(ct);
		return ct;
	}
	
	public static Contact updateContact(Contact ct){
		for(Contact ctInDb : contacts){
			if(ctInDb.getId() == ct.getId()){
				ctInDb.setFirstname(ct.getFirstname());
				ctInDb.setLastname(ct.getLastname());
				ctInDb.setEmail(ct.getEmail());
				ctInDb.setPhone_number(ct.getPhone_number());
				ctInDb.setStatus(ct.getStatus());
				return ctInDb;
			}
		}
		return null;
	}
	
	public static boolean deleteContact(int id){
		boolean found = false;
		int index = -1;
		for(int i=0;i<contacts.size();i++){
			if(contacts.get(i).getId() == id){
				found = true;
				index = i;
				break;
			}
		}
		if(found){
			contacts.remove(index);
			return true;
		}else{
			return false;
		}
	}
}
