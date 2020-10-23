<?php
    if (isset($_POST["send"]))
    {
        session_start();
        $_SESSION["name"] = $_POST["name"];
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["pswd"] = $_POST["pswd"];
        $_SESSION["phone"] = $_POST["phone"];

        header("location: sessao.php");
    } else
    {
        header("location: pw12.html");
    }
?>