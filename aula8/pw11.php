<!doctype html>
<html>
	<head>
	 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
        <form action="" method="post">
            <input
                name="n1"
                placeholder="Primeiro Número"
                type="number"
            />
            <input
                name="n2"
                placeholder="Segundo Número"
                type="number"
            />
            <button name="sum">
                &#43;
            </button>
            <button name="sub">
                &#45;
            </button>
            <button name="tim">
                &#215;
            </button>
            <button name="div">
                &#247;
            </button>
        </form>
        <span>&#61;</span>
        <?php
            calculate()
        ?>
    </body>
</html>
<?php
    function sum ($n1, $n2)
    {
        return "" . $n1 + $n2 . "";
    }

    function sub ($n1, $n2)
    {
        return "" . $n1 - $n2 . "";
    }

    function tim ($n1, $n2)
    {
        return "" . $n1 * $n2 . "";
    }

    function div ($n1, $n2)
    {
        return $n2 == 0
            ? "Impossível dividir por 0"
            : "" . $n1 / $n2 . "";
    }

    function calculate ()
    {
        if (isset($_POST["sum"]))
        {
            echo sum($_POST["n1"], $_POST["n2"]);
        }
        if (isset($_POST["sub"]))
        {
            echo sub($_POST["n1"], $_POST["n2"]);
        }
        if (isset($_POST["tim"]))
        {
            echo tim($_POST["n1"], $_POST["n2"]);
        }
        if (isset($_POST["div"]))
        {
            echo div($_POST["n1"], $_POST["n2"]);
        }
    }
?>