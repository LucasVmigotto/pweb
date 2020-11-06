<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pw14-crud</title>
        <script lang="javascript">
            function sendSearch () {
                if (code.value === '') {
                    alert('Inform the search code')
                    return false
                }
                window.localtion.href = `pw14-crud.php?code=${code}`
            }

            function loadValue (code, name, title, description, price, qty, category) {
                code.value = cod
                name.value = name
                title.value = title
                description.value = description
                price.value = price
                qty.value = qty
                category.value = category
            }
        </script>
    </head>
    <body>
        <h1>CRUD Produto</h1>
        <form action="pw14-crud.php" method="post">
            <label for="code">Código:</label>
            <input
                id="code"
                name="code"
                type="number"
            /><br/>

            <label for="name">Nome:</label>
            <input
                id="name"
                name="name"
                type="text"
            /><br/>

            <label for="title">Título:</label>
            <input
                id="title"
                name="title"
                type="text"
            /><br/>

            <label for="code">Descrição:</label>
            <textarea
                id="description"
                name="description"
                rows="4"
                cols="32"
            ></textarea><br/>

            <label for="price">Preço:</label>
            <input
                id="price"
                name="price"
                type="text"
            /><br/>

            <label for="qty">Quantidade:</label>
            <input
                id="qty"
                name="qty"
                type="number"
            /><br/>

            <label for="category">Categoria:</label>
            <input
                id="category"
                name="category"
                type="text"
            /><br/>

            <button name="btnCreate">
                Criar
            </button>
            <button
                name="btnRead"
                onClick="sendSearch()"
            >
                Pesquisar
            </button>
            <button name="btnUpdate">
                Alterar
            </button>
            <button name="btnDelete">
                Excluir
            </button>
        </form>

        <?php
            if (isset($__POST["btnCreate"])) {
                create();
            }
            if (isset($__GET["code"])) {
                read($__GET["code"]);
            }
            if (isset($__POST["btnUpdate"])) {
                update();
            }
            if (isset($__POST["btnDelete"])) {
                remove();
            }
        ?>
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

    function create () {
        $name = $__POST["name"];
        $title = $__POST["title"];
        $description = $__POST["description"];
        $price = $__POST["price"];
        $qty = $__POST["qty"];
        $category = $__POST["category"];
        try {
            $connection = createDBConnection();
            $sqlQuery = "INSERT INTO product " .
                "(name, title, description, price, qty, category) " .
                "VALUES (" .
                $name . "," .
                $title . "," .
                $description . "," .
                $price . "," .
                $qty . "," .
                $category . "," .
                ");";
            $result = mysqli_query($connection, $sqlQuery);
            echo "<h1>Produto cadastrado com sucesso</h1>";
        } catch (Exception $err) {
            echo "<h1>Um erro aconteceu: " . $err->getMessage() . "</h1>";
        } finally {
            $connection->close();
        }
    }
    function read ($code) {
        try{
            $connection = createDBConnection();
            $sqlQuery = "SELECT code, name, email FROM product WHERE code = " . $code;
            $result = mysqli_query($connection, $sqlQuery);
            if ($product = mysqli_fetch_array($result)) {
                $name = $product["name"];
                $title = $product["title"];
                $description = $product["description"];
                $price = $product["price"];
                $qty = $product["qty"];
                $category = $product["category"];
                echo "<script lang='javascript'>" .
                    "loadValue(" .
                    $name .
                    $title .
                    $description .
                    $price .
                    $qty .
                    $category
                    ")" .
                    "</script>";
            } else {
                echo "<h1>Produto não encontrado</h1>";
            }
        } catch (Exception $err) {
            echo "<h1>Um erro aconteceu: " . $err->getMessage() . "</h1>";
        } finally {
            $connection->close();
        }
    }
    function update () {
        $code = $__POST["code"];
        $name = $__POST["name"];
        $title = $__POST["title"];
        $description = $__POST["description"];
        $price = $__POST["price"];
        $qty = $__POST["qty"];
        $category = $__POST["category"];
        try {
            $connection = createDBConnection();
            $sqlQuery = "UPDATE product SET " .
                "name='" . $name . "', " .
                "title='" . $title . "', " .
                "description='" . $description . "', " .
                "price='" . $price . "', " .
                "qty='" . $qty . "', " .
                "category='" . $category . "' " .
                "WHERE code=" . $code;
            $result = mysqli_query($connection, $sqlQuery);
            echo "<h1>Produto atualizado com sucesso</h1>";
        } catch (Exception $err) {
            echo "<h1>Um erro aconteceu: " . $err->getMessage() . "</h1>";
        } finally {
            $connection->close();
        }
    }
    function remove () {
        $code = $__POST["code"];
        try {
            $connection = createDBConnection();
            $sqlQuery = "DELETE FROM product WHERE code=" . $code;
            $result = mysqli_query($connection, $sqlQuery);
            echo "<h1>Produto removido com sucesso</h1>";
        } catch (Exception $err) {
            echo "<h1>Um erro aconteceu: " . $err->getMessage() . "</h1>";
        } finally {
            $connection->close();
        }
    }
?>