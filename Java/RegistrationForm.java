package demo;

import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.sql.*;

public class RegistrationForm implements ActionListener  {
    JFrame frame;
    //String[] gender={"Male","Female"};
    //JLabel nameLabel=new JLabel("NAME");
    //JLabel genderLabel=new JLabel("GENDER");
    //JLabel fatherNameLabel=new JLabel("FATHER NAME");
    //JLabel passwordLabel=new JLabel("PASSWORD");
    JLabel Sno=new JLabel("Sno");
    JLabel name=new JLabel("name");
    JLabel cource=new JLabel("cource");
    JTextField SnoText=new JTextField();
    //JComboBox genderComboBox=new JComboBox(gender);
    JTextField nameText=new JTextField();
   // JPasswordField passwordField=new JPasswordField();
    //JPasswordField confirmPasswordField=new JPasswordField();
    JTextField courceText=new JTextField();
    //JTextField emailTextField=new JTextField();
    JButton registerButton=new JButton("REGISTER");
   // JButton resetButton=new JButton("RESET");


    RegistrationForm()
    {
        createWindow();
        setLocationAndSize();
        addComponentsToFrame();
        actionEvent();
    }
    public void createWindow()
    {
        frame=new JFrame();
        frame.setTitle("Registration Form");
        frame.setBounds(40,40,380,600);
        frame.getContentPane().setBackground(Color.white);
        frame.getContentPane().setLayout(null);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
    }
    public void setLocationAndSize()
    {
       // nameLabel.setBounds(20,20,40,70);
        //genderLabel.setBounds(20,70,80,70);
        //fatherNameLabel.setBounds(20,120,100,70);
        //passwordLabel.setBounds(20,170,100,70);
        Sno.setBounds(20,220,140,70);
        name.setBounds(20,270,100,70);
        cource.setBounds(20,320,100,70);
        SnoText.setBounds(180,43,165,23);
        //genderComboBox.setBounds(180,93,165,23);
        nameText.setBounds(180,143,165,23);
       // passwordField.setBounds(180,193,165,23);
        //confirmPasswordField.setBounds(180,243,165,23);
        courceText.setBounds(180,293,165,23);
        //emailTextField.setBounds(180,343,165,23);
        registerButton.setBounds(70,400,100,35);
        //resetButton.setBounds(220,400,100,35);
    }
    public void addComponentsToFrame()
    {
        //frame.add(nameLabel);
        //frame.add(genderLabel);
        //frame.add(fatherNameLabel);
        //frame.add(passwordLabel);
        frame.add(Sno);
        frame.add(name);
        frame.add(cource);
        frame.add(SnoText);
        //frame.add(genderComboBox);
        frame.add(nameText);
        //frame.add(passwordField);
        //frame.add(confirmPasswordField);
        frame.add(courceText);
       // frame.add(emailTextField);
        frame.add(registerButton);
       // frame.add(resetButton);
    }
    public void actionEvent()
    {
        registerButton.addActionListener(this);
        //resetButton.addActionListener(this);
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==registerButton)
        {
            try {
                //Creating Connection Object
                //Connection connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/school","root","qwerty@123");
                //Preapared Statement
                PreparedStatement Pstatement=DatabaseConnection.conn.prepareStatement("insert into courseD values(?,?,?)");
                //Specifying the values of it's parameter
               Pstatement.setString(1,SnoText.getText());
                //Pstatement.setString(2,genderComboBox.getSelectedItem().toString());
                Pstatement.setString(2,nameText.getText());
                //Pstatement.setString(4,passwordField.getText());
               // Pstatement.setString(5,confirmPasswordField.getText());
                Pstatement.setString(3,courceText.getText());
                //Pstatement.setString(7,emailTextField.getText());
                //Checking for the Password match
                /*if(passwordField.getText().equalsIgnoreCase(confirmPasswordField.getText()))
                {
                    //Executing query
                    Pstatement.executeUpdate();
                    JOptionPane.showMessageDialog(null,"Data Registered Successfully");
                }
                else
                {
                    JOptionPane.showMessageDialog(null,"password did not match");
                }*/

            } catch(Exception e2)
			{
				System.out.println("Exception is "+e2.getMessage());
			}
		}
	}


public static void main(String args[])
{
	new RegistrationForm();
}

}
