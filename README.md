# Backend_nodeJS_test_server

1. Create a table with your own local database(whichever you prefer, we suggest my sql, or sql server) as
given below fields. 
-- Exported Database is in Databse Folder

1. Insert or create 2 users data using (POST METHOD)
    i. Password should be saved as encrypted data
    -- Contain SignIn and LogIn Endpoints (Completed)
    
2. Get all user data which is saved (GET METHOD)
    i. Password should retrieve decrypted data.
    ii. Should retrieve which is first inserted based on create_date_time 
    -- (Completed)
    
3. Write an API to login with the username and password : (use JWT Token). And generate bearer token by using above
    Scenarios. Bearer token should generate when u login successfully.
    --(Completed)
    
4. Write an API to delete the multiple User details data in one request  
    --(Completed)
    
5. Write a SQL statement to find the list of customers who appointed a salesman for their jobs and gets a
commission from the company for more than 12%. 
    --(Completed)
    
ANswer: SELECT a.Cust_Name AS "Customer Name", 
        a.City, b.Name AS "Salesman", b.City,b.Commission  
        FROM customer a  
        INNER JOIN salesman b  
        ON a.Salesman_Id=b.Salesman_Id 
        WHERE b.Commission>.12;
        
        
        
