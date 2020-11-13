<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <title>pw15</title>
    </head>
    <body>
        <div class="col-xs-12 text-center">
            <h1>Contato</h1>
            <p>Envie a sua mensagem para nós!</p>
        </div>
        <form
            action="pw15.php"
            method="post"
        >
            <div class="for-group row col-xs-offset-4">
                <!-- Name -->
                <label
                    for="name"
                    class="col-xs-2 text-right"
                >
                    Nome:
                </label>
                <div class="col-xs-10">
                    <input
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                <br />

                <!-- Subject -->
                <label
                    for="subject"
                    class="col-xs-2 text-right"
                >
                    Assunto:
                </label>
                <div class="col-xs-10">
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                    />
                </div>
                <br />

                <!-- Message -->
                <label
                    for="message"
                    class="col-xs-2 text-right"
                >
                    Menssagem:
                </label>
                <div class="col-xs-10">
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <br />
            </div>
            <div class="col-xs-12 text-center">
                <button
                    type="submit"
                    name="sendMail"
                    id="sendMail"
                >
                    Enviar
                </button>
            </div>
        </form>
    </body>
</html>
<?php
    if (isset($_POST["sendMail"])) {
        $subject = $_POST["subject"];
        $message = "Mensagem de " .
            $_POST["name"] .
            "\nMenssagem: " .
            $_POST["message"];
        $to = "to:no-reply@contact.com.br";
        $header = "MIME-Version: 1.0\r\n";
        $header .= "from Contato<contact@company.com>";

        mail($to, $subject, $message, $header);
    }
?>