<?php
    include "database.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $sql = "INSERT INTO users (username, password)
                VALUES ('$username', '$password')";

        mysqli_query($conn, $sql);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add User</title>
</head>
<body>
    <form action="index.php" method="post">
        Username: <input type="text" name="username" required>
        Password: <input type="text" name="password" required>
        <input type="submit" value="Add User">
    </form>

    <h2>Users</h2>
    <table border="1" cellpadding="5">
        <tr>
            <th>ID</th><th>Username</th><th>Password</th><th>Reg Date</th>
        </tr>
        <?php
        $results = mysqli_query($conn, "SELECT * FROM users");
        while ($row = mysqli_fetch_assoc($results)) {
            echo "<tr>";
            echo "<td>".$row["id"]."</td>";
            echo "<td>".$row["username"]."</td>";
            echo "<td>".$row["password"]."</td>";
            echo "<td>".$row["reg_date"]."</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
<?php mysqli_close($conn); ?>
