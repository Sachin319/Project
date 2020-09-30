package demo;
import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

import java.sql.PreparedStatement;

import java.awt.Color;
import java.awt.Component;
import java.sql.*;
import demo.DatabaseConnection;
import javax.swing.JButton;
import java.awt.event.ActionListener;
//import java.sql.Connection;  
//import java.sql.DriverManager;
//import java.sql.SQLException;
import java.awt.event.ActionEvent;
import java.awt.Font;

public class Login extends JFrame {

	

	private JPanel contentPane;
	private JTextField unt;
	private JTextField passT;
	private JFrame frame;
	
	//private MainP pa;

	
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Login frame = new Login();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	//
	public Login() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(300, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		//
		unt = new JTextField();
		unt.setBounds(144, 50, 178, 20);
		contentPane.add(unt);
		unt.setColumns(10);
		
		passT = new JTextField();
		passT.setBounds(144, 77, 178, 20);
		contentPane.add(passT);
		passT.setColumns(10);
		
		JButton loginB = new JButton("Login..");
		loginB.setFont(new Font("Tahoma", Font.PLAIN, 10));
		loginB.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				
				String usname=unt.getText();
				String psd=passT.getText();
			
				//MainP pa=;
				try {
					PreparedStatement ps= DatabaseConnection.conn.prepareStatement("select id,username , password from studentDetail where username='"+usname+"' and password='"+psd+"'");
				    ResultSet rs=ps.executeQuery();
				    while(rs.next())
				    {
					if (usname.equals(rs.getString("username")) && psd.equals(rs.getString("password")))
				      {
				    	  
				    		//dispose();
				    		//MainP mainf=
						DatabaseConnection.username=usname;
						DatabaseConnection.id=rs.getInt("id");
				    		new MainP();
						JOptionPane.showMessageDialog(frame,"login successful");
						dispose();
				    	//new MainP();	
						
				    		  }
				    	  else
				    	  {
				    		  JOptionPane.showMessageDialog(frame, "invalid");
				    	  }
				    }
				      }catch(Exception e)
						{
							System.out.println(e.getMessage());
						}
			}
				
				
				
			
			
		});
		loginB.setBounds(250, 105, 76, 20);
		contentPane.add(loginB);
		
		JLabel lblUsername = new JLabel("Username:");
		lblUsername.setFont(new Font("Tahoma", Font.PLAIN, 15));
		lblUsername.setBounds(21, 49, 122, 23);
		contentPane.add(lblUsername);
		
		JLabel lblPass = new JLabel("Password");
		lblPass.setFont(new Font("Tahoma", Font.PLAIN, 15));
		lblPass.setBounds(21, 74, 122, 26);
		contentPane.add(lblPass);
	}
}
