import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestDB {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/blog_app", "root", "root");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + ", Email: " + rs.getString("email_id") + ", Password: " + rs.getString("password"));
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
