package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import java.sql.PreparedStatement;
public class DatabaseConnection 
{
	public static Connection conn;
	//public static String email;
	public static String username;
	public static int  id;
	
	
	static 
	{
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			conn=DriverManager.getConnection("jdbc:mysql://localhost:3306/school","root","qwerty@123");
			System.out.println("connection successful");
			}
		catch(Exception e)
		{
			System.out.println("Exception is occure : "+e.getMessage());
		}
	}
}
