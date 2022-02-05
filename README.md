# Terraform Provider generator

Scaffolding / Boilerplate generator for new Terraform provider projects

### Features

- `main.tf`, `variables.tf`,`outputs.tf` files to provider tf path

- `test` using terratest

- `.pre-commit-config.yaml` for `terraform fmt`, `terraform-docs`, `check-merge-conflict` and (`go fmt`, `golint`) / `rubocop`


### Prerequisites

- [terraform](https://learn.hashicorp.com/terraform/getting-started/install#installing-terraform) `pro tip: use tfenv`
- [pre-commit](https://pre-commit.com/#install)
- For tests
  - **terratest**
    - [golang](https://golang.org/doc/install#install) `pro tip: use gvm`
    - [golint](https://github.com/golang/lint#installation)

### Installation

- To use generator using Docker, Install [Docker](https://docs.docker.com/engine/install/) `recommended`
- To use generator using Nodejs, Install [nodejs](https://nodejs.org/en/download/) `pro tip: use nvm`

### Usage

To use the included generator execute the below command in shell and provide your answers to the prompts.

##### With Docker

```sh
docker run --rm -it -v $(pwd):/generated -e myuid="$(id -u):$(id -g)" sudokar/generator-tf-module
```

##### With NodeJs

```sh
npx -p yo -p generator-tf-module -c 'yo tf-provider'
```

##### Prompts

```sh
...
? Enter name for the new terraform provider :  example-provider
? Enter description for the new terraform provider :  Example terraform provider
? Enter author name :  author
? Choose terraform version (Use arrow keys)
❯ 1.1.5
  1.1.4
```

Project layout generated for the new provider

```
example-provider
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .pre-commit-config.yaml
├── README.md
├── tf
│   ├── .terraform-version
│   ├── main.tf
│   ├── outputs.tf
│   ├── providers.tf
│   └── variables.tf
├── test
    └── example_test.go
```


##### Post generation steps

Step 1

On the generated provider's root path, Initialize git repository

```sh
git init
```

Step 2

On the generated provider's root path, Install pre-commit hooks

```sh
pre-commit install
```

Step 3 

For golang tests, get below libs (you can use the dockerized version)

```sh
> go get github.com/gruntwork-io/terratest/modules/terraform
> go get github.com/stretchr/testify/assert
```

### Contribution

Found a bug? feel free to raise an issue.  
Pull requests are always welcome. Keen to review and merge asap.

### Maintainer


### License

MIT
