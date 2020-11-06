<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pw14-lista</title>
    </head>
    <body>
        <h1>Lista Produto</h1>
        <table>
            <thead>
                <th>Nome</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Categoria</th>
            </thead>
            <tbody>
                <?php productList(); ?>
            </tbody>
        </table>
    </body>
</html>

<?php
    function createDBConnection (
        $host = "localhost",
        $username = "root",
        $password = "",
        $dbName = "pwt"
    ) {
        return new mysqli($host, $username, $password, $dbName);
    }

    function productList () {
        try{
            $connection = createDBConnection();
            $sqlQuery = "SELECT code, name, title, description, price, qty, category FROM product";
            $result = mysqli_query($connection, $sqlQuery);
            while($obj = mysqli_fetch_array($result)){
                echo "<tr>" .
                        "<td>" . $obj["name"] . "</td>" .
                        "<td>" . $obj["title"] . "</td>" .
                        "<td>" . $obj["description"] . "</td>" .
                        "<td>" . $obj["price"] . "</td>" .
                        "<td>" . $obj["qty"] . "</td>" .
                        "<td>" . $obj["category"] . "</td>" .
                        "<td>" .
                            "<a href='pw14-crud.php?code=" . $obj["code"] ."'>" .
                                "Editar" .
                            "</a>" .
                        "</td>" .
                    "</tr>";
            }
            
        } catch (Exception $err) {
            echo "<h1>Um erro aconteceu: " . $err->getMessage() . "</h1>";
        } finally {
            $connection->close();
        }
    }
?>