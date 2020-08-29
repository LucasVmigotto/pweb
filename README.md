# pweb

Projeto de PWEB - Store

## Desenvolvimento

1. Clone o repositório e acesse-o
    * Por `HTTPS`

        ```bash
        git clone https://github.com/LucasVmigotto/pweb.git
        cd pweb
        ```

    * Por `ssh`

        ```bash
        git clone git@github.com:LucasVmigotto/pweb.git
        cd pweb
        ```

2. Renomeie os arquivos
    * `.env.exmaple` => `.env`
    * `packages/api/.env.exmaple` => `packages/api/.env`
    * `packages/app/.env.exmaple` => `packages/app/.env`
    > Caso necessário, customize as variáveis internas

3. Instale as dependências

    ```bash
    yarn
    ```

4. Utilize os serviços

    * **_pgcli_**:

        ```bash
        docker-compose run --rm pgcli
        ```

    * **_API_**:
        * Subir o serviço:

            ```bash
            docker-compose up api
            ```

        * Utilizar a `CLI`:

            ```bash
            docker-compose run --rm --service-ports api bash
            ```

            * Comandos disponíveis da **_API_**:
                1. _Code Linter_

                    ```bash
                    yarn lint
                    ```

    * **_APP_**:
        * Subir o serviço:

            ```bash
            docker-compose up api
            ```

        * Utilizar a `CLI`:

            ```bash
            docker-compose run --rm --service-ports api bash
            ```
