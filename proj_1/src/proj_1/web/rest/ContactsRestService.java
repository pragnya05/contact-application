package proj_1.web.rest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import proj_1.web.db.ContactsDB;
import proj_1.web.model.Contact;
import proj_1.web.model.Status;

@Path("/")
public class ContactsRestService {
	Gson gson = new Gson();
	
	@POST
	@Path("/addcontact")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AddContact(InputStream incomingData) {
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
			String line = null;
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			System.out.println("Data Received: " + sb.toString());
			Contact ct = gson.fromJson(sb.toString(), Contact.class);
			System.out.println("parsed " + ct);
			Contact ctOut = ContactsDB.addContact(ct);
			System.out.println(ctOut);
			String jsonStr = gson.toJson(ctOut);
			System.out.println(jsonStr);
			return Response.status(200).entity(jsonStr).build();
		} catch (Exception e) {
			System.out.println("Error Parsing: - " + e.toString());
		}
		
		return Response.status(501).entity(sb.toString()).build();
	}
	
	@POST
	@Path("/updatecontact")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateContact(InputStream incomingData) {
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
			String line = null;
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			
			
			Contact ct = gson.fromJson(sb.toString(), Contact.class);
			
			Contact ctOut = ContactsDB.updateContact(ct);
			
			String jsonStr = gson.toJson(ctOut);
			
			return Response.status(200).entity(jsonStr).build();
		} catch (Exception e) {
			System.out.println("Error Parsing: - " + e.toString());
		}
		
		return Response.status(501).entity(sb.toString()).build();
	}
 
	@GET
	@Path("/getstatuses")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getallStatuses(InputStream icomingData){
		ArrayList<proj_1.web.model.Status> statuses = ContactsDB.getAllStatuses();
		
		
		String jsonOutput = gson.toJson(statuses);
		
		return Response.status(200).entity(jsonOutput).build();
	}
	
	@GET
	@Path("/getallcontacts")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllContacts(InputStream incomingData) {
		ArrayList<Contact> contacts = ContactsDB.getAllContacts();

		
		String jsonOutput = gson.toJson(contacts);
		// return HTTP response 200 in case of success
		return Response.status(200).entity(jsonOutput).build();
	}
	
	
	@POST
	@Path("/deletecontact")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteContact(InputStream incomingData) {
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
			String line = null;
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			System.out.println("Data: "+sb.toString());
			int x = Integer.parseInt(sb.toString());
			System.out.println(x);
			boolean oux = ContactsDB.deleteContact(x);
			if(oux){
				return Response.status(200).entity( x+"" ).build();
			}else{
				throw new Exception("not able to delete");
			}
			
		}catch(Exception e){
			System.out.println("Exception while parsing "+e.toString());
		}
		return Response.status(501).entity("").build();
	}
	
	@POST
	@Path("/getcontact")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getContact(InputStream incomingData) {
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
			String line = null;
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			System.out.println("Data: "+sb.toString());
			int x = Integer.parseInt(sb.toString());
			System.out.println(x);
			Contact ct = ContactsDB.getContact(x);
			System.out.println("CT : " + ct);
			String outJson = gson.toJson(ct);
			System.out.println("out contact "+outJson);
			return Response.status(200).entity( outJson ).build();
		}catch(Exception e){
			System.out.println("Exception while parsing "+e.toString());
		}
		return Response.status(501).entity("").build();
	}
}
