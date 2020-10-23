<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sessão</title>
    </head>
    <body>
        <?php
            function printVal ($key, $val)
            {
                echo "<span>" .
                    $key . $val .
                    "</span>";
            }

            session_start();
            if (isset($_SESSION["name"]) == false)
            {
                header("location: pw12.php");
            }

            echo printVal("Name:", $_SESSION["name"]);
            echo printVal("Email:", $_SESSION["email"]);
            echo printVal("Senha:", $_SESSION["pswd"]);
            echo printVal("Fone:", $_SESSION["phone"]);
        ?>
    </body>
</html>