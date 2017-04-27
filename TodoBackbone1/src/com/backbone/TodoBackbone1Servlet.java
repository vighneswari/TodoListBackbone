package com.backbone;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.jdo.PersistenceManager;
import javax.servlet.http.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.appengine.api.datastore.Query;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
//import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.todo.jdo.ToDo;
import com.todo.jdo.ToDoList;
import com.todo.util.PMF;

@Controller
public class TodoBackbone1Servlet<UnexpectedErrorBean> {

	@RequestMapping("/hello")
	public String hello(ModelMap model) {
		model.addAttribute("message", "Hello Spring MVC Framework!");

		return "hello";
	}
	// @RequestMapping(value = "/addData", method = RequestMethod.GET)
	//
	// public String add(HttpServletRequest request, ModelMap model) {
	//
	// String data = request.getParameter("data");
	// System.out.println(" data"+data);
	//
	// ToDo c = new ToDo();
	// c.setdata(data);
	//
	//
	//
	// PersistenceManager pm = PMF.get().getPersistenceManager();
	// try {
	// pm.makePersistent(c);
	// } finally {
	// pm.close();
	// }
	// return "hello";
	// }
	//

	@RequestMapping(value = "/addsave", method = RequestMethod.POST)
	@ResponseBody
	public String save(HttpServletRequest request, HttpServletResponse response, @RequestBody String data) {
        
		
		
		System.out.println(" data:: " + data);
		
//		JSONObject json;
//		Long myKey = (Long) null;
//		String myData = "";
//		try {
//			json = (JSONObject)new JSONParser().parse(data);
//			myKey = Long.parseLong(json.get("key").toString());
//			myData =json.get("title").toString();
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//
//		System.out.println("Key "+myKey+" Title "+myData);
		
		ToDoList d = new ToDoList();
		//System.out.println("Key "+myKey+" Title "+myData);
		d.setData(data);
		Gson gson =  new Gson();
		String ret = "";
//		d.setKey(myKey);
		//System.out.println("Key "+myKey+" Title "+myData);
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
		//	System.out.println("Key "+myKey+" Title "+myData);
			pm.makePersistent(d);
			System.out.println(d);
			ret = gson.toJson(d);
			System.out.println(gson);
			
		//	System.out.println("Key "+myKey+" Title "+myData);
		} finally {
			pm.close();
		}
		
		return ret;
		
	}

	@RequestMapping(value = "/retriveTodo", method = RequestMethod.GET)
	@ResponseBody
	public String retrieve(HttpServletRequest request) {
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		javax.jdo.Query q = pm.newQuery(ToDoList.class);
		List<ToDoList> results = (List<ToDoList>) q.execute();
		
		System.out.println("Todo List  :: "+new Gson().toJson(results));
		
		Gson obj = new Gson();
		String ret = obj.toJson(results);

		return ret;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public @ResponseBody String delete(@RequestParam long key, HttpServletRequest request) {
		
		
		
		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {

		ToDoList c = pm.getObjectById(ToDoList.class, key);
			pm.deletePersistent(c);
			System.out.println("deleting");

		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			pm.close();
		}

		return "deleted";

	}

	// @RequestMapping(value = "/destroy/{ID}", method = RequestMethod.GET)
	// public ResponseBody delete(@PathVariable Long data) {
	//
	//
	// PersistenceManager pm = PMF.get().getPersistenceManager();
	//
	// ToDoList c = pm.getObjectById(ToDoList.class, data);
	//
	// if (c== null) {
	// return (ResponseBody) new
	// ResponseEntity<UnexpectedErrorBean>(HttpStatus.BAD_REQUEST);
	// }
	//
	//
	// return (ResponseBody) new ResponseEntity(HttpStatus.OK);
	// }
	//

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody String update(HttpServletRequest request, @RequestBody String data) throws ParseException {

		
		JSONObject json = (JSONObject)new JSONParser().parse(data);
		
		
		String myKey = json.get("key").toString();
		String myData =json.get("dataVal").toString();
		long searchKey = Long.parseLong(myKey);

		Gson obj = new Gson();
		String ret = "";

		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {

			ToDoList c = pm.getObjectById(ToDoList.class, searchKey);

			c.setData(myData);
			pm.makePersistent(c);
			
			ret = obj.toJson(c);
			System.out.println(ret);

		} finally {
			pm.close();
		}
		
		

	return ret;
	}
	

	@RequestMapping(value = "/destroy", method = RequestMethod.DELETE)
	public @ResponseBody String destory(@RequestParam long key, HttpServletRequest request) {
		
		
		
		PersistenceManager pm = PMF.get().getPersistenceManager();

		try {

		ToDoList c = pm.getObjectById(ToDoList.class, key);
			pm.deletePersistent(c);
			System.out.println("deleting");

		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			pm.close();
		}

		return "deleted";

	}

}
