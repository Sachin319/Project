package demo;
import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import java.sql.PreparedStatement;

import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.awt.event.ActionEvent;
import java.awt.Color;
import java.awt.Font;
import java.awt.Frame;

public class MainP
{
	JFrame f;
	JButton b1,b2;
	JLabel l1,l2,l3,l4,l5,l6;
	MainP()
	{
		f=new JFrame("Login Page");
		f.setVisible(true);
		f.setSize(500,500);
		f.setLayout(null);
		
		b1=new JButton("Payment Status");
		b2=new JButton("Marks");
		l1=new JLabel("");
		l2=new JLabel("");
		l3=new JLabel("");
		l4=new JLabel("");
		l5=new JLabel("");
		l6=new JLabel("");
		b1.setVisible(true);
		b2.setVisible(true);
		l1.setVisible(true);
		l2.setVisible(true);
		l3.setVisible(true);
		l4.setVisible(true);
		l5.setVisible(true);
		l6.setVisible(true);
		
		b1.setBounds(100, 100, 200, 60);
		b2.setBounds(100, 200, 200, 60);
		
		l1.setBounds(150,300,200,40);
		
		l1.setFont(new Font("Arial",Font.BOLD,30));
		l1.setForeground(Color.GREEN);
		
		l4.setFont(new Font("Arial",Font.BOLD,20));
		l5.setFont(new Font("Arial",Font.BOLD,20));
		l6.setFont(new Font("Arial",Font.BOLD,20));
		
		f.add(b1);
		f.add(b2);
		f.add(l1);
		f.add(l2);
		f.add(l3);
		f.add(l4);
		f.add(l5);
		f.add(l6);
		
		b1.addActionListener(new  ActionListener() {
			public void actionPerformed(ActionEvent e1)
			{
				try {
				PreparedStatement ps=DatabaseConnection.conn.prepareStatement("select paymentStatus from studentDetail where username='"+DatabaseConnection.username+"'");
				ResultSet rs=ps.executeQuery();
				while(rs.next())
				{
					l1.setText(rs.getString("paymentStatus"));
					l1.setBounds(150,300,200,40);
					l1.setVisible(true);
					l2.setVisible(false);
					l3.setVisible(false);
					l4.setVisible(false);
					l5.setVisible(false);
					l6.setVisible(false);
					l1.setFont(new Font("Arial",Font.BOLD,30));
					l1.setForeground(Color.GREEN);
				}
				}catch(Exception e)
				{
					System.out.println("Exception is occure "+e.getMessage());
				}
				
			}
		});
		
		b2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e1)
			{
				try {
				PreparedStatement ps= DatabaseConnection.conn.prepareStatement("select java,iwp,datamining from marks where id='"+DatabaseConnection.id+"' ");
				ResultSet rs=ps.executeQuery();
				while(rs.next())
				{
					l4.setText(rs.getString("java"));
					l5.setText(rs.getString("iwp"));
					l6.setText(rs.getString("datamining"));
				}
				l1.setVisible(true);
				l2.setVisible(true);
				l3.setVisible(true);
				l4.setVisible(true);
				l5.setVisible(true);
				l6.setVisible(true);
				l1.setBounds(100,300,100,40);
				l2.setBounds(200,300,100,40);
				l3.setBounds(300,300,200,40);
				l4.setBounds(120,340,100,20);
				l5.setBounds(220,340,100,20);
				l6.setBounds(320,340,100,20);
				l1.setFont(new Font("Arial",Font.BOLD,30));
				l1.setForeground(Color.orange);
				l2.setFont(new Font("Arial",Font.BOLD,30));
				l2.setForeground(Color.ORANGE);
				l3.setFont(new Font("Arial",Font.BOLD,30));
				l3.setForeground(Color.ORANGE);
				l1.setText("Java");
				l2.setText("IWP");
				l3.setText("DataMining");
				}
				catch(Exception e2)
				{
					System.out.println("Exception is "+e2.getMessage());
				}
			}
		});
	}
	
	public static void main(String args[])
	{
		new MainP();
	}
	
}
