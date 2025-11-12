<?php

    $conn = mysqli_connect("db", "root", "rootpassword", "csc");

     if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>