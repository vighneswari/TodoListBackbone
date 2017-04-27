package com.todo.jdo;



	import javax.jdo.annotations.IdGeneratorStrategy;
	import javax.jdo.annotations.PersistenceCapable;
	import javax.jdo.annotations.Persistent;
	import javax.jdo.annotations.PrimaryKey;

	import com.google.appengine.api.datastore.Key;

	@PersistenceCapable
	public class ToDo {		
		
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private long key;


	@Persistent
	private String data;
	
	
	public String getData(){
		
	return data;
	}
	public void setdata(String data){
		this.data=data;
		}

	
	public long getKey(){
		
	return key;
	}
	public void setKey(long key){
		this.key=key;
		}



	}















	
	

